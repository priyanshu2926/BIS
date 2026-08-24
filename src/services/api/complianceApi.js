/**
 * @file src/services/api/complianceApi.js
 * Compliance API Client - Frontend Service Layer
 * 
 * Abstracts API calls from UI components.
 * Currently uses mock data; swaps to FastAPI backend with minimal changes.
 * 
 * Future Backend Contract:
 * - GET /api/compliance/{project_id}
 * - GET /api/compliance/{project_id}/items
 * - PATCH /api/compliance/items/{item_id}
 * - GET /api/compliance/{project_id}/summary
 * - GET /api/compliance/{project_id}/filters
 */

import { apiClient } from './apiClient'
import { mockComplianceApi } from '../mock/mockComplianceApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

/**
 * Compliance API exported public interface
 */
export const complianceApi = {
  /**
   * Get compliance project details
   * @param {string} projectId - Project identifier
   * @returns {Promise<Object>} Compliance project data
   */
  async getComplianceProject(projectId) {
    if (USE_MOCK_API) {
      return mockComplianceApi.getComplianceProject(projectId)
    }
    return apiClient.get(`/compliance/${projectId}`)
  },

  /**
   * Get all compliance items for a project
   * @param {string} projectId - Project identifier
   * @returns {Promise<Array>} Array of compliance items
   */
  async getComplianceItems(projectId) {
    if (USE_MOCK_API) {
      return mockComplianceApi.getComplianceItems(projectId)
    }
    return apiClient.get(`/compliance/${projectId}/items`)
  },

  /**
   * Update a compliance item (status, priority, notes, etc.)
   * @param {string} itemId - Item identifier
   * @param {Object} updates - Fields to update (status, notes, priority, etc.)
   * @returns {Promise<Object>} Updated item
   */
  async updateComplianceItem(itemId, updates) {
    if (USE_MOCK_API) {
      return mockComplianceApi.updateComplianceItem(itemId, updates)
    }
    return apiClient.put(`/compliance/items/${itemId}`, updates)
  },

  /**
   * Get compliance summary dashboard data
   * @param {string} projectId - Project identifier
   * @returns {Promise<Object>} Summary with documents, testing, requirements progress
   */
  async getComplianceSummary(projectId) {
    if (USE_MOCK_API) {
      return mockComplianceApi.getComplianceSummary(projectId)
    }
    return apiClient.get(`/compliance/${projectId}/summary`)
  },

  /**
   * Get available filters for compliance items
   * @param {string} projectId - Project identifier
   * @returns {Promise<Array>} Filter options with counts
   */
  async getComplianceFilters(projectId) {
    if (USE_MOCK_API) {
      return mockComplianceApi.getComplianceFilters(projectId)
    }
    return apiClient.get(`/compliance/${projectId}/filters`)
  },
}
