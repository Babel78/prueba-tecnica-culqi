import { createClient } from 'redis';

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
});
