import * as dotenv from 'dotenv';
import { DatabaseType } from '../loaders/enums';

dotenv.config({ path: '.env.normal-user' });

const REQUIRED_ENV_VARS = [
  'LISTEN_PORT',
  'DATABASE_TYPE',
  'DATABASE_HOST',
  'DATABASE_NAME',
  'DATABASE_PORT',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'PRODUCT_SERVICE_GRPC_HOST',
  'PRODUCT_SERVICE_GRPC_PORT',
  'AUTH_SERVICE_GRPC_HOST',
  'AUTH_SERVICE_GRPC_PORT',
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
  };
  grpc: {
    listenPort: number;
  };
  productService: {
    grpc: {
      host: string;
      port: number;
    };
  };
  authService: {
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
  },
  grpc: {
    listenPort: Number(String(process.env.GRPC_LISTEN_PORT)) ?? 50051,
  },
  productService: {
    grpc: {
      host: process.env.PRODUCT_SERVICE_GRPC_HOST ?? 'localhost',
      port: Number(String(process.env.PRODUCT_SERVICE_GRPC_PORT)) ?? 50051,
    },
  },
  authService: {
    grpc: {
      host: process.env.AUTH_SERVICE_GRPC_HOST ?? 'localhost',
      port: Number(String(process.env.AUTH_SERVICE_GRPC_PORT)) ?? 50050,
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
