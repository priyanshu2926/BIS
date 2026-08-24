/**
 * @file src/types/documents.js
 * Centralized Data Contracts and Types for BIS Industry Documents & Intelligence.
 * 
 * Future FastAPI + RAG backend returns these exact normalized structures.
 * UI components must consume these models without embedding raw API logic.
 */

/**
 * @typedef {'uploading' | 'processing' | 'ready' | 'failed'} DocumentStatus
 */

/**
 * @typedef {'Uploaded' | 'Processing' | 'Text extracted' | 'Chunked' | 'Embedded' | 'Indexed' | 'Ready for AI' | 'Failed'} ProcessingStage
 */

/**
 * @typedef {Object} Document
 * @property {string} id - Unique document identifier
 * @property {string} name - Original file name with extension
 * @property {string} file_type - MIME type or extension label (e.g. 'PDF', 'DOCX', 'application/pdf')
 * @property {number} file_size - File size in bytes
 * @property {string} uploaded_at - ISO 8601 timestamp string
 * @property {DocumentStatus} status - High-level lifecycle status
 * @property {string} category - Document category (e.g., 'Test Report', 'Product Specification', 'Factory Layout')
 * @property {string|null} related_standard_id - Reference to related BIS standard ID (e.g. 'std_is374')
 * @property {string|null} related_standard_number - Reference standard code (e.g. 'IS 374:2019')
 * @property {string|null} related_project_id - Reference to compliance project ID (e.g. 'comp_proj_001')
 * @property {ProcessingStage} [processing_stage] - Detailed RAG pipeline processing stage
 * @property {string|null} [summary] - AI-generated executive summary (available when ready)
 * @property {string|null} [extracted_text] - Text content extracted during OCR/parsing
 * @property {Array<string>} [key_requirements] - Key clauses or compliance requirements extracted
 * @property {string|null} [error_message] - Failure explanation if status is 'failed'
 * @property {number} [pages_count] - Number of pages in document
 * @property {string|null} [download_url] - URL for downloading original document
 */

/**
 * @typedef {Object} DocumentStats
 * @property {number} total - Total document count
 * @property {number} ready - Documents ready for AI analysis
 * @property {number} processing - Documents actively in processing/indexing pipeline
 * @property {number} failed - Documents that failed processing
 */

/**
 * @typedef {Object} DocumentFilterParams
 * @property {string} [search] - Keyword query
 * @property {'All' | DocumentStatus} [status] - Status filter
 * @property {'All' | string} [category] - Category filter
 * @property {'latest' | 'oldest' | 'name_asc' | 'size_desc'} [sortBy] - Sorting criteria
 */

/**
 * @typedef {Object} DocumentContextForAI
 * @property {string} document_id - Document unique identifier
 * @property {string} document_name - Document filename
 * @property {string} [category] - Document category
 * @property {string|null} [standard_number] - Associated BIS standard
 */

/**
 * Document Status Constants
 */
export const DOCUMENT_STATUS = {
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed',
}

/**
 * RAG Pipeline Stages
 */
export const PROCESSING_STAGES = {
  UPLOADED: 'Uploaded',
  PROCESSING: 'Processing',
  TEXT_EXTRACTED: 'Text extracted',
  CHUNKED: 'Chunked',
  EMBEDDED: 'Embedded',
  INDEXED: 'Indexed',
  READY_FOR_AI: 'Ready for AI',
  FAILED: 'Failed',
}

/**
 * Standard Document Categories in BIS Compliance Work
 */
export const DOCUMENT_CATEGORIES = [
  'Test Report',
  'Product Specification',
  'Factory Layout',
  'Quality Manual',
  'Material Certificate',
  'BIS Application',
  'Marking & Artwork',
  'Calibration Certificate',
  'Other',
]

/**
 * Human-readable byte size formatter
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Format ISO date string into human-friendly date
 * @param {string} isoString
 * @returns {string}
 */
export function formatDocumentDate(isoString) {
  if (!isoString) return 'Unknown date'
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return isoString
  }
}

/**
 * Helper to determine file icon and color style based on filename or MIME type
 * @param {string} filename
 * @returns {{ label: string, color: string, bg: string }}
 */
export function getFileTypeBadge(filename = '') {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  switch (ext) {
    case 'pdf':
      return { label: 'PDF', color: 'text-red-700', bg: 'bg-red-50 border-red-200' }
    case 'doc':
    case 'docx':
      return { label: 'DOC', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' }
    case 'xls':
    case 'xlsx':
      return { label: 'XLS', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' }
    case 'png':
    case 'jpg':
    case 'jpeg':
      return { label: 'IMG', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' }
    case 'txt':
      return { label: 'TXT', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' }
    default:
      return { label: ext.toUpperCase() || 'FILE', color: 'text-navy', bg: 'bg-blue-50 border-blue-200' }
  }
}
