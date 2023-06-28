import * as grpc from '@grpc/grpc-js';
import { config } from '../../../config/configuration';
import { MailerServiceClient } from '../../../proto/mailer_grpc_pb';
import { SendResetPasswordEmailRequest, SendVerificationEmailRequest } from '../../../proto/mailer_pb';

export class MailerService {
  private mailerServiceClient: MailerServiceClient;
  constructor(private readonly grpcHost: string, private readonly grpcPort: number) {
    this.mailerServiceClient = new MailerServiceClient(`${grpcHost}:${grpcPort}`, grpc.credentials.createInsecure());
  }

  async sendVerificationEmail(opts: { email: string; name: string; verificationCode: string }) {
    return new Promise(async (resolve, reject) => {
      const { email, name, verificationCode } = opts;
      const request = new SendVerificationEmailRequest();
      request.setEmail(email);
      request.setName(name);
      request.setVerificationcode(verificationCode);

      this.mailerServiceClient.sendVerificationEmail(request, (err, response) => {
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
      const { email, name, resetPasswordCode } = opts;
      const request = new SendResetPasswordEmailRequest();
      request.setEmail(email);
      request.setName(name);
      request.setResetpasswordcode(resetPasswordCode);

      this.mailerServiceClient.sendResetPasswordEmail(request, (err, response) => {
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

export const mailerService = new MailerService(config.mailerService.grpc.host, config.mailerService.grpc.port);
