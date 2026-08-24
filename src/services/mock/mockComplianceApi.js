/**
 * @file src/services/mock/mockComplianceApi.js
 * High-fidelity Mock API for BIS Compliance Workspace.
 * 
 * Provides demo compliance project data, items, and tracking.
 * Simulates network latency with Promises.
 */

const MOCK_COMPLIANCE_PROJECT = {
  id: 'comp_proj_001',
  product_id: 'prod_fan',
  product_name: 'Electric Ceiling Fan',
  standard_id: 'std_is374',
  standard_number: 'IS 374:2019 (Demo)',
  status: 'In Progress',
  overall_progress: 65,
  completed_items: 12,
  pending_items: 6,
  attention_items: 2,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-08-20T14:30:00Z',
}

const MOCK_COMPLIANCE_ITEMS = [
  {
    id: 'item_001',
    project_id: 'comp_proj_001',
    title: 'Applicable Standard',
    description: 'Identified the relevant BIS standard IS 374:2019 for domestic ceiling fans.',
    category: 'Applicable Standard',
    status: 'Completed',
    priority: 'Critical',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Confirmed applicability on 2024-01-15.',
    is_mandatory: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T11:00:00Z',
  },
  {
    id: 'item_002',
    project_id: 'comp_proj_001',
    title: 'Product Specifications Document',
    description: 'Prepare comprehensive technical specifications including motor specs, blade dimensions, electrical ratings, and performance curves.',
    category: 'Product Specifications',
    status: 'Completed',
    priority: 'Critical',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Document prepared and reviewed by engineering team.',
    is_mandatory: true,
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-02-10T15:30:00Z',
  },
  {
    id: 'item_003',
    project_id: 'comp_proj_001',
    title: 'Manufacturing Process Details',
    description: 'Document all manufacturing processes, quality control checkpoints, supplier details, and material certifications.',
    category: 'Manufacturing Details',
    status: 'Completed',
    priority: 'Critical',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Factory audit completed. All details documented.',
    is_mandatory: true,
    created_at: '2024-02-01T08:30:00Z',
    updated_at: '2024-02-28T16:00:00Z',
  },
  {
    id: 'item_004',
    project_id: 'comp_proj_001',
    title: 'Performance Test Report',
    description: 'Complete third-party testing for airflow, noise levels, electrical safety, mechanical safety, and stability.',
    category: 'Test Report',
    status: 'Pending',
    priority: 'Critical',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Test scheduled with NABL accredited laboratory.',
    is_mandatory: true,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-15T12:00:00Z',
  },
  {
    id: 'item_005',
    project_id: 'comp_proj_001',
    title: 'Electrical Safety Test Report',
    description: 'Verify electrical insulation, leakage current, grounding, voltage withstand, and short-circuit protection compliance.',
    category: 'Test Report',
    status: 'Pending',
    priority: 'Critical',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Awaiting laboratory slot availability.',
    is_mandatory: true,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-15T12:00:00Z',
  },
  {
    id: 'item_006',
    project_id: 'comp_proj_001',
    title: 'BIS Application Form and Declaration',
    description: 'Complete BIS Application for Product Certification (Form 1) with notarized manufacturer declaration.',
    category: 'Application Preparation',
    status: 'Pending',
    priority: 'High',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Ready to submit after test report receipt.',
    is_mandatory: true,
    created_at: '2024-03-20T09:00:00Z',
    updated_at: '2024-03-20T09:00:00Z',
  },
  {
    id: 'item_007',
    project_id: 'comp_proj_001',
    title: 'Material Test Certificates',
    description: 'Collect test certificates for motor windings, blade material, fastener material, and electrical components.',
    category: 'Required Documents',
    status: 'Completed',
    priority: 'High',
    related_standard_id: null,
    related_document_id: null,
    notes: 'All suppliers have provided valid test certificates.',
    is_mandatory: true,
    created_at: '2024-02-05T11:00:00Z',
    updated_at: '2024-02-20T14:30:00Z',
  },
  {
    id: 'item_008',
    project_id: 'comp_proj_001',
    title: 'Quality Management System Documentation',
    description: 'Submit ISO 9001 certificate and quality procedures documentation.',
    category: 'Required Documents',
    status: 'Completed',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'ISO 9001:2015 certified. Documents uploaded.',
    is_mandatory: false,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-25T13:00:00Z',
  },
  {
    id: 'item_009',
    project_id: 'comp_proj_001',
    title: 'Marking and Labeling Compliance',
    description: 'Prepare samples showing ISI mark placement, safety warnings, and product information labels as per standard.',
    category: 'Verification & Marking',
    status: 'Attention',
    priority: 'High',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Needs verification against latest standard requirements.',
    is_mandatory: true,
    created_at: '2024-03-10T14:00:00Z',
    updated_at: '2024-03-18T10:30:00Z',
  },
  {
    id: 'item_010',
    project_id: 'comp_proj_001',
    title: 'Spare Parts and Service Documentation',
    description: 'Provide documentation for critical spare parts availability and authorized service center network.',
    category: 'Required Documents',
    status: 'Completed',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Service network documentation provided.',
    is_mandatory: false,
    created_at: '2024-03-05T11:00:00Z',
    updated_at: '2024-03-12T15:00:00Z',
  },
  {
    id: 'item_011',
    project_id: 'comp_proj_001',
    title: 'Factory Layout and Process Flow',
    description: 'Provide detailed factory layout showing manufacturing stages, quality checkpoints, and storage areas.',
    category: 'Manufacturing Details',
    status: 'Completed',
    priority: 'High',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Approved by compliance team.',
    is_mandatory: true,
    created_at: '2024-02-15T09:30:00Z',
    updated_at: '2024-02-22T16:45:00Z',
  },
  {
    id: 'item_012',
    project_id: 'comp_proj_001',
    title: 'Mechanical Durability Testing',
    description: 'Test fan operation under stress conditions: continuous 100-hour run, vibration analysis, bearing wear assessment.',
    category: 'Test Report',
    status: 'Completed',
    priority: 'High',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Completed with acceptable results.',
    is_mandatory: true,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-03-01T14:00:00Z',
  },
  {
    id: 'item_013',
    project_id: 'comp_proj_001',
    title: 'Packaging and Shipping Compliance',
    description: 'Verify packaging meets protection standards and handles product safely during transport and storage.',
    category: 'Required Documents',
    status: 'Pending',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Pending final review.',
    is_mandatory: false,
    created_at: '2024-03-15T13:00:00Z',
    updated_at: '2024-03-15T13:00:00Z',
  },
  {
    id: 'item_014',
    project_id: 'comp_proj_001',
    title: 'Climatic and Environmental Testing',
    description: 'Test product performance in various climatic conditions: high temperature, high humidity, low temperature.',
    category: 'Test Report',
    status: 'Attention',
    priority: 'Medium',
    related_standard_id: 'std_is374',
    related_document_id: null,
    notes: 'Test report pending from laboratory. Follow-up required.',
    is_mandatory: true,
    created_at: '2024-03-08T15:00:00Z',
    updated_at: '2024-03-16T11:20:00Z',
  },
  {
    id: 'item_015',
    project_id: 'comp_proj_001',
    title: 'BIS Inspection Readiness',
    description: 'Prepare factory for BIS inspection. Ensure all records, samples, and equipment are ready for verification.',
    category: 'Verification & Marking',
    status: 'Pending',
    priority: 'High',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Scheduled for Q3 2024.',
    is_mandatory: true,
    created_at: '2024-03-20T09:00:00Z',
    updated_at: '2024-03-20T09:00:00Z',
  },
  {
    id: 'item_016',
    project_id: 'comp_proj_001',
    title: 'User Manual and Instructions',
    description: 'Prepare user manual with installation, operation, maintenance, and safety instructions in English and local languages.',
    category: 'Required Documents',
    status: 'Pending',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Translations in progress.',
    is_mandatory: true,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-18T12:30:00Z',
  },
  {
    id: 'item_017',
    project_id: 'comp_proj_001',
    title: 'Technical Documentation Repository',
    description: 'Maintain centralized repository of all technical documentation, test reports, and compliance evidence.',
    category: 'Required Documents',
    status: 'Completed',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Repository set up and organized.',
    is_mandatory: false,
    created_at: '2024-03-12T11:00:00Z',
    updated_at: '2024-03-19T14:00:00Z',
  },
  {
    id: 'item_018',
    project_id: 'comp_proj_001',
    title: 'Regulatory Training and Awareness',
    description: 'Conduct training for manufacturing and quality teams on BIS regulations, standards requirements, and compliance procedures.',
    category: 'Verification & Marking',
    status: 'Completed',
    priority: 'Medium',
    related_standard_id: null,
    related_document_id: null,
    notes: 'Training completed for all personnel.',
    is_mandatory: false,
    created_at: '2024-02-25T09:00:00Z',
    updated_at: '2024-03-05T16:30:00Z',
  },
]

const MOCK_COMPLIANCE_SUMMARY = {
  project_id: 'comp_proj_001',
  documents: {
    completed: 6,
    total: 10,
    percentage: 60,
  },
  testing: {
    completed: 2,
    total: 5,
    percentage: 40,
  },
  requirements: {
    completed: 12,
    total: 15,
    percentage: 80,
  },
  overall_percentage: 65,
  status: 'In Progress',
}

/**
 * Simulate network delay
 */
function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock compliance API implementation
 */
export const mockComplianceApi = {
  /**
   * Get compliance project details
   * @param {string} projectId
   * @returns {Promise<Object>}
   */
  getComplianceProject: async (projectId) => {
    await delay()
    return MOCK_COMPLIANCE_PROJECT
  },

  /**
   * Get all compliance items for a project
   * @param {string} projectId
   * @returns {Promise<Array>}
   */
  getComplianceItems: async (projectId) => {
    await delay()
    return MOCK_COMPLIANCE_ITEMS
  },

  /**
   * Update a compliance item status
   * @param {string} itemId
   * @param {Object} updates
   * @returns {Promise<Object>}
   */
  updateComplianceItem: async (itemId, updates) => {
    await delay()
    const item = MOCK_COMPLIANCE_ITEMS.find((i) => i.id === itemId)
    if (!item) {
      throw new Error(`Item ${itemId} not found`)
    }
    Object.assign(item, updates, {
      updated_at: new Date().toISOString(),
    })
    return item
  },

  /**
   * Get compliance summary/dashboard data
   * @param {string} projectId
   * @returns {Promise<Object>}
   */
  getComplianceSummary: async (projectId) => {
    await delay()
    return MOCK_COMPLIANCE_SUMMARY
  },

  /**
   * Get compliance filters with counts
   * @param {string} projectId
   * @returns {Promise<Array>}
   */
  getComplianceFilters: async (projectId) => {
    await delay()
    const completed = MOCK_COMPLIANCE_ITEMS.filter(
      (i) => i.status === 'Completed'
    ).length
    const pending = MOCK_COMPLIANCE_ITEMS.filter(
      (i) => i.status === 'Pending'
    ).length
    const attention = MOCK_COMPLIANCE_ITEMS.filter(
      (i) => i.status === 'Attention'
    ).length
    const documents = MOCK_COMPLIANCE_ITEMS.filter(
      (i) => i.category === 'Required Documents'
    ).length
    const testing = MOCK_COMPLIANCE_ITEMS.filter(
      (i) => i.category === 'Test Report'
    ).length

    return [
      { type: 'All', label: 'All Items', count: MOCK_COMPLIANCE_ITEMS.length },
      { type: 'Completed', label: 'Completed', count: completed },
      { type: 'Pending', label: 'Pending', count: pending },
      { type: 'Attention', label: 'Needs Attention', count: attention },
      { type: 'Documents', label: 'Documents', count: documents },
      { type: 'Testing', label: 'Testing', count: testing },
    ]
  },
}
