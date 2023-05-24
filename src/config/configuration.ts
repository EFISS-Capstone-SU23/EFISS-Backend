import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const REQUIRED_ENV_VARS = [
	'MONGODB_HOST',
	'MONGODB_DATABASE',
	'REDIS_HOST',
	'REDIS_PORT',
	'SERVER_LISTEN_PORT',
	'AI_MODEL_BASE_API',
	'AI_SEARCHER_ROUTE',
	'SEARCH_MAXIMUM_RESULTS'
]

interface Configuration {
	mongodb: {
		host: string
		port: number
		database: string
		username: string
		password: string
	}
	redis: {
		host: string
		port: number
	}
	server: {
		listenPort: number
	}
	ai: {
		baseApi: string
		searcherRoute: string
	}
	search: {
		maximumResults: number
	}
}

export const config: Configuration = {
	mongodb: {
		host: process.env.MONGODB_HOST ?? 'localhost',
		port: Number(String(process.env.MONGODB_PORT)) ?? 27017,
		database: process.env.MONGODB_DATABASE ?? 'efiss_backend',
		username: process.env.MONGODB_USERNAME ?? '',
		password: process.env.MONGODB_PASSWORD ?? ''
	},
	redis: {
		host: process.env.REDIS_HOST ?? 'localhost',
		port: Number(String(process.env.REDIS_PORT)) ?? 6379
	},
	server: {
		listenPort: Number(String(process.env.SERVER_LISTEN_PORT)) ?? 3000
	},
	ai: {
		baseApi: process.env.AI_MODEL_BASE_API ?? 'https://ai.efiss.tech',
		searcherRoute:
      process.env.AI_SEARCHER_ROUTE ?? '/predictions/image-retrieval-v1.0'
	},
	search: {
		maximumResults: Number(String(process.env.SEARCH_MAXIMUM_RESULTS))
	}
}

export const validateEnvironmentVars = (): void => {
	const missingRequiredEnvVars: string[] = []
	REQUIRED_ENV_VARS.forEach((envVar) => {
		if (!(envVar in process.env)) missingRequiredEnvVars.push(envVar)
	})
	if (missingRequiredEnvVars.length !== 0) {
		throw new Error(
			`Missing required environment variables: [${missingRequiredEnvVars.join(', ')}]`
		)
	}
}
