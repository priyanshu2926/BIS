/**
 * @file src/services/mock/mockStandardsApi.js
 * High-fidelity Mock API for Indian Standards Search.
 * 
 * - Clearly labeled demo/fictional BIS standards data
 * - Simulates network latency with Promises
 * - Supports rich multi-attribute search, category filtering, status filtering, and sorting
 * - Persistent saved/bookmarked standards via localStorage
 */

const STORAGE_SAVED_STANDARDS = 'bis_saved_standards_ids'

// Demo Standards Catalog
const DEMO_STANDARDS = [
  {
    id: 'std_is374',
    standard_number: 'IS 374:2019 (Demo)',
    title: 'Electric Ceiling Type Fans and Regulators — Specification',
    description:
      'Specifies requirements and methods of test for single phase AC ceiling fans and their associated speed regulators for domestic and commercial applications.',
    category: 'Electrotechnical',
    product_category: 'Electric Ceiling Fans',
    status: 'Active',
    revision: 'Third Revision (2019)',
    published_date: '2019-06-15',
    keywords: ['ceiling fan', 'regulator', 'motor', 'air delivery', 'insulation', 'energy rating', 'HV test'],
    source: 'BIS Electrotechnical Division (ETD 05) / Gazette S.O. 2931(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Covers domestic and commercial electric ceiling fans, suspension systems, and speed controllers.',
    key_clauses: [
      'Clause 4.2: Insulation Resistance (> 2 MΩ at 500V DC)',
      'Clause 5.1: High-Voltage Flash Test (1500V AC for 1 sec)',
      'Clause 8.1: Air Delivery Chamber Testing & Service Value',
      'Clause 10.3: Suspension Rod Safety Pin & Fall Protection',
    ],
    qco_mandatory: 'Mandatory under DPIIT Quality Control Order 2023',
    saved: false,
  },
  {
    id: 'std_is17803',
    standard_number: 'IS 17803:2022 (Demo)',
    title: 'Stainless Steel Vacuum Flasks and Insulated Water Bottles — Specification',
    description:
      'Prescribes material composition, thermal retention performance, leak tightness, and drop impact tests for double-walled stainless steel insulated containers.',
    category: 'Mechanical',
    product_category: 'Steel & Metal Ware',
    status: 'Active',
    revision: 'First Edition (2022)',
    published_date: '2022-04-10',
    keywords: ['stainless steel', 'water bottle', 'vacuum flask', 'thermal retention', 'food grade 304', 'leakage test'],
    source: 'BIS Mechanical Engineering Division (MED 28) / Gazette S.O. 1822(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Applies to portable stainless steel insulated beverage flasks, bottles, and thermoware containers.',
    key_clauses: [
      'Clause 4.1: Food contact surfaces must conform to Austenitic Grade 304 or 316',
      'Clause 5.2: Thermal Retention (> 60°C after 6 hours)',
      'Clause 6.4: Drop test from 1.2m onto rigid concrete floor',
      'Clause 7.1: Internal pressure leak test (0.5 bar inverted)',
    ],
    qco_mandatory: 'Mandatory under DPIIT Steel Products QCO 2023',
    saved: false,
  },
  {
    id: 'std_is1293',
    standard_number: 'IS 1293:2019 (Demo)',
    title: 'Plugs and Socket-Outlets for Domestic and Similar Purposes (up to 250V / 16A)',
    description:
      'Covers constructional and performance requirements for 2-pin and 3-pin plugs, socket-outlets, multiway adaptors, and cord extension sets.',
    category: 'Electrotechnical',
    product_category: 'Wiring Accessories',
    status: 'Active',
    revision: 'Fourth Revision (2019)',
    published_date: '2019-12-01',
    keywords: ['plugs', 'sockets', 'wiring', 'electrical safety', 'shutter test', 'grounding pin', '16A plug'],
    source: 'BIS Electrotechnical Division (ETD 14) / Gazette S.O. 4349(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Covers domestic AC plugs, wall sockets, and distribution extension boards up to 250V.',
    key_clauses: [
      'Clause 6.2: Earthing Contact Engagement Sequence',
      'Clause 13.2: Protection against Electric Shock with Shuttered Outlets',
      'Clause 18.1: Temperature Rise Test at Rated 16A Load',
    ],
    qco_mandatory: 'Mandatory under Electrical Accessories QCO 2020',
    saved: false,
  },
  {
    id: 'std_is10322',
    standard_number: 'IS 10322 (Part 5/Sec 1):2014 (Demo)',
    title: 'Luminaires for General Lighting — Fixed General Purpose LED Luminaires',
    description:
      'Specifies requirements for fixed general purpose luminaires using LED light sources for supply voltages not exceeding 1000V.',
    category: 'Electronics & IT',
    product_category: 'Lighting Systems',
    status: 'Active',
    revision: 'Second Revision (2014)',
    published_date: '2014-08-20',
    keywords: ['led light', 'luminaire', 'lighting', 'driver', 'photobiological safety', 'ingress protection IP65'],
    source: 'BIS Electronics Division (LITD 27) / Gazette S.O. 1211(E)',
    scheme: 'Compulsory Registration Scheme (CRS)',
    scope: 'Applies to indoor and outdoor LED downlights, panel lights, and street lights.',
    key_clauses: [
      'Clause 4.1: Ingress Protection (IP Rating verification)',
      'Clause 5.3: Creepage and Clearance Distances',
      'Clause 8.2: Resistance to Dust, Solid Objects, and Moisture',
    ],
    qco_mandatory: 'Mandatory under MeitY Compulsory Registration Scheme (CRS)',
    saved: false,
  },
  {
    id: 'std_is16046',
    standard_number: 'IS 16046 (Part 2):2018 (Demo)',
    title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)',
    description:
      'Requirements and tests for the safe operation of portable sealed secondary lithium cells and batteries for use in electronic devices.',
    category: 'Electronics & IT',
    product_category: 'Batteries & Energy Storage',
    status: 'Active',
    revision: 'Second Revision (2018)',
    published_date: '2018-11-14',
    keywords: ['battery', 'lithium ion', 'cell safety', 'overcharge test', 'short circuit', 'thermal abuse'],
    source: 'BIS Electronics Division (LITD 10) / Gazette S.O. 3840(E)',
    scheme: 'Compulsory Registration Scheme (CRS)',
    scope: 'Covers lithium-ion and lithium polymer cells used in smartphones, power banks, and portable computers.',
    key_clauses: [
      'Clause 7.2: Continuous Charging at Constant Voltage',
      'Clause 7.3.2: External Short Circuit Test at 55°C',
      'Clause 7.3.4: Drop Test from 1.0 Meter',
      'Clause 7.3.5: Thermal Abuse Test (130°C for 10 min)',
    ],
    qco_mandatory: 'Mandatory under MeitY Electronics QCO',
    saved: false,
  },
  {
    id: 'std_is15885',
    standard_number: 'IS 15885 (Part 2/Sec 13):2012 (Demo)',
    title: 'Safety of Lamp Controlgear — DC or AC Supplied Electronic Controlgear for LED Modules',
    description:
      'Particular safety requirements for electronic controlgear (LED Drivers) for use on DC supplies up to 250V and AC supplies up to 1000V at 50Hz.',
    category: 'Electronics & IT',
    product_category: 'Lighting Systems',
    status: 'Active',
    revision: 'First Revision (2012)',
    published_date: '2012-09-18',
    keywords: ['led driver', 'controlgear', 'power supply', 'surge protection', 'transformer', 'insulation'],
    source: 'BIS Electronics Division (LITD 27) / Gazette S.O. 2199(E)',
    scheme: 'Compulsory Registration Scheme (CRS)',
    scope: 'Electronic power supplies and constant current drivers for commercial LED installations.',
    key_clauses: [
      'Clause 8.1: Protection Against Accidental Contact with Live Parts',
      'Clause 14.1: Fault Condition Testing (Component breakdown simulation)',
      'Clause 16.2: High Voltage Dielectric Strength Test',
    ],
    qco_mandatory: 'Mandatory under MeitY CRS Scheme',
    saved: false,
  },
  {
    id: 'std_is2062',
    standard_number: 'IS 2062:2011 (Demo)',
    title: 'Hot Rolled Medium and High Tensile Structural Steel — Specification',
    description:
      'Covers requirements for steel micro-alloyed plates, sections, flats, bars, and beams intended for use in bolted, riveted, and welded structural work.',
    category: 'Civil & Structural',
    product_category: 'Structural Steel & Construction',
    status: 'Active',
    revision: 'Seventh Revision (2011)',
    published_date: '2011-10-30',
    keywords: ['structural steel', 'tensile strength', 'yield stress', 'steel plates', 'girders', 'IS 2062 E250'],
    source: 'BIS Metallurgical Engineering Division (MTD 04) / Gazette S.O. 1134(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Covers grades E250, E300, E350, E410, and E450 structural steel for bridges and buildings.',
    key_clauses: [
      'Clause 6.1: Chemical Composition (Carbon Equivalent maximum limits)',
      'Clause 8.2: Tensile Test and Yield Stress minimum thresholds',
      'Clause 8.3: Charpy V-Notch Impact Test at -20°C and 0°C',
    ],
    qco_mandatory: 'Mandatory under Ministry of Steel QCO 2020',
    saved: false,
  },
  {
    id: 'std_is694',
    standard_number: 'IS 694:2010 (Demo)',
    title: 'PVC Insulated Cables for Working Voltages up to and including 1100V — Specification',
    description:
      'Specifies requirements for single and multicore PVC insulated unsheathed and sheathed electric cables with copper or aluminium conductors.',
    category: 'Electrotechnical',
    product_category: 'Cables & Wires',
    status: 'Active',
    revision: 'Fourth Revision (2010)',
    published_date: '2010-05-12',
    keywords: ['pvc cable', 'copper wire', 'building wire', 'insulation thickness', 'conductor resistance', 'flame retardant'],
    source: 'BIS Electrotechnical Division (ETD 09) / Gazette S.O. 981(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Flexible cords and building cables for domestic wiring up to 1100 Volts.',
    key_clauses: [
      'Clause 5.1: Conductor Resistance per km at 20°C',
      'Clause 7.2: Spark Testing of Insulation during extrusion',
      'Clause 10.4: Oxygen Index and Flame Retardance Test (FR/FRLS)',
    ],
    qco_mandatory: 'Mandatory under Electrical Wires & Cables QCO',
    saved: false,
  },
  {
    id: 'std_is302',
    standard_number: 'IS 302-2-3:2021 (Demo)',
    title: 'Safety of Household Electrical Appliances — Particular Requirements for Electric Irons',
    description:
      'Covers electrical and mechanical safety requirements for dry electric irons and steam irons for household and similar use.',
    category: 'Electrotechnical',
    product_category: 'Electric Appliances',
    status: 'Under Revision',
    revision: 'Third Revision (2021)',
    published_date: '2021-08-04',
    keywords: ['electric iron', 'steam iron', 'thermostat', 'thermal cutoff', 'soleplate', 'leakage current'],
    source: 'BIS Electrotechnical Division (ETD 32) / Gazette S.O. 3102(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Domestic electric dry irons, steam irons, and garment steamers.',
    key_clauses: [
      'Clause 7.1: Marking of Rated Input and Voltage',
      'Clause 11.2: Heating and Soleplate Temperature Stability',
      'Clause 19.4: Abnormal Operation (Thermostat failure test)',
    ],
    qco_mandatory: 'Mandatory under Household Electrical Appliances QCO',
    saved: false,
  },
  {
    id: 'std_is1161',
    standard_number: 'IS 1161:2014 (Demo)',
    title: 'Steel Tubes for Structural Purposes — Specification',
    description:
      'Covers hot finished welded, seamless, and electric resistance welded (ERW) circular steel tubes for structural applications.',
    category: 'Civil & Structural',
    product_category: 'Structural Steel & Construction',
    status: 'Active',
    revision: 'Fifth Revision (2014)',
    published_date: '2014-03-22',
    keywords: ['steel tubes', 'erw pipes', 'structural scaffolding', 'flattening test', 'hydrostatic pressure'],
    source: 'BIS Metallurgical Engineering Division (MTD 19) / Gazette S.O. 1404(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Circular hollow steel tubes used in scaffolding, trusses, and structural framing.',
    key_clauses: [
      'Clause 7.1: Tensile Properties (YSt 210, YSt 240, YSt 310)',
      'Clause 9.2: Flattening Test for ERW welded tubes',
      'Clause 10.1: Hydraulic Pressure Test (5 MPa with no leakage)',
    ],
    qco_mandatory: 'Mandatory under Ministry of Steel QCO 2021',
    saved: false,
  },
  {
    id: 'std_is14543',
    standard_number: 'IS 14543:2016 (Demo)',
    title: 'Packaged Drinking Water (Other than Natural Mineral Water) — Specification',
    description:
      'Prescribes physical, chemical, radiological, and microbiological requirements for packaged drinking water filled in sealed hermetic containers.',
    category: 'Chemicals & Food',
    product_category: 'Packaged Water & Beverages',
    status: 'Active',
    revision: 'Second Revision (2016)',
    published_date: '2016-10-15',
    keywords: ['drinking water', 'packaged water', 'microbiological test', 'ph value', 'tds', 'coliform', 'ozonation'],
    source: 'BIS Food and Agriculture Division (FAD 14) / Gazette S.O. 2688(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Potable water treated by filtration, reverse osmosis, or UV and packed for direct consumption.',
    key_clauses: [
      'Clause 3.2: Permissible Limits for Heavy Metals (Lead, Arsenic, Cadmium)',
      'Clause 4.1: Microbiological Limits (E. coli, Coliform, Yeast & Mould = Nil)',
      'Clause 6.1: Mandatory In-house Microbiological Testing Lab with Autoclave and Laminar Flow',
    ],
    qco_mandatory: 'Mandatory under Food Safety and Standards (FSSAI/BIS) Act',
    saved: false,
  },
  {
    id: 'std_is15652',
    standard_number: 'IS 15652:2006 (Demo)',
    title: 'Electrically Insulating Mats for Electrical Purposes — Specification',
    description:
      'Specifies dielectric and physical requirements for elastomeric insulating mats for safety against electrical shock in substations and switchboard rooms.',
    category: 'Electrotechnical',
    product_category: 'Wiring Accessories',
    status: 'Active',
    revision: 'First Edition (2006)',
    published_date: '2006-04-18',
    keywords: ['insulating mat', 'dielectric strength', 'substation safety', 'voltage withstand 33kV', 'rubber mat'],
    source: 'BIS Electrotechnical Division (ETD 21) / Gazette S.O. 605(E)',
    scheme: 'Scheme-I (ISI Mark)',
    scope: 'Floor mats installed around high-voltage switchboards and power distribution rooms.',
    key_clauses: [
      'Clause 5.2: AC Dielectric Voltage Withstand Test (up to 65 kV)',
      'Clause 6.1: Tensile Strength and Elongation at Break',
      'Clause 7.3: Flame Retardance and Acid Resistance',
    ],
    qco_mandatory: 'Mandatory for Industrial Electrical Safety',
    saved: false,
  },
]

// Storage helper for bookmarked standards
function getSavedSet() {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_STANDARDS)
    if (raw) return new Set(JSON.parse(raw))
  } catch {
    // Ignore localStorage failures
  }
  return new Set(['std_is374']) // default bookmark for demo
}

function saveSavedSet(set) {
  try {
    localStorage.setItem(STORAGE_SAVED_STANDARDS, JSON.stringify([...set]))
  } catch {
    // Ignore storage failures
  }
}

// Latency simulator
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockStandardsApi = {
  /**
   * Search standards with multi-attribute filtering, sorting and pagination
   * @param {import('../../types/standards').StandardsSearchParams} params
   * @returns {Promise<import('../../types/standards').StandardsSearchResponse>}
   */
  async searchStandards({
    query = '',
    category = 'All',
    product_category = 'All',
    status = 'All',
    saved_only = false,
    page = 1,
    limit = 10,
    sort_by = 'relevance',
  } = {}) {
    await delay(320)

    const savedSet = getSavedSet()
    const cleanQuery = query.toLowerCase().trim()

    // 1. Filter
    let filtered = DEMO_STANDARDS.map((s) => ({
      ...s,
      saved: savedSet.has(s.id),
    }))

    if (saved_only) {
      filtered = filtered.filter((s) => s.saved)
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase())
    }

    if (product_category && product_category !== 'All') {
      filtered = filtered.filter(
        (s) => s.product_category.toLowerCase() === product_category.toLowerCase()
      )
    }

    if (status && status !== 'All') {
      filtered = filtered.filter((s) => s.status.toLowerCase() === status.toLowerCase())
    }

    if (cleanQuery) {
      filtered = filtered.filter((s) => {
        const textToSearch = `${s.standard_number} ${s.title} ${s.description} ${s.category} ${
          s.product_category
        } ${(s.keywords || []).join(' ')} ${s.source}`.toLowerCase()
        return textToSearch.includes(cleanQuery)
      })
    }

    // 2. Sort
    filtered.sort((a, b) => {
      if (sort_by === 'newest') {
        return new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
      }
      if (sort_by === 'code') {
        return a.standard_number.localeCompare(b.standard_number)
      }
      // 'relevance': exact standard number matches first
      if (cleanQuery) {
        const aNum = a.standard_number.toLowerCase().includes(cleanQuery) ? 1 : 0
        const bNum = b.standard_number.toLowerCase().includes(cleanQuery) ? 1 : 0
        if (aNum !== bNum) return bNum - aNum
      }
      return 0
    })

    const total = filtered.length
    const total_pages = Math.max(1, Math.ceil(total / limit))
    const validPage = Math.min(Math.max(1, page), total_pages)
    const startIndex = (validPage - 1) * limit
    const paginatedItems = filtered.slice(startIndex, startIndex + limit)

    return {
      items: paginatedItems,
      total,
      page: validPage,
      limit,
      total_pages,
      has_next: validPage < total_pages,
    }
  },

  /**
   * Fetch single standard by ID
   * @param {string} id
   * @returns {Promise<import('../../types/standards').Standard>}
   */
  async getStandardById(id) {
    await delay(200)
    const savedSet = getSavedSet()
    const standard = DEMO_STANDARDS.find((s) => s.id === id)
    if (!standard) {
      throw new Error(`Standard with ID '${id}' not found.`)
    }
    return {
      ...standard,
      saved: savedSet.has(standard.id),
    }
  },

  /**
   * Bookmark a standard
   * @param {string} id
   * @returns {Promise<{ success: boolean, standard: Object }>}
   */
  async saveStandard(id) {
    await delay(180)
    const savedSet = getSavedSet()
    savedSet.add(id)
    saveSavedSet(savedSet)

    const standard = DEMO_STANDARDS.find((s) => s.id === id)
    return {
      success: true,
      standard: standard ? { ...standard, saved: true } : null,
    }
  },

  /**
   * Remove a bookmark
   * @param {string} id
   * @returns {Promise<{ success: boolean, standard: Object }>}
   */
  async unsaveStandard(id) {
    await delay(180)
    const savedSet = getSavedSet()
    savedSet.delete(id)
    saveSavedSet(savedSet)

    const standard = DEMO_STANDARDS.find((s) => s.id === id)
    return {
      success: true,
      standard: standard ? { ...standard, saved: false } : null,
    }
  },

  /**
   * Fetch distinct categories with count
   */
  async getCategories() {
    await delay(150)
    const counts = {}
    DEMO_STANDARDS.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  },

  /**
   * Fetch distinct product categories with count
   */
  async getProductCategories() {
    await delay(150)
    const counts = {}
    DEMO_STANDARDS.forEach((s) => {
      counts[s.product_category] = (counts[s.product_category] || 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  },

  /**
   * Fetch total saved count
   */
  async getSavedCount() {
    const savedSet = getSavedSet()
    return savedSet.size
  },
}
