/**
 * @file backend/src/controllers/healthController.js
 * Controller handling health check and system status requests.
 */

import config from '../config/env.js';

/**
 * Health check handler returning dynamic API status, environment, and timestamp.
 * @route GET /api/v1/health
 * @access Public
 */
export const getHealthStatus = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'BIS Assistant API is running',
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
};
