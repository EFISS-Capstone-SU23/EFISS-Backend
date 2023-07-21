/* eslint-disable @typescript-eslint/no-floating-promises */
import { config, validateEnvironmentVars } from './config/configuration';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { ErrorHandler, NotFoundError } from './common/error-handler';
import cookieParser from 'cookie-parser';
import { MongodbHelper } from './database/mongodb.db';
import { productRouter } from './modules/products/controllers/products.controller';
import * as grpc from '@grpc/grpc-js';
import { getProductsByIds, searchByImage } from './proto/product.proto';
import { ProductServiceService } from './proto/product_grpc_pb';

async function main(): Promise<void> {
  //  validateEnvironmentVars();

  const mongodbHelper = new MongodbHelper(
    config.database.host,
    config.database.port,
    config.database.name,
    config.database.username,
    config.database.password,
  );
  await mongodbHelper.connect();

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
    res.send('Products Service is running!');
  });

  app.use('/', productRouter);

  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
  app.use(ErrorHandler.handle());

  app.listen(config.server.listenPort, () => {
    console.log(`EFISS Product Service is running on port ${config.server.listenPort}!`);
  });

  // gRPC
  const server = new grpc.Server();
  server.addService(ProductServiceService, { searchByImage, getProductsByIds });
  server.bindAsync(`0.0.0.0:${config.grpc.listenPort}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
