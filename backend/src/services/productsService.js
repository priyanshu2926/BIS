/**
 * @file backend/src/services/productsService.js
 * Products Service Layer.
 */

import prisma from '../config/prisma.js';

export const productsService = {
  /**
   * Retrieve paginated list of products with optional query and category filters
   */
  async getAllProducts({ query, category, skip = 0, take = 20 } = {}) {
    const where = {};

    if (category && category !== 'All') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (query && query.trim()) {
      const q = query.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { manufacturer: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: {
          certifications: {
            include: {
              standard: true,
            },
          },
          complianceChecks: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  },

  /**
   * Search products by query term
   */
  async searchProducts(searchTerm, { skip = 0, take = 20 } = {}) {
    const where = {};

    if (searchTerm && searchTerm.trim()) {
      const q = searchTerm.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { manufacturer: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: {
          certifications: {
            include: {
              standard: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  },

  /**
   * Retrieve single product by ID
   */
  async getProductById(id) {
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;

    return prisma.product.findUnique({
      where: { id },
      include: {
        certifications: {
          include: {
            standard: true,
          },
        },
        complianceChecks: true,
        complaints: true,
      },
    });
  },
};

export default productsService;
