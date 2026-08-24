/**
 * @file backend/src/services/standardsService.js
 * Standards Service Layer.
 * Interacts with PostgreSQL database through Prisma ORM.
 */

import prisma from '../config/prisma.js';

export const standardsService = {
  /**
   * Retrieve paginated list of standards with optional filtering
   */
  async getAllStandards({ query, category, status, skip = 0, take = 20 } = {}) {
    const where = {};

    if (category && category !== 'All') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (status && status !== 'All') {
      where.status = { equals: status, mode: 'insensitive' };
    }

    if (query && query.trim()) {
      const q = query.trim();
      where.OR = [
        { standardNumber: { contains: q, mode: 'insensitive' } },
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [standards, total] = await Promise.all([
      prisma.standard.findMany({
        where,
        skip,
        take,
        orderBy: { standardNumber: 'asc' },
        include: {
          certifications: true,
        },
      }),
      prisma.standard.count({ where }),
    ]);

    return { standards, total };
  },

  /**
   * Search standards across standardNumber, title, and category
   */
  async searchStandards(searchTerm, { category, skip = 0, take = 20 } = {}) {
    const where = {};

    if (category && category !== 'All') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (searchTerm && searchTerm.trim()) {
      const q = searchTerm.trim();
      where.OR = [
        { standardNumber: { contains: q, mode: 'insensitive' } },
        { title: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [standards, total] = await Promise.all([
      prisma.standard.findMany({
        where,
        skip,
        take,
        orderBy: { standardNumber: 'asc' },
        include: {
          certifications: true,
        },
      }),
      prisma.standard.count({ where }),
    ]);

    return { standards, total };
  },

  /**
   * Get single standard by ID or standardNumber
   */
  async getStandardById(id) {
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      return id ? prisma.standard.findFirst({ where: { standardNumber: { equals: id, mode: 'insensitive' } }, include: { certifications: true } }) : null;
    }

    let standard = await prisma.standard.findUnique({
      where: { id },
      include: {
        certifications: true,
      },
    });

    return standard;
  },

  /**
   * Get distinct categories
   */
  async getCategories() {
    const standards = await prisma.standard.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return standards.map((s) => s.category).filter(Boolean);
  },

  /**
   * Get distinct product categories
   */
  async getProductCategories() {
    const products = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return products.map((p) => p.category).filter(Boolean);
  },
};

export default standardsService;
