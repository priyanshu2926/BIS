/**
 * @file backend/src/middleware/errorMiddleware.js
 * Centralized error handling middleware.
 * Catches application errors, JSON parse failures, and unexpected server issues.
 */

import config from '../config/env.js';

export const errorMiddleware = (err, req, res, next) => {
  // Handle malformed JSON body errors from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload in request body',
    });
  }

  // Determine status code (default to 500 if not previously set or valid)
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : err.statusCode || err.status || 500;

  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Include stack trace only in development environment
  if (config.isDevelopment && err.stack) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorMiddleware;
