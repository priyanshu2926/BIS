/**
 * @file src/services/mock/mockTestingApi.js
 * High-fidelity Mock API for BIS Testing & Laboratories.
 * 
 * Provides demo testing requirements, laboratory data, and search functionality.
 * Simulates network latency with Promises.
 * All data is clearly marked as DEMO.
 */

const MOCK_PRODUCTS = [
  {
    id: 'prod_fan',
    name: 'Electric Ceiling Fan',
    standard_id: 'std_is374',
    category: 'Electrotechnical',
  },
  {
    id: 'prod_bottle',
    name: 'Stainless Steel Water Bottle',
    standard_id: 'std_is17803',
    category: 'Mechanical',
  },
  {
    id: 'prod_plug',
    name: 'Domestic Plugs and Socket-Outlets',
    standard_id: 'std_is1293',
    category: 'Electrotechnical',
  },
  {
    id: 'prod_led',
    name: 'LED Luminaires & Downlights',
    standard_id: 'std_is10322',
    category: 'Electronics & IT',
  },
]

const MOCK_STANDARDS = [
  {
    id: 'std_is374',
    standard_number: 'IS 374:2019',
    title: 'Domestic Ceiling Fans (Demo)',
  },
  {
    id: 'std_is17803',
    standard_number: 'IS 17803:2019',
    title: 'Food-Grade Stainless Steel Flasks (Demo)',
  },
  {
    id: 'std_is1293',
    standard_number: 'IS 1293:2021',
    title: 'Plugs and Socket-Outlets (Demo)',
  },
  {
    id: 'std_is10322',
    standard_number: 'IS 10322:2020',
    title: 'LED Luminaires Specification (Demo)',
  },
]

const MOCK_TEST_REQUIREMENTS = {
  std_is374: [
    {
      id: 'test_001',
      name: 'Electrical Safety Test',
      description:
        'Complete electrical safety verification including insulation resistance, leakage current, voltage withstand, and short-circuit protection.',
      category: 'Electrical Safety',
      status: 'Required',
      standard_id: 'std_is374',
      parameters: 'Insulation: ≥7 MΩ at 500V DC; Leakage current: <3.5 mA',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance:
        'Conduct in accredited NABL laboratory. Test includes safety under fault conditions.',
    },
    {
      id: 'test_002',
      name: 'Performance Test - Airflow & Noise',
      description:
        'Measure air circulation capacity and noise levels at different speed settings.',
      category: 'Performance',
      status: 'Required',
      standard_id: 'std_is374',
      parameters: 'Airflow: As per standard; Noise: ≤70 dB at rated speed',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance: 'Use calibrated instruments. Test at rated voltage and speed.',
    },
    {
      id: 'test_003',
      name: 'Mechanical Durability Test',
      description:
        'Stress test for continuous 100-hour operation to verify mechanical integrity.',
      category: 'Construction',
      status: 'Required',
      standard_id: 'std_is374',
      parameters: '100-hour continuous operation; Bearing wear <0.1mm',
      test_type: 'In-House Routine',
      frequency: 'Production batch testing',
      guidance:
        'Conduct at manufacturing facility with recorded results.',
    },
    {
      id: 'test_004',
      name: 'Thermal Cycling Test',
      description:
        'Environmental test for temperature stability: high temperature, low temperature, humidity cycles.',
      category: 'Environmental',
      status: 'Required',
      standard_id: 'std_is374',
      parameters:
        '10 cycles: 55°C/95% RH for 4h, then 5°C for 2h',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance: 'Accredited environmental testing chamber required.',
    },
    {
      id: 'test_005',
      name: 'Construction & Material Compliance',
      description:
        'Verification of blade material grades, fastener quality, motor specifications.',
      category: 'Construction',
      status: 'Required',
      standard_id: 'std_is374',
      parameters: 'Material certifications, hardness tests, dimensional checks',
      test_type: 'In-House Routine',
      frequency: 'Batch testing at production',
      guidance:
        'Review material test certificates from suppliers. Check dimensions.',
    },
    {
      id: 'test_006',
      name: 'Marking & Labeling Verification',
      description: 'Verify ISI mark placement, safety warnings, and product information labels.',
      category: 'Marking & Packaging',
      status: 'Recommended',
      standard_id: 'std_is374',
      parameters: 'ISI mark size, warning label placement, language compliance',
      test_type: 'In-House Routine',
      frequency: 'Pre-production sample check',
      guidance:
        'Coordinate with Quality team. Ensure label durability and visibility.',
    },
  ],
  std_is17803: [
    {
      id: 'test_101',
      name: 'Food-Grade Material Test',
      description: 'Verify stainless steel composition and food-contact safety.',
      category: 'Construction',
      status: 'Required',
      standard_id: 'std_is17803',
      parameters: 'Steel grade 304/316; Nickel release <0.5 mg/dm²/day',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance: 'Use certified material suppliers. Request test certificates.',
    },
    {
      id: 'test_102',
      name: 'Thermal Insulation Test',
      description: 'Measure heat retention and insulation effectiveness.',
      category: 'Performance',
      status: 'Required',
      standard_id: 'std_is17803',
      parameters: 'Temperature retention: >85% after 6 hours',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance: 'Standard test under ambient conditions (20-25°C).',
    },
    {
      id: 'test_103',
      name: 'Durability & Stress Test',
      description:
        'Test structural integrity under pressure and repeated use cycles.',
      category: 'Durability',
      status: 'Required',
      standard_id: 'std_is17803',
      parameters: '1000 open/close cycles; Pressure test at 1.5 bar',
      test_type: 'In-House Routine',
      frequency: 'Sample batch testing',
      guidance: 'Automated testing equipment recommended.',
    },
  ],
  std_is1293: [
    {
      id: 'test_201',
      name: 'Electrical Safety Test - Contact Resistance',
      description: 'Verify contact resistance and electrical continuity.',
      category: 'Electrical Safety',
      status: 'Required',
      standard_id: 'std_is1293',
      parameters: 'Contact resistance: <0.1 Ω',
      test_type: 'Third-Party Laboratory',
      frequency: 'Sample testing from each batch',
      guidance: 'Use precision measuring instruments.',
    },
    {
      id: 'test_202',
      name: 'Mechanical Strength Test',
      description: 'Test plug insertion force, retention, and mechanical durability.',
      category: 'Construction',
      status: 'Required',
      standard_id: 'std_is1293',
      parameters: 'Insertion force: 80-120 N; 5000 insertion cycles',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance:
        'Specialized test equipment required. NABL accreditation mandatory.',
    },
    {
      id: 'test_203',
      name: 'Temperature & Flammability Test',
      description: 'Test material performance at elevated temperatures and flame resistance.',
      category: 'Environmental',
      status: 'Required',
      standard_id: 'std_is1293',
      parameters: 'Thermal stability at 80°C; V-0 flame rating',
      test_type: 'Third-Party Laboratory',
      frequency: 'Once during certification',
      guidance: 'Accredited fire testing lab required.',
    },
  ],
}

const MOCK_LABORATORIES = [
  {
    id: 'lab_001',
    name: 'Central Testing Laboratory (Demo)',
    location: 'New Delhi',
    state: 'Delhi',
    capabilities: [
      'Electrical Safety Testing',
      'Performance Testing',
      'Environmental Chambers',
      'Mechanical Testing',
    ],
    status: 'Accredited',
    test_categories: [
      'Electrical Safety',
      'Performance',
      'Environmental',
      'Durability',
    ],
    phone: '+91-11-XXXX-XXXX (Demo)',
    email: 'contact@demo-ctl.in (Demo)',
    website: 'www.demo-ctl.in (Demo)',
    accepts_online_submissions: true,
    turnaround_days: 14,
    accreditation: 'NABL Accredited - Scope: Electrical, Mechanical',
  },
  {
    id: 'lab_002',
    name: 'Metro Test Solutions (Demo)',
    location: 'Mumbai',
    state: 'Maharashtra',
    capabilities: [
      'Thermal Testing',
      'Material Analysis',
      'Flame Testing',
      'Mechanical Strength',
    ],
    status: 'Accredited',
    test_categories: [
      'Environmental',
      'Construction',
      'Durability',
      'Marking & Packaging',
    ],
    phone: '+91-22-XXXX-XXXX (Demo)',
    email: 'info@demo-metro.com (Demo)',
    website: 'www.demo-metro.com (Demo)',
    accepts_online_submissions: true,
    turnaround_days: 21,
    accreditation: 'NABL Accredited - Scope: Material, Environmental',
  },
  {
    id: 'lab_003',
    name: 'Precision Labs India (Demo)',
    location: 'Bangalore',
    state: 'Karnataka',
    capabilities: [
      'Electrical Testing',
      'Performance Analysis',
      'Quality Verification',
    ],
    status: 'Accredited',
    test_categories: ['Electrical Safety', 'Performance'],
    phone: '+91-80-XXXX-XXXX (Demo)',
    email: 'support@demo-precision.in (Demo)',
    website: 'www.demo-precision.in (Demo)',
    accepts_online_submissions: true,
    turnaround_days: 10,
    accreditation: 'NABL Accredited - Scope: Electrical Testing',
  },
  {
    id: 'lab_004',
    name: 'SafeTest Laboratories (Demo)',
    location: 'Chennai',
    state: 'Tamil Nadu',
    capabilities: [
      'Safety Testing',
      'Compliance Verification',
      'Material Testing',
    ],
    status: 'Accredited',
    test_categories: [
      'Electrical Safety',
      'Construction',
      'Marking & Packaging',
    ],
    phone: '+91-44-XXXX-XXXX (Demo)',
    email: 'contact@demo-safetest.in (Demo)',
    website: 'www.demo-safetest.in (Demo)',
    accepts_online_submissions: false,
    turnaround_days: 18,
    accreditation: 'NABL Accredited - Scope: Safety and Product Testing',
  },
  {
    id: 'lab_005',
    name: 'EcoTest Facilities (Demo)',
    location: 'Pune',
    state: 'Maharashtra',
    capabilities: [
      'Environmental Testing',
      'Durability Assessment',
      'Thermal Analysis',
    ],
    status: 'Registered',
    test_categories: ['Environmental', 'Durability'],
    phone: '+91-20-XXXX-XXXX (Demo)',
    email: 'lab@demo-ecotest.in (Demo)',
    website: 'www.demo-ecotest.in (Demo)',
    accepts_online_submissions: true,
    turnaround_days: 25,
    accreditation:
      'Registered with State Government - Scope: Environmental Tests',
  },
]

/**
 * Simulate network delay
 */
function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock testing API implementation
 */
export const mockTestingApi = {
  /**
   * Get all products available for testing
   * @returns {Promise<Array>}
   */
  getProducts: async () => {
    await delay()
    return MOCK_PRODUCTS
  },

  /**
   * Get all standards
   * @returns {Promise<Array>}
   */
  getStandards: async () => {
    await delay()
    return MOCK_STANDARDS
  },

  /**
   * Get test requirements for a standard
   * @param {string} standardId
   * @returns {Promise<Array>}
   */
  getTestRequirements: async (standardId) => {
    await delay()
    return MOCK_TEST_REQUIREMENTS[standardId] || []
  },

  /**
   * Search laboratories with filters
   * @param {Object} filters
   * @returns {Promise<Array>}
   */
  searchLaboratories: async (filters = {}) => {
    await delay()

    let results = [...MOCK_LABORATORIES]

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase()
      results = results.filter(
        (lab) =>
          lab.name.toLowerCase().includes(query) ||
          lab.location.toLowerCase().includes(query) ||
          lab.capabilities.some((c) => c.toLowerCase().includes(query))
      )
    }

    // Filter by location
    if (filters.location) {
      results = results.filter((lab) =>
        lab.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Filter by test category
    if (filters.test_category) {
      results = results.filter((lab) =>
        lab.test_categories.some(
          (cat) =>
            cat.toLowerCase() === filters.test_category.toLowerCase()
        )
      )
    }

    // Filter by capability
    if (filters.capability) {
      results = results.filter((lab) =>
        lab.capabilities.some(
          (cap) =>
            cap.toLowerCase().includes(filters.capability.toLowerCase())
        )
      )
    }

    // Filter by status
    if (filters.status && filters.status !== 'All') {
      results = results.filter((lab) => lab.status === filters.status)
    }

    return results
  },

  /**
   * Get laboratory details by ID
   * @param {string} labId
   * @returns {Promise<Object|null>}
   */
  getLaboratoryById: async (labId) => {
    await delay()
    return MOCK_LABORATORIES.find((lab) => lab.id === labId) || null
  },

  /**
   * Get test requirement details
   * @param {string} testId
   * @returns {Promise<Object|null>}
   */
  getTestRequirementById: async (testId) => {
    await delay()
    for (const requirements of Object.values(MOCK_TEST_REQUIREMENTS)) {
      const test = requirements.find((t) => t.id === testId)
      if (test) return test
    }
    return null
  },

  /**
   * Get labs capable of specific test
   * @param {string} testCategory
   * @returns {Promise<Array>}
   */
  getLabsByTestCategory: async (testCategory) => {
    await delay()
    return MOCK_LABORATORIES.filter((lab) =>
      lab.test_categories.includes(testCategory)
    )
  },
}
