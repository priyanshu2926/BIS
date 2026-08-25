/**
 * @file backend/src/config/prisma.js
 * Centralized Prisma Client singleton instance and database lifecycle management.
 */

import { PrismaClient } from '@prisma/client';
import { startPostgresServer } from '../../scripts/startPostgres.js';
import config from './env.js';

// Auto-start local PostgreSQL wire server if using localhost/127.0.0.1 on port 5432
if (config.DATABASE_URL.includes('127.0.0.1:5432') || config.DATABASE_URL.includes('localhost:5432')) {
  try {
    await startPostgresServer(5432);
  } catch (err) {
    console.warn('[Database] Local server startup notice:', err.message);
  }
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: config.isDevelopment ? ['warn', 'error'] : ['error'],
  });
};

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
