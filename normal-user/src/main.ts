import { config, validateEnvironmentVars } from './config/configuration';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { ErrorHandler, NotFoundError } from './common/error-handler';
import cookieParser from 'cookie-parser';
import { userRouter } from './modules/normal-user/controller/normal-user.controller';
import { dataSource } from './database/data-source';

async function main(): Promise<void> {
  validateEnvironmentVars();

  dataSource
    .initialize()
    .then(() => {
      console.log('Normal User Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Normal User Data Source initialization', err);
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
    res.send('EFISS Normal User Service is running!');
  });

  app.use('/', userRouter);

  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
  app.use(ErrorHandler.handle());

  app.listen(config.server.listenPort, () => {
    console.log(`EFISS Normal User Service is running on port ${config.server.listenPort}!`);
  });
}

main();
