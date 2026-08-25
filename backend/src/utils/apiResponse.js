/**
 * @file backend/src/utils/apiResponse.js
 * Standardized API Response and Pagination utilities.
 */

/**
 * Standard success response wrapper
 * @param {import('express').Response} res
 * @param {any} data
 * @param {number} [statusCode=200]
 */
export const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * Standard paginated list response wrapper
 * @param {import('express').Response} res
 * @param {Array<any>} data
 * @param {{ page: number, limit: number, total: number }} pagination
 * @param {number} [statusCode=200]
 */
export const paginatedResponse = (res, data, { page, limit, total }, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(total),
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
};

/**
 * Standard error response wrapper
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=400]
 * @param {any} [errors=null]
 */
export const errorResponse = (res, message, statusCode = 400, errors = null) => {
  const payload = {
    success: false,
    message,
  };
  if (errors) {
    payload.errors = errors;
  }
  return res.status(statusCode).json(payload);
};

/**
 * Safely parse query parameters for pagination
 * @param {Object} query
 * @param {number} [defaultLimit=20]
 * @param {number} [maxLimit=100]
 * @returns {{ page: number, limit: number, skip: number, take: number }}
 */
export const parsePagination = (query = {}, defaultLimit = 20, maxLimit = 100) => {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = defaultLimit;
  if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;
  const take = limit;

  return { page, limit, skip, take };
};
