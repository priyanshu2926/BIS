/**
 * @file src/components/standards/StandardCard.jsx
 * Reusable card displaying standard number, title, description,
 * badges, bookmark toggle, and actions ('View Details' & 'Ask AI').
 */

import {
  Bookmark,
  BotMessageSquare,
  Calendar,
  Eye,
  ShieldAlert,
} from 'lucide-react'

function getStatusBadge(status) {
  switch (status) {
    case 'Active':
      return {
        class: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Active',
      }
    case 'Under Revision':
      return {
        class: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Under Revision',
      }
    case 'Withdrawn':
      return {
        class: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        label: 'Withdrawn',
      }
    default:
      return {
        class: 'bg-blue-50 text-navy border-blue-200',
        dot: 'bg-navy',
        label: status || 'Standard',
      }
  }
}

export default function StandardCard({
  standard,
  onViewDetails,
  onAskAI,
  onToggleSave,
  isSaving = false,
}) {
  const statusBadge = getStatusBadge(standard.status)

  const handleBookmark = (e) => {
    e.stopPropagation()
    onToggleSave?.(standard.id)
  }

  const handleAskAI = (e) => {
    e.stopPropagation()
    onAskAI?.(standard)
  }

  return (
    <article
      onClick={() => onViewDetails?.(standard)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition duration-150 hover:-translate-y-0.5 hover:border-navy hover:shadow-soft cursor-pointer"
    >
      <div>
        {/* Top Badges & Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusBadge.class}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
              {statusBadge.label}
            </span>

            {/* Scheme Tag */}
            {standard.scheme && (
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-navy">
                {standard.scheme}
              </span>
            )}
          </div>

          {/* Save / Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmark}
            disabled={isSaving}
            aria-label={standard.saved ? 'Remove standard from saved' : 'Save standard to bookmarks'}
            className={`rounded-xl p-2 transition ${
              standard.saved
                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                : 'text-slate-400 hover:bg-slate-100 hover:text-navy'
            }`}
          >
            <Bookmark size={17} className={standard.saved ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Standard Code & Title */}
        <div className="mt-3">
          <p className="text-sm font-bold text-navy group-hover:underline">
            {standard.standard_number}
          </p>
          <h3 className="mt-1 font-bold text-ink text-base leading-snug line-clamp-2">
            {standard.title}
          </h3>
        </div>

        {/* Description Excerpt */}
        <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
          {standard.description}
        </p>

        {/* Mandatory QCO Warning Pill (if applicable) */}
        {standard.qco_mandatory && (
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-amber-50/80 px-2.5 py-1.5 text-[11px] font-semibold text-amber-900 border border-amber-200/60">
            <ShieldAlert size={13} className="shrink-0 text-amber-700" />
            <span className="truncate">{standard.qco_mandatory}</span>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="mt-5 border-t border-slate-100 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Category & Date */}
          <div className="flex items-center gap-2 text-slate-500">
            <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700 text-[11px]">
              {standard.category}
            </span>
            {standard.published_date && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar size={11} />
                {standard.published_date.substring(0, 4)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails?.(standard)
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-navy hover:text-navy"
            >
              <Eye size={13} />
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={handleAskAI}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-navy transition hover:bg-navy hover:text-white"
              title="Open in BIS AI Assistant"
            >
              <BotMessageSquare size={13} />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
