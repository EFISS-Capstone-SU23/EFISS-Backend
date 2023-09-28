import { createClient } from 'redis';
import { config } from '../../config/configuration';

const retry_strategy = function(options) {
    if (options.error && (options.error.code === 'ECONNREFUSED' || options.error.code === 'NR_CLOSED')) {
        // Try reconnecting after 5 seconds
        console.error('The server refused the connection. Retrying connection...');
        return 500;
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands with an individual error
        return new Error('Retry time exhausted');
    }
    if (options.attempt > 50) {
        // End reconnecting with built in error
        return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
}

export const redisClient = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`, 
  socket: {
      reconnectStrategy: retries => Math.min(retries * 100, 3000)
  }
});
