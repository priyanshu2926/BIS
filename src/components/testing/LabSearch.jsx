/**
 * @file src/components/testing/LabSearch.jsx
 * Laboratory search and filter component.
 */

export default function LabSearch({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  locations,
  categories,
  onSearch,
  isSearching,
  resultCount,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <h2 className="font-bold text-ink">Search Laboratories</h2>

      {/* Search input */}
      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">Search by Name or Location</label>
        <input
          type="text"
          placeholder="Enter laboratory name or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-50"
        />
      </div>

      {/* Filters grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Location filter */}
        <div>
          <label className="text-sm font-medium text-slate-700">Location</label>
          <select
            value={filters.location || ''}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-50"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Test category filter */}
        <div>
          <label className="text-sm font-medium text-slate-700">Test Category</label>
          <select
            value={filters.test_category || ''}
            onChange={(e) => onFilterChange({ ...filters, test_category: e.target.value })}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-50"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            value={filters.status || 'All'}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-50"
          >
            <option value="All">All Labs</option>
            <option value="Accredited">Accredited Only</option>
            <option value="Registered">Registered Labs</option>
          </select>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={onSearch}
        disabled={isSearching}
        className="mt-6 w-full rounded-lg bg-navy px-4 py-2.5 font-medium text-white hover:bg-blue-900 disabled:opacity-50"
      >
        {isSearching ? 'Searching...' : 'Search Laboratories'}
      </button>

      {resultCount !== null && (
        <p className="mt-3 text-sm text-slate-600">
          Found <span className="font-semibold">{resultCount}</span> laboratory result{resultCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
