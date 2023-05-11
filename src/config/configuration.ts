import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const REQUIRED_ENV_VARS = [
  "MONGODB_HOST",
  "MONGODB_DATABASE",
  "REDIS_HOST",
  "REDIS_PORT",
  "SERVER_LISTEN_PORT",
  "AI_MODEL_BASE_API",
  "AI_SEARCHER_ROUTE",
];

interface Configuration {
  mongodb: {
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
  };
  ai: {
    baseApi: string;
    searcherRoute: string;
  };
}

export const config: Configuration = {
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: +process.env.MONGODB_PORT || undefined,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  },
  server: {
    listenPort: +process.env.SERVER_LISTEN_PORT,
  },
  ai: {
    baseApi: process.env.AI_MODEL_BASE_API,
    searcherRoute: process.env.AI_SEARCHER_ROUTE,
  },
};

export const validateEnvironmentVars = (): void => {
  const missingRequiredEnvVars = [];
  REQUIRED_ENV_VARS.forEach((envVar) => {
    if (!process.env[envVar]) missingRequiredEnvVars.push(envVar);
  });
  if (missingRequiredEnvVars.length != 0)
    throw new Error(
      `Missing required environment variables: [${missingRequiredEnvVars}]`
    );
};
