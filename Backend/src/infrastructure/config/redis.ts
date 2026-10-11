import Redis from 'ioredis';
import { env } from './env';

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    // Retry with incremental backoff, capping at 3 seconds
    const delay = Math.min(times * 200, 3000);
    if (times > 10) {
      console.warn('⚠️ [Redis] Retry limit reached. Operations will fail gracefully without crashing.');
      return null; // Stop retrying after 10 attempts
    }
    return delay;
  },
  reconnectOnError(err) {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      return true;
    }
    return false;
  },
  enableOfflineQueue: true,
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully');
});

redisClient.on('ready', () => {
  console.log('Redis client is ready');
});

redisClient.on('error', (err) => {
  console.warn('⚠️ [Redis Warning]:', err.message || err);
});
