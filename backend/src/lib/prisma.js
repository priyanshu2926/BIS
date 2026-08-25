/**
 * @file backend/src/lib/prisma.js
 * Prisma Client instance with non-blocking connection availability caching.
 */

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

let dbAvailable = null;
let lastCheckTime = 0;

export const isDatabaseAvailable = async () => {
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
