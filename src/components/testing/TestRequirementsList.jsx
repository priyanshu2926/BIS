/**
 * @file src/components/testing/TestRequirementsList.jsx
 * List of test requirements with filtering.
 */

import TestRequirementCard from './TestRequirementCard'

export default function TestRequirementsList({
  tests,
  testFilter,
  onFilterChange,
  selectedTest,
  onSelectTest,
  onFindLabs,
  isLoading,
  testStats,
}) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200"></div>
          ))}
        </div>
      </div>
    )
  }

  if (tests.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">No test requirements found. Select a product or standard.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-ink">Test Requirements ({tests.length})</h2>
        <span className="text-sm text-slate-500">
          {testStats?.required || 0} Required · {testStats?.recommended || 0} Recommended
        </span>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['All', 'Required', 'Recommended'].map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              testFilter === filter
                ? 'bg-navy text-white'
                : 'border border-slate-300 bg-white text-ink hover:border-navy'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Test cards */}
      <div className="mt-6 space-y-3">
        {tests.map((test) => (
          <TestRequirementCard
            key={test.id}
            test={test}
            isSelected={selectedTest?.id === test.id}
            onSelectTest={onSelectTest}
            onFindLabs={onFindLabs}
          />
        ))}
      </div>
    </div>
  )
}
