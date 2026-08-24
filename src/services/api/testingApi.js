/**
 * @file src/services/api/testingApi.js
 * Testing API Client - Frontend Service Layer
 * 
 * Abstracts API calls from UI components.
 * Currently uses mock data; swaps to FastAPI backend with minimal changes.
 * 
 * Future Backend Contract:
 * - GET /api/testing/requirements
 * - GET /api/testing/laboratories
 * - GET /api/testing/laboratories/{id}
 * - Query params: product_id, standard_id, location, test_category, query
 */

import { apiClient } from './apiClient'
import { mockTestingApi } from '../mock/mockTestingApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

/**
 * Testing API exported public interface
 */
export const testingApi = {
  /**
   * Get all products available for testing
   * @returns {Promise<Array>} Array of products
   */
  async getProducts() {
    if (USE_MOCK_API) {
      return mockTestingApi.getProducts()
    }
    return apiClient.get('/testing/products')
  },

  /**
   * Get all standards
   * @returns {Promise<Array>} Array of standards
   */
  async getStandards() {
    if (USE_MOCK_API) {
      return mockTestingApi.getStandards()
    }
    return apiClient.get('/testing/standards')
  },

  /**
   * Get test requirements for a standard
   * @param {string} standardId - Standard identifier
   * @returns {Promise<Array>} Array of test requirements
   */
  async getTestRequirements(standardId) {
    if (USE_MOCK_API) {
      return mockTestingApi.getTestRequirements(standardId)
    }
    return apiClient.get(`/testing/requirements?standard_id=${standardId}`)
  },

  /**
   * Search laboratories with optional filters
   * @param {Object} filters - Search filters
   * @param {string} [filters.query] - Search query
   * @param {string} [filters.location] - Location filter
   * @param {string} [filters.test_category] - Test category filter
   * @param {string} [filters.capability] - Capability filter
   * @param {string} [filters.status] - Status filter
   * @returns {Promise<Array>} Array of matching laboratories
   */
  async searchLaboratories(filters = {}) {
    if (USE_MOCK_API) {
      return mockTestingApi.searchLaboratories(filters)
    }
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    return apiClient.get(`/testing/laboratories?${params.toString()}`)
  },

  /**
   * Get laboratory details by ID
   * @param {string} labId - Laboratory identifier
   * @returns {Promise<Object|null>} Laboratory details or null
   */
  async getLaboratoryById(labId) {
    if (USE_MOCK_API) {
      return mockTestingApi.getLaboratoryById(labId)
    }
    return apiClient.get(`/testing/laboratories/${labId}`)
  },

  /**
   * Get test requirement details by ID
   * @param {string} testId - Test identifier
   * @returns {Promise<Object|null>} Test details or null
   */
  async getTestRequirementById(testId) {
    if (USE_MOCK_API) {
      return mockTestingApi.getTestRequirementById(testId)
    }
    return apiClient.get(`/testing/requirements/${testId}`)
  },

  /**
   * Get laboratories capable of a specific test category
   * @param {string} testCategory - Test category
   * @returns {Promise<Array>} Array of capable laboratories
   */
  async getLabsByTestCategory(testCategory) {
    if (USE_MOCK_API) {
      return mockTestingApi.getLabsByTestCategory(testCategory)
    }
    return apiClient.get(`/testing/laboratories?test_category=${encodeURIComponent(testCategory)}`)
  },
}
