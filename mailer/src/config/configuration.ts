import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.mailer' });

const REQUIRED_ENV_VARS = ['GRPC_LISTEN_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'REDIS_HOST', 'REDIS_PORT'];

interface Configuration {
  grpc: {
    listenPort: number;
  };
  smtp: {
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
  };
}

export const config: Configuration = {
  grpc: {
    listenPort: Number(String(process.env.GRPC_LISTEN_PORT)) ?? 50051,
  },
  smtp: {
    username: process.env.SMTP_USERNAME ?? '',
    password: process.env.SMTP_PASSWORD ?? '',
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'redis',
    port: Number(String(process.env.REDIS_PORT)) ?? 6379,
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
