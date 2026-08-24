/**
 * @file src/types/standards.js
 * Centralized Data Contracts and Types for Indian Standards Search.
 * 
 * Future FastAPI backend returns these exact normalized structures.
 * UI components must consume these models without embedding raw API logic.
 */

/**
 * @typedef {Object} Standard
 * @property {string} id - Unique identifier (e.g. 'std_is374')
 * @property {string} standard_number - Official standard designation (e.g. 'IS 374:2019 (Demo)')
 * @property {string} title - Full title of the Indian Standard
 * @property {string} description - Summary of requirements and technical scope
 * @property {string} category - Broad engineering category (e.g. 'Electrotechnical', 'Mechanical')
 * @property {string} product_category - Specific product segment (e.g. 'Electric Ceiling Fans')
 * @property {'Active' | 'Under Revision' | 'Withdrawn' | 'Proposed'} status - Current regulatory status
 * @property {string} revision - Revision details (e.g. 'Third Revision (2019)')
 * @property {string} published_date - Date of publication (ISO or YYYY-MM-DD)
 * @property {string[]} keywords - Search tags and product synonyms
 * @property {string} source - Official Gazette notification or BIS Division reference
 * @property {boolean} saved - Whether bookmarked by the user
 * @property {string} [scheme] - Applicable BIS certification scheme (e.g. 'Scheme-I (ISI Mark)')
 * @property {string} [scope] - Detailed technical scope
 * @property {string[]} [key_clauses] - Notable technical clauses
 * @property {string} [qco_mandatory] - Quality Control Order mandatory notice
 */

/**
 * @typedef {Object} StandardsSearchParams
 * @property {string} [query='']
 * @property {string} [category='All']
 * @property {string} [product_category='All']
 * @property {string} [status='All']
 * @property {boolean} [saved_only=false]
 * @property {number} [page=1]
 * @property {number} [limit=10]
 * @property {'relevance' | 'newest' | 'code'} [sort_by='relevance']
 */

/**
 * @typedef {Object} StandardsSearchResponse
 * @property {Standard[]} items - Page items
 * @property {number} total - Total matching records
 * @property {number} page - Current page number (1-indexed)
 * @property {number} limit - Items per page
 * @property {boolean} has_next - Whether subsequent pages exist
 * @property {number} total_pages - Total calculated pages
 */

export const STANDARD_STATUSES = {
  ALL: 'All',
  ACTIVE: 'Active',
  UNDER_REVISION: 'Under Revision',
  WITHDRAWN: 'Withdrawn',
}

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Latest Publication' },
  { value: 'code', label: 'Standard Code (A-Z)' },
]
