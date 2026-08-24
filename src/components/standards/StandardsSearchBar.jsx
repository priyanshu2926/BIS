/**
 * @file src/components/standards/StandardsSearchBar.jsx
 * Search bar component with instant clear, quick search suggestions,
 * and active filter dismiss pills.
 */

import { Bookmark, Filter, Search, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const QUICK_SUGGESTIONS = [
  { label: 'Ceiling Fans', query: 'IS 374' },
  { label: 'Steel Bottles', query: 'IS 17803' },
  { label: 'Plugs & Sockets', query: 'IS 1293' },
  { label: 'LED Luminaires', query: 'LED' },
  { label: 'Lithium Batteries', query: 'IS 16046' },
  { label: 'Structural Steel', query: 'IS 2062' },
]

export default function StandardsSearchBar({
  query = '',
  onSearch,
  filters = {},
  onRemoveFilter,
  onToggleSaved,
  savedCount = 0,
  onOpenMobileFilters,
}) {
  const [localQuery, setLocalQuery] = useState(query)

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  const handleSubmit = (e) => {
    e?.preventDefault()
    onSearch(localQuery)
  }

  const handleClear = () => {
    setLocalQuery('')
    onSearch('')
  }

  const hasActiveFilters =
    (filters.category && filters.category !== 'All') ||
    (filters.product_category && filters.product_category !== 'All') ||
    (filters.status && filters.status !== 'All') ||
    filters.saved_only

  return (
    <div className="space-y-3.5">
      {/* Main Search Input Card */}
      <div className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs transition focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/10 sm:flex-row sm:items-center sm:p-4">
        <div className="flex flex-1 items-center gap-3">
          <Search size={20} className="shrink-0 text-slate-400" />
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value)
                onSearch(e.target.value)
              }}
              placeholder="Search by product, standard number or keyword (e.g. IS 374, ceiling fan, steel)..."
              className="w-full border-0 bg-transparent text-sm text-ink placeholder-slate-400 outline-none"
              aria-label="Search Indian Standards"
            />
          </form>
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Controls in Search Bar */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 sm:border-t-0 sm:pt-0">
          {/* Mobile Filter Button */}
          {onOpenMobileFilters && (
            <button
              type="button"
              onClick={onOpenMobileFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 lg:hidden"
            >
              <Filter size={14} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-navy text-[10px] text-white">
                  !
                </span>
              )}
            </button>
          )}

          {/* Saved Standards Toggle Pill */}
          <button
            type="button"
            onClick={onToggleSaved}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              filters.saved_only
                ? 'bg-amber-500 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:text-amber-700'
            }`}
            aria-pressed={filters.saved_only}
          >
            <Bookmark size={14} className={filters.saved_only ? 'fill-current' : ''} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  filters.saved_only ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white transition hover:bg-[#062d5e] active:scale-95 shadow-xs"
          >
            Search
          </button>
        </div>
      </div>

      {/* Quick Search Suggestions & Active Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Quick Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Sparkles size={12} className="text-saffron" /> Popular:
          </span>
          {QUICK_SUGGESTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setLocalQuery(item.query)
                onSearch(item.query)
              }}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-600 transition hover:border-navy hover:bg-blue-50/50 hover:text-navy"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
            <span className="text-slate-400 font-medium">Applied:</span>
            {filters.category && filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-semibold text-navy">
                Cat: {filters.category}
                <button
                  type="button"
                  onClick={() => onRemoveFilter('category')}
                  aria-label="Remove category filter"
                  className="hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.product_category && filters.product_category !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-semibold text-navy">
                Prod: {filters.product_category}
                <button
                  type="button"
                  onClick={() => onRemoveFilter('product_category')}
                  aria-label="Remove product category filter"
                  className="hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.status && filters.status !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                Status: {filters.status}
                <button
                  type="button"
                  onClick={() => onRemoveFilter('status')}
                  aria-label="Remove status filter"
                  className="hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
