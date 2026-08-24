/**
 * @file src/components/documents/DocumentHeader.jsx
 * Header and Statistics Dashboard for BIS Industry Documents Workspace.
 */

import { AlertCircle, CheckCircle2, Clock, Files, Plus, UploadCloud } from 'lucide-react'

export default function DocumentHeader({ stats, onOpenUpload }) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:p-7 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-navy">
              <Files size={13} />
              Document Intelligence
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Documents
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
            Upload and manage documents related to your standards, certification and compliance work.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenUpload}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-navy focus:ring-offset-2 shrink-0"
        >
          <UploadCloud size={18} />
          Upload Document
        </button>
      </section>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Documents */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Documents
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-navy">
              <Files size={18} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-ink sm:text-3xl">
              {stats?.total ?? 0}
            </span>
            <span className="text-xs font-medium text-slate-500">files</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">All uploaded compliance assets</p>
        </div>

        {/* Ready for AI */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-2xs transition hover:border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Ready for AI
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={18} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-900 sm:text-3xl">
              {stats?.ready ?? 0}
            </span>
            <span className="text-xs font-semibold text-emerald-700">indexed</span>
          </div>
          <p className="mt-1 text-xs text-emerald-600/80">Available for Q&A and analysis</p>
        </div>

        {/* Processing */}
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-2xs transition hover:border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Processing
            </span>
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Clock size={18} />
              {stats?.processing > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-amber-500" />
              )}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-900 sm:text-3xl">
              {stats?.processing ?? 0}
            </span>
            <span className="text-xs font-semibold text-amber-700">active</span>
          </div>
          <p className="mt-1 text-xs text-amber-600/80">OCR, chunking & vectorizing</p>
        </div>

        {/* Failed / Attention */}
        <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/40 p-5 shadow-2xs transition hover:border-rose-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-800">
              Failed
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-rose-700">
              <AlertCircle size={18} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-900 sm:text-3xl">
              {stats?.failed ?? 0}
            </span>
            <span className="text-xs font-semibold text-rose-700">needs review</span>
          </div>
          <p className="mt-1 text-xs text-rose-600/80">Parsing or resolution errors</p>
        </div>
      </div>
    </div>
  )
}
