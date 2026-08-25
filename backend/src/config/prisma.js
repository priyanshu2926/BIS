/**
 * @file backend/src/config/prisma.js
 * Re-exports the shared Prisma client singleton from lib/prisma.js.
 */

export { prisma, isDatabaseAvailable, default } from '../lib/prisma.js';
