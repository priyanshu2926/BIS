/**
 * @file src/services/api/certificationApi.js
 * Primary Certification API service abstraction layer.
 * 
 * Decouples UI components & custom hook from network logic.
 * Currently uses high-fidelity mockCertificationApi.
 * Can be switched to live FastAPI endpoints without changing any UI code.
 * 
 * Proposed Future FastAPI Endpoints:
 * - GET  /api/certification/products
 * - POST /api/certification/standards
 * - GET  /api/certification/requirements?standard_id=...
 * - GET  /api/certification/testing?standard_id=...
 * - GET  /api/certification/documents?standard_id=...
 * - POST /api/certification/roadmap
 */

import { apiClient } from './apiClient'
import { mockCertificationApi } from '../mock/mockCertificationApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

export const certificationApi = {
  /**
   * Fetch product preset list
   * @returns {Promise<import('../../types/certification').ProductOption[]>}
   */
  async getProductOptions() {
    if (USE_MOCK_API) {
      return mockCertificationApi.getProductOptions()
    }
    return apiClient.get('/certification/products')
  },

  /**
   * Fetch applicable standards for a product
   * @param {string} productIdentifier
   * @returns {Promise<import('../../types/certification').CertificationStandard[]>}
   */
  async getApplicableStandards(productIdentifier) {
    if (USE_MOCK_API) {
      return mockCertificationApi.getApplicableStandards(productIdentifier)
    }
    return apiClient.post('/certification/standards', { product: productIdentifier })
  },

  /**
   * Fetch compliance requirements for a standard
   * @param {string} standardId
   * @returns {Promise<import('../../types/certification').Requirement[]>}
   */
  async getRequirements(standardId) {
    if (USE_MOCK_API) {
      return mockCertificationApi.getRequirements(standardId)
    }
    return apiClient.get(`/certification/requirements?standard_id=${encodeURIComponent(standardId)}`)
  },

  /**
   * Fetch testing protocols for a standard
   * @param {string} standardId
   * @returns {Promise<import('../../types/certification').TestingRequirement[]>}
   */
  async getTestingRequirements(standardId) {
    if (USE_MOCK_API) {
      return mockCertificationApi.getTestingRequirements(standardId)
    }
    return apiClient.get(`/certification/testing?standard_id=${encodeURIComponent(standardId)}`)
  },

  /**
   * Fetch required document checklist for a standard
   * @param {string} standardId
   * @returns {Promise<import('../../types/certification').RequiredDocument[]>}
   */
  async getRequiredDocuments(standardId) {
    if (USE_MOCK_API) {
      return mockCertificationApi.getRequiredDocuments(standardId)
    }
    return apiClient.get(`/certification/documents?standard_id=${encodeURIComponent(standardId)}`)
  },

  /**
   * Generate certification roadmap based on current session state
   * @param {Object} data
   * @returns {Promise<import('../../types/certification').CertificationRoadmap>}
   */
  async generateRoadmap(data) {
    if (USE_MOCK_API) {
      return mockCertificationApi.generateRoadmap(data)
    }
    return apiClient.post('/certification/roadmap', data)
  },
}
