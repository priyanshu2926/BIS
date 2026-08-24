/**
 * @file src/components/documents/DocumentStatus.jsx
 * Status Badges and RAG Pipeline Stage Tracker for BIS Documents.
 * 
 * Supports:
 * - Compact status pill badges
 * - Full multi-stage RAG Pipeline Stepper
 * - Uploading, Processing, Ready, and Failed states
 */

import { AlertCircle, CheckCircle2, ChevronRight, Clock, Loader2, Sparkles, UploadCloud } from 'lucide-react'
import { DOCUMENT_STATUS } from '../../types/documents'

/**
 * Compact Status Badge
 */
export default function DocumentStatus({ status, stage, size = 'md' }) {
  const normalizedStatus = status?.toLowerCase() || 'processing'

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }

  if (normalizedStatus === DOCUMENT_STATUS.READY) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses[size]}`}
      >
        <CheckCircle2 size={size === 'sm' ? 12 : 14} className="text-emerald-600 shrink-0" />
        <span>Ready</span>
      </span>
    )
  }

  if (normalizedStatus === DOCUMENT_STATUS.PROCESSING) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses[size]}`}
      >
        <Loader2 size={size === 'sm' ? 12 : 14} className="animate-spin text-amber-600 shrink-0" />
        <span>{stage || 'Processing'}</span>
      </span>
    )
  }

  if (normalizedStatus === DOCUMENT_STATUS.UPLOADING) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses[size]}`}
      >
        <UploadCloud size={size === 'sm' ? 12 : 14} className="animate-pulse text-navy shrink-0" />
        <span>Uploading</span>
      </span>
    )
  }

  if (normalizedStatus === DOCUMENT_STATUS.FAILED) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses[size]}`}
      >
        <AlertCircle size={size === 'sm' ? 12 : 14} className="text-rose-600 shrink-0" />
        <span>Failed</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses[size]}`}
    >
      <Clock size={size === 'sm' ? 12 : 14} className="text-slate-500 shrink-0" />
      <span>{status || 'Unknown'}</span>
    </span>
  )
}

/**
 * Detailed RAG Pipeline Stages Stepper for Document Details
 * Visualizes the roadmap: Uploaded -> Text extracted -> Chunked -> Embedded -> Indexed -> Ready for AI
 */
export function DocumentRagPipeline({ status, stage }) {
  const stages = [
    { key: 'uploaded', label: 'Uploaded' },
    { key: 'extracted', label: 'Text Extracted' },
    { key: 'chunked', label: 'Chunked' },
    { key: 'embedded', label: 'Embedded' },
    { key: 'indexed', label: 'Indexed' },
    { key: 'ready', label: 'Ready for AI' },
  ]

  // Calculate current active step index (0-5)
  let activeIndex = 0
  if (status === DOCUMENT_STATUS.READY) {
    activeIndex = 5
  } else if (status === DOCUMENT_STATUS.FAILED) {
    activeIndex = 1
  } else if (status === DOCUMENT_STATUS.UPLOADING) {
    activeIndex = 0
  } else {
    const s = (stage || '').toLowerCase()
    if (s.includes('extract')) activeIndex = 1
    else if (s.includes('chunk')) activeIndex = 2
    else if (s.includes('embed')) activeIndex = 3
    else if (s.includes('index')) activeIndex = 4
    else activeIndex = 1
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
          <Sparkles size={14} className="text-saffron" />
          RAG Document Intelligence Pipeline
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          {status === DOCUMENT_STATUS.READY
            ? 'Complete (Ready for Q&A)'
            : status === DOCUMENT_STATUS.FAILED
            ? 'Pipeline Failed'
            : 'Pipeline in progress'}
        </span>
      </div>

      {/* Steps visualization */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((step, idx) => {
          const isDone = status === DOCUMENT_STATUS.READY || idx < activeIndex
          const isCurrent = idx === activeIndex && status !== DOCUMENT_STATUS.READY && status !== DOCUMENT_STATUS.FAILED
          const isFailed = idx === activeIndex && status === DOCUMENT_STATUS.FAILED

          return (
            <div
              key={step.key}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                  : isFailed
                  ? 'border-rose-200 bg-rose-50 text-rose-800'
                  : isCurrent
                  ? 'border-amber-300 bg-amber-50 text-amber-900 ring-1 ring-amber-300'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 size={15} className="text-emerald-600" />
                ) : isFailed ? (
                  <AlertCircle size={15} className="text-rose-600" />
                ) : isCurrent ? (
                  <Loader2 size={15} className="animate-spin text-amber-600" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                )}
              </div>
              <span className="mt-1 text-[11px] font-bold leading-tight">
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
