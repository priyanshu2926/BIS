/**
 * @file src/components/standards/StandardsFilters.jsx
 * Multi-dimensional filter sidebar for Indian Standards by Category,
 * Product Category, Status, and Sort Order.
 */

import { ArrowUpDown, Check, Filter, RotateCcw, X } from 'lucide-react'
import { SORT_OPTIONS, STANDARD_STATUSES } from '../../types/standards'

export default function StandardsFilters({
  filters = {},
  categories = [],
  productCategories = [],
  onFilterChange,
  onResetFilters,
  onCloseMobile,
}) {
  const hasNonDefaultFilters =
    (filters.category && filters.category !== 'All') ||
    (filters.product_category && filters.product_category !== 'All') ||
    (filters.status && filters.status !== 'All') ||
    filters.saved_only ||
    (filters.sort_by && filters.sort_by !== 'relevance')

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-navy" />
          <h3 className="font-bold text-ink text-sm">Filter Standards</h3>
        </div>

        <div className="flex items-center gap-2">
          {hasNonDefaultFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy transition"
              title="Reset all filters to defaults"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
              aria-label="Close filters panel"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Body */}
      <div className="flex-1 space-y-5 overflow-y-auto py-4 pr-1">
        {/* 1. Engineering Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Engineering Division
          </label>
          <select
            value={filters.category || 'All'}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-navy focus:bg-white"
          >
            <option value="All">All Divisions ({categories.reduce((acc, c) => acc + c.count, 0) || 'All'})</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* 2. Specific Product Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Product Category
          </label>
          <select
            value={filters.product_category || 'All'}
            onChange={(e) => onFilterChange('product_category', e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-navy focus:bg-white"
          >
            <option value="All">All Products</option>
            {productCategories.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} ({p.count})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Regulatory Status */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Regulatory Status
          </label>
          <div className="mt-2 space-y-1.5">
            {Object.values(STANDARD_STATUSES).map((status) => {
              const isChecked = (filters.status || 'All') === status
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onFilterChange('status', status)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                    isChecked
                      ? 'border border-blue-200 bg-blue-50/80 font-bold text-navy'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{status === 'All' ? 'All Statuses' : status}</span>
                  {isChecked && <Check size={14} className="text-navy" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Sort By */}
        <div className="border-t border-slate-100 pt-4">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <ArrowUpDown size={12} /> Sort Order
          </label>
          <select
            value={filters.sort_by || 'relevance'}
            onChange={(e) => onFilterChange('sort_by', e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-navy focus:bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
        Showing published Indian Standards and mandatory Quality Control Orders (QCO).
      </div>
    </aside>
  )
}
