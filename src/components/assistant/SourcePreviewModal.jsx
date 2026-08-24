/**
 * @file src/components/assistant/SourcePreviewModal.jsx
 * Full source detail inspection dialog for verified BIS citations.
 */

import { BookOpen, Copy, Check, ExternalLink, FileText, Info, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SourcePreviewModal({ source, onClose }) {
  const [copied, setCopied] = useState(false)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!source) return null

  const handleCopyCitation = () => {
    const text = `${source.document_id}: ${source.title}\nClause: ${source.clause || 'General'}\nPage: ${source.page}\nExcerpt: "${source.snippet}"`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-rise"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-navy">
              <FileText size={20} />
            </span>
            <div>
              <span className="inline-block rounded bg-navy/10 px-2 py-0.5 text-[11px] font-bold text-navy">
                {source.document_type || 'BIS Reference'}
              </span>
              <h3 id="source-preview-title" className="text-lg font-bold text-ink">
                {source.document_id}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close source preview"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Document Title
            </h4>
            <p className="mt-1 text-base font-semibold text-ink">{source.title}</p>
          </div>

          {/* Reference Meta Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-semibold text-slate-500">Clause / Section</span>
              <span className="mt-0.5 block text-sm font-bold text-ink">
                {source.clause || 'N/A'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-500">Page Reference</span>
              <span className="mt-0.5 block text-sm font-bold text-ink">Page {source.page || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-500">Verification Status</span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                <ShieldCheck size={15} /> Indexed Citation
              </span>
            </div>
          </div>

          {/* Snippet Card */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cited Text Passage
              </h4>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:underline"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy Excerpt
                  </>
                )}
              </button>
            </div>
            <div className="mt-2 rounded-xl border-l-4 border-navy bg-blue-50/40 p-4 text-sm leading-relaxed text-slate-800">
              &ldquo;{source.snippet}&rdquo;
            </div>
          </div>

          {/* Context Notice */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
            <Info size={18} className="shrink-0 text-amber-700 mt-0.5" />
            <p className="leading-5">
              This citation is extracted directly from official Bureau of Indian Standards (BIS) documents.
              Specifications and clauses apply to manufacturers under Indian product conformity assessment schemes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <span className="text-xs text-slate-500">
            Official BIS Registry Ref: {source.document_id}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navy/90 transition shadow-sm"
              >
                <ExternalLink size={15} />
                Open Document
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
