/**
 * @file src/components/certification/RequirementCard.jsx
 * Reusable compliance requirement card with importance badges and clause tags.
 */

import { AlertCircle, FileText, ShieldAlert, ShieldCheck } from 'lucide-react'

function getImportanceBadge(importance) {
  switch (importance) {
    case 'Mandatory':
      return {
        class: 'bg-red-50 text-red-800 border-red-200',
        icon: ShieldAlert,
        label: 'Mandatory',
      }
    case 'Critical':
      return {
        class: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: AlertCircle,
        label: 'Critical',
      }
    case 'Recommended':
    default:
      return {
        class: 'bg-blue-50 text-navy border-blue-200',
        icon: ShieldCheck,
        label: 'Recommended',
      }
  }
}

export default function RequirementCard({ requirement }) {
  const badge = getImportanceBadge(requirement.importance)
  const Icon = badge.icon

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-navy hover:shadow-soft">
      <div>
        {/* Top Header with Category & Importance Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {requirement.category}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badge.class}`}
          >
            <Icon size={12} />
            {badge.label}
          </span>
        </div>

        {/* Title */}
        <h4 className="mt-3 text-sm font-bold text-ink sm:text-base">
          {requirement.title}
        </h4>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {requirement.description}
        </p>
      </div>

      {/* Clause Reference */}
      {requirement.clause && (
        <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-500">
          <FileText size={13} className="text-navy" />
          <span>Standard Reference: {requirement.clause}</span>
        </div>
      )}
    </article>
  )
}
