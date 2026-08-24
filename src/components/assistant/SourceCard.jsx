/**
 * @file src/components/assistant/SourceCard.jsx
 * Reusable citation and standard document source card.
 */

import { BookOpen, Copy, Check, ExternalLink, FileText, FlaskConical, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { DOCUMENT_TYPES } from '../../types/assistant'

/**
 * Return appropriate icon and color badge according to document type
 */
function getDocumentBadge(docType) {
  switch (docType) {
    case DOCUMENT_TYPES.STANDARD:
      return {
        icon: FileText,
        badgeClass: 'bg-blue-50 text-navy border-blue-200',
        label: 'BIS Standard',
      }
    case DOCUMENT_TYPES.GUIDELINE:
    case DOCUMENT_TYPES.SCHEME:
      return {
        icon: ShieldCheck,
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        label: 'Certification Scheme',
      }
    case DOCUMENT_TYPES.LAB_MANUAL:
      return {
        icon: FlaskConical,
        badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
        label: 'Testing Protocol',
      }
    case DOCUMENT_TYPES.QCO:
      return {
        icon: BookOpen,
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
        label: 'Mandatory QCO',
      }
    default:
      return {
        icon: FileText,
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        label: docType || 'Reference',
      }
  }
}

export default function SourceCard({ source, onViewSource, compact = false }) {
  const [copied, setCopied] = useState(false)
  const badge = getDocumentBadge(source.document_type)
  const Icon = badge.icon

  const handleCopyCitation = (e) => {
    e.stopPropagation()
    const citation = `${source.document_id} - ${source.title} (Page ${source.page}${source.clause ? `, ${source.clause}` : ''})`
    navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article
      onClick={() => onViewSource && onViewSource(source)}
      className={`group relative rounded-xl border border-slate-200 bg-white p-4 transition duration-150 hover:-translate-y-0.5 hover:border-navy hover:shadow-sm ${
        onViewSource ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top Header with Document Type Badge & Page */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.badgeClass}`}
        >
          <Icon size={13} aria-hidden="true" />
          {badge.label}
        </span>

        {source.page && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            Page {source.page}
          </span>
        )}
      </div>

      {/* Standard Code / ID */}
      <div className="mt-2.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-navy group-hover:underline">
            {source.document_id}
          </h4>
          <button
            type="button"
            onClick={handleCopyCitation}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-navy"
            title="Copy Citation"
            aria-label="Copy citation text"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
          </button>
        </div>
        <p className="mt-0.5 text-xs font-medium text-ink line-clamp-1">{source.title}</p>
      </div>

      {/* Clause reference if present */}
      {source.clause && (
        <div className="mt-1.5 inline-block text-[11px] font-semibold text-slate-500">
          Ref: {source.clause}
        </div>
      )}

      {/* Cited Snippet Excerpt */}
      {!compact && source.snippet && (
        <blockquote className="mt-2.5 border-l-2 border-slate-200 pl-2.5 text-xs leading-relaxed text-slate-600 italic line-clamp-3">
          &ldquo;{source.snippet}&rdquo;
        </blockquote>
      )}

      {/* Bottom Action */}
      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs font-bold text-navy">
        <span className="inline-flex items-center gap-1 group-hover:underline">
          View source details
          <ExternalLink size={12} />
        </span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Official Ref
        </span>
      </div>
    </article>
  )
}
