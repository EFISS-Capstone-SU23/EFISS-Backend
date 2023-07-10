import { rateLimit } from 'express-rate-limit';

export const searchLimiter = rateLimit({
  windowMs: 60 * 1000 * 15, // 15 minutes,
  max: 15,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  headers: true,
});
