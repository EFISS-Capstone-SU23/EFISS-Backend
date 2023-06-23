import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.gateway' });

const REQUIRED_ENV_VARS = [
  'GATEWAY_LISTEN_PORT',
  'AUTH_SERVICE_HOST',
  'AUTH_SERVICE_PORT',
  'AUTH_SERVICE_PATH',
  'PRODUCT_SERVICE_HOST',
  'PRODUCT_SERVICE_PORT',
  'PRODUCT_SERVICE_PATH',
];

interface Configuration {
  gateway: {
    listenPort: number;
  };
  authService: {
    host: string;
    port: number;
    path: string;
  };
  productService: {
    host: string;
    port: number;
    path: string;
  };
}

export const config: Configuration = {
  gateway: {
    listenPort: parseInt(process.env.GATEWAY_LISTEN_PORT as string, 10) ?? 3000,
  },
  authService: {
    host: (process.env.AUTH_SERVICE_HOST as string) ?? 'localhost',
    port: parseInt(process.env.AUTH_SERVICE_PORT as string, 10) ?? 3001,
    path: (process.env.AUTH_SERVICE_PATH as string) ?? 'auth',
  },
  productService: {
    host: (process.env.PRODUCT_SERVICE_HOST as string) ?? 'localhost',
    port: parseInt(process.env.PRODUCT_SERVICE_PORT as string, 10) ?? 3002,
    path: (process.env.PRODUCT_SERVICE_PATH as string) ?? 'products',
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
