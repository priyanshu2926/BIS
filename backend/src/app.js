/**
 * @file backend/src/app.js
 * Express Application Configuration.
 * Configures middleware, security, logging, CORS, routes, and error handling.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/env.js';
import apiRoutes from './routes/index.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

/**
 * 1. Security Headers
 */
app.use(helmet());

/**
 * 2. Cross-Origin Resource Sharing (CORS)
 * Configured specifically to authorize the frontend application URL.
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      config.FRONTEND_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ];

    if (allowedOrigins.includes(origin) || config.isDevelopment) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
app.use(cors(corsOptions));

/**
 * 3. Request Logging
 */
app.use(morgan(config.isDevelopment ? 'dev' : 'combined'));

/**
 * 4. Body Parsing Middleware
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * 5. Root Info Route
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'BIS AI Assistant Backend API',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

/**
 * 6. API v1 Routes
 */
app.use('/api/v1', apiRoutes);

/**
 * 7. 404 Unknown Route Handler
 */
app.use(notFoundMiddleware);

/**
 * 8. Centralized Global Error Handler
 */
app.use(errorMiddleware);

export default app;
