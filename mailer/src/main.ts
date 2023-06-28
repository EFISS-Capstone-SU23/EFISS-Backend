/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import * as grpc from '@grpc/grpc-js';
import { MailerServiceService } from './proto/mailer_grpc_pb';
import { sendResetPasswordEmail, sendVerificationEmail } from './proto/mailer.proto';

async function main(): Promise<void> {
  validateEnvironmentVars();

  // gRPC
  const server = new grpc.Server();
  server.addService(MailerServiceService, {
    sendVerificationEmail,
    sendResetPasswordEmail,
  });
  server.bindAsync(`0.0.0.0:${config.grpc.listenPort}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log('Mailer Service is running');
    server.start();
  });
}

main();
