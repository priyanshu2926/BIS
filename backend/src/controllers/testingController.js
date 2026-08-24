/**
 * @file backend/src/controllers/testingController.js
 * Testing Labs Controller Layer.
 */

import testingService from '../services/testingService.js';
import { successResponse, paginatedResponse, errorResponse, parsePagination } from '../utils/apiResponse.js';

export const testingController = {
  /**
   * GET /api/v1/testing/labs or /api/v1/testing/laboratories
   */
  async getLabs(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { query, q, location } = req.query;
      const searchQuery = query || q;

      const { labs, total } = await testingService.getAllLabs({
        query: searchQuery,
        location,
        skip,
        take,
      });

      return paginatedResponse(res, labs, { page, limit, total });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/testing/labs/:id or /api/v1/testing/laboratories/:id
   */
  async getLabById(req, res, next) {
    try {
      const { id } = req.params;
      const lab = await testingService.getLabById(id);

      if (!lab) {
        return errorResponse(res, `Testing laboratory with ID '${id}' not found`, 404);
      }

      return successResponse(res, lab);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/testing/products
   */
  async getTestingProducts(req, res, next) {
    try {
      const products = await testingService.getTestingProducts();
      return successResponse(res, products);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/testing/standards
   */
  async getTestingStandards(req, res, next) {
    try {
      const standards = await testingService.getTestingStandards();
      return successResponse(res, standards);
    } catch (err) {
      next(err);
    }
  },
};

export default testingController;
