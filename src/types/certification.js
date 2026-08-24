/**
 * @file src/types/certification.js
 * Centralized Data Contracts and Types for Guided BIS Certification Assistant.
 * 
 * Future FastAPI backend returns these exact normalized structures.
 * UI components must consume these models without embedding raw API logic.
 */

/**
 * @typedef {Object} ProductOption
 * @property {string} id - Unique product identifier
 * @property {string} name - Product display name (e.g. 'Electric Ceiling Fan')
 * @property {string} category - Engineering / Sector category (e.g. 'Electrotechnical')
 * @property {string} description - Brief product definition
 * @property {string} default_standard_id - Standard ID mapped to this product
 * @property {string} [icon_name] - Visual icon identifier
 */

/**
 * @typedef {Object} CertificationStandard
 * @property {string} id - Unique standard ID (e.g. 'std_is374')
 * @property {string} standard_number - Official code (e.g. 'IS 374:2019 (Demo)')
 * @property {string} title - Full title of standard
 * @property {string} description - Short description
 * @property {string} scheme - Applicable certification scheme (e.g. 'Scheme-I (ISI Mark)')
 * @property {string} qco_mandatory - Mandatory Quality Control Order notice
 * @property {string} category - Engineering Division
 * @property {'Primary Match' | 'Alternative Match' | 'Related Standard'} relevance - Relevance tier
 */

/**
 * @typedef {Object} Requirement
 * @property {string} id - Unique requirement identifier
 * @property {'Product Safety' | 'Manufacturing Process' | 'Quality Control' | 'Marking & Packaging' | 'Documentation'} category - Requirement classification
 * @property {string} title - Requirement headline
 * @property {string} description - Clear explanation of requirement
 * @property {'Mandatory' | 'Critical' | 'Recommended'} importance - Compliance priority
 * @property {string} clause - Clause reference in standard
 */

/**
 * @typedef {Object} TestingRequirement
 * @property {string} id - Unique test identifier
 * @property {string} test_name - Name of test
 * @property {string} clause - Clause reference
 * @property {'In-House Routine' | 'Independent Laboratory'} test_type - Testing venue
 * @property {string} parameters - Acceptance criteria / threshold
 * @property {string} frequency - Testing frequency according to SIT
 * @property {string} guidance - Practical guidance for manufacturer
 * @property {string} required_equipment - Mandatory test instrument
 */

/**
 * @typedef {Object} RequiredDocument
 * @property {string} id - Unique document identifier
 * @property {'Legal & Identity' | 'Factory & Premises' | 'Machinery & Production' | 'Quality & Lab' | 'Process Control'} category - Category
 * @property {string} title - Document name
 * @property {string} description - Specific instructions for applicant
 * @property {boolean} mandatory - Whether mandatory for Form-I submission
 * @property {boolean} prepared - Local preparation state (user toggled)
 * @property {string} [format_notes] - Prescribed format or validity guidelines
 */

/**
 * @typedef {Object} RoadmapStage
 * @property {number} number - Step number (1-8)
 * @property {string} title - Stage title
 * @property {string} description - Stage description
 * @property {'completed' | 'current' | 'pending'} status - Progress status
 * @property {string} timeline - Estimated duration (e.g. '1-2 Weeks')
 * @property {string[]} key_actions - Action items
 */

/**
 * @typedef {Object} CertificationRoadmap
 * @property {string} product_name
 * @property {string} standard_number
 * @property {string} scheme
 * @property {number} overall_progress - Percentage (0-100)
 * @property {string} estimated_timeline - Total duration estimate (e.g. '30-45 Days')
 * @property {RoadmapStage[]} stages
 */

export const CERTIFICATION_STEPS = [
  { id: 1, key: 'product', label: 'Product', description: 'Specify manufactured product' },
  { id: 2, key: 'standard', label: 'Standard', description: 'Identify applicable IS code' },
  { id: 3, key: 'requirements', label: 'Requirements', description: 'Safety & quality criteria' },
  { id: 4, key: 'testing', label: 'Testing', description: 'In-house & lab protocols' },
  { id: 5, key: 'documents', label: 'Documents', description: 'Application dossier checklist' },
  { id: 6, key: 'roadmap', label: 'Roadmap', description: 'Certification journey plan' },
]
