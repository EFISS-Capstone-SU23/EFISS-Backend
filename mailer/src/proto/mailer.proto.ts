import * as grpc from '@grpc/grpc-js';
import {
  SendResetPasswordEmailRequest,
  SendResetPasswordEmailResponse,
  SendVerificationEmailRequest,
  SendVerificationEmailResponse,
} from './mailer_pb';
import { emailQueue } from '../modules/queue/email.queue';
import { EmailType } from '../loaders/enums';
import { CLIENT_URL } from '../loaders/constants';

export async function sendVerificationEmail(
  call: grpc.ServerUnaryCall<SendVerificationEmailRequest, SendVerificationEmailResponse>,
  callback: grpc.sendUnaryData<SendVerificationEmailResponse>,
) {
  try {
    const email = call.request.getEmail();
    const name = call.request.getName();
    const verificationCode = call.request.getVerificationcode();

    emailQueue.add({
      type: EmailType.VERIFY_EMAIL,
      recipientEmail: email,
      recipientName: name,
      url: `${CLIENT_URL}/auth/verify-email/${verificationCode}`,
    });

    const response = new SendVerificationEmailResponse();
    response.setSuccess(true);
    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function sendResetPasswordEmail(
  call: grpc.ServerUnaryCall<SendResetPasswordEmailRequest, SendResetPasswordEmailResponse>,
  callback: grpc.sendUnaryData<SendResetPasswordEmailResponse>,
) {
  try {
    const email = call.request.getEmail();
    const name = call.request.getName();
    const resetPasswordCode = call.request.getResetpasswordcode();

    emailQueue.add({
      type: EmailType.PASSWORD_RESET,
      recipientEmail: email,
      recipientName: name,
      url: `${CLIENT_URL}/auth/reset-password/${resetPasswordCode}`,
    });

    const response = new SendVerificationEmailResponse();
    response.setSuccess(true);
    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}
