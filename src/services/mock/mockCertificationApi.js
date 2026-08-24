/**
 * @file src/services/mock/mockCertificationApi.js
 * High-fidelity Mock API for Guided BIS Certification Assistant.
 * 
 * - Clearly labeled demo/fictional certification data
 * - Simulates network latency with Promises
 * - Comprehensive data mapped per product & standard
 */

// Preset Products Catalog
const MOCK_PRODUCTS = [
  {
    id: 'prod_fan',
    name: 'Electric Ceiling Fan',
    category: 'Electrotechnical',
    description: 'Single-phase AC domestic & commercial ceiling fans with speed regulators.',
    default_standard_id: 'std_is374',
    icon_name: 'Fan',
  },
  {
    id: 'prod_bottle',
    name: 'Stainless Steel Water Bottle / Vacuum Flask',
    category: 'Mechanical',
    description: 'Double-walled insulated food-contact steel flasks & reusable bottles.',
    default_standard_id: 'std_is17803',
    icon_name: 'Bottle',
  },
  {
    id: 'prod_plug',
    name: 'Domestic Plugs and Socket-Outlets',
    category: 'Electrotechnical',
    description: '2-pin and 3-pin 6A/16A electrical plugs, sockets, and adaptors.',
    default_standard_id: 'std_is1293',
    icon_name: 'Plug',
  },
  {
    id: 'prod_led',
    name: 'LED Luminaires & Downlights',
    category: 'Electronics & IT',
    description: 'Commercial & residential fixed LED luminaires, panel lights, and drivers.',
    default_standard_id: 'std_is10322',
    icon_name: 'Lightbulb',
  },
  {
    id: 'prod_battery',
    name: 'Lithium-ion Secondary Cells & Battery Packs',
    category: 'Electronics & IT',
    description: 'Rechargeable lithium battery cells used in electronics and power banks.',
    default_standard_id: 'std_is16046',
    icon_name: 'Battery',
  },
  {
    id: 'prod_steel',
    name: 'Hot Rolled Structural Steel',
    category: 'Civil & Structural',
    description: 'High tensile steel plates, beams, channels, and angles for construction.',
    default_standard_id: 'std_is2062',
    icon_name: 'Layers',
  },
  {
    id: 'prod_water',
    name: 'Packaged Drinking Water',
    category: 'Chemicals & Food',
    description: 'Hermetically sealed treated drinking water in bottles, pouches, and jars.',
    default_standard_id: 'std_is14543',
    icon_name: 'Droplet',
  },
]

// Standards Mapped by Product
const MOCK_STANDARDS_BY_PRODUCT = {
  prod_fan: [
    {
      id: 'std_is374',
      standard_number: 'IS 374:2019 (Demo)',
      title: 'Electric Ceiling Type Fans and Regulators — Specification',
      description: 'Primary standard covering electrical insulation, service value, and blade safety.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Mandatory under DPIIT Quality Control Order',
      category: 'Electrotechnical',
      relevance: 'Primary Match',
    },
    {
      id: 'std_is302_1',
      standard_number: 'IS 302 (Part 1):2008 (Demo)',
      title: 'Safety of Household and Similar Electrical Appliances — General Requirements',
      description: 'General safety baseline for electrical appliances.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Cross-referenced in IS 374',
      category: 'Electrotechnical',
      relevance: 'Related Standard',
    },
  ],
  prod_bottle: [
    {
      id: 'std_is17803',
      standard_number: 'IS 17803:2022 (Demo)',
      title: 'Stainless Steel Vacuum Flasks and Insulated Water Bottles — Specification',
      description: 'Prescribes food-grade steel (Grade 304/316), drop test, and thermal retention.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Mandatory under DPIIT Steel Products QCO',
      category: 'Mechanical',
      relevance: 'Primary Match',
    },
  ],
  prod_plug: [
    {
      id: 'std_is1293',
      standard_number: 'IS 1293:2019 (Demo)',
      title: 'Plugs and Socket-Outlets for Domestic and Similar Purposes (up to 250V / 16A)',
      description: 'Covers contact engagement, temperature rise, and shutter safety.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Mandatory under Electrical Accessories QCO',
      category: 'Electrotechnical',
      relevance: 'Primary Match',
    },
  ],
  prod_led: [
    {
      id: 'std_is10322',
      standard_number: 'IS 10322 (Part 5/Sec 1):2014 (Demo)',
      title: 'Luminaires for General Lighting — Fixed LED Luminaires',
      description: 'Photobiological safety, ingress protection, and electrical isolation.',
      scheme: 'Compulsory Registration Scheme (CRS)',
      qco_mandatory: 'Mandatory under MeitY CRS Scheme',
      category: 'Electronics & IT',
      relevance: 'Primary Match',
    },
    {
      id: 'std_is15885',
      standard_number: 'IS 15885 (Part 2/Sec 13):2012 (Demo)',
      title: 'Safety of Lamp Controlgear — DC/AC Electronic Controlgear for LED Modules',
      description: 'Electronic LED Driver safety standard.',
      scheme: 'Compulsory Registration Scheme (CRS)',
      qco_mandatory: 'Mandatory under MeitY CRS Scheme',
      category: 'Electronics & IT',
      relevance: 'Related Standard',
    },
  ],
  prod_battery: [
    {
      id: 'std_is16046',
      standard_number: 'IS 16046 (Part 2):2018 (Demo)',
      title: 'Secondary Cells and Batteries Containing Alkaline Electrolytes (Lithium Systems)',
      description: 'Safety requirements against overcharge, short circuit, and thermal abuse.',
      scheme: 'Compulsory Registration Scheme (CRS)',
      qco_mandatory: 'Mandatory under MeitY Electronics QCO',
      category: 'Electronics & IT',
      relevance: 'Primary Match',
    },
  ],
  prod_steel: [
    {
      id: 'std_is2062',
      standard_number: 'IS 2062:2011 (Demo)',
      title: 'Hot Rolled Medium and High Tensile Structural Steel — Specification',
      description: 'Chemical composition, tensile strength, yield stress, and impact testing.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Mandatory under Ministry of Steel QCO',
      category: 'Civil & Structural',
      relevance: 'Primary Match',
    },
  ],
  prod_water: [
    {
      id: 'std_is14543',
      standard_number: 'IS 14543:2016 (Demo)',
      title: 'Packaged Drinking Water (Other than Natural Mineral Water) — Specification',
      description: 'Chemical purity, microbiological zero-tolerance, and in-house lab setup.',
      scheme: 'Scheme-I (ISI Mark)',
      qco_mandatory: 'Mandatory under Food Safety & BIS Act',
      category: 'Chemicals & Food',
      relevance: 'Primary Match',
    },
  ],
}

// Fallback Standard for custom queries
const DEFAULT_STANDARD = {
  id: 'std_custom_demo',
  standard_number: 'IS Standard (Demo Assessment)',
  title: 'Standard Compliance for Indian Market Conformity',
  description: 'Applicable standard under BIS product conformity schemes.',
  scheme: 'Scheme-I (ISI Mark)',
  qco_mandatory: 'Mandatory verification required',
  category: 'General Engineering',
  relevance: 'Primary Match',
}

// Mock Requirements by Standard
const MOCK_REQUIREMENTS = {
  default: [
    {
      id: 'req_1',
      category: 'Product Safety',
      title: 'Electrical Insulation & Breakdown Protection',
      description: 'Product must withstand dielectric voltage test without flashover or insulation rupture.',
      importance: 'Mandatory',
      clause: 'Clause 4.2 & Clause 5.1',
    },
    {
      id: 'req_2',
      category: 'Manufacturing Process',
      title: 'In-House Production & Assembly Line Setup',
      description: 'Complete manufacturing machinery for core assembly must be installed within factory premises.',
      importance: 'Mandatory',
      clause: 'Chapter 2 SIT',
    },
    {
      id: 'req_3',
      category: 'Quality Control',
      title: 'Scheme of Inspection and Testing (SIT) Adherence',
      description: 'Routine batch testing records must be maintained with calibrated test instruments.',
      importance: 'Critical',
      clause: 'Clause 8.1',
    },
    {
      id: 'req_4',
      category: 'Marking & Packaging',
      title: 'ISI Mark & License (CM/L) Number Stenciling',
      description: 'Standard Mark must be permanently affixed alongside manufacturer brand and batch number.',
      importance: 'Mandatory',
      clause: 'Clause 12.1',
    },
    {
      id: 'req_5',
      category: 'Documentation',
      title: 'Competency Qualification for QC Supervisors',
      description: 'At least one full-time qualified Quality Control in-charge with relevant engineering diploma/degree.',
      importance: 'Recommended',
      clause: 'BIS Operating Manual',
    },
  ],
}

// Mock Testing Protocols by Standard
const MOCK_TESTS = {
  default: [
    {
      id: 'test_1',
      test_name: 'High-Voltage Flash & Dielectric Withstand Test',
      clause: 'Clause 5.1',
      test_type: 'In-House Routine',
      parameters: '1500V AC applied for 1 second; zero leakage/flashover',
      frequency: '100% of production units',
      guidance: 'Perform at final assembly testing station before packaging.',
      required_equipment: 'Digital High Voltage Flash Tester (Calibrated)',
    },
    {
      id: 'test_2',
      test_name: 'Insulation Resistance Measurement',
      clause: 'Clause 4.2',
      test_type: 'In-House Routine',
      parameters: 'Minimum 2.0 MΩ tested at 500V DC',
      frequency: '1 sample per batch of 50 units',
      guidance: 'Ensure room humidity is maintained below 70% during test.',
      required_equipment: 'Digital Megohmmeter (Megger 500V)',
    },
    {
      id: 'test_3',
      test_name: 'Performance & Energy Efficiency (Air Delivery / Thermal Retention)',
      clause: 'Clause 8.1',
      test_type: 'Independent Laboratory',
      parameters: 'Conformity to declared star-rating service value thresholds',
      frequency: 'Pre-license type test & annual audit sample',
      guidance: 'Tested at BIS Recognized or NABL Accredited testing laboratory.',
      required_equipment: 'Standardized Chamber & Power Analyzer',
    },
    {
      id: 'test_4',
      test_name: 'Mechanical Drop & Impact Resistance',
      clause: 'Clause 6.4',
      test_type: 'In-House Routine',
      parameters: 'Drop from 1.2 meters without shell crack or leakage',
      frequency: '1 sample per production lot',
      guidance: 'Conduct on rigid horizontal concrete surface.',
      required_equipment: 'Drop Test Rig with height gauge',
    },
  ],
}

// Mock Required Documents
const MOCK_DOCUMENTS = [
  {
    id: 'doc_1',
    category: 'Legal & Identity',
    title: 'Business Registration Proof (CIN / GST / MSME Udyam)',
    description: 'Must clearly state exact manufacturing factory address (not just registered corporate office).',
    mandatory: true,
    prepared: true,
    format_notes: 'Government issued digital certificate',
  },
  {
    id: 'doc_2',
    category: 'Factory & Premises',
    title: 'Factory License / Land Title Deed / Valid Lease Agreement',
    description: 'Proof of legal possession of factory premises with minimum 3 years lease validity.',
    mandatory: true,
    prepared: true,
    format_notes: 'Registered document with municipal/state approval',
  },
  {
    id: 'doc_3',
    category: 'Machinery & Production',
    title: 'List of Manufacturing Machinery & Installed Capacity',
    description: 'Tabulated list of production machines with make, model, capacity, and serial numbers.',
    mandatory: true,
    prepared: false,
    format_notes: 'Signed and stamped by authorized signatory',
  },
  {
    id: 'doc_4',
    category: 'Quality & Lab',
    title: 'In-House Test Equipment & Valid Calibration Certificates',
    description: 'Calibration certificates from NABL accredited lab traceable to National Physical Laboratory (NPL).',
    mandatory: true,
    prepared: false,
    format_notes: 'Calibration must be valid within last 12 months',
  },
  {
    id: 'doc_5',
    category: 'Quality & Lab',
    title: 'Qualification Proof of Quality Control Personnel',
    description: 'Degree/Diploma certificates and appointment letters of QC testing staff.',
    mandatory: true,
    prepared: false,
    format_notes: 'Degree certificate + resume copy',
  },
  {
    id: 'doc_6',
    category: 'Process Control',
    title: 'Manufacturing Flow Chart & SIT Acceptance Letter',
    description: 'Step-by-step production flow chart indicating inspection hold points and raw material testing.',
    mandatory: true,
    prepared: false,
    format_notes: 'Detailed diagram with test frequency tags',
  },
]

// Latency helper
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockCertificationApi = {
  /**
   * Fetch all available product categories/presets
   * @returns {Promise<ProductOption[]>}
   */
  async getProductOptions() {
    await delay(180)
    return [...MOCK_PRODUCTS]
  },

  /**
   * Fetch applicable Indian Standards for a selected product
   * @param {string} productIdentifier - Product ID or custom search query
   * @returns {Promise<CertificationStandard[]>}
   */
  async getApplicableStandards(productIdentifier) {
    await delay(300)

    // Match by ID
    if (MOCK_STANDARDS_BY_PRODUCT[productIdentifier]) {
      return [...MOCK_STANDARDS_BY_PRODUCT[productIdentifier]]
    }

    // Match by Name keyword
    const lower = (productIdentifier || '').toLowerCase()
    for (const [prodId, standards] of Object.entries(MOCK_STANDARDS_BY_PRODUCT)) {
      const prod = MOCK_PRODUCTS.find((p) => p.id === prodId)
      if (prod && (lower.includes(prod.name.toLowerCase()) || prod.name.toLowerCase().includes(lower))) {
        return [...standards]
      }
    }

    // Fallback standard for custom product input
    return [
      {
        ...DEFAULT_STANDARD,
        title: `Standard Requirements for ${productIdentifier || 'Product'} (Demo)`,
      },
    ]
  },

  /**
   * Fetch compliance requirements for a standard
   * @param {string} standardId
   * @returns {Promise<Requirement[]>}
   */
  async getRequirements(standardId) {
    await delay(250)
    return [...MOCK_REQUIREMENTS.default]
  },

  /**
   * Fetch testing requirements for a standard
   * @param {string} standardId
   * @returns {Promise<TestingRequirement[]>}
   */
  async getTestingRequirements(standardId) {
    await delay(250)
    return [...MOCK_TESTS.default]
  },

  /**
   * Fetch required document checklist for a standard
   * @param {string} standardId
   * @returns {Promise<RequiredDocument[]>}
   */
  async getRequiredDocuments(standardId) {
    await delay(220)
    return [...MOCK_DOCUMENTS]
  },

  /**
   * Generate certification roadmap based on current state
   * @param {Object} data
   * @returns {Promise<CertificationRoadmap>}
   */
  async generateRoadmap({ productName = 'Electric Ceiling Fan', standardNumber = 'IS 374:2019 (Demo)', preparedDocsCount = 2, totalDocsCount = 6 } = {}) {
    await delay(300)

    const docPercentage = Math.round((preparedDocsCount / totalDocsCount) * 100)
    const overallProgress = Math.min(100, Math.round(30 + (docPercentage * 0.4)))

    return {
      product_name: productName,
      standard_number: standardNumber,
      scheme: 'Scheme-I (ISI Mark)',
      overall_progress: overallProgress,
      estimated_timeline: '30 - 45 Business Days',
      stages: [
        {
          number: 1,
          title: 'Product & Standard Identification',
          description: `Mapped ${productName} against ${standardNumber}.`,
          status: 'completed',
          timeline: '1-2 Days',
          key_actions: ['Product category confirmed', 'Indian Standard scope verified', 'QCO applicability checked'],
        },
        {
          number: 2,
          title: 'Gap Analysis & Requirements Review',
          description: 'Review manufacturing tolerances, electrical insulation, and critical safety clauses.',
          status: 'completed',
          timeline: '3-5 Days',
          key_actions: ['Technical clauses reviewed', 'SIT inspection points mapped'],
        },
        {
          number: 3,
          title: 'In-House Test Laboratory Setup',
          description: 'Procure and calibrate all mandatory testing instruments required by the Scheme of Testing (SIT).',
          status: 'current',
          timeline: '10-15 Days',
          key_actions: ['HV flash tester calibration', 'Insulation resistance meter setup', 'Quality testing logbook established'],
        },
        {
          number: 4,
          title: 'Application Dossier Preparation',
          description: `Assemble technical files, factory licenses, and QC appointment letters (${preparedDocsCount}/${totalDocsCount} prepared).`,
          status: preparedDocsCount === totalDocsCount ? 'completed' : 'current',
          timeline: '5-7 Days',
          key_actions: ['Form-I completion', 'Calibration certificates assembly', 'QC resume verification'],
        },
        {
          number: 5,
          title: 'Online Application on Manakonline',
          description: 'Submit Form-I application along with prescribed BIS application and audit fees.',
          status: 'pending',
          timeline: '1-2 Days',
          key_actions: ['Fee payment processing', 'Application acknowledgment generation'],
        },
        {
          number: 6,
          title: 'BIS Factory Audit & Sample Drawing',
          description: 'BIS inspecting officers audit production line, verify in-house testing, and draw independent samples.',
          status: 'pending',
          timeline: '7-10 Days',
          key_actions: ['Plant inspection', 'QC personnel competency interview', 'Sample sealing for independent lab'],
        },
        {
          number: 7,
          title: 'Independent Laboratory Testing',
          description: 'Drawn sealed samples tested at BIS Recognized / NABL Accredited laboratory.',
          status: 'pending',
          timeline: '15-20 Days',
          key_actions: ['Type test compliance', 'Lab test report generation'],
        },
        {
          number: 8,
          title: 'Grant of BIS License (ISI Mark)',
          description: 'BIS issues Certificate of Conformity and 7-digit CM/L license number with Standard Mark rights.',
          status: 'pending',
          timeline: '3-5 Days',
          key_actions: ['CM/L license issued', 'Marking permission granted on packaging'],
        },
      ],
    }
  },
}
