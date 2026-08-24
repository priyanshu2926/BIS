/**
 * @file src/types/compliance.js
 * Centralized Data Contracts and Types for BIS Compliance Workspace.
 * 
 * Future FastAPI backend returns these exact normalized structures.
 * UI components must consume these models without embedding raw API logic.
 */

/**
 * @typedef {Object} ComplianceProject
 * @property {string} id - Unique project identifier
 * @property {string} product_id - Reference to product
 * @property {string} product_name - Product display name
 * @property {string} standard_id - Reference to certification standard
 * @property {string} standard_number - Standard code (e.g., 'IS 374:2019')
 * @property {string} status - Overall compliance status ('Draft' | 'In Progress' | 'Completed' | 'Verified')
 * @property {number} overall_progress - Progress percentage (0-100)
 * @property {number} completed_items - Count of completed items
 * @property {number} pending_items - Count of pending items
 * @property {number} attention_items - Count of items needing attention
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 */

/**
 * @typedef {Object} ComplianceItem
 * @property {string} id - Unique item identifier
 * @property {string} project_id - Reference to compliance project
 * @property {string} title - Item title/requirement name
 * @property {string} description - Detailed description
 * @property {'Applicable Standard' | 'Product Specifications' | 'Manufacturing Details' | 'Test Report' | 'Required Documents' | 'Application Preparation' | 'Verification & Marking'} category - Item classification
 * @property {'Completed' | 'Pending' | 'Attention'} status - Compliance status
 * @property {'Critical' | 'High' | 'Medium' | 'Low'} priority - Priority level
 * @property {string|null} related_standard_id - Optional reference to standard
 * @property {string|null} related_document_id - Optional reference to document
 * @property {string|null} notes - Internal notes
 * @property {boolean} is_mandatory - Whether item is mandatory
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 */

/**
 * @typedef {Object} ComplianceSummary
 * @property {string} project_id - Reference to project
 * @property {Object} documents - Document tracking
 * @property {number} documents.completed - Completed documents
 * @property {number} documents.total - Total required documents
 * @property {number} documents.percentage - Percentage complete (0-100)
 * @property {Object} testing - Testing requirements tracking
 * @property {number} testing.completed - Completed tests
 * @property {number} testing.total - Total required tests
 * @property {number} testing.percentage - Percentage complete (0-100)
 * @property {Object} requirements - Requirements tracking
 * @property {number} requirements.completed - Completed requirements
 * @property {number} requirements.total - Total requirements
 * @property {number} requirements.percentage - Percentage complete (0-100)
 * @property {number} overall_percentage - Overall compliance percentage
 * @property {string} status - Overall status
 */

/**
 * @typedef {Object} ComplianceFilter
 * @property {'All' | 'Completed' | 'Pending' | 'Attention' | 'Documents' | 'Testing'} type - Filter type
 * @property {string} label - Display label
 * @property {number} count - Number of items matching filter
 */
