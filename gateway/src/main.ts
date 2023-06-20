/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { validateEnvironmentVars, config } from './config/configuration';
import proxy from 'express-http-proxy';

async function main(): Promise<void> {
  validateEnvironmentVars();

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
    res.send('Welcome to EFISS Backend Gateway');
  });

  app.use(config.authService.path, proxy(`${config.authService.host}:${config.authService.port}}`));

  app.listen(config.gateway.listenPort, '0.0.0.0', () => {
    console.log(`EFISS Backend Gateway is running on port ${config.gateway.listenPort}!`);
  });
}

main();
