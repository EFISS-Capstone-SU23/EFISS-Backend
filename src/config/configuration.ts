import * as dotenv from 'dotenv';
import { DatabaseType } from '../loaders/enums';

dotenv.config({ path: '.env' });

const REQUIRED_ENV_VARS = [
  'CRAWLER_DATABASE_HOST',
  'CRAWLER_DATABASE_PORT',
  'CRAWLER_DATABASE_NAME',
  'CRAWLER_DATABASE_USERNAME',
  'CRAWLER_DATABASE_PASSWORD',
  'REDIS_HOST',
  'REDIS_PORT',
  'SERVER_LISTEN_PORT',
  'AI_MODEL_BASE_API',
  'AI_SEARCHER_ROUTE',
  'SEARCH_MAXIMUM_RESULTS',
  'DATABASE_TYPE',
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_NAME',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'AUTH_JWT_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USERNAME',
  'SMTP_PASSWORD',
  'AUTH_VERIFY_EMAIL_EXPIRATION_IN_MS',
  'CLIENT_URL',
  'AUTH_RESET_PASSWORD_EXPIRATION_IN_MS',
  'AUTH_JWT_REFRESH_SECRET',
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
  crawlerDb: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
  };
  server: {
    listenPort: number;
    clientUrl: string;
  };
  ai: {
    baseApi: string;
    searcherRoute: string;
  };
  search: {
    maximumResults: number;
  };
  auth: {
    jwtSecret: string;
    verifyEmailExpiration: number;
    resetPasswordExpiration: number;
    refreshJwtSecret: string;
  };
  smtp: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

export const config: Configuration = {
  database: {
    type: (process.env.DATABASE_TYPE as DatabaseType) ?? DatabaseType.MYSQL,
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(String(process.env.DATABASE_PORT)) ?? 6039,
    name: process.env.DATABASE_NAME ?? 'efiss_backend',
    username: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? 'root',
  },
  crawlerDb: {
    host: process.env.CRAWLER_DATABASE_HOST ?? 'localhost',
    port: Number(String(process.env.CRAWLER_DATABASE_PORT)) ?? 27017,
    database: process.env.CRAWLER_DATABASE_NAME ?? 'efiss_backend',
    username: process.env.CRAWLER_DATABASE_USERNAME ?? '',
    password: process.env.CRAWLER_DATABASE_PASSWORD ?? '',
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(String(process.env.REDIS_PORT)) ?? 6379,
  },
  server: {
    listenPort: Number(String(process.env.SERVER_LISTEN_PORT)) ?? 3000,
    clientUrl: process.env.CLIENT_URL ?? 'http://localhost:3000',
  },
  ai: {
    baseApi: process.env.AI_MODEL_BASE_API ?? 'https://ai.efiss.tech',
    searcherRoute: process.env.AI_SEARCHER_ROUTE ?? '/predictions/image-retrieval-v1.0',
  },
  search: {
    maximumResults: Number(String(process.env.SEARCH_MAXIMUM_RESULTS)),
  },
  auth: {
    jwtSecret: String(process.env.AUTH_JWT_SECRET),
    verifyEmailExpiration: Number(String(process.env.AUTH_VERIFY_EMAIL_EXPIRATION_IN_MS)) ?? 86400000, // 24 hours (in milliseconds)
    resetPasswordExpiration: Number(String(process.env.AUTH_RESET_PASSWORD_EXPIRATION_IN_MS)) ?? 900000, // 15 minutes (in milliseconds)
    refreshJwtSecret: String(process.env.AUTH_JWT_REFRESH_SECRET),
  },
  smtp: {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(String(process.env.SMTP_PORT)) ?? 587,
    username: process.env.SMTP_USERNAME ?? '',
    password: process.env.SMTP_PASSWORD ?? '',
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
