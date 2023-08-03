/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import * as jwt from 'jsonwebtoken';
import { config } from '../../../config/configuration';
import { AccountRole, TokenType } from '../../../loaders/enums';
import { AccountEntity } from '../entities/account.entity';
import { accountService } from './account.service';
import {
  ChangePasswordRequestDto,
  GetNewAccessTokenDto,
  ResetPasswordByTokenDto,
  SendResetPasswordEmailRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from '../dtos/auth.dto';
import { IResponse } from '../../../common/response';
import { msg200, msg400, msg401 } from '../../../common/helpers';
import { tokenService } from './token.service';
import { TokenEntity } from '../entities/token.entity';
import {
  DELAY_BETWEEN_EMAILS_IN_MS,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  RESET_PASSWORD_TOKEN_EXPIRES_IN_MS,
  VERIFY_EMAIL_TOKEN_EXPIRES_IN_MS,
} from '../../../loaders/constants';
import { mailerServiceGrpcClient } from '../../mailer/grpc/mailer.grpc-client';

export class AuthService {
  constructor() {}

  async signInResponse(signInRequestDto: SignInRequestDto): Promise<IResponse> {
    // Get account from DB
    let account: AccountEntity | null;
    account = await accountService.getAccountByUsername(signInRequestDto.username);
    if (!account) {
      return msg401('Invalid username or password');
    }

    // Check if encrypted password match
    if (!account.comparePassword(signInRequestDto.password)) {
      return msg401('Invalid username or password');
    }

    if (!account.status) {
      return msg401('Account is not active');
    }

    // Update last login
    account.lastLogin = new Date(Date.now());
    accountService.saveAccount(account);

    // Sign access token
    const accessToken = jwt.sign({ accountId: account.id, username: account.username }, config.jwt.accessSecret, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    });

    // Sign refresh token
    const refreshToken = jwt.sign({ accountId: account.id, username: account.username }, config.jwt.refreshSecret, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    // Update refresh token in DB
    tokenService.updateRefreshToken(account, refreshToken);

    return msg200({
      accessToken: accessToken,
      refreshToken: refreshToken,
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
      email: account.email,
      createdAt: account.createdAt,
      lastLogin: account.lastLogin,
      isEmailVerified: account.isEmailVerified,
    });
  }

  async signUpResponse(signUpRequestDto: SignUpRequestDto): Promise<IResponse> {
    // Check if username or email is taken
    let account: AccountEntity | null;
    account = await accountService.getAccountByUsername(signUpRequestDto.username);
    if (account) {
      return msg400('Username already exists');
    }
    account = await accountService.getAccountByEmail(signUpRequestDto.email);
    if (account) {
      return msg400('Email already exists');
    }

    // Create new account
    account = new AccountEntity();
    account.firstName = signUpRequestDto.firstName;
    account.lastName = signUpRequestDto.lastName;
    account.username = signUpRequestDto.username;
    account.email = signUpRequestDto.email;
    account.password = signUpRequestDto.password;
    account = await accountService.saveAccount(account);
    accountService.addRoleToAccount(account.id, AccountRole.NORMAL_USER);

    // Create verification token for email
    const verificationCode = await tokenService.createNewToken(TokenType.VERIFY_EMAIL, account);

    // Send email verification
    mailerServiceGrpcClient.sendVerificationEmail({
      email: account.email,
      name: `${account.firstName} ${account.lastName}`,
      verificationCode: verificationCode,
    });

    return msg200({
      accountId: account.id,
      username: account.username,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      createdAt: account.createdAt,
    });
  }

  async getNewAccessTokenResponse(getNewAccessTokenRequest: GetNewAccessTokenDto): Promise<IResponse> {
    let payload: any = null;

    try {
      payload = jwt.verify(getNewAccessTokenRequest.refreshToken, config.jwt.refreshSecret);
      let account: AccountEntity | null;
      account = await accountService.getAccountByUsername(payload.username);

      if (!account) {
        return msg401('Invalid refresh token');
      }

      // Check refresh token from DB
      if (await tokenService.checkRefreshTokenOfAccount(getNewAccessTokenRequest.refreshToken, account)) {
        // Sign new access token
        const accessToken = jwt.sign({ accountId: account.id, username: account.username }, config.jwt.accessSecret, {
          expiresIn: JWT_ACCESS_EXPIRES_IN,
        });

        return msg200({
          accessToken: accessToken,
        });
      }
      return msg401('Invalid refresh token');
    } catch (error) {
      return msg401('Invalid refresh token');
    }
  }

  async resendVerificationEmailResponse(accountId: number) {
    const account = await accountService.getAccountById(accountId);
    if (!account) {
      return msg400('Account not found');
    }
    if (account.isEmailVerified) {
      return msg400('Email already verified');
    }

    // Check if email was recently sent email
    let verificationEmailToken = (await tokenService.getVerificationTokenByAccountId(accountId)) as TokenEntity;
    if (verificationEmailToken) {
      const timeBetweenSend = VERIFY_EMAIL_TOKEN_EXPIRES_IN_MS - DELAY_BETWEEN_EMAILS_IN_MS;
      if (
        verificationEmailToken?.expiresAt &&
        verificationEmailToken?.expiresAt.getTime() - Date.now() >= timeBetweenSend
      ) {
        return msg400(
          `Email verification was recently sent, please wait for ${DELAY_BETWEEN_EMAILS_IN_MS / 1000 / 60} minutes`,
        );
      }
    }

    // Update verification email token
    const verificationToken = await tokenService.updateVerificationEmailToken(account);

    // Add to queue to send email
    mailerServiceGrpcClient.sendVerificationEmail({
      email: account.email,
      name: `${account.firstName} ${account.lastName}`,
      verificationCode: verificationToken,
    });

    return msg200({
      message: 'Verification email has been sent successfully',
    });
  }

  async checkVerificationEmailTokenResponse(token: string): Promise<IResponse> {
    const tokenEntity = await tokenService.getTokenByValue(token, TokenType.VERIFY_EMAIL);

    if (!tokenEntity) {
      return msg400('Invalid verification email token');
    }

    if (tokenEntity.expiresAt && tokenEntity.expiresAt.getTime() < Date.now()) {
      return msg400('Verification email token expired');
    }

    return msg200({
      message: 'Verification email token is valid',
    });
  }

  async checkResetPasswordTokenResponse(token: string): Promise<IResponse> {
    const tokenEntity = await tokenService.getTokenByValue(token, TokenType.RESET_PASSWORD);

    if (!tokenEntity) {
      return msg400('Invalid reset password token');
    }

    if (tokenEntity.expiresAt && tokenEntity.expiresAt.getTime() < Date.now()) {
      return msg400('Reset password token expired');
    }

    return msg200({
      message: 'Reset password token is valid',
    });
  }

  async changePasswordResponse(
    accountId: number,
    changePasswordRequestDto: ChangePasswordRequestDto,
  ): Promise<IResponse> {
    // Get account from DB
    const account = await accountService.getAccountById(accountId);
    if (!account?.comparePassword(changePasswordRequestDto.oldPassword)) {
      return msg400('Old password is incorrect');
    }

    // Update password
    account.password = changePasswordRequestDto.newPassword;
    await account.hashPassword();
    await accountService.saveAccount(account);

    return msg200({
      message: 'Password changed successfully',
    });
  }

  async sendResetPasswordEmailResponse(
    sendResetPasswordEmailRequestDto: SendResetPasswordEmailRequestDto,
  ): Promise<IResponse> {
    let account: AccountEntity | null = null;
    if (sendResetPasswordEmailRequestDto?.username) {
      account = await accountService.getAccountByUsername(sendResetPasswordEmailRequestDto.username);
    }
    if (sendResetPasswordEmailRequestDto?.email) {
      account = await accountService.getAccountByEmail(sendResetPasswordEmailRequestDto.email);
    }
    if (!account) {
      return msg400('Account not found');
    }

    // Check for recently sent email
    let resetPasswordToken = (await tokenService.getResetPasswordTokenByAccountId(account.id)) as TokenEntity;
    if (resetPasswordToken) {
      const timeBetweenSend = RESET_PASSWORD_TOKEN_EXPIRES_IN_MS - DELAY_BETWEEN_EMAILS_IN_MS;
      if (resetPasswordToken?.expiresAt && resetPasswordToken?.expiresAt.getTime() - Date.now() >= timeBetweenSend) {
        return msg400(
          `Reset password email was recently sent, please wait for ${DELAY_BETWEEN_EMAILS_IN_MS / 1000 / 60} minutes`,
        );
      }
    }

    const newResetPasswordToken = await tokenService.updateResetPasswordToken(account);

    // Ask mailer service to send reset password email
    mailerServiceGrpcClient.sendResetPasswordEmail({
      email: account.email,
      name: `${account.firstName} ${account.lastName}`,
      resetPasswordCode: newResetPasswordToken,
    });

    return msg200({
      message: 'Reset password email has been sent successfully',
    });
  }

  async resetPasswordByTokenResponse(token: string, resetPasswordByToken: ResetPasswordByTokenDto) {
    const tokenEntity = await tokenService.getTokenByValue(token, TokenType.RESET_PASSWORD);

    if (!tokenEntity) {
      return msg400('Invalid reset password token');
    }

    if (tokenEntity.expiresAt && tokenEntity.expiresAt.getTime() < Date.now()) {
      return msg400('Reset password token expired');
    }

    const account = await accountService.getAccountByToken(token);
    if (!account) {
      return msg400('Account not found');
    }

    // Update password
    account.password = resetPasswordByToken.newPassword;
    await account.hashPassword();
    await accountService.saveAccount(account);
    await tokenService.removeToken(tokenEntity);

    return msg200({
      message: 'Password reset successfully',
    });
  }
}

export const authService = new AuthService();
