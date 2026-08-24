/**
 * @file backend/src/config/env.js
 * Centralized environment configuration loader.
 * Safely reads and validates environment variables with sensible defaults.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the backend root directory to reliably locate the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

// Load environment variables from .env
dotenv.config({ path: envPath });

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '5000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const config = Object.freeze({
  PORT: isNaN(PORT) ? 5000 : PORT,
  NODE_ENV,
  FRONTEND_URL,
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
  isTest: NODE_ENV === 'test',
});

export default config;
