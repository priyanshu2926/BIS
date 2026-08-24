/**
 * @file backend/src/controllers/productsController.js
 * Products Controller Layer.
 */

import productsService from '../services/productsService.js';
import { successResponse, paginatedResponse, errorResponse, parsePagination } from '../utils/apiResponse.js';

export const productsController = {
  /**
   * GET /api/v1/products
   */
  async getProducts(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { query, q, category } = req.query;
      const searchQuery = query || q;

      const { products, total } = await productsService.getAllProducts({
        query: searchQuery,
        category,
        skip,
        take,
      });

      return paginatedResponse(res, products, { page, limit, total });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/products/search?q=
   */
  async searchProducts(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { q, query } = req.query;
      const searchTerm = q || query || '';

      const { products, total } = await productsService.searchProducts(searchTerm, {
        skip,
        take,
      });

      return paginatedResponse(res, products, { page, limit, total });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/products/:id
   */
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);

      if (!product) {
        return errorResponse(res, `Product with ID '${id}' not found`, 404);
      }

      return successResponse(res, product);
    } catch (err) {
      next(err);
    }
  },
};

export default productsController;
