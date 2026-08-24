/**
 * @file src/pages/industry/Standards.jsx
 * Production-grade Indian Standards Search & Explorer Page for Industry Users.
 * 
 * Features:
 * - Real-time keyword search across codes, titles, keywords, and clauses
 * - Multi-criteria engineering division, product category, and regulatory status filtering
 * - Standard inspection modal with technical clauses and scope
 * - Bookmark saving with local persistence
 * - Contextual 'Ask AI' integration navigating seamlessly to AI Assistant
 * - Zero direct fetch/network calls in UI (all managed via useStandards hook & standardsApi)
 */

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  FileCheck,
  FileSearch,
  Filter,
  Layers,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StandardCard from '../../components/standards/StandardCard'
import StandardDetails from '../../components/standards/StandardDetails'
import StandardsFilters from '../../components/standards/StandardsFilters'
import StandardsSearchBar from '../../components/standards/StandardsSearchBar'
import StandardsSkeleton from '../../components/standards/StandardsSkeleton'
import { useStandards } from '../../hooks/useStandards'
import IndustryLayout from '../../layouts/IndustryLayout'

export default function Standards() {
  const navigate = useNavigate()
  const {
    standards,
    total,
    page,
    totalPages,
    filters,
    selectedStandard,
    isLoading,
    isSavingId,
    error,
    categories,
    productCategories,
    savedCount,
    setQuery,
    setFilter,
    resetFilters,
    changePage,
    toggleSaveStandard,
    selectStandard,
    closeStandardDetails,
    retry,
  } = useStandards()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Navigate to AI Assistant with pre-filled context
  const handleAskAI = (standard) => {
    const prompt = `Tell me about standard ${standard.standard_number}: "${standard.title}". What are the key compliance, testing, and certification requirements under BIS Scheme-I / CRS?`
    navigate('/industry/assistant', {
      state: {
        prompt,
        standardNumber: standard.standard_number,
        standardTitle: standard.title,
      },
    })
  }

  return (
    <IndustryLayout title="Indian Standards">
      <div className="space-y-6">
        {/* ======================================================== */}
        {/* 1. Hero Header Banner & Key Metrics                      */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-navy via-[#0c4482] to-[#083b78] p-6 text-white shadow-soft sm:p-8">
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                <ShieldCheck size={14} className="text-saffron" />
                <span>National Standards Repository</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Indian Standards Explorer
              </h1>
              <p className="text-sm leading-relaxed text-blue-100/90">
                Search, filter, and inspect Bureau of Indian Standards (BIS) product specifications,
                mandatory Quality Control Orders (QCO), and testing protocols.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-xs text-center">
                <span className="block text-xl font-extrabold sm:text-2xl">{total > 0 ? total : '12+'}</span>
                <span className="text-[11px] font-medium text-blue-100">Indexed Standards</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-xs text-center">
                <span className="block text-xl font-extrabold sm:text-2xl text-emerald-300">100%</span>
                <span className="text-[11px] font-medium text-blue-100">Verified Clauses</span>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-xs text-center">
                <span className="block text-xl font-extrabold sm:text-2xl text-amber-300">QCO</span>
                <span className="text-[11px] font-medium text-blue-100">Mandatory Orders</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. Top Search & Active Filter Bar                        */}
        {/* ======================================================== */}
        <section>
          <StandardsSearchBar
            query={filters.query}
            onSearch={setQuery}
            filters={filters}
            onRemoveFilter={(key) => setFilter(key, 'All')}
            onToggleSaved={() => setFilter('saved_only', !filters.saved_only)}
            savedCount={savedCount}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />
        </section>

        {/* ======================================================== */}
        {/* 3. Main Body Grid: Sidebar Filters + Results List        */}
        {/* ======================================================== */}
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <StandardsFilters
              filters={filters}
              categories={categories}
              productCategories={productCategories}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Mobile Filters Drawer Modal */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileFiltersOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-rise">
                <StandardsFilters
                  filters={filters}
                  categories={categories}
                  productCategories={productCategories}
                  onFilterChange={setFilter}
                  onResetFilters={resetFilters}
                  onCloseMobile={() => setMobileFiltersOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Results Column */}
          <main className="space-y-4">
            {/* Results Header Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileSearch size={16} className="text-navy" />
                <span>
                  <strong className="font-bold text-ink">{total}</strong> standards found
                  {filters.saved_only && ' (Bookmarked only)'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles size={13} className="text-saffron" />
                <span>Indexed with Gazette Notifications</span>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 animate-rise">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex items-center gap-1 font-bold text-red-900 underline hover:no-underline"
                >
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}

            {/* Content Switcher: Loading / Empty / Grid */}
            {isLoading ? (
              <StandardsSkeleton count={6} />
            ) : standards.length === 0 ? (
              /* Empty State */
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center animate-rise">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-navy">
                  <FileSearch size={28} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">No Indian Standards match your search</h3>
                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-slate-500">
                  We couldn&apos;t find any standards matching your current keywords or active filter criteria. Try searching by standard number (e.g. &ldquo;IS 374&rdquo;) or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white transition hover:bg-[#062d5e] shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Standards Grid */
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {standards.map((standard) => (
                  <StandardCard
                    key={standard.id}
                    standard={standard}
                    onViewDetails={selectStandard}
                    onAskAI={handleAskAI}
                    onToggleSave={toggleSaveStandard}
                    isSaving={isSavingId === standard.id}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
                <span className="text-xs text-slate-500">
                  Page <strong className="text-ink">{page}</strong> of{' '}
                  <strong className="text-ink">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={14} />
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => changePage(p)}
                        className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                          p === page
                            ? 'bg-navy text-white shadow-xs'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Full Standard Details Modal Dialog                    */}
      {/* ======================================================== */}
      {selectedStandard && (
        <StandardDetails
          standard={selectedStandard}
          onClose={closeStandardDetails}
          onAskAI={handleAskAI}
          onToggleSave={toggleSaveStandard}
          isSaving={isSavingId === selectedStandard.id}
        />
      )}
    </IndustryLayout>
  )
}
