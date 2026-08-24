/**
 * @file src/components/certification/TestingStep.jsx
 * Step 4: Testing requirements breakdown, equipment calibration guidance,
 * and laboratory verification protocols.
 */

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Cpu,
  FileCheck,
  FlaskConical,
  Gauge,
  Info,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function TestingStep({
  standard,
  testingRequirements = [],
  onBack,
  onContinue,
  isLoading = false,
}) {
  const inHouseTests = testingRequirements.filter((t) => t.test_type.includes('In-House'))
  const labTests = testingRequirements.filter((t) => !t.test_type.includes('In-House'))

  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 4: Testing & Laboratory Protocols</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          Testing Requirements for {standard?.standard_number || 'Selected Standard'}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Under the prescribed Scheme of Inspection and Testing (SIT), manufacturers must establish
          in-house testing facilities and submit samples for third-party lab verification.
        </p>
      </div>

      {/* Official Testing Guidance Notice */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-blue-200 bg-blue-50/70 p-4.5 text-xs text-slate-800">
        <Info size={20} className="shrink-0 text-navy mt-0.5" />
        <div>
          <h4 className="font-bold text-navy text-sm">Mandatory Testing Guidance</h4>
          <p className="mt-1 leading-relaxed text-slate-700">
            All in-house testing instruments must hold active calibration certificates from NABL accredited
            laboratories with validity within 12 months. Production samples for license grant are drawn and
            sealed by BIS inspecting officers during factory audit.
          </p>
        </div>
      </div>

      {/* 1. In-House Factory Routine Tests */}
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-navy text-white text-xs">
            <Gauge size={14} />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
            Mandatory In-House Routine Tests (Factory Lab)
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {inHouseTests.map((test) => (
            <article
              key={test.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-navy"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-ink">{test.test_name}</h4>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-navy shrink-0">
                    {test.clause}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <span className="block font-bold text-slate-700">Acceptance Criteria:</span>
                    <span className="text-slate-600">{test.parameters}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock size={13} className="text-navy" />
                    <span>Frequency: {test.frequency}</span>
                  </div>

                  {test.required_equipment && (
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <Cpu size={13} className="text-saffron" />
                      <span>Required Device: {test.required_equipment}</span>
                    </div>
                  )}
                </div>
              </div>

              {test.guidance && (
                <p className="mt-3.5 border-t border-slate-100 pt-2.5 text-[11px] italic text-slate-500">
                  Tip: {test.guidance}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* 2. Independent Laboratory Verification Tests */}
      {labTests.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-purple-100 text-purple-800 text-xs">
              <FlaskConical size={14} />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
              Third-Party Laboratory Type Tests (BIS / NABL Labs)
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {labTests.map((test) => (
              <article
                key={test.id}
                className="flex flex-col justify-between rounded-2xl border border-purple-100 bg-purple-50/30 p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-ink">{test.test_name}</h4>
                    <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[11px] font-bold text-purple-900 shrink-0">
                      {test.clause}
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    <strong>Standard Threshold:</strong> {test.parameters}
                  </p>
                </div>

                <div className="mt-4 border-t border-purple-100 pt-2.5 text-xs font-semibold text-purple-900 flex items-center justify-between">
                  <span>Frequency: {test.frequency}</span>
                  <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px]">Independent Lab</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          <span>Back to Requirements</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#062d5e] active:scale-95 disabled:opacity-40"
        >
          <span>Continue to Required Documents</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
