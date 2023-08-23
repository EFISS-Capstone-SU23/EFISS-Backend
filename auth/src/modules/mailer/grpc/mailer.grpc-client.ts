import * as grpc from '@grpc/grpc-js';
import { config } from '../../../config/configuration';
import { MailerServiceClient } from '../../../proto/mailer_grpc_pb';
import { SendResetPasswordEmailRequest, SendVerificationEmailRequest } from '../../../proto/mailer_pb';

export class MailerServiceGrpcClient {
  private grpcClient: MailerServiceClient;
  constructor(private readonly grpcHost: string, private readonly grpcPort: number) {
    this.grpcClient = new MailerServiceClient(`${grpcHost}:${grpcPort}`, grpc.credentials.createInsecure());
  }

  async sendVerificationEmail(opts: { email: string; name: string; verificationCode: string }) {
    return new Promise(async (resolve, reject) => {
      const { email, name, verificationCode } = opts;
      const request = new SendVerificationEmailRequest();
      request.setEmail(email);
      request.setName(name);
      request.setVerificationcode(verificationCode);

      this.grpcClient.sendVerificationEmail(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  }

  async sendResetPasswordEmail(opts: { email: string; name: string; resetPasswordCode: string }) {
    return new Promise(async (resolve, reject) => {
      console.log('You called reset password grpc!!');
      const { email, name, resetPasswordCode } = opts;
      const request = new SendResetPasswordEmailRequest();
      request.setEmail(email);
      request.setName(name);
      request.setResetpasswordcode(resetPasswordCode);

      this.grpcClient.sendResetPasswordEmail(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  }
}

export const mailerServiceGrpcClient = new MailerServiceGrpcClient(
  config.mailerService.grpc.host,
  config.mailerService.grpc.port,
);
