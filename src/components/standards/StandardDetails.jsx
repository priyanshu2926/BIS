/**
 * @file src/components/standards/StandardDetails.jsx
 * Comprehensive standard detail modal / slide-over dialog.
 */

import {
  Bookmark,
  BotMessageSquare,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Tag,
  X,
} from 'lucide-react'
import { useEffect } from 'react'

export default function StandardDetails({
  standard,
  onClose,
  onAskAI,
  onToggleSave,
  isSaving = false,
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!standard) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="standard-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-rise"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-navy">
              <FileText size={22} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-navy/10 px-2 py-0.5 text-xs font-bold text-navy">
                  {standard.standard_number}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    standard.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {standard.status}
                </span>
              </div>
              <h2 id="standard-detail-title" className="mt-1 text-lg font-bold text-ink sm:text-xl">
                {standard.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close standard details"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3.5 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-4">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Division
              </span>
              <span className="mt-0.5 block text-xs font-bold text-ink">
                {standard.category}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Product Segment
              </span>
              <span className="mt-0.5 block text-xs font-bold text-ink truncate">
                {standard.product_category}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Revision
              </span>
              <span className="mt-0.5 block text-xs font-bold text-ink">
                {standard.revision || 'Current'}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Published Date
              </span>
              <span className="mt-0.5 block text-xs font-bold text-ink">
                {standard.published_date || 'N/A'}
              </span>
            </div>
          </div>

          {/* QCO Mandatory Alert */}
          {standard.qco_mandatory && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
              <ShieldAlert size={18} className="shrink-0 text-amber-700 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">Compulsory Compliance Notice</p>
                <p className="mt-0.5 leading-relaxed text-amber-800">
                  {standard.qco_mandatory}. Manufacturing, importing, or selling without the ISI mark is prohibited under the BIS Act, 2016.
                </p>
              </div>
            </div>
          )}

          {/* Description & Technical Scope */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Description & Scope
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {standard.description}
            </p>
            {standard.scope && (
              <p className="mt-2 text-xs leading-relaxed text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Scope:</strong> {standard.scope}
              </p>
            )}
          </div>

          {/* Key Clauses */}
          {standard.key_clauses && standard.key_clauses.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Notable Technical Clauses & Requirements
              </h3>
              <ul className="space-y-2">
                {standard.key_clauses.map((clause, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-slate-100 bg-blue-50/40 p-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 size={14} className="shrink-0 text-navy mt-0.5" />
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regulatory Source */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Official Reference / Gazette
            </h3>
            <p className="mt-1 text-xs font-semibold text-slate-700">
              {standard.source}
            </p>
          </div>

          {/* Keywords */}
          {standard.keywords && standard.keywords.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Tag size={12} /> Keywords & Synonyms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {standard.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
          {/* Save Button */}
          <button
            type="button"
            onClick={() => onToggleSave?.(standard.id)}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              standard.saved
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                : 'border border-slate-300 bg-white text-slate-700 hover:border-navy hover:text-navy'
            }`}
          >
            <Bookmark size={14} className={standard.saved ? 'fill-current' : ''} />
            <span>{standard.saved ? 'Saved in Bookmarks' : 'Save Standard'}</span>
          </button>

          {/* Right Actions: Close & Ask AI */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose?.()
                onAskAI?.(standard)
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#062d5e] transition active:scale-95"
            >
              <BotMessageSquare size={15} />
              <span>Ask AI About This Standard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
