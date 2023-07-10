import { createClient } from 'redis';
import { config } from '../../config/configuration';

export const redisClient = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
});
