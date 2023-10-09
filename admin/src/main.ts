/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { ErrorHandler, NotFoundError } from './common/error-handler';
import cookieParser from 'cookie-parser';
import { dataSource } from './database/data-source';
import { adminRouter } from './modules/admin/controllers/admin.controller';

async function main(): Promise<any>{
    validateEnvironmentVars();

  dataSource
    .initialize()
    .then(() => {
      console.log('Admin Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Admin Data Source initialization', err);
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
    res.send('EFISS Admin Service is running!');
  });

  app.use('/', adminRouter);

  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
  app.use(ErrorHandler.handle());

  return app;
}

let app = main();

export default app;