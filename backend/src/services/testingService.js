/**
 * @file backend/src/services/testingService.js
 * Testing Labs Service Layer.
 */

import prisma from '../config/prisma.js';

export const testingService = {
  /**
   * Retrieve paginated list of testing labs
   */
  async getAllLabs({ query, location, skip = 0, take = 20 } = {}) {
    const where = {};

    if (location && location !== 'All') {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (query && query.trim()) {
      const q = query.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
        { address: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [labs, total] = await Promise.all([
      prisma.testingLab.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      prisma.testingLab.count({ where }),
    ]);

    return { labs, total };
  },

  /**
   * Retrieve single testing lab by ID
   */
  async getLabById(id) {
    if (!id) return null;

    return prisma.testingLab.findUnique({
      where: { id },
    });
  },

  /**
   * Helper to retrieve products available for testing
   */
  async getTestingProducts() {
    return prisma.product.findMany({
      orderBy: { name: 'asc' },
    });
  },

  /**
   * Helper to retrieve standards applicable for testing
   */
  async getTestingStandards() {
    return prisma.standard.findMany({
      orderBy: { standardNumber: 'asc' },
    });
  },
};

export default testingService;
