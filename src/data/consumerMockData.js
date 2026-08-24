export const consumerProducts = [
  {
    id: 1,
    name: 'Pressure Cooker',
    standard: 'IS 2315: 2013',
    category: 'Cookware',
    description: 'Metallic pressure cookers for cooking food with steam pressure.',
    bisInfo: 'ISI marked pressure cookers must meet strict safety standards.',
    whatToLookFor: 'Check for ISI mark, ensure handle is secure, valve is clear.',
    safetyTips: 'Use appropriate water level, never force open, regular maintenance.',
  },
  {
    id: 2,
    name: 'Electric Fan',
    standard: 'IS 374: 2019',
    category: 'Electrical Appliances',
    description: 'Electric ceiling fans for domestic use.',
    bisInfo: 'Must comply with safety and performance standards.',
    whatToLookFor: 'ISI mark, stable mounting, smooth rotation.',
    safetyTips: 'Proper installation, regular maintenance, avoid overloading.',
  },
  {
    id: 3,
    name: 'Motorcycle Helmet',
    standard: 'IS 4151: 2015',
    category: 'Safety Equipment',
    description: 'Safety helmets for motorcycle riders.',
    bisInfo: 'ISI marking ensures impact resistance and safety.',
    whatToLookFor: 'ISI mark, proper fit, sturdy construction.',
    safetyTips: 'Always wear during riding, replace if damaged.',
  },
  {
    id: 4,
    name: 'Gold Jewellery',
    standard: 'IS 1418: 2019',
    category: 'Precious Metals',
    description: 'Gold jewellery pieces.',
    bisInfo: 'Hallmarking is mandatory for purity assurance.',
    whatToLookFor: 'Valid hallmark showing purity and assayist mark.',
    safetyTips: 'Buy from certified jewellers with proper certification.',
  },
  {
    id: 5,
    name: 'ISI Marked Milk',
    standard: 'IS 1479: 2015',
    category: 'Food Products',
    description: 'Packaged milk products.',
    bisInfo: 'Quality and purity standards for consumer safety.',
    whatToLookFor: 'ISI mark, manufacturing date, expiry date.',
    safetyTips: 'Check seal integrity, maintain cold chain.',
  },
  {
    id: 6,
    name: 'Electrical Wiring',
    standard: 'IS 694: 2010',
    category: 'Electrical Materials',
    description: 'PVC insulated cables for indoor wiring.',
    bisInfo: 'Ensures safe electrical installation in homes.',
    whatToLookFor: 'ISI mark, proper gauge rating, clear insulation.',
    safetyTips: 'Use authorized electricians for installation.',
  },
]

export const hallmarkingInfo = {
  purityMarks: [
    { marking: '916', purity: '91.6%', description: '22 Karat Gold - Most common in India' },
    { marking: '750', purity: '75.0%', description: '18 Karat Gold - Medium purity' },
    { marking: '585', purity: '58.5%', description: '14 Karat Gold - Lower purity' },
    { marking: '417', purity: '41.7%', description: '10 Karat Gold - Lowest common purity' },
  ],
  marks: [
    {
      name: 'Purity Mark',
      description: 'Shows the fineness in parts per thousand (916, 750, etc.)',
      importance: 'Critical for knowing the actual gold content',
    },
    {
      name: 'Fineness Number',
      description: 'Numeric representation of purity percentage',
      importance: 'Essential for valuation',
    },
    {
      name: 'Hallmark Symbol',
      description: 'Official BIS symbol indicating genuine hallmarking',
      importance: 'Confirms legitimacy',
    },
    {
      name: 'Assayist Mark',
      description: 'Unique identifier of the assaying and hallmarking center',
      importance: 'Enables verification',
    },
  ],
  tips: [
    'Always buy from certified jewellers with hallmarking license',
    'Verify hallmark symbol and purity marks clearly visible',
    'Keep certificate of hallmarking for future reference',
    'Ask for detailed receipt with weight and purity mentioned',
    'For expensive items, get independent verification if needed',
  ],
}

export const popularTopics = [
  {
    title: 'ISI Mark',
    description: 'Understand what the ISI mark means and why it matters for your products.',
    icon: '✓',
  },
  {
    title: 'BIS Certification',
    description: 'Learn about the certification process and what it ensures for you.',
    icon: '🏅',
  },
  {
    title: 'Hallmarking',
    description: 'Everything about gold hallmarking and purity marks.',
    icon: '💎',
  },
  {
    title: 'Product Safety',
    description: 'Guidelines for safe product usage and what to watch for.',
    icon: '🛡️',
  },
  {
    title: 'Consumer Complaints',
    description: 'Process and guidance for filing complaints against substandard products.',
    icon: '⚠️',
  },
]

export const recentlyViewed = [
  {
    id: 1,
    name: 'Pressure Cooker Safety',
    type: 'Product',
    date: '2 hours ago',
  },
  {
    id: 2,
    name: 'Understanding Hallmarks',
    type: 'Educational',
    date: '1 day ago',
  },
  {
    id: 3,
    name: 'Electric Fan Standards',
    type: 'Product',
    date: '3 days ago',
  },
]

export const consumerAISuggestions = [
  'What does the ISI mark mean?',
  'How do I understand a BIS certification?',
  'What should I check before buying a pressure cooker?',
  'What is hallmarking?',
  'How do I know if a product is safe?',
  'What is the BIS complaint process?',
]

export const consumerSources = [
  {
    title: 'BIS Consumer Information Portal',
    description: 'Official guidance for consumers on standards and certifications.',
  },
  {
    title: 'ISI Mark Guidelines',
    description: 'Information about what the ISI mark means for product quality.',
  },
  {
    title: 'Product Safety Information',
    description: 'General guidelines for safe product usage.',
  },
  {
    title: 'Hallmarking Standards',
    description: 'Official standards for precious metal hallmarking.',
  },
]

export const complaintSteps = [
  {
    step: 1,
    title: 'Identify the Issue',
    description: 'Clearly identify what is wrong with the product.',
    details: [
      'Defect or damage?',
      'Not as advertised?',
      'Safety concern?',
      'Missing certification marks?',
    ],
  },
  {
    step: 2,
    title: 'Gather Information',
    description: 'Collect all relevant product and purchase details.',
    details: [
      'Product photos',
      'Purchase receipt',
      'Product packaging',
      'Certification marks visible in photos',
      'Details of any issues',
    ],
  },
  {
    step: 3,
    title: 'Document Everything',
    description: 'Keep clear records of the issue and communication.',
    details: [
      'When did you notice the issue?',
      'How is it affecting use?',
      'Any safety concerns?',
      'Previous seller communication?',
    ],
  },
  {
    step: 4,
    title: 'Contact Seller/Manufacturer',
    description: 'First approach the vendor or manufacturer directly.',
    details: [
      'Provide clear complaint description',
      'Share product details and proof of purchase',
      'Give reasonable time to respond',
      'Keep records of all communication',
    ],
  },
  {
    step: 5,
    title: 'File Official Complaint',
    description: 'If unresolved, file with relevant authorities.',
    details: [
      'Consumer Protection Authority',
      'State BIS Office',
      'District Consumer Commission',
      'National Consumer Commission',
    ],
  },
]

export const safetyGuidelines = [
  {
    title: 'Check the Mark',
    description: 'Understand and verify relevant product markings.',
    details: [
      'Look for ISI mark on visible part of product',
      'Verify quality and clarity of marking',
      'Check for counterfeits by visiting BIS database',
      'Authentic marks should be permanent and clear',
    ],
    icon: '🔍',
  },
  {
    title: 'Check Product Information',
    description: 'Know what information to look for on packaging.',
    details: [
      'Manufacturing date and expiry date',
      'Product specifications and warranty',
      'Safety instructions and warnings',
      'Manufacturer contact information',
    ],
    icon: '📋',
  },
  {
    title: 'Understand the Standard',
    description: 'Learn what the applicable standard means for you.',
    details: [
      'Standards ensure minimum quality levels',
      'Different products have different standards',
      'ISI mark certifies compliance with standard',
      'Standards protect your safety and rights',
    ],
    icon: '📚',
  },
  {
    title: 'Report a Concern',
    description: 'Know what to do when something seems wrong.',
    details: [
      'Document the issue with photos and details',
      'Save receipt and product packaging',
      'Contact seller/manufacturer first',
      'File formal complaint if needed',
    ],
    icon: '⚠️',
  },
]
