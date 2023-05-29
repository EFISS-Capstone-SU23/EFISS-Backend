/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import { MongodbHelper } from './database/mongodb.db';
import express, { NextFunction } from 'express';
import { searchRouter } from './modules/search/search.controller';
import bodyParser from 'body-parser';
import { BEDataSource } from './database/datasource';
import { authRouter } from './modules/auth/auth.controller';
import cors from 'cors';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { ErrorHandler, NotFoundError } from './common/error-handler';
import cookieParser from 'cookie-parser';

async function main(): Promise<void> {
  validateEnvironmentVars();
  const mongodbHelper = new MongodbHelper(
    config.crawlerDb.host,
    config.crawlerDb.port,
    config.crawlerDb.database,
    config.crawlerDb.username,
    config.crawlerDb.password,
  );
  await mongodbHelper.connect();

  BEDataSource.initialize()
    .then(() => {
      console.log('Backend Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Backend Data Source initialization', err);
    });

  // const redisService = await RedisService.init(
  //   config.redis.host,
  //   config.redis.port
  // );

  const app = express();
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/mail/templates`);
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
    res.send('Welcome to EFISS Backend');
  });

  app.use('/search', searchRouter);
  app.use('/auth', authRouter);

  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
  app.use(ErrorHandler.handle());

  app.listen(config.server.listenPort, '0.0.0.0', () => {
    console.log(`EFISS Backend is running on port ${config.server.listenPort}!`);
  });
}

main();
