/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import { MongodbHelper } from './database/mongodb.db';
import express from 'express';
import { searchRouter } from './modules/search/search.controller';
import bodyParser from 'body-parser';
import { BEDataSource } from './database/datasource';

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
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: '50mb',
      extended: true,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));

  app.get('/health', (req, res) => {
    console.log('Received Health check');
    res.send('OK');
  });

  app.get('/', (req, res) => {
    res.send('Welcome to EFISS Backend');
  });

  app.use('/search', searchRouter);

  app.listen(config.server.listenPort, '0.0.0.0', () => {
    console.log(`EFISS Backend is running on port ${config.server.listenPort}!`);
  });
}

main();
