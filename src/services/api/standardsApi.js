/**
 * @file src/services/api/standardsApi.js
 * Primary Standards API service.
 * 
 * Clean abstraction layer decoupling UI components from network/API logic.
 * Currently uses high-fidelity mockStandardsApi.
 * Can be redirected to live FastAPI endpoints without changing any UI component code.
 * 
 * Proposed Future FastAPI Endpoints:
 * - GET    /api/standards/search?query=...&category=...&page=...&limit=...
 * - GET    /api/standards/{id}
 * - POST   /api/standards/{id}/save
 * - DELETE /api/standards/{id}/save
 * - GET    /api/standards/categories
 * - GET    /api/standards/product-categories
 */

import { apiClient } from './apiClient'
import { mockStandardsApi } from '../mock/mockStandardsApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

export const standardsApi = {
  /**
   * Search and filter Indian Standards
   * @param {import('../../types/standards').StandardsSearchParams} params
   * @returns {Promise<import('../../types/standards').StandardsSearchResponse>}
   */
  async searchStandards(params = {}) {
    if (USE_MOCK_API) {
      return mockStandardsApi.searchStandards(params)
    }
    const queryParams = new URLSearchParams()
    if (params.query) queryParams.set('query', params.query)
    if (params.category && params.category !== 'All') queryParams.set('category', params.category)
    if (params.product_category && params.product_category !== 'All')
      queryParams.set('product_category', params.product_category)
    if (params.status && params.status !== 'All') queryParams.set('status', params.status)
    if (params.saved_only) queryParams.set('saved_only', 'true')
    if (params.page) queryParams.set('page', String(params.page))
    if (params.limit) queryParams.set('limit', String(params.limit))
    if (params.sort_by) queryParams.set('sort_by', params.sort_by)

    return apiClient.get(`/standards/search?${queryParams.toString()}`)
  },

  /**
   * Fetch full standard details by ID
   * @param {string} id
   * @returns {Promise<import('../../types/standards').Standard>}
   */
  async getStandardById(id) {
    if (USE_MOCK_API) {
      return mockStandardsApi.getStandardById(id)
    }
    return apiClient.get(`/standards/${id}`)
  },

  /**
   * Bookmark a standard
   * @param {string} id
   * @returns {Promise<{ success: boolean, standard?: Object }>}
   */
  async saveStandard(id) {
    if (USE_MOCK_API) {
      return mockStandardsApi.saveStandard(id)
    }
    return apiClient.post(`/standards/${id}/save`)
  },

  /**
   * Un-bookmark a standard
   * @param {string} id
   * @returns {Promise<{ success: boolean, standard?: Object }>}
   */
  async unsaveStandard(id) {
    if (USE_MOCK_API) {
      return mockStandardsApi.unsaveStandard(id)
    }
    return apiClient.delete(`/standards/${id}/save`)
  },

  /**
   * Fetch engineering categories
   */
  async getCategories() {
    if (USE_MOCK_API) {
      return mockStandardsApi.getCategories()
    }
    return apiClient.get('/standards/categories')
  },

  /**
   * Fetch product categories
   */
  async getProductCategories() {
    if (USE_MOCK_API) {
      return mockStandardsApi.getProductCategories()
    }
    return apiClient.get('/standards/product-categories')
  },

  /**
   * Fetch total count of saved standards
   */
  async getSavedCount() {
    if (USE_MOCK_API) {
      return mockStandardsApi.getSavedCount()
    }
    const res = await apiClient.get('/standards/saved/count')
    return res?.count || 0
  },
}
