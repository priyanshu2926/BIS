/**
 * @file src/types/testing.js
 * Centralized Data Contracts and Types for BIS Testing & Laboratories.
 * 
 * Future FastAPI backend returns these exact normalized structures.
 * UI components must consume these models without embedding raw API logic.
 */

/**
 * @typedef {Object} TestRequirement
 * @property {string} id - Unique test identifier
 * @property {string} name - Test name (e.g., 'Electrical Safety Test')
 * @property {string} description - Detailed description of test
 * @property {'Electrical Safety' | 'Performance' | 'Construction' | 'Durability' | 'Environmental' | 'Marking & Packaging'} category - Test category
 * @property {'Required' | 'Recommended'} status - Whether test is required or recommended
 * @property {string} standard_id - Reference to related standard
 * @property {string} parameters - Test parameters and acceptance criteria
 * @property {string} test_type - Type of test (e.g., 'In-House Routine', 'Third-Party Lab')
 * @property {string} frequency - Testing frequency
 * @property {string} guidance - Practical guidance for manufacturers
 */

/**
 * @typedef {Object} Laboratory
 * @property {string} id - Unique laboratory identifier
 * @property {string} name - Laboratory name
 * @property {string} location - City/Region location
 * @property {string} state - State/Province
 * @property {Array<string>} capabilities - List of testing capabilities
 * @property {'Accredited' | 'Registered' | 'Under Review'} status - Laboratory status
 * @property {Array<string>} test_categories - Categories of tests offered
 * @property {string} phone - Contact phone (demo data)
 * @property {string} email - Contact email (demo data)
 * @property {string} website - Website URL (demo data)
 * @property {boolean} accepts_online_submissions - Whether accepts online submissions
 * @property {number} turnaround_days - Average turnaround in days
 * @property {string} accreditation - Accreditation type/scope
 */

/**
 * @typedef {Object} TestingSearchFilters
 * @property {string|null} query - Search query text
 * @property {string|null} location - Location filter
 * @property {string|null} test_category - Test category filter
 * @property {Array<string>} capabilities - Capabilities filter
 * @property {'All' | 'Accredited' | 'Registered'} status - Status filter
 */

/**
 * @typedef {Object} TestingSearchResults
 * @property {Array<Laboratory>} laboratories - Matching laboratories
 * @property {number} total_count - Total matching results
 * @property {number} page - Current page
 * @property {number} per_page - Results per page
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Product identifier
 * @property {string} name - Product name
 * @property {string} standard_id - Associated standard
 * @property {string} category - Product category
 */

/**
 * @typedef {Object} Standard
 * @property {string} id - Standard identifier
 * @property {string} standard_number - Standard code (e.g., 'IS 374:2019')
 * @property {string} title - Standard title
 */
