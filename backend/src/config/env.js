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
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bis_assistant';

const LLM_PROVIDER = process.env.LLM_PROVIDER || 'mock';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_MODEL = process.env.LLM_MODEL || 'gemini-1.5-flash';
const LLM_TIMEOUT = parseInt(process.env.LLM_TIMEOUT || '15000', 10);
const ASSISTANT_TOP_K = parseInt(process.env.ASSISTANT_TOP_K || '6', 10);
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '60', 10);

export const config = Object.freeze({
  PORT: isNaN(PORT) ? 5000 : PORT,
  NODE_ENV,
  FRONTEND_URL,
<<<<<<< HEAD
  LLM_PROVIDER,
  LLM_API_KEY,
  LLM_MODEL,
  LLM_TIMEOUT: isNaN(LLM_TIMEOUT) ? 15000 : LLM_TIMEOUT,
  ASSISTANT_TOP_K: isNaN(ASSISTANT_TOP_K) ? 6 : ASSISTANT_TOP_K,
  RATE_LIMIT_WINDOW_MS: isNaN(RATE_LIMIT_WINDOW_MS) ? 60000 : RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: isNaN(RATE_LIMIT_MAX) ? 60 : RATE_LIMIT_MAX,
=======
  DATABASE_URL,
>>>>>>> ed99aa5029fb2b3f561ad1cc7dee8cdb621096d5
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
  isTest: NODE_ENV === 'test',
});

export default config;
