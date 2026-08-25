import resourceService from '../services/resourceService.js';
import { errorResponse, paginatedResponse, parsePagination, successResponse } from '../utils/apiResponse.js';

export const createResourceController = (resource, label) => ({
  async list(req, res, next) {
    try {
      const { page, limit, skip, take } = parsePagination(req.query);
      const { data, total } = await resourceService.list(resource, { skip, take });
      return paginatedResponse(res, data, { page, limit, total });
    } catch (err) {
      return next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const data = await resourceService.getById(resource, req.params.id);
      if (!data) return errorResponse(res, `${label} with ID '${req.params.id}' not found`, 404);
      return successResponse(res, data);
    } catch (err) {
      return next(err);
    }
  },
});