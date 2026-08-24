/**
 * @file src/components/certification/CertificationRoadmap.jsx
 * Step 6: Visual certification roadmap, stage timeline, milestone tracker,
 * and compliance checklist generator.
 */

import {
  AlertCircle,
  ArrowLeft,
  BotMessageSquare,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Landmark,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'

export default function CertificationRoadmap({
  roadmap,
  selectedProduct,
  selectedStandard,
  requirements = [],
  testingRequirements = [],
  documents = [],
  onBack,
  onReset,
  onAskAI,
  isLoading = false,
}) {
  const [showChecklistModal, setShowChecklistModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const productName = selectedProduct?.name || roadmap?.product_name || 'Manufactured Product'
  const standardCode = selectedStandard?.standard_number || roadmap?.standard_number || 'Indian Standard'
  const preparedDocsCount = documents.filter((d) => d.prepared).length

  const handlePrintChecklist = () => {
    window.print()
  }

  const handleCopyChecklist = () => {
    const text = `BIS COMPLIANCE CHECKLIST
Product: ${productName}
Standard: ${standardCode}
Scheme: ${roadmap?.scheme || 'Scheme-I (ISI Mark)'}
Overall Readiness: ${roadmap?.overall_progress || 60}%
Estimated Timeline: ${roadmap?.estimated_timeline || '30-45 Days'}

REQUIREMENTS (${requirements.length}):
${requirements.map((r, i) => `${i + 1}. [${r.importance}] ${r.title} (${r.clause})`).join('\n')}

MANDATORY IN-HOUSE TESTING:
${testingRequirements.map((t, i) => `${i + 1}. ${t.test_name} - ${t.parameters} (${t.frequency})`).join('\n')}

APPLICATION DOCUMENTS:
${documents.map((d, i) => `${i + 1}. [${d.prepared ? 'PREPARED' : 'PENDING'}] ${d.title}`).join('\n')}
`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 6: Certification Roadmap</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          Certification Pathway for {productName}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Your customized roadmap to obtain the BIS Standard Mark (ISI License) under{' '}
          {roadmap?.scheme || 'Scheme-I'}.
        </p>
      </div>

      {/* Summary KPI Cards Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Overall Readiness
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy">{roadmap?.overall_progress || 60}%</span>
            <span className="text-xs font-semibold text-emerald-700">On Track</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-navy to-emerald-500"
              style={{ width: `${roadmap?.overall_progress || 60}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Estimated Timeline
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-ink">{roadmap?.estimated_timeline || '30-45 Days'}</span>
          </div>
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <Clock size={13} className="text-navy" /> From submission to license grant
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Target Certification
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-navy">{roadmap?.scheme || 'Scheme-I (ISI Mark)'}</span>
          </div>
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-600" /> {standardCode}
          </p>
        </div>
      </div>

      {/* Visual Roadmap Timeline (8 Stages) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-ink text-base">Stage-by-Stage Milestone Plan</h3>
            <p className="text-xs text-slate-500">From preparation to audit and official license issue.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowChecklistModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition"
          >
            <FileSpreadsheet size={15} />
            <span>Generate Compliance Checklist</span>
          </button>
        </div>

        {/* Timeline Items */}
        <div className="mt-6 space-y-6">
          {(roadmap?.stages || []).map((stage, idx) => {
            const isCompleted = stage.status === 'completed'
            const isCurrent = stage.status === 'current'

            return (
              <div key={stage.number} className="relative flex items-start gap-4">
                {/* Connecting vertical line */}
                {idx < (roadmap?.stages?.length || 8) - 1 && (
                  <div
                    aria-hidden="true"
                    className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                      isCompleted ? 'bg-navy' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Stage Indicator Icon */}
                <div
                  className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold transition ${
                    isCompleted
                      ? 'bg-navy text-white'
                      : isCurrent
                      ? 'bg-saffron text-white ring-4 ring-orange-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check size={15} strokeWidth={3} /> : stage.number}
                </div>

                {/* Stage Card Content */}
                <div
                  className={`flex-1 rounded-2xl border p-4.5 transition ${
                    isCurrent
                      ? 'border-blue-200 bg-blue-50/40 shadow-xs'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-ink">
                      Stage {stage.number}: {stage.title}
                    </h4>
                    <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      <Calendar size={11} /> {stage.timeline}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-600">{stage.description}</p>

                  {/* Key Actions list */}
                  {stage.key_actions && stage.key_actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stage.key_actions.map((act, aIdx) => (
                        <span
                          key={aIdx}
                          className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600"
                        >
                          <CheckCircle2 size={11} className="text-navy" />
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            <span>Back to Documents</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            <RotateCcw size={13} />
            <span>Start Over</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowChecklistModal(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-navy hover:bg-slate-50 transition"
          >
            <FileSpreadsheet size={16} />
            <span>View Checklist</span>
          </button>

          {onAskAI && (
            <button
              type="button"
              onClick={() =>
                onAskAI({
                  productName,
                  standardCode,
                  preparedDocsCount,
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-[#062d5e] transition active:scale-95"
            >
              <BotMessageSquare size={16} />
              <span>Ask AI About This Roadmap</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* Generated Compliance Checklist Modal                     */}
      {/* ======================================================== */}
      {showChecklistModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checklist-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-rise"
        >
          <div className="absolute inset-0" onClick={() => setShowChecklistModal(false)} aria-hidden="true" />

          <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-navy">
                  <FileCheck2 size={20} />
                </span>
                <div>
                  <h3 id="checklist-modal-title" className="text-base font-extrabold text-ink sm:text-lg">
                    BIS Compliance Assessment Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    {productName} · {standardCode}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowChecklistModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Summary Header */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-4 border border-slate-100 text-xs">
                <div>
                  <span className="block font-bold text-slate-400 uppercase">Product</span>
                  <span className="font-extrabold text-ink">{productName}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase">Standard</span>
                  <span className="font-extrabold text-navy">{standardCode}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase">Scheme</span>
                  <span className="font-extrabold text-ink">{roadmap?.scheme || 'Scheme-I'}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase">Readiness</span>
                  <span className="font-extrabold text-emerald-700">{roadmap?.overall_progress || 60}%</span>
                </div>
              </div>

              {/* 1. Core Technical Requirements */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Technical Compliance Requirements ({requirements.length})
                </h4>
                <div className="space-y-2">
                  {requirements.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-ink">{r.title}</span>
                        <p className="text-slate-500 mt-0.5">{r.description}</p>
                      </div>
                      <span className="rounded bg-navy/10 px-2 py-0.5 font-bold text-navy shrink-0 ml-2">
                        {r.clause}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. In-House Testing Protocols */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Mandatory Routine & Laboratory Tests ({testingRequirements.length})
                </h4>
                <div className="space-y-2">
                  {testingRequirements.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-ink">{t.test_name}</span>
                        <p className="text-slate-500 mt-0.5">{t.parameters}</p>
                      </div>
                      <span className="rounded bg-slate-200 px-2 py-0.5 text-slate-700 font-semibold shrink-0 ml-2">
                        {t.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Document Readiness Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. Application Dossier Checklist ({preparedDocsCount}/{documents.length} Prepared)
                </h4>
                <div className="space-y-2">
                  {documents.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md text-white text-[10px] ${
                            d.prepared ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        >
                          {d.prepared ? <Check size={12} strokeWidth={3} /> : '—'}
                        </span>
                        <span className={`font-bold ${d.prepared ? 'text-ink' : 'text-slate-500'}`}>
                          {d.title}
                        </span>
                      </div>
                      <span
                        className={`rounded px-2 py-0.5 font-bold ${
                          d.prepared ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {d.prepared ? 'Ready' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4">
              <span className="text-xs text-slate-500">
                Generated via BIS AI Certification Assistant
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyChecklist}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {copied ? 'Copied!' : 'Copy Summary'}
                </button>
                <button
                  type="button"
                  onClick={handlePrintChecklist}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-[#062d5e] transition shadow-xs"
                >
                  <Printer size={14} />
                  <span>Print Checklist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
