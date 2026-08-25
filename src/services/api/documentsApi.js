/**
 * @file src/services/api/documentsApi.js
 * Primary Documents & Document Intelligence API service.
 * 
 * Clean abstraction layer decoupling UI components from network/API logic.
 * Uses high-fidelity mockDocumentsApi during demo/frontend phase.
 * Seamlessly connects to real FastAPI backend endpoints via VITE_API_BASE_URL.
 * 
 * Future FastAPI Endpoints:
 * - GET    /api/documents
 * - POST   /api/documents/upload
 * - GET    /api/documents/{document_id}
 * - DELETE /api/documents/{document_id}
 * - GET    /api/documents/{document_id}/status
 * - GET    /api/documents/{document_id}/content
 * - GET    /api/documents/{document_id}/summary
 * - POST   /api/documents/{document_id}/retry
 */

import { apiClient } from './apiClient'
import { mockDocumentsApi } from '../mock/mockDocumentsApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

export const documentsApi = {
  /**
   * Fetch all documents with optional filters and sorting
   * @param {import('../../types/documents').DocumentFilterParams} [params={}]
   * @returns {Promise<{ documents: Array<import('../../types/documents').Document>, total: number }>}
   */
  async getDocuments(params = {}) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocuments(params)
    }

    const queryParams = new URLSearchParams()
    if (params.search) queryParams.set('search', params.search)
    if (params.status && params.status !== 'All') queryParams.set('status', params.status)
    if (params.category && params.category !== 'All') queryParams.set('category', params.category)
    if (params.sortBy) queryParams.set('sortBy', params.sortBy)

    const queryStr = queryParams.toString()
    return apiClient.get(`/documents${queryStr ? `?${queryStr}` : ''}`)
  },

  /**
   * Fetch document by ID with full metadata, summary, and RAG stages
   * @param {string} id
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async getDocumentById(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocumentById(id)
    }
    return apiClient.get(`/documents/${id}`)
  },

  /**
   * Fetch document dashboard metrics & counters
   * @returns {Promise<import('../../types/documents').DocumentStats>}
   */
  async getDocumentStats() {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocumentStats()
    }
    return apiClient.get('/documents/stats')
  },

  /**
   * Upload a new document file with category and standard metadata
   * @param {Object} payload
   * @param {File|Object} payload.file
   * @param {string} [payload.category]
   * @param {string} [payload.related_standard_number]
   * @param {string} [payload.related_project_id]
   * @param {Function} [onProgress]
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async uploadDocument(payload, onProgress) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.uploadDocument(payload, onProgress)
    }

    const formData = new FormData()
    formData.append('file', payload.file)
    if (payload.category) formData.append('category', payload.category)
    if (payload.related_standard_number) {
      formData.append('related_standard_number', payload.related_standard_number)
    }
    if (payload.related_project_id) {
      formData.append('related_project_id', payload.related_project_id)
    }

    // Send FormData directly; boundary is automatically handled by browser/fetch
    return apiClient.post('/documents/upload', formData)
  },

  /**
   * Delete a document by ID
   * @param {string} id
   * @returns {Promise<{ success: boolean, id: string }>}
   */
  async deleteDocument(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.deleteDocument(id)
    }
    return apiClient.delete(`/documents/${id}`)
  },

  /**
   * Retry document processing after a failure
   * @param {string} id
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async retryDocumentProcessing(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.retryDocumentProcessing(id)
    }
    return apiClient.post(`/documents/${id}/retry`)
  },

  /**
   * Fetch extracted OCR text content (Future RAG endpoint)
   * @param {string} id
   * @returns {Promise<{ id: string, extracted_text: string|null, processing_stage: string }>}
   */
  async getDocumentContent(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocumentContent(id)
    }
    return apiClient.get(`/documents/${id}/content`)
  },

  /**
   * Fetch AI executive summary (Future RAG endpoint)
   * @param {string} id
   * @returns {Promise<{ id: string, summary: string|null, key_requirements: Array<string> }>}
   */
  async getDocumentSummary(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocumentSummary(id)
    }
    return apiClient.get(`/documents/${id}/summary`)
  },

  /**
   * Fetch real-time RAG processing status (Future RAG endpoint)
   * @param {string} id
   * @returns {Promise<{ id: string, status: string, processing_stage: string }>}
   */
  async getDocumentStatus(id) {
    if (USE_MOCK_API) {
      return mockDocumentsApi.getDocumentStatus(id)
    }
    return apiClient.get(`/documents/${id}/status`)
  },
}
