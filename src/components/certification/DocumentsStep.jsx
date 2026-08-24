/**
 * @file src/components/certification/DocumentsStep.jsx
 * Step 5: Document checklist for BIS application dossier with interactive preparation toggles.
 */

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  FileCheck2,
  FileText,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function DocumentsStep({
  documents = [],
  onTogglePrepared,
  onBack,
  onContinue,
  isLoading = false,
}) {
  const preparedCount = documents.filter((d) => d.prepared).length
  const totalCount = documents.length || 6
  const percentage = Math.round((preparedCount / totalCount) * 100)

  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 5: Documentation Preparation</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          Application Dossier & Required Documents
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Prepare these verified legal, factory, quality, and machinery records prior to submitting
          Form-I on the online BIS Manakonline portal.
        </p>
      </div>

      {/* Progress & Preparation Tracker */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-navy">
              <FileCheck2 size={19} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-ink">
                Dossier Readiness: {preparedCount} of {totalCount} Documents Prepared
              </h4>
              <p className="text-xs text-slate-500">
                Check off documents as your team completes preparation.
              </p>
            </div>
          </div>

          <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
            {percentage}% Ready
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3.5">
        {documents.map((doc) => {
          return (
            <div
              key={doc.id}
              onClick={() => onTogglePrepared(doc.id)}
              className={`flex flex-col justify-between rounded-2xl border p-4.5 transition cursor-pointer sm:flex-row sm:items-center ${
                doc.prepared
                  ? 'border-emerald-200 bg-emerald-50/40 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-navy hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Checkbox */}
                <div className="shrink-0 mt-0.5">
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-lg border transition ${
                      doc.prepared
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-navy'
                    }`}
                  >
                    {doc.prepared && <Check size={15} strokeWidth={3} />}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {doc.category}
                    </span>
                    {doc.mandatory && (
                      <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                        Mandatory
                      </span>
                    )}
                  </div>

                  <h4
                    className={`mt-1 text-sm font-bold transition ${
                      doc.prepared ? 'text-emerald-950' : 'text-ink'
                    }`}
                  >
                    {doc.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>

                  {doc.format_notes && (
                    <span className="mt-1.5 inline-block text-[11px] font-medium text-slate-400">
                      Note: {doc.format_notes}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 shrink-0 sm:mt-0 sm:pl-4">
                <span
                  className={`inline-block rounded-xl px-3 py-1 text-xs font-bold ${
                    doc.prepared
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {doc.prepared ? 'Prepared' : 'Pending'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          <span>Back to Testing</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#062d5e] active:scale-95 disabled:opacity-40"
        >
          <span>View Certification Roadmap</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
