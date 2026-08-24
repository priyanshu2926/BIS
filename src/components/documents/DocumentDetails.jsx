/**
 * @file src/components/documents/DocumentDetails.jsx
 * Detailed Inspection Drawer / Modal for BIS Industry Documents.
 * 
 * Shows:
 * - Document metadata (name, type, size, upload timestamp, category, related standard)
 * - RAG Intelligence Pipeline Tracker (Uploaded -> Text Extracted -> Chunked -> Embedded -> Indexed -> Ready)
 * - AI Executive Summary & Key Extracted Requirements
 * - OCR / Extracted Text preview
 * - Safe Document Mockup / Preview frame with page count
 * - Action buttons: Ask AI about this document, Retry (if failed), Delete, Close
 */

import { useState } from 'react'
import {
  AlertCircle,
  Copy,
  Eye,
  FileCode,
  FileText,
  ListOrdered,
  Loader2,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import DocumentStatus, { DocumentRagPipeline } from './DocumentStatus'
import {
  DOCUMENT_STATUS,
  formatDocumentDate,
  formatFileSize,
  getFileTypeBadge,
} from '../../types/documents'

export default function DocumentDetails({
  document,
  isOpen,
  onClose,
  onAskAi,
  onDelete,
  onRetry,
}) {
  const [activeTab, setActiveTab] = useState('summary') // 'summary' | 'extracted' | 'preview'
  const [copied, setCopied] = useState(false)

  if (!isOpen || !document) return null

  const isReady = document.status === DOCUMENT_STATUS.READY
  const isFailed = document.status === DOCUMENT_STATUS.FAILED
  const typeBadge = getFileTypeBadge(document.name)

  const handleCopyText = (text) => {
    if (!text) return
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative flex h-[90vh] max-h-[820px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-rise">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl border font-bold text-xs shrink-0 shadow-2xs ${typeBadge.bg} ${typeBadge.color}`}
            >
              {typeBadge.label}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-bold text-ink" title={document.name}>
                  {document.name}
                </h2>
                <DocumentStatus status={document.status} stage={document.processing_stage} size="sm" />
              </div>
              <p className="text-xs text-slate-500">
                {document.category} · Uploaded on {formatDocumentDate(document.uploaded_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-ink"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">File Size</span>
              <p className="font-bold text-ink mt-0.5">{formatFileSize(document.file_size)}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">File Format</span>
              <p className="font-bold text-ink mt-0.5">{document.file_type || 'Document'}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Applicable Standard</span>
              <p className="font-bold text-navy mt-0.5">
                {document.related_standard_number || 'General / N/A'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Estimated Pages</span>
              <p className="font-bold text-ink mt-0.5">{document.pages_count || 1} pages</p>
            </div>
          </div>

          {/* 2. RAG Pipeline Tracker */}
          <DocumentRagPipeline status={document.status} stage={document.processing_stage} />

          {/* Failure Alert if status === 'failed' */}
          {isFailed && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-rose-900">Document Processing Issue</h4>
                  <p className="mt-1 text-xs text-rose-700 leading-relaxed">
                    {document.error_message ||
                      'The system encountered an error during optical character recognition. Try re-uploading a clearer PDF or retry the pipeline.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRetry(document.id)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-700"
                  >
                    <RotateCcw size={13} />
                    Retry Processing
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Tabbed Content Area for Document Intelligence */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 pt-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-bold transition ${
                    activeTab === 'summary'
                      ? 'border-navy text-navy bg-white rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Sparkles size={14} className={activeTab === 'summary' ? 'text-saffron' : ''} />
                  AI Summary & Requirements
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('extracted')}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-bold transition ${
                    activeTab === 'extracted'
                      ? 'border-navy text-navy bg-white rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <FileCode size={14} />
                  Extracted Text Layer
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-bold transition ${
                    activeTab === 'preview'
                      ? 'border-navy text-navy bg-white rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Eye size={14} />
                  Document Viewer
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-5">
              {/* Tab 1: AI Summary & Key Requirements */}
              {activeTab === 'summary' && (
                <div className="space-y-5">
                  {isReady && document.summary ? (
                    <>
                      {/* AI Summary Box */}
                      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                        <div className="flex items-center gap-2 font-bold text-navy text-xs">
                          <Sparkles size={15} className="text-saffron" />
                          AI Executive Summary
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">
                          {document.summary}
                        </p>
                      </div>

                      {/* Extracted Key Requirements */}
                      {document.key_requirements && document.key_requirements.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-1.5 text-xs font-bold text-ink">
                            <ListOrdered size={14} className="text-navy" />
                            Extracted Standards & Compliance Clauses
                          </h4>
                          <ul className="mt-2.5 space-y-2">
                            {document.key_requirements.map((req, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 p-2.5 text-xs text-slate-700"
                              >
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-navy shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Placeholder for processing / pending state */
                    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                        <Loader2 size={20} className="animate-spin" />
                      </span>
                      <h4 className="mt-3 text-xs font-bold text-ink">
                        Summary & Requirements Ingestion
                      </h4>
                      <p className="mt-1 max-w-sm text-xs text-slate-500">
                        Available after document processing. The background pipeline will parse
                        clauses, test parameters, and compliance highlights.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Extracted Text Layer */}
              {activeTab === 'extracted' && (
                <div>
                  {isReady && document.extracted_text ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">
                          Raw OCR / parsed text extracted from document
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(document.extracted_text)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:underline"
                        >
                          <Copy size={13} />
                          {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                        </button>
                      </div>
                      <pre className="max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {document.extracted_text}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-navy">
                        <FileCode size={20} />
                      </span>
                      <h4 className="mt-3 text-xs font-bold text-ink">Extracted Text Layer</h4>
                      <p className="mt-1 max-w-sm text-xs text-slate-500">
                        Available after document processing. OCR engine extracts full text layers
                        for vector embeddings.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Document Viewer Mockup */}
              {activeTab === 'preview' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Document Canvas Viewer ({document.pages_count || 1} Pages)</span>
                    <span className="font-semibold text-navy">Secure In-Portal Preview</span>
                  </div>

                  <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-navy shadow-sm">
                      <FileText size={28} />
                    </span>
                    <p className="mt-3 font-bold text-ink text-sm">{document.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Standard PDF/Document canvas renderer placeholder. Full sandbox viewer ready
                      for backend asset streaming.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 shadow-2xs">
                        Page 1 of {document.pages_count || 1}
                      </span>
                      <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 shadow-2xs">
                        100% Zoom
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-6 py-4">
          {/* Delete Action */}
          <button
            type="button"
            onClick={() => onDelete(document)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 py-2 text-xs font-bold text-rose-700 shadow-2xs hover:bg-rose-50"
          >
            <Trash2 size={14} />
            Delete Document
          </button>

          {/* Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onAskAi(document)}
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-soft transition hover:bg-slate-800"
            >
              <Sparkles size={14} className="text-saffron" />
              Ask AI about this Document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
