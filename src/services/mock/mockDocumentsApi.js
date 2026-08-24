/**
 * @file src/services/mock/mockDocumentsApi.js
 * High-fidelity Mock API for BIS Industry Documents & Document Intelligence.
 * 
 * Simulates future FastAPI + RAG backend document processing:
 * - Ingestion & upload progress simulation
 * - Multi-stage RAG pipeline (Uploaded -> Extracted -> Chunked -> Embedded -> Indexed -> Ready)
 * - LocalStorage sync to preserve user actions during session
 * - Rich mock metadata, AI summaries, and key requirements
 */

import {
  DOCUMENT_STATUS,
  PROCESSING_STAGES,
} from '../../types/documents'

const STORAGE_KEY_DOCUMENTS = 'bis_industry_mock_documents_v1'

// High-fidelity Initial BIS Industry Documents
const INITIAL_MOCK_DOCUMENTS = [
  {
    id: 'doc_fan_test_001',
    name: 'IS374_Fan_Performance_Test_Report_Final.pdf',
    file_type: 'application/pdf',
    file_size: 2840500, // 2.7 MB
    uploaded_at: '2026-08-20T14:30:00.000Z',
    status: DOCUMENT_STATUS.READY,
    category: 'Test Report',
    related_standard_id: 'std_is374',
    related_standard_number: 'IS 374:2019',
    related_project_id: 'comp_proj_001',
    processing_stage: PROCESSING_STAGES.READY_FOR_AI,
    pages_count: 14,
    summary:
      'Laboratory test report for 1200mm Electric Ceiling Fan Model CF-480. All test parameters including air delivery (218 m³/min), electrical safety insulation resistance (> 100 MΩ at 500V DC), high-voltage withstand (1500V AC), and service value (4.36 m³/min/W) conform strictly to IS 374:2019 specifications. No non-conformities reported.',
    key_requirements: [
      'Air Delivery: 218 m³/min (Conforms to Table 1, Class A)',
      'Insulation Resistance: > 100 MΩ (Minimum requirement: 2 MΩ)',
      'High Voltage Flash Test: Passed at 1.5 kV AC for 60s without puncture',
      'Temperature Rise: Stator 58°C, Bearing 28°C (Permissible limit: 75°C)',
      'Earth Continuity: 0.04 Ω (Permissible maximum: 0.1 Ω)',
    ],
    extracted_text:
      'NATIONAL TESTING HOUSE (NTH) / TEST REPORT\nRef: NTH/EL/2026/08-442 | Date: 18-Aug-2026\nProduct: Electric Ceiling Type Fan (1200 mm Sweep)\nApplicant: Bharat Electricals Pvt. Ltd.\nStandard: IS 374:2019 (Amd. 1 & 2)\n1. Electrical Safety: The insulation resistance measured between live parts and frame is > 100 MΩ. High voltage withstand test at 1500V AC was applied for 60 seconds. No flashover or puncture observed.\n2. Air Delivery Test: Tested in air delivery tunnel conforming to Clause 8. Measured air delivery = 218 m³/min at 230V, 50 Hz. Power consumption = 50 W. Service value = 4.36.\n3. Conclusion: The sample conforms to all mandatory requirements of IS 374:2019.',
  },
  {
    id: 'doc_factory_layout_002',
    name: 'Factory_Layout_and_Process_Flow_v2.pdf',
    file_type: 'application/pdf',
    file_size: 4210000, // 4.0 MB
    uploaded_at: '2026-08-18T10:15:00.000Z',
    status: DOCUMENT_STATUS.READY,
    category: 'Factory Layout',
    related_standard_id: 'std_is374',
    related_standard_number: 'IS 374:2019',
    related_project_id: 'comp_proj_001',
    processing_stage: PROCESSING_STAGES.READY_FOR_AI,
    pages_count: 8,
    summary:
      'Plant layout and manufacturing process flow diagram for Unit-2 assembly facility. Identifies critical quality control hold points: incoming stator winding inspection, dynamic balancing station, 100% routine electrical flash test bench, and final packing stage with ISI Mark traceability stamping.',
    key_requirements: [
      'Designated Quarantine Area for rejected batch raw materials',
      'In-house Routine Testing Line with calibrated test meters',
      'Batch-wise sample drawing station conforming to BIS SIT Guidelines',
      'Adequate safety spacing (minimum 1.5m clearance between winding machines)',
    ],
    extracted_text:
      'MANUFACTURING FACILITY PROCESS SPECIFICATION\nBharat Electricals Ltd. - Unit II (Plot 42, Sector 8, Industrial Area)\nSection A: Raw Material Inward & Inspection Store\nSection B: Automated Stator Winding & Varnish Impregnation Line\nSection C: Rotor Die-Casting and Dynamic Balancing Station\nSection D: Final Assembly & 100% Routine Electrical Testing (HV Flash, Earth, Wattage)\nSection E: Finished Goods Warehouse with ISI Mark Serialization Scanner',
  },
  {
    id: 'doc_quality_manual_003',
    name: 'ISO_9001_Quality_Management_Manual.pdf',
    file_type: 'application/pdf',
    file_size: 1620000, // 1.5 MB
    uploaded_at: '2026-08-15T09:00:00.000Z',
    status: DOCUMENT_STATUS.READY,
    category: 'Quality Manual',
    related_standard_id: null,
    related_standard_number: null,
    related_project_id: 'comp_proj_001',
    processing_stage: PROCESSING_STAGES.READY_FOR_AI,
    pages_count: 32,
    summary:
      'Comprehensive Quality Management System (QMS) manual conforming to ISO 9001:2015 and BIS Scheme-I requirements. Covers internal audit schedules, calibration records management, non-conformance remediation procedures, and customer grievance redressal.',
    key_requirements: [
      'Clause 7.1.5: Monitoring and measuring resources calibration schedule',
      'Clause 8.5.2: Traceability and identification throughout production',
      'Clause 9.2: Biannual internal audit cycle',
      'Document retention policy: Minimum 5 years for quality inspection records',
    ],
    extracted_text:
      'QUALITY MANAGEMENT MANUAL (QM-01 Rev 4)\nConforming to ISO 9001:2015 and BIS STI Guidelines\nScope: Design, Manufacture, Testing, and Supply of Household Electrical Appliances.\nThe quality management system ensures all products bearing the ISI Mark undergo rigorous in-process verification and periodic testing in our accredited in-house testing facility.',
  },
  {
    id: 'doc_mat_cert_004',
    name: 'Motor_Winding_Copper_Material_Certificate.pdf',
    file_type: 'application/pdf',
    file_size: 860000, // 840 KB
    uploaded_at: '2026-08-12T16:45:00.000Z',
    status: DOCUMENT_STATUS.READY,
    category: 'Material Certificate',
    related_standard_id: 'std_is374',
    related_standard_number: 'IS 374:2019',
    related_project_id: 'comp_proj_001',
    processing_stage: PROCESSING_STAGES.READY_FOR_AI,
    pages_count: 3,
    summary:
      'Mill Test Certificate for Dual-Coat Enamelled Copper Winding Wire (Class 180 / Grade 2). Purity verified at 99.98% electrolytic grade copper. Thermal endurance and dielectric breakdown voltage exceed BIS standard minimums.',
    key_requirements: [
      'Purity: 99.98% Cu (Minimum requirement: 99.90%)',
      'Breakdown Voltage: 6.2 kV (Standard requirement: >= 4.0 kV)',
      'Heat Shock Test: 200°C for 30 minutes without coating crack',
    ],
    extracted_text:
      'SUPPLIER MILL TEST CERTIFICATE\nProduct: Dual-Coat Modified Polyester / Polyamide-imide Enamelled Copper Wire\nNominal Diameter: 0.355 mm (SWG 29) | Thermal Class: 180°C\nBatch No: CW-2026-8849 | Testing Standard: IS 13730 Part 13\nDielectric Breakdown: 6.2 kV | Elongation: 26% | Purity: 99.98% electrolytic copper.',
  },
  {
    id: 'doc_pvc_cable_draft_005',
    name: 'PVC_Cable_Insulation_Test_Report_Draft.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    file_size: 3350000, // 3.2 MB
    uploaded_at: '2026-08-24T18:20:00.000Z',
    status: DOCUMENT_STATUS.PROCESSING,
    category: 'Test Report',
    related_standard_id: 'std_is694',
    related_standard_number: 'IS 694:2010',
    related_project_id: null,
    processing_stage: PROCESSING_STAGES.CHUNKED,
    pages_count: 6,
    summary: null,
    key_requirements: [],
    extracted_text: null,
  },
  {
    id: 'doc_marking_sample_006',
    name: 'ISI_Mark_Packaging_Artwork_Sample.png',
    file_type: 'image/png',
    file_size: 970000, // 950 KB
    uploaded_at: '2026-08-24T11:10:00.000Z',
    status: DOCUMENT_STATUS.FAILED,
    category: 'Marking & Artwork',
    related_standard_id: 'std_is374',
    related_standard_number: 'IS 374:2019',
    related_project_id: 'comp_proj_001',
    processing_stage: PROCESSING_STAGES.FAILED,
    pages_count: 1,
    summary: null,
    key_requirements: [],
    extracted_text: null,
    error_message:
      'OCR resolution too low to verify mandatory ISI monogram dimensions and CML license number format. Please upload a vector PDF or high-resolution 300 DPI image.',
  },
]

// Storage Handler with LocalStorage fallback
class MockDocumentStore {
  constructor() {
    this.documents = this.load()
  }

  load() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY_DOCUMENTS)
      if (serialized) {
        const parsed = JSON.parse(serialized)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // LocalStorage error or unavailable
    }
    return [...INITIAL_MOCK_DOCUMENTS]
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY_DOCUMENTS, JSON.stringify(this.documents))
    } catch {
      // Ignore storage errors
    }
  }
}

const store = new MockDocumentStore()

// Helper: simulate latency
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockDocumentsApi = {
  /**
   * Fetch documents with optional filter and sorting params
   * @param {import('../../types/documents').DocumentFilterParams} [params={}]
   * @returns {Promise<{ documents: Array<import('../../types/documents').Document>, total: number }>}
   */
  async getDocuments(params = {}) {
    await delay(300)

    let list = [...store.documents]

    // Filter by search query
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim()
      list = list.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q) ||
          (doc.related_standard_number && doc.related_standard_number.toLowerCase().includes(q)) ||
          (doc.summary && doc.summary.toLowerCase().includes(q))
      )
    }

    // Filter by status
    if (params.status && params.status !== 'All') {
      list = list.filter((doc) => doc.status === params.status)
    }

    // Filter by category
    if (params.category && params.category !== 'All') {
      list = list.filter((doc) => doc.category === params.category)
    }

    // Sort
    const sortBy = params.sortBy || 'latest'
    list.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      }
      if (sortBy === 'oldest') {
        return new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'size_desc') {
        return b.file_size - a.file_size
      }
      return 0
    })

    return {
      documents: list,
      total: list.length,
    }
  },

  /**
   * Fetch a single document by ID
   * @param {string} id
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async getDocumentById(id) {
    await delay(250)
    const doc = store.documents.find((d) => d.id === id)
    if (!doc) {
      throw new Error(`Document with ID "${id}" not found.`)
    }
    return { ...doc }
  },

  /**
   * Fetch aggregate document counts
   * @returns {Promise<import('../../types/documents').DocumentStats>}
   */
  async getDocumentStats() {
    await delay(150)
    const docs = store.documents
    return {
      total: docs.length,
      ready: docs.filter((d) => d.status === DOCUMENT_STATUS.READY).length,
      processing: docs.filter(
        (d) => d.status === DOCUMENT_STATUS.PROCESSING || d.status === DOCUMENT_STATUS.UPLOADING
      ).length,
      failed: docs.filter((d) => d.status === DOCUMENT_STATUS.FAILED).length,
    }
  },

  /**
   * Upload a new document with simulated progress
   * @param {Object} payload
   * @param {File|Object} payload.file
   * @param {string} [payload.category='Product Specification']
   * @param {string} [payload.related_standard_number]
   * @param {string} [payload.related_project_id]
   * @param {Function} [onProgress]
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async uploadDocument(payload, onProgress) {
    const fileName = payload.file?.name || payload.name || 'Uploaded_Document.pdf'
    const fileSize = payload.file?.size || payload.file_size || 1845000
    const fileType = payload.file?.type || payload.file_type || 'application/pdf'

    // Step 1: Simulate upload progress events
    if (typeof onProgress === 'function') {
      onProgress(15)
      await delay(200)
      onProgress(45)
      await delay(250)
      onProgress(80)
      await delay(200)
      onProgress(100)
      await delay(150)
    } else {
      await delay(600)
    }

    // Step 2: Create new document record in 'processing' stage
    const newDocId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
    const standardNumber = payload.related_standard_number || 'IS 374:2019'
    const category = payload.category || 'Product Specification'

    const newDocument = {
      id: newDocId,
      name: fileName,
      file_type: fileType,
      file_size: fileSize,
      uploaded_at: new Date().toISOString(),
      status: DOCUMENT_STATUS.PROCESSING,
      category,
      related_standard_id: standardNumber.toLowerCase().includes('374') ? 'std_is374' : null,
      related_standard_number: standardNumber || null,
      related_project_id: payload.related_project_id || 'comp_proj_001',
      processing_stage: PROCESSING_STAGES.TEXT_EXTRACTED,
      pages_count: Math.floor(Math.random() * 8) + 2,
      summary: null,
      key_requirements: [],
      extracted_text: null,
    }

    store.documents.unshift(newDocument)
    store.save()

    // Step 3: Automatically simulate background AI extraction & readiness after short delay
    setTimeout(() => {
      const idx = store.documents.findIndex((d) => d.id === newDocId)
      if (idx !== -1) {
        store.documents[idx].status = DOCUMENT_STATUS.READY
        store.documents[idx].processing_stage = PROCESSING_STAGES.READY_FOR_AI
        store.documents[idx].summary = `AI Document Analysis Complete: Verified specifications and compliance clauses against ${standardNumber}. Extracted technical ratings, component descriptions, and quality checkpoints.`
        store.documents[idx].key_requirements = [
          `Verified compliance with standard ${standardNumber} specifications`,
          'Mandatory routine tests and acceptance thresholds identified',
          'Document indexed for RAG contextual AI retrieval',
        ]
        store.documents[idx].extracted_text = `EXTRACTED CONTENT FOR: ${fileName}\nCategory: ${category}\nApplicable Standard: ${standardNumber}\nStatus: Successfully indexed in BIS Assistant Vector Store.`
        store.save()
      }
    }, 4500)

    return { ...newDocument }
  },

  /**
   * Delete a document by ID
   * @param {string} id
   * @returns {Promise<{ success: boolean, id: string }>}
   */
  async deleteDocument(id) {
    await delay(300)
    const exists = store.documents.some((d) => d.id === id)
    if (!exists) {
      throw new Error(`Document "${id}" does not exist.`)
    }
    store.documents = store.documents.filter((d) => d.id !== id)
    store.save()
    return { success: true, id }
  },

  /**
   * Retry processing for a failed or stuck document
   * @param {string} id
   * @returns {Promise<import('../../types/documents').Document>}
   */
  async retryDocumentProcessing(id) {
    await delay(400)
    const doc = store.documents.find((d) => d.id === id)
    if (!doc) {
      throw new Error(`Document "${id}" not found.`)
    }

    doc.status = DOCUMENT_STATUS.PROCESSING
    doc.processing_stage = PROCESSING_STAGES.PROCESSING
    doc.error_message = null
    store.save()

    // Simulate completion
    setTimeout(() => {
      const target = store.documents.find((d) => d.id === id)
      if (target) {
        target.status = DOCUMENT_STATUS.READY
        target.processing_stage = PROCESSING_STAGES.READY_FOR_AI
        target.summary = `Reprocessing succeeded. OCR text layer extracted and indexed against standard ${target.related_standard_number || 'IS 374:2019'}.`
        target.key_requirements = [
          'Artwork & Marking verification: ISI monogram dimensions meet minimum 5mm height requirement',
          'License number (CM/L) format verified',
        ]
        target.extracted_text = `OCR Reprocessing Complete for ${target.name}.\nStandard Mark: Conforms to Scheme-I Marking Guidelines.`
        store.save()
      }
    }, 3000)

    return { ...doc }
  },

  /**
   * Get document content / extracted text (Future RAG endpoint simulation)
   * @param {string} id
   * @returns {Promise<{ id: string, extracted_text: string|null, processing_stage: string }>}
   */
  async getDocumentContent(id) {
    await delay(200)
    const doc = store.documents.find((d) => d.id === id)
    if (!doc) throw new Error(`Document "${id}" not found.`)
    return {
      id: doc.id,
      extracted_text: doc.extracted_text,
      processing_stage: doc.processing_stage,
    }
  },

  /**
   * Get document AI summary (Future RAG endpoint simulation)
   * @param {string} id
   * @returns {Promise<{ id: string, summary: string|null, key_requirements: Array<string> }>}
   */
  async getDocumentSummary(id) {
    await delay(200)
    const doc = store.documents.find((d) => d.id === id)
    if (!doc) throw new Error(`Document "${id}" not found.`)
    return {
      id: doc.id,
      summary: doc.summary,
      key_requirements: doc.key_requirements || [],
    }
  },

  /**
   * Get document real-time processing status (Future RAG endpoint simulation)
   * @param {string} id
   * @returns {Promise<{ id: string, status: string, processing_stage: string }>}
   */
  async getDocumentStatus(id) {
    await delay(150)
    const doc = store.documents.find((d) => d.id === id)
    if (!doc) throw new Error(`Document "${id}" not found.`)
    return {
      id: doc.id,
      status: doc.status,
      processing_stage: doc.processing_stage,
    }
  },
}
