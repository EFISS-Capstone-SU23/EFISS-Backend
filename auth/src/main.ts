/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import { dataSource } from './database/data-source';
import { authRouter } from './modules/auth/controllers/auth.controller';
import cors from 'cors';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { ErrorHandler, NotFoundError } from './common/error-handler';
import cookieParser from 'cookie-parser';
import * as grpc from '@grpc/grpc-js';
import { AuthServiceService } from './proto/auth_grpc_pb';
import { checkAccountPermission, checkJwt } from './proto/auth.proto';

async function main(): Promise<void> {
  //   validateEnvironmentVars();

  dataSource
    .initialize()
    .then(() => {
      console.log('Auth Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Auth Data Source initialization', err);
    });

  const app = express();
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: '50mb',
      extended: true,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());

  app.get('/health', (req, res) => {
    console.log('Received Health check');
    res.send('OK');
  });

  app.get('/', (req, res) => {
    res.send('EFISS Auth Service is running!');
  });

  app.use('/', authRouter);

  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
  app.use(ErrorHandler.handle());

  app.listen(config.server.listenPort, () => {
    console.log(`EFISS Auth Service is running on port ${config.server.listenPort}!`);
  });

  // gRPC
  const server = new grpc.Server();
  server.addService(AuthServiceService, {
    checkJwt,
    checkAccountPermission,
  });
  server.bindAsync(`0.0.0.0:${config.grpc.listenPort}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
