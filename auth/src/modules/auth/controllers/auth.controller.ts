/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prefer-const */
import { Router, type Request, type Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { RequestValidator } from '../../../common/error-handler';
import { Permission } from '../../../loaders/enums';
import { authService } from '../services/auth.service';
import {
  ChangePasswordRequestDto,
  GetNewAccessTokenDto,
  ResetPasswordByTokenDto,
  SendResetPasswordEmailRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from '../dtos/auth.dto';
import { sendResponse } from '../../../common/helpers';
import { checkJwt, checkPermissions } from '../middlewares/auth.middleware';

export const authRouter = Router();

authRouter.post(
  '/sign-in',
  RequestValidator.validate(SignInRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const signInRequestDto = plainToInstance(SignInRequestDto, req.body);

    const signInResult = await authService.signIn(signInRequestDto);

    sendResponse(signInResult, res, next);
  },
);

authRouter.post(
  '/sign-up',
  RequestValidator.validate(SignUpRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const signUpRequestDto = plainToInstance(SignUpRequestDto, req.body);

    const signUpResult = await authService.signUp(signUpRequestDto);

    sendResponse(signUpResult, res, next);
  },
);

authRouter.post(
  '/refresh-token',
  RequestValidator.validate(GetNewAccessTokenDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getNewAccessTokenRequest = plainToInstance(GetNewAccessTokenDto, req.body);

    const getAccessTokenResult = await authService.getNewAccessToken(getNewAccessTokenRequest);

    sendResponse(getAccessTokenResult, res, next);
  },
);

authRouter.post(
  '/verify-email/resend',
  checkJwt,
  checkPermissions([Permission.BASIC_NORMAL_USER_OPS]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);

    const resendVerificationEmailResult = await authService.resendVerificationEmail(accountId);

    sendResponse(resendVerificationEmailResult, res, next);
  },
);

authRouter.get('/verify-email/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.params.token;

  const checkVerificationEmailTokenResult = await authService.checkVerificationEmailToken(token);

  sendResponse(checkVerificationEmailTokenResult, res, next);
});

authRouter.post(
  '/change-password',
  checkJwt,
  checkPermissions([Permission.BASIC_NORMAL_USER_OPS]),
  RequestValidator.validate(ChangePasswordRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const changePasswordRequest = plainToInstance(ChangePasswordRequestDto, req.body);
    const accountId = parseInt(res['locals'].accountId);

    const changePasswordResult = await authService.changePassword(accountId, changePasswordRequest);

    sendResponse(changePasswordResult, res, next);
  },
);

authRouter.post(
  '/reset-password',
  RequestValidator.validate(SendResetPasswordEmailRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sendResetPasswordEmailRequest = plainToInstance(SendResetPasswordEmailRequestDto, req.body);

    const sendResetPasswordResult = await authService.sendResetPasswordEmail(sendResetPasswordEmailRequest);

    sendResponse(sendResetPasswordResult, res, next);
  },
);

authRouter.get('/reset-password/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.params.token;

  const checkResetPasswordTokenResult = await authService.checkResetPasswordToken(token);

  sendResponse(checkResetPasswordTokenResult, res, next);
});

authRouter.post(
  '/reset-password/:token',
  RequestValidator.validate(ResetPasswordByTokenDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const resetPasswordByToken = plainToInstance(ResetPasswordByTokenDto, req.body);
    const token = req.params.token;
    const resetPasswordResult = await authService.resetPasswordByToken(token, resetPasswordByToken);

    sendResponse(resetPasswordResult, res, next);
  },
);
