/**
 * @file backend/src/middleware/notFoundMiddleware.js
 * Catch-all middleware for 404 Not Found routes.
 */

export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default notFoundMiddleware;
