/**
 * @file src/pages/industry/Testing.jsx
 * Industry Testing & Laboratories - Phase 10
 * 
 * Complete testing and laboratory discovery workspace with:
 * - Product/standard selection
 * - Test requirements discovery
 * - Laboratory search and filtering
 * - Detailed views
 */

import { useState } from 'react'
import IndustryLayout from '../../layouts/IndustryLayout'
import TestingHeader from '../../components/testing/TestingHeader'
import ProductStandardSelector from '../../components/testing/ProductStandardSelector'
import TestRequirementsList from '../../components/testing/TestRequirementsList'
import LabSearch from '../../components/testing/LabSearch'
import LabCard from '../../components/testing/LabCard'
import LabDetails from '../../components/testing/LabDetails'
import TestingSkeleton from '../../components/testing/TestingSkeleton'
import { useTesting } from '../../hooks/useTesting'

export default function Testing() {
  const {
    products,
    standards,
    testRequirements,
    laboratories,
    selectedProduct,
    selectedStandard,
    selectedTest,
    selectedLaboratory,
    testFilter,
    labSearchQuery,
    labFilters,
    filteredTests,
    testStats,
    testCategories,
    availableLocations,
    isLoading,
    isSearchingLabs,
    error,
    handleSelectProduct,
    handleSelectStandard,
    setTestFilter,
    setSelectedTest,
    setSelectedLaboratory,
    setLabSearchQuery,
    setLabFilters,
    searchLaboratories,
    getLabsForTestCategory,
  } = useTesting()

  const [showDetailPanel, setShowDetailPanel] = useState(false)

  const handleFindLabsForTest = async (test) => {
    setSelectedTest(test)
    setShowDetailPanel(true)
    await getLabsForTestCategory(test.category)
  }

  const handleCloseDetails = () => {
    setShowDetailPanel(false)
    setSelectedLaboratory(null)
  }

  const handleBackToTest = () => {
    setSelectedLaboratory(null)
  }

  if (error && isLoading) {
    return (
      <IndustryLayout title="Testing & Laboratories">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-900">Error loading testing data: {error}</p>
        </div>
      </IndustryLayout>
    )
  }

  if (isLoading && products.length === 0) {
    return (
      <IndustryLayout title="Testing & Laboratories">
        <TestingSkeleton />
      </IndustryLayout>
    )
  }

  return (
    <IndustryLayout title="Testing & Laboratories">
      <div className="space-y-8">
        {/* Header */}
        <TestingHeader />

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left column - Tests and search */}
          <div className="space-y-6">
            {/* Product & Standard Selector */}
            <ProductStandardSelector
              products={products}
              standards={standards}
              selectedProduct={selectedProduct}
              selectedStandard={selectedStandard}
              onSelectProduct={handleSelectProduct}
              onSelectStandard={handleSelectStandard}
              isLoading={isLoading}
            />

            {/* Test Requirements */}
            {selectedStandard && (
              <TestRequirementsList
                tests={filteredTests}
                testFilter={testFilter}
                onFilterChange={setTestFilter}
                selectedTest={selectedTest}
                onSelectTest={setSelectedTest}
                onFindLabs={handleFindLabsForTest}
                isLoading={isLoading}
                testStats={testStats}
              />
            )}

            {/* Laboratory Search */}
            {selectedTest && (
              <LabSearch
                searchQuery={labSearchQuery}
                onSearchChange={setLabSearchQuery}
                filters={labFilters}
                onFilterChange={setLabFilters}
                locations={availableLocations}
                categories={testCategories}
                onSearch={searchLaboratories}
                isSearching={isSearchingLabs}
                resultCount={laboratories.length}
              />
            )}

            {/* Lab Results */}
            {selectedTest && laboratories.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="font-bold text-ink">Available Laboratories ({laboratories.length})</h2>
                <div className="mt-4 space-y-3">
                  {laboratories.map((lab) => (
                    <LabCard
                      key={lab.id}
                      lab={lab}
                      isSelected={selectedLaboratory?.id === lab.id}
                      onSelectLab={setSelectedLaboratory}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedTest && laboratories.length === 0 && !isSearchingLabs && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">
                  No laboratories found for {selectedTest.category}. Try adjusting your filters.
                </p>
              </div>
            )}

            {selectedTest && isSearchingLabs && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-navy"></div>
                <p className="mt-3 text-slate-600">Searching laboratories...</p>
              </div>
            )}
          </div>

          {/* Right column - Details panel */}
          <div className="space-y-6">
            {selectedLaboratory ? (
              <LabDetails
                lab={selectedLaboratory}
                onClose={handleCloseDetails}
                onViewRequirements={handleBackToTest}
                testName={selectedTest?.name}
              />
            ) : selectedTest && laboratories.length > 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center">
                <p className="text-slate-600">Select a laboratory to view details</p>
              </div>
            ) : null}

            {/* Demo info */}
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-xs leading-5 text-orange-900">
              <b>Demo Workspace:</b> All laboratory data is fictional demo information. This workspace
              demonstrates the testing discovery interface. Real BIS laboratory data coming from FastAPI
              backend.
            </div>
          </div>
        </div>
      </div>
    </IndustryLayout>
  )
}
