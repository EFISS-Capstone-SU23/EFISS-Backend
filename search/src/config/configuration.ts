import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.search' });

const REQUIRED_ENV_VARS = [
  'LISTEN_PORT',
  'AI_MODEL_BASE_API',
  'AI_SEARCHER_ROUTE',
  'SEARCH_MAXIMUM_RESULTS',
  'PRODUCT_SERVICE_GRPC_HOST',
  'PRODUCT_SERVICE_GRPC_PORT',
  'PRODUCT_DATABASE_HOST',
  'PRODUCT_DATABASE_PORT',
  'PRODUCT_DATABASE_USERNAME',
  'PRODUCT_DATABASE_NAME',
  'PRODUCT_DATABASE_PASSWORD',
];

interface Configuration {
  server: {
    listenPort: number;
  };
  ai: {
    baseApi: string;
    searcherRoute: string;
  };
  productService: {
    grpc: {
      host: string;
      port: number;
    };
    database: {
      host: string;
      port: number;
      username: string;
      name: string;
      password: string;
    };
  };
  search: {
    maximumResults: number;
  };
}

export const config: Configuration = {
  server: {
    listenPort: Number(String(process.env.LISTEN_PORT)) ?? 3001,
  },
  ai: {
    baseApi: process.env.AI_MODEL_BASE_API ?? 'https://ai.efiss.tech',
    searcherRoute: process.env.AI_SEARCHER_ROUTE ?? '/predictions/image-retrieval-v1.0',
  },
  productService: {
    grpc: {
      host: process.env.PRODUCT_SERVICE_GRPC_HOST ?? 'localhost',
      port: Number(String(process.env.PRODUCT_SERVICE_GRPC_PORT)) ?? 50051,
    },
    database: {
      host: process.env.PRODUCT_DATABASE_HOST ?? 'localhost',
      port: Number(String(process.env.PRODUCT_DATABASE_PORT)) ?? 27017,
      username: process.env.PRODUCT_DATABASE_USERNAME ?? 'root',
      name: process.env.PRODUCT_DATABASE_NAME ?? 'efiss',
      password: process.env.PRODUCT_DATABASE_PASSWORD ?? 'root',
    },
  },
  search: {
    maximumResults: Number(String(process.env.SEARCH_MAXIMUM_RESULTS)) ?? 10,
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
