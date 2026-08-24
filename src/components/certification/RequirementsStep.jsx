/**
 * @file src/components/certification/RequirementsStep.jsx
 * Step 3: Detailed compliance requirements review across product, manufacturing, and quality pillars.
 */

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import RequirementCard from './RequirementCard'

export default function RequirementsStep({
  standard,
  requirements = [],
  onBack,
  onContinue,
  isLoading = false,
}) {
  const mandatoryCount = requirements.filter((r) => r.importance === 'Mandatory').length

  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 3: Requirements Breakdown</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          Core Compliance Requirements for {standard?.standard_number || 'Selected Standard'}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Review the essential safety, manufacturing tolerances, and quality criteria mandated
          under {standard?.scheme || 'BIS Scheme-I (ISI Mark)'}.
        </p>
      </div>

      {/* Summary Highlight Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h4 className="text-sm font-bold text-ink">
              {requirements.length} Compliance Criteria Identified
            </h4>
            <p className="text-xs text-slate-500">
              Includes {mandatoryCount} mandatory audit checkpoints before license grant.
            </p>
          </div>
        </div>

        <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-navy">
          {standard?.scheme || 'Scheme-I'}
        </span>
      </div>

      {/* Requirements Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {requirements.map((req) => (
          <RequirementCard key={req.id} requirement={req} />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          <span>Back to Standards</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#062d5e] active:scale-95 disabled:opacity-40"
        >
          <span>Continue to Testing Protocols</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
