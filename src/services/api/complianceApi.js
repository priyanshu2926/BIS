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

import { mockComplianceApi } from '../mock/mockComplianceApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

/**
 * Real HTTP implementation (for future FastAPI backend)
 * Uncomment and use when backend is ready.
 */
// const httpApi = {
//   getComplianceProject: async (projectId) => {
//     const response = await fetch(`${API_BASE_URL}/compliance/${projectId}`)
//     if (!response.ok) throw new Error('Failed to fetch compliance project')
//     return response.json()
//   },
//
//   getComplianceItems: async (projectId) => {
//     const response = await fetch(`${API_BASE_URL}/compliance/${projectId}/items`)
//     if (!response.ok) throw new Error('Failed to fetch compliance items')
//     return response.json()
//   },
//
//   updateComplianceItem: async (itemId, updates) => {
//     const response = await fetch(`${API_BASE_URL}/compliance/items/${itemId}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updates),
//     })
//     if (!response.ok) throw new Error('Failed to update compliance item')
//     return response.json()
//   },
//
//   getComplianceSummary: async (projectId) => {
//     const response = await fetch(`${API_BASE_URL}/compliance/${projectId}/summary`)
//     if (!response.ok) throw new Error('Failed to fetch compliance summary')
//     return response.json()
//   },
//
//   getComplianceFilters: async (projectId) => {
//     const response = await fetch(`${API_BASE_URL}/compliance/${projectId}/filters`)
//     if (!response.ok) throw new Error('Failed to fetch compliance filters')
//     return response.json()
//   },
// }

/**
 * Compliance API exported public interface
 * Uses mock data for now; switch to httpApi when backend is ready.
 */
export const complianceApi = {
  /**
   * Get compliance project details
   * @param {string} projectId - Project identifier
   * @returns {Promise<Object>} Compliance project data
   */
  getComplianceProject: (projectId) => mockComplianceApi.getComplianceProject(projectId),

  /**
   * Get all compliance items for a project
   * @param {string} projectId - Project identifier
   * @returns {Promise<Array>} Array of compliance items
   */
  getComplianceItems: (projectId) => mockComplianceApi.getComplianceItems(projectId),

  /**
   * Update a compliance item (status, priority, notes, etc.)
   * @param {string} itemId - Item identifier
   * @param {Object} updates - Fields to update (status, notes, priority, etc.)
   * @returns {Promise<Object>} Updated item
   */
  updateComplianceItem: (itemId, updates) => mockComplianceApi.updateComplianceItem(itemId, updates),

  /**
   * Get compliance summary dashboard data
   * @param {string} projectId - Project identifier
   * @returns {Promise<Object>} Summary with documents, testing, requirements progress
   */
  getComplianceSummary: (projectId) => mockComplianceApi.getComplianceSummary(projectId),

  /**
   * Get available filters for compliance items
   * @param {string} projectId - Project identifier
   * @returns {Promise<Array>} Filter options with counts
   */
  getComplianceFilters: (projectId) => mockComplianceApi.getComplianceFilters(projectId),
}
