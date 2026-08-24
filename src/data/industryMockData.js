export const standards = [
  { number: 'IS 302 (Part 1): 2008', title: 'Safety of household and similar electrical appliances', description: 'General safety requirements for electrical appliances intended for household use.', status: 'Active', category: 'Electrical safety', industry: 'Electrical' },
  { number: 'IS 374: 2019', title: 'Electric ceiling fans and regulators', description: 'Performance and construction guidance for electric ceiling fans.', status: 'Active', category: 'Consumer appliances', industry: 'Electrical' },
  { number: 'IS 1293: 2005', title: 'Plugs and socket-outlets', description: 'Requirements for plugs and socket-outlets for domestic and similar purposes.', status: 'Active', category: 'Electrical accessories', industry: 'Electrical' },
  { number: 'IS 694: 2010', title: 'PVC insulated cables', description: 'Specification for working voltages up to and including 1100 V.', status: 'Under review', category: 'Cables', industry: 'Manufacturing' },
]

export const labs = [
  { name: 'National Electrical Test Centre', location: 'New Delhi', capabilities: 'Electrical safety, performance, endurance', standards: 'IS 302, IS 374' },
  { name: 'Western Product Testing Lab', location: 'Pune, Maharashtra', capabilities: 'Appliance testing, materials evaluation', standards: 'IS 374, IS 1293' },
  { name: 'Southern Compliance Laboratory', location: 'Chennai, Tamil Nadu', capabilities: 'Safety assessment, environmental testing', standards: 'IS 302, IS 694' },
]

export const documents = [
  { name: 'Product_Specification.pdf', type: 'Product specification', date: '12 Aug 2026', status: 'Ready' },
  { name: 'Factory_Layout.pdf', type: 'Manufacturing document', date: '08 Aug 2026', status: 'Analyzed' },
  { name: 'Test_Report_Draft.pdf', type: 'Test report', date: '04 Aug 2026', status: 'Processing' },
]
