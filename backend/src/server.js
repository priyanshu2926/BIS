/**
 * @file backend/src/server.js
 * HTTP Server Entry Point.
 * Starts the Express application on the configured port with graceful shutdown handlers.
 */

import app from './app.js';
import config from './config/env.js';

const server = app.listen(config.PORT, () => {
  console.log('====================================================');
  console.log('  BIS AI Assistant Backend API — Phase 0');
  console.log('====================================================');
  console.log(`  Environment  : ${config.NODE_ENV}`);
  console.log(`  Server Port  : ${config.PORT}`);
  console.log(`  Frontend URL : ${config.FRONTEND_URL}`);
  console.log(`  Health Check : http://localhost:${config.PORT}/api/v1/health`);
  console.log('====================================================');
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[CRITICAL] Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle termination signals for graceful shutdown
const handleShutdown = (signal) => {
  console.log(`\n[INFO] Received ${signal}. Gracefully shutting down...`);
  server.close(() => {
    console.log('[INFO] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
