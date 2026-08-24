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

import { mockTestingApi } from '../mock/mockTestingApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

/**
 * Real HTTP implementation (for future FastAPI backend)
 * Uncomment and use when backend is ready.
 */
// const httpApi = {
//   getProducts: async () => {
//     const response = await fetch(`${API_BASE_URL}/testing/products`)
//     if (!response.ok) throw new Error('Failed to fetch products')
//     return response.json()
//   },
//
//   getStandards: async () => {
//     const response = await fetch(`${API_BASE_URL}/testing/standards`)
//     if (!response.ok) throw new Error('Failed to fetch standards')
//     return response.json()
//   },
//
//   getTestRequirements: async (standardId) => {
//     const response = await fetch(`${API_BASE_URL}/testing/requirements?standard_id=${standardId}`)
//     if (!response.ok) throw new Error('Failed to fetch test requirements')
//     return response.json()
//   },
//
//   searchLaboratories: async (filters) => {
//     const params = new URLSearchParams()
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) params.append(key, value)
//     })
//     const response = await fetch(`${API_BASE_URL}/testing/laboratories?${params}`)
//     if (!response.ok) throw new Error('Failed to search laboratories')
//     return response.json()
//   },
//
//   getLaboratoryById: async (labId) => {
//     const response = await fetch(`${API_BASE_URL}/testing/laboratories/${labId}`)
//     if (!response.ok) throw new Error('Failed to fetch laboratory details')
//     return response.json()
//   },
//
//   getTestRequirementById: async (testId) => {
//     const response = await fetch(`${API_BASE_URL}/testing/requirements/${testId}`)
//     if (!response.ok) throw new Error('Failed to fetch test details')
//     return response.json()
//   },
//
//   getLabsByTestCategory: async (testCategory) => {
//     const response = await fetch(`${API_BASE_URL}/testing/laboratories?test_category=${testCategory}`)
//     if (!response.ok) throw new Error('Failed to fetch labs by category')
//     return response.json()
//   },
// }

/**
 * Testing API exported public interface
 * Uses mock data for now; switch to httpApi when backend is ready.
 */
export const testingApi = {
  /**
   * Get all products available for testing
   * @returns {Promise<Array>} Array of products
   */
  getProducts: () => mockTestingApi.getProducts(),

  /**
   * Get all standards
   * @returns {Promise<Array>} Array of standards
   */
  getStandards: () => mockTestingApi.getStandards(),

  /**
   * Get test requirements for a standard
   * @param {string} standardId - Standard identifier
   * @returns {Promise<Array>} Array of test requirements
   */
  getTestRequirements: (standardId) => mockTestingApi.getTestRequirements(standardId),

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
  searchLaboratories: (filters = {}) => mockTestingApi.searchLaboratories(filters),

  /**
   * Get laboratory details by ID
   * @param {string} labId - Laboratory identifier
   * @returns {Promise<Object|null>} Laboratory details or null
   */
  getLaboratoryById: (labId) => mockTestingApi.getLaboratoryById(labId),

  /**
   * Get test requirement details by ID
   * @param {string} testId - Test identifier
   * @returns {Promise<Object|null>} Test details or null
   */
  getTestRequirementById: (testId) => mockTestingApi.getTestRequirementById(testId),

  /**
   * Get laboratories capable of a specific test category
   * @param {string} testCategory - Test category
   * @returns {Promise<Array>} Array of capable laboratories
   */
  getLabsByTestCategory: (testCategory) => mockTestingApi.getLabsByTestCategory(testCategory),
}
