/**
 * @file backend/src/middleware/rateLimitMiddleware.js
 * Lightweight sliding-window rate limiter middleware for Assistant API protection.
 */

import config from '../config/env.js';

const requestCounts = new Map();

/**
 * Cleanup expired IP records periodically to prevent memory leaks.
 */
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requestCounts.entries()) {
    const valid = timestamps.filter((t) => now - t < config.RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      requestCounts.delete(ip);
    } else {
      requestCounts.set(ip, valid);
    }
  }
}, 60000);
cleanupTimer.unref();

/**
 * Rate limit middleware.
 */
export const assistantRateLimiter = (req, res, next) => {
  // Bypass rate limiting in test environment
  if (config.isTest) return next();

  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const history = requestCounts.get(ip) || [];
  const windowStart = now - config.RATE_LIMIT_WINDOW_MS;
  const recent = history.filter((t) => t > windowStart);

  if (recent.length >= config.RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      message: 'Too many assistant requests. Please wait a moment before trying again.',
    });
  }

  recent.push(now);
  requestCounts.set(ip, recent);
  next();
};

export default assistantRateLimiter;
