/**
 * @file src/components/documents/DocumentList.jsx
 * Document List Container with Search, Filtering, Sorting, Layout Toggles, and Empty States.
 */

import { useState } from 'react'
import {
  FileSearch,
  Filter,
  Grid,
  List as ListIcon,
  RotateCcw,
  Search,
  SlidersHorizontal,
  UploadCloud,
  X,
} from 'lucide-react'
import DocumentCard, { DocumentTableRow } from './DocumentCard'
import { DOCUMENT_CATEGORIES, DOCUMENT_STATUS } from '../../types/documents'

export default function DocumentList({
  documents,
  totalCount,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  onViewDocument,
  onAskAi,
  onDeleteDocument,
  onOpenUpload,
}) {
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'

  const isFiltered = searchQuery || statusFilter !== 'All' || categoryFilter !== 'All'

  return (
    <div className="space-y-5">
      {/* Control Bar: Search & Filter Tools */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search documents by name, standard code (e.g. IS 374), or content..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-slate-400 focus:border-navy focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-navy"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters & Actions Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 p-1">
              {['All', DOCUMENT_STATUS.READY, DOCUMENT_STATUS.PROCESSING, DOCUMENT_STATUS.FAILED].map(
                (status) => {
                  const label =
                    status === 'All'
                      ? 'All'
                      : status === DOCUMENT_STATUS.READY
                      ? 'Ready'
                      : status === DOCUMENT_STATUS.PROCESSING
                      ? 'Processing'
                      : 'Failed'

                  const isActive = statusFilter === status
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => onStatusFilterChange(status)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        isActive
                          ? 'bg-white text-navy shadow-xs'
                          : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      {label}
                    </button>
                  )
                }
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
              >
                <option value="All">All Categories</option>
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Filter
                size={12}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
              >
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="size_desc">File Size (Largest)</option>
              </select>
              <SlidersHorizontal
                size={12}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-1.5 transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-navy shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid Card View"
              >
                <Grid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`rounded-lg p-1.5 transition ${
                  viewMode === 'table'
                    ? 'bg-white text-navy shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Table View"
              >
                <ListIcon size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Bar if applied */}
        {isFiltered && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <p>
              Showing <span className="font-bold text-ink">{documents.length}</span> of{' '}
              <span className="font-bold text-ink">{totalCount}</span> documents
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 font-bold text-navy hover:underline"
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {documents.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xs">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-navy">
            {isFiltered ? <FileSearch size={28} /> : <UploadCloud size={28} />}
          </div>

          <h3 className="mt-4 text-base font-bold text-ink">
            {isFiltered ? 'No matching documents found' : 'No documents uploaded yet'}
          </h3>

          <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500">
            {isFiltered
              ? 'Try adjusting your search terms, changing the status tab, or clearing applied filters.'
              : 'Upload product specifications, lab test reports, or factory documents to enable automated BIS AI analysis.'}
          </p>

          <div className="mt-5 flex gap-3">
            {isFiltered ? (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
              >
                <RotateCcw size={13} />
                Clear All Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenUpload}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-slate-800"
              >
                <UploadCloud size={15} />
                Upload Your First Document
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={onViewDocument}
              onAskAi={onAskAi}
              onDelete={onDeleteDocument}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 pl-4 pr-3">Document Name</th>
                  <th className="px-3 py-3.5">Standard</th>
                  <th className="px-3 py-3.5">Size</th>
                  <th className="px-3 py-3.5">Uploaded</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <DocumentTableRow
                    key={doc.id}
                    document={doc}
                    onView={onViewDocument}
                    onAskAi={onAskAi}
                    onDelete={onDeleteDocument}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
