/**
 * @file src/components/certification/StandardStep.jsx
 * Step 2: Applicable Indian Standard identification & selection.
 */

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  FileText,
  Info,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function StandardStep({
  productName = 'Product',
  standards = [],
  selectedStandard,
  onSelectStandard,
  onBack,
  onContinue,
  isLoading = false,
}) {
  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 2: Standard Identification</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          Applicable Standards for &ldquo;{productName}&rdquo;
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Based on the selected product category, our assessment has identified the following
          applicable Indian Standards and certification schemes.
        </p>
      </div>

      {/* Standards List */}
      <div className="space-y-3.5">
        {standards.map((standard) => {
          const isSelected = selectedStandard?.id === standard.id

          return (
            <article
              key={standard.id}
              onClick={() => onSelectStandard(standard)}
              className={`flex flex-col justify-between rounded-2xl border p-5 transition duration-150 cursor-pointer ${
                isSelected
                  ? 'border-navy bg-blue-50/50 shadow-sm ring-2 ring-navy'
                  : 'border-slate-200 bg-white hover:border-navy/60 hover:bg-slate-50 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                      isSelected ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <FileText size={20} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold text-navy">
                        {standard.standard_number}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          standard.relevance === 'Primary Match'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-navy'
                        }`}
                      >
                        {standard.relevance || 'Applicable Standard'}
                      </span>
                      {standard.scheme && (
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {standard.scheme}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1 text-base font-bold text-ink">{standard.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {standard.description}
                    </p>

                    {standard.qco_mandatory && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                        <ShieldAlert size={14} className="text-amber-700" />
                        <span>{standard.qco_mandatory}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection Check Circle */}
                <div className="shrink-0 mt-1">
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full border transition ${
                      isSelected ? 'border-navy bg-navy text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={16} />}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          <span>Back to Product</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedStandard || isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#062d5e] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{isLoading ? 'Loading Requirements...' : 'Continue to Requirements'}</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
