/**
 * @file src/pages/industry/ComplianceChecklist.jsx
 * Industry Compliance Workspace - Phase 9
 * 
 * Displays comprehensive compliance tracking with:
 * - Project overview and progress
 * - Filterable checklist of requirements
 * - Detailed requirement view
 * - Compliance summary
 */

import { useState } from 'react'
import IndustryLayout from '../../layouts/IndustryLayout'
import ComplianceHeader from '../../components/compliance/ComplianceHeader'
import ComplianceProgress from '../../components/compliance/ComplianceProgress'
import ComplianceFilters from '../../components/compliance/ComplianceFilters'
import ComplianceChecklist from '../../components/compliance/ComplianceChecklist'
import RequirementDetails from '../../components/compliance/RequirementDetails'
import ComplianceSummary from '../../components/compliance/ComplianceSummary'
import { useCompliance } from '../../hooks/useCompliance'

export default function Compliance() {
  const {
    project,
    summary,
    filters,
    activeFilter,
    selectedItem,
    isLoading,
    error,
    filteredItems,
    setActiveFilter,
    updateItemStatus,
    setSelectedItem,
  } = useCompliance()

  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleItemSelect = (item) => {
    setSelectedItem(item)
    setIsDetailsPanelOpen(true)
  }

  const handleStatusChange = async (itemId, updates) => {
    setIsUpdating(true)
    try {
      await updateItemStatus(itemId, updates)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDownloadChecklist = () => {
    // Generate checklist content
    const checklistContent = filteredItems
      .map(
        (item) =>
          `[${item.status === 'Completed' ? 'x' : ' '}] ${item.title}\n    ${item.description}\n`
      )
      .join('\n')

    const fullContent = `
COMPLIANCE CHECKLIST
Product: ${project?.product_name}
Standard: ${project?.standard_number}
Status: ${project?.status}
Overall Progress: ${project?.overall_progress}%

${checklistContent}

Generated on: ${new Date().toLocaleDateString()}
`

    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(fullContent)
    )
    element.setAttribute('download', `compliance-checklist-${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (error) {
    return (
      <IndustryLayout title="Compliance Workspace">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-900">Error loading compliance data: {error}</p>
        </div>
      </IndustryLayout>
    )
  }

  return (
    <IndustryLayout title="Compliance Workspace">
      <div className="space-y-8">
        {/* Header */}
        {project && (
          <>
            <ComplianceHeader project={project} />

            {/* Main content grid */}
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Left column - Checklist and filters */}
              <div className="space-y-6">
                {/* Progress overview */}
                <ComplianceProgress project={project} />

                {/* Filters */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                  <h3 className="mb-4 font-bold text-ink">Filter Requirements</h3>
                  <ComplianceFilters
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                  />
                </div>

                {/* Checklist */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-ink">
                      Requirements ({filteredItems.length})
                    </h3>
                    <button
                      onClick={handleDownloadChecklist}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      ↓ Download
                    </button>
                  </div>
                  <ComplianceChecklist
                    items={filteredItems}
                    onItemSelect={handleItemSelect}
                    selectedItemId={selectedItem?.id}
                    onStatusChange={handleStatusChange}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Right column - Summary and Details */}
              <div className="space-y-6">
                {/* Summary */}
                <ComplianceSummary summary={summary} />

                {/* Details panel */}
                {isDetailsPanelOpen && selectedItem ? (
                  <div>
                    <RequirementDetails
                      item={selectedItem}
                      onClose={() => setIsDetailsPanelOpen(false)}
                      onStatusChange={handleStatusChange}
                      isUpdating={isUpdating}
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center">
                    <p className="text-slate-600">Select a requirement to view details</p>
                  </div>
                )}

                {/* Demo info */}
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-xs leading-5 text-orange-900">
                  <b>Demo Workspace:</b> This compliance tracker uses demo data. Changes are saved only in
                  the current browser session. Backend integration coming soon.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </IndustryLayout>
  )
}
