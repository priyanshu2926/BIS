import { ArrowRight, Check, Download, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StatCard({ icon: Icon, label, value, detail, tone = 'bg-blue-50 text-navy' }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}>
          <Icon size={21} />
        </span>
        <button aria-label={`More options for ${label}`} className="text-slate-400 hover:text-navy">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <p className="mt-5 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{label}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </article>
  )
}

export function QuickActionCard({ icon: Icon, title, text, to }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-navy">
        <Icon size={20} />
      </span>
      <h3 className="mt-4 font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy">
        Open <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

export function ProgressBar({ value, className = '' }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div className="h-full rounded-full bg-navy transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

export function StandardCard({ standard }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-navy">{standard.number}</p>
          <h3 className="mt-1 font-bold text-ink">{standard.title}</h3>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            standard.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
          }`}
        >
          {standard.status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{standard.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {standard.category}
        </span>
        <div className="flex gap-2">
          <Link
            to={`/industry/standards?query=${encodeURIComponent(standard.number)}`}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-navy hover:border-navy"
          >
            View Standard
          </Link>
          <Link
            to="/industry/assistant"
            state={{ initialQuery: `Tell me about standard ${standard.number}` }}
            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-navy hover:bg-blue-100"
          >
            Ask AI
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ChecklistItem({ checked, label, description, onChange }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <input className="sr-only" type="checkbox" checked={checked} onChange={onChange} />
      <span
        className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full border ${
          checked ? 'border-navy bg-navy text-white' : 'border-slate-300 text-transparent'
        }`}
      >
        <Check size={13} />
      </span>
      <span>
        <span className={`block text-sm font-semibold ${checked ? 'text-slate-500 line-through' : 'text-ink'}`}>
          {label}
        </span>
        {description && <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span>}
      </span>
    </label>
  )
}

export function DownloadButton({ children = 'Download Checklist' }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
    >
      <Download size={16} />
      {children}
    </button>
  )
}
