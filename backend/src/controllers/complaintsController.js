import prisma from '../config/prisma.js';
import { errorResponse, paginatedResponse, parsePagination, successResponse } from '../utils/apiResponse.js';

const uuidPattern = /^[0-9a-f-]{36}$/i;

export const complaintsController = {
  async list(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const where = {};
      if (req.query.status) where.status = req.query.status;
      const [data, total] = await Promise.all([
        prisma.complaint.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, include: { user: true, product: true } }),
        prisma.complaint.count({ where }),
      ]);
      return paginatedResponse(res, data, { page, limit, total });
    } catch (err) {
      return next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = uuidPattern.test(id)
        ? await prisma.complaint.findUnique({ where: { id }, include: { user: true, product: true } })
        : null;
      if (!data) return errorResponse(res, `Complaint with ID '${id}' not found`, 404);
      return successResponse(res, data);
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { description, userId, productId } = req.body || {};
      const errors = {};
      if (typeof description !== 'string' || !description.trim()) errors.description = 'Description is required';
      if (userId !== undefined && (!uuidPattern.test(userId))) errors.userId = 'userId must be a valid ID';
      if (productId !== undefined && (!uuidPattern.test(productId))) errors.productId = 'productId must be a valid ID';
      if (Object.keys(errors).length) return errorResponse(res, 'Invalid complaint data', 400, errors);

      if (userId && !(await prisma.user.findUnique({ where: { id: userId } }))) {
        return errorResponse(res, `User with ID '${userId}' not found`, 400);
      }
      if (productId && !(await prisma.product.findUnique({ where: { id: productId } }))) {
        return errorResponse(res, `Product with ID '${productId}' not found`, 400);
      }

      const data = await prisma.complaint.create({
        data: { description: description.trim(), ...(userId ? { userId } : {}), ...(productId ? { productId } : {}) },
        include: { user: true, product: true },
      });
      return successResponse(res, data, 201);
    } catch (err) {
      return next(err);
    }
  },
};

export default complaintsController;