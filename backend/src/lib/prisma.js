/**
 * @file backend/src/lib/prisma.js
 * Prisma Client singleton with PGlite auto-start and availability caching.
 */

import { PrismaClient } from '@prisma/client';
import { startPostgresServer } from '../../scripts/startPostgres.js';
import config from '../config/env.js';

// Auto-start local PostgreSQL wire server when using localhost on port 5432 (skip in tests)
if (
  !config.isTest &&
  (config.DATABASE_URL.includes('127.0.0.1:5432') || config.DATABASE_URL.includes('localhost:5432'))
) {
  try {
    await startPostgresServer(5432);
  } catch (err) {
    console.warn('[Database] Local server startup notice:', err.message);
  }
}

const prismaClientSingleton = () =>
  new PrismaClient({
    log: config.isDevelopment ? ['warn', 'error'] : ['error'],
  });

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

let dbAvailable = null;
let lastCheckTime = 0;

export const isDatabaseAvailable = async () => {
  if (config.isTest) {
    dbAvailable = false;
    return false;
  }
  const now = Date.now();
  if (dbAvailable !== null && now - lastCheckTime < 30000) {
    return dbAvailable;
  }
  lastCheckTime = now;
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 400)
    );
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise]);
    dbAvailable = true;
  } catch {
    dbAvailable = false;
  }
  return dbAvailable;
};

export default prisma;
