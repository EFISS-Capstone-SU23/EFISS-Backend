/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prefer-const */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AccountEntity } from './entities/account.entity';
import jwt from 'jsonwebtoken';
import { config } from '../../config/configuration';
import { plainToInstance } from 'class-transformer';
import {
  ChangePasswordRequest,
  RefreshTokenRequest,
  ResetPasswordByToken,
  SendResetPasswordEmailRequest,
  SignInRequest,
  SignUpRequest,
} from './dtos/auth.dto';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { UnauthorizedError } from '../../common/error-handler';
import { AccountRole, EmailType, TokenType } from '../../loaders/enums';
import { emailQueue } from '../../queue/email.queue';
import { checkJwt, checkRole } from './auth.service';
import { AccountService } from './account.service';
import { tokenService } from './token.service';

export const authRouter = Router();
const accountService = AccountService.getInstance();

authRouter.post(
  '/sign-in',
  RequestValidator.validate(SignInRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const signInRequest = plainToInstance(SignInRequest, req.body);

    // Get account from DB
    let account: AccountEntity | null;
    account = await accountService.getAccountByUsername(signInRequest.username);
    if (!account) {
      next(new UnauthorizedError('Username or password is incorrect'));
      return;
    }

    // Check if encrypted password match
    if (!account.comparePassword(signInRequest.password)) {
      next(new UnauthorizedError('Username or password is incorrect'));
      return;
    }

    // Update last login
    account.lastLogin = new Date(Date.now());
    await accountService.saveAccount(account);

    // Sign JWT, valid for 1 hour
    const token = jwt.sign({ accountId: account.id, username: account.username }, config.auth.jwtSecret, {
      expiresIn: '6h',
    });

    // Sign JWT refresh token
    const refreshToken = jwt.sign({ accountId: account.id, username: account.username }, config.auth.refreshJwtSecret, {
      expiresIn: '30d',
    });

    // To do: add refreshToken to redis

    // Send the JWT in the response
    res.send({
      token,
      refreshToken,
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
      email: account.email,
      createdAt: account.createdAt,
      lastLogin: account.lastLogin,
      isEmailVerified: account.isEmailVerified,
    });
  },
);

authRouter.post(
  '/refresh-token',
  RequestValidator.validate(RefreshTokenRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const refreshTokenRequest = plainToInstance(RefreshTokenRequest, req.body);
    let payload: any = null;
    try {
      // To do: check if refreshToken in redis
      payload = jwt.verify(refreshTokenRequest.refreshToken, config.auth.refreshJwtSecret);
      let account: AccountEntity | null;
      account = await accountService.getAccountByUsername(payload.username);

      if (!account) {
        next(new UnauthorizedError('This account does not exist'));
        return;
      } else {
        // Update last login
        account.lastLogin = new Date(Date.now());
        await accountService.saveAccount(account);
      }
    } catch (error) {
      next(new UnauthorizedError('Invalid refresh token'));
      return;
    }

    // Sign JWT, valid for 1 hour
    const token = jwt.sign({ accountId: payload.accountId, username: payload.username }, config.auth.jwtSecret, {
      expiresIn: '1h',
    });

    // Send the JWT in the response
    res.send({
      token,
    });
  },
);

authRouter.post(
  '/sign-up',
  RequestValidator.validate(SignUpRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const signUpRequest = plainToInstance(SignUpRequest, req.body);

    // Check if username or email already exists
    let account: AccountEntity | null;
    account = await accountService.getAccountByUsername(signUpRequest.username);
    if (account) {
      next(new BadRequestError('Username already exists'));
      return;
    }
    account = await accountService.getAccountByEmail(signUpRequest.email);
    if (account) {
      next(new BadRequestError('Email already exists'));
      return;
    }

    // Save Account to Database
    account = new AccountEntity();
    account.username = signUpRequest.username;
    account.password = signUpRequest.password;
    account.email = signUpRequest.email;
    account.firstName = signUpRequest.firstName;
    account.lastName = signUpRequest.lastName;
    account.isEmailVerified = false;
    await accountService.addRoleToAccount(account, AccountRole.USER);
    await accountService.saveAccount(account);

    // Create verification token for email
    const verificationToken = await tokenService.createNewToken(TokenType.VERIFY_EMAIL, account);

    // Send email verification
    emailQueue.add({
      type: EmailType.VERIFY_EMAIL,
      account: account,
      url: `${config.server.clientUrl}/auth/verify-email/${verificationToken}`,
    });

    res.status(200).send({
      status: true,
      accountId: account.id,
      username: account.username,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
    });
  },
);

authRouter.post(
  '/verify-email/resend',
  checkJwt,
  checkRole([AccountRole.USER]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }
    if (account.isEmailVerified) {
      next(new BadRequestError('Account already verified'));
      return;
    }

    // Check for existing verify email token
    let verifyEmailToken = account.tokens.find((token) => token.type === TokenType.VERIFY_EMAIL);
    if (verifyEmailToken) {
      if (verifyEmailToken.expiresAt.getTime() - Date.now() >= config.auth.verifyEmailExpiration - 5 * 60 * 1000) {
        next(new BadRequestError('Please wait for 5 minutes before sending another verification email'));
        return;
      }
      await tokenService.removeToken(verifyEmailToken);
    }

    const verificationToken = await tokenService.createNewToken(TokenType.VERIFY_EMAIL, account);
    await accountService.saveAccount(account);

    emailQueue.add({
      type: EmailType.VERIFY_EMAIL,
      account: account,
      url: `${config.server.clientUrl}/auth/verify-email/${verificationToken}`,
    });

    res.status(200).send({
      status: true,
      message: 'Verification email has been sent successfully',
    });
  },
);

authRouter.get('/verify-email/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.params.token;
  const hashedToken = tokenService.hashToken(token);
  const tokenEntity = await tokenService.getTokenByHashedToken(hashedToken, TokenType.VERIFY_EMAIL);

  if (!tokenEntity) {
    next(new BadRequestError('Invalid token'));
    return;
  }

  if (tokenEntity.account.isEmailVerified) {
    next(new BadRequestError('Email has been already verified'));
    return;
  }

  if (tokenEntity.expiresAt < new Date(Date.now())) {
    next(new BadRequestError('Token has been expired'));
    return;
  }

  tokenEntity.account.isEmailVerified = true;
  await tokenService.removeToken(tokenEntity);
  await accountService.saveAccount(tokenEntity.account);
  res.status(200).send({
    status: true,
    message: 'Email has been verified successfully',
  });
});

authRouter.post(
  '/change-password',
  checkJwt,
  checkRole([AccountRole.USER]),
  RequestValidator.validate(ChangePasswordRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const changePasswordRequest = plainToInstance(ChangePasswordRequest, req.body);
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    // Validate old password
    if (!account.comparePassword(changePasswordRequest.oldPassword)) {
      next(new BadRequestError('Old password is incorrect'));
      return;
    }

    // Update password
    account.password = changePasswordRequest.newPassword;
    await account.hashPassword();
    await accountService.saveAccount(account);
    res.status(200).send({
      status: true,
      message: 'Password has been changed successfully',
    });
  },
);

authRouter.post(
  '/reset-password',
  RequestValidator.validate(SendResetPasswordEmailRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sendResetPasswordEmailRequest = plainToInstance(SendResetPasswordEmailRequest, req.body);
    let account: AccountEntity | null = null;
    if (sendResetPasswordEmailRequest?.email) {
      account = await accountService.getAccountByEmail(sendResetPasswordEmailRequest.email);
    } else if (sendResetPasswordEmailRequest?.username) {
      account = await accountService.getAccountByUsername(sendResetPasswordEmailRequest.username);
    }
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    // Check for existing reset password token
    let resetPasswordToken = account.tokens.find((token) => token.type === TokenType.RESET_PASSWORD);
    if (resetPasswordToken) {
      if (resetPasswordToken.expiresAt.getTime() - Date.now() >= config.auth.resetPasswordExpiration - 5 * 60 * 1000) {
        next(new BadRequestError('Please wait for 5 minutes before sending another reset password email'));
        return;
      }
      await tokenService.removeToken(resetPasswordToken);
    }

    // Create verification token for reset password
    const verificationToken = await tokenService.createNewToken(TokenType.RESET_PASSWORD, account);
    await accountService.saveAccount(account);

    // Send email
    emailQueue.add({
      type: EmailType.PASSWORD_RESET,
      account: account,
      url: `${config.server.clientUrl}/auth/reset-password/${verificationToken}`,
    });

    res.send({
      status: true,
      message: 'Reset password email has been sent successfully',
    });
  },
);

authRouter.get('/reset-password/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.params.token;
  const hashedToken = tokenService.hashToken(token);
  const tokenEntity = await tokenService.getTokenByHashedToken(hashedToken, TokenType.RESET_PASSWORD);

  if (!tokenEntity) {
    next(new BadRequestError('Invalid token'));
    return;
  }
  if (tokenEntity.expiresAt < new Date(Date.now())) {
    next(new BadRequestError('Token has been expired'));
    return;
  }

  res.status(200).send({
    status: true,
    message: 'Reset password token is valid',
  });
});

authRouter.post(
  '/reset-password/:token',
  RequestValidator.validate(ResetPasswordByToken),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const resetPasswordByToken = plainToInstance(ResetPasswordByToken, req.body);
    const token = req.params.token;
    const hashedToken = tokenService.hashToken(token);
    const tokenEntity = await tokenService.getTokenByHashedToken(hashedToken, TokenType.RESET_PASSWORD);

    if (!tokenEntity) {
      next(new BadRequestError('Invalid token'));
      return;
    }
    if (tokenEntity.expiresAt < new Date(Date.now())) {
      next(new BadRequestError('Token has been expired'));
      return;
    }

    tokenEntity.account.password = resetPasswordByToken.newPassword;
    await tokenEntity.account.hashPassword();
    await accountService.saveAccount(tokenEntity.account);
    await tokenService.removeToken(tokenEntity);

    res.status(200).send({
      status: true,
      message: 'Password has been reset successfully',
    });
  },
);
