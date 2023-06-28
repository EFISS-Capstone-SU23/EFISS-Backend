import * as dotenv from 'dotenv';
import { DatabaseType } from '../loaders/enums';

dotenv.config({ path: '.env.auth' });

const REQUIRED_ENV_VARS = [
  'LISTEN_PORT',
  'CLIENT_URL',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'JWT_ACCESS_EXPIRES_IN',
  'JWT_REFRESH_EXPIRES_IN',
  'DATABASE_TYPE',
  'DATABASE_HOST',
  'DATABASE_NAME',
  'DATABASE_PORT',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'VERIFY_EMAIL_TOKEN_EXPIRES_IN_MS',
  'RESET_PASSWORD_TOKEN_EXPIRES_IN_MS',
  'GRPC_LISTEN_PORT',
  'MAILER_SERVICE_GRPC_HOST',
  'MAILER_SERVICE_GRPC_PORT',
];

interface Configuration {
  database: {
    type: DatabaseType;
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  server: {
    listenPort: number;
    clientUrl: string;
  };
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiration: string;
    refreshExpiration: string;
  };
  token: {
    verifyEmailExpirationInMs: number;
    resetPasswordExpirationInMs: number;
  };
  grpc: {
    listenPort: number;
  };
  mailerService: {
    grpc: {
      host: string;
      port: number;
    };
  };
}

export const config: Configuration = {
  database: {
    type: (process.env.DATABASE_TYPE as DatabaseType) ?? DatabaseType.MYSQL,
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(String(process.env.DATABASE_PORT)) ?? 6039,
    name: process.env.DATABASE_NAME ?? 'efiss_auth',
    username: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? 'root',
  },
  server: {
    listenPort: Number(String(process.env.LISTEN_PORT)) ?? 3001,
    clientUrl: process.env.CLIENT_URL ?? 'http://localhost:3000',
  },
  jwt: {
    accessExpiration: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
    accessSecret: String(process.env.JWT_ACCESS_SECRET),
    refreshSecret: String(process.env.JWT_REFRESH_SECRET),
  },
  token: {
    verifyEmailExpirationInMs: Number(String(process.env.VERIFY_EMAIL_TOKEN_EXPIRES_IN_MS)) ?? 1000 * 60 * 60 * 24,
    resetPasswordExpirationInMs: Number(String(process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN_MS)) ?? 1000 * 60 * 15,
  },
  grpc: {
    listenPort: Number(String(process.env.GRPC_LISTEN_PORT)) ?? 50050,
  },
  mailerService: {
    grpc: {
      host: process.env.MAILER_SERVICE_GRPC_HOST ?? 'localhost',
      port: Number(String(process.env.MAILER_SERVICE_GRPC_PORT)) ?? 50055,
    },
  },
};

export const validateEnvironmentVars = (): void => {
  const missingRequiredEnvVars: string[] = [];
  REQUIRED_ENV_VARS.forEach((envVar) => {
    if (!(envVar in process.env)) missingRequiredEnvVars.push(envVar);
  });
  if (missingRequiredEnvVars.length !== 0) {
    throw new Error(`Missing required environment variables: [${missingRequiredEnvVars.join(', ')}]`);
  }
};
