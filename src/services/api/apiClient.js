/**
 * @file src/services/api/apiClient.js
 * Configurable API client wrapper with environment base URL resolution.
 * 
 * Supports:
 * - VITE_API_BASE_URL (defaults to http://localhost:8000/api)
 * - Standardized JSON requests and timeout handling
 * - Normalized error responses so raw stack traces are not exposed to the UI
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const DEFAULT_TIMEOUT_MS = 30000

/**
 * Standard API error class
 */
export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

/**
 * Normalized fetch request with timeout and error handling
 * @param {string} endpoint - Relative endpoint path (e.g. '/assistant/chat')
 * @param {RequestInit} [options={}] - Standard fetch options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
  
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`
      let errorDetails = null
      try {
        const errorJson = await response.json()
        errorMessage = errorJson.detail || errorJson.message || errorMessage
        errorDetails = errorJson
      } catch {
        // Non-JSON error body
      }
      throw new ApiError(errorMessage, response.status, errorDetails)
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new ApiError('Request timed out. The server took too long to respond.', 408)
    }
    if (err instanceof ApiError) {
      throw err
    }
    throw new ApiError(
      'Unable to connect to the BIS assistant server. Please check your network connection.',
      0,
      err.message
    )
  }
}

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
  getBaseUrl: () => BASE_URL,
}
