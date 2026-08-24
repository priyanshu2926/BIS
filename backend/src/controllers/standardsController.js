/**
 * @file backend/src/controllers/standardsController.js
 * Standards Controller Layer.
 * Handles HTTP request validation, invokes standardsService, and sends formatted responses.
 */

import standardsService from '../services/standardsService.js';
import { successResponse, paginatedResponse, errorResponse, parsePagination } from '../utils/apiResponse.js';

export const standardsController = {
  /**
   * GET /api/v1/standards
   */
  async getStandards(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { query, q, category, status } = req.query;
      const searchQuery = query || q;

      const { standards, total } = await standardsService.getAllStandards({
        query: searchQuery,
        category,
        status,
        skip,
        take,
      });

      return paginatedResponse(res, standards, { page, limit, total });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/standards/search?q=
   */
  async searchStandards(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { q, query, category } = req.query;
      const searchTerm = q || query || '';

      const { standards, total } = await standardsService.searchStandards(searchTerm, {
        category,
        skip,
        take,
      });

      return paginatedResponse(res, standards, { page, limit, total });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/standards/:id
   */
  async getStandardById(req, res, next) {
    try {
      const { id } = req.params;
      const standard = await standardsService.getStandardById(id);

      if (!standard) {
        return errorResponse(res, `Standard with ID '${id}' not found`, 404);
      }

      return successResponse(res, standard);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/standards/categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await standardsService.getCategories();
      return successResponse(res, categories);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/standards/product-categories
   */
  async getProductCategories(req, res, next) {
    try {
      const productCategories = await standardsService.getProductCategories();
      return successResponse(res, productCategories);
    } catch (err) {
      next(err);
    }
  },
};

export default standardsController;
