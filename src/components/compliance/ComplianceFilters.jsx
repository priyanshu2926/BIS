/**
 * @file src/components/compliance/ComplianceFilters.jsx
 * Filter component for filtering compliance items by status, category, etc.
 */

export default function ComplianceFilters({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeFilter === filter.type
              ? 'bg-navy text-white shadow-md'
              : 'border border-slate-300 bg-white text-ink hover:border-navy hover:text-navy'
          }`}
        >
          {filter.label}
          {filter.count > 0 && (
            <span
              className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                activeFilter === filter.type ? 'bg-white bg-opacity-20' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
