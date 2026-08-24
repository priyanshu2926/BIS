/**
 * @file src/components/documents/DocumentCard.jsx
 * Document Card component for BIS Industry Documents Workspace.
 * 
 * Displays:
 * - Formatted file type indicator & file name
 * - Category badge and related standard badge
 * - Formatted upload date and file size
 * - Real-time processing status badge
 * - Actions: View, Ask AI, Delete
 */

import { BotMessageSquare, Calendar, Eye, FileText, HardDrive, Sparkles, Trash2 } from 'lucide-react'
import DocumentStatus from './DocumentStatus'
import {
  DOCUMENT_STATUS,
  formatDocumentDate,
  formatFileSize,
  getFileTypeBadge,
} from '../../types/documents'

export default function DocumentCard({
  document,
  onView,
  onAskAi,
  onDelete,
}) {
  const typeBadge = getFileTypeBadge(document.name)
  const isReady = document.status === DOCUMENT_STATUS.READY

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all duration-200 hover:border-blue-200 hover:shadow-soft">
      {/* Card Header & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`grid h-11 w-11 place-items-center rounded-xl border font-bold text-xs shrink-0 shadow-2xs ${typeBadge.bg} ${typeBadge.color}`}
            >
              {typeBadge.label}
            </span>
            <div className="min-w-0">
              <h3
                onClick={() => onView(document)}
                className="cursor-pointer truncate text-sm font-bold text-ink transition hover:text-navy"
                title={document.name}
              >
                {document.name}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                  {document.category}
                </span>
                {document.related_standard_number && (
                  <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-navy">
                    {document.related_standard_number}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <DocumentStatus status={document.status} stage={document.processing_stage} />
          </div>
        </div>

        {/* AI Summary / Description Snippet */}
        {document.summary ? (
          <p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
            {document.summary}
          </p>
        ) : document.status === DOCUMENT_STATUS.FAILED ? (
          <p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-rose-600">
            {document.error_message || 'Processing failed during optical parsing. Click view for details.'}
          </p>
        ) : (
          <p className="mt-3.5 text-xs text-slate-400 italic">
            {document.status === DOCUMENT_STATUS.PROCESSING
              ? 'Document intelligence pipeline is currently parsing clauses...'
              : 'Processing will begin shortly...'}
          </p>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="mt-5 border-t border-slate-100 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1">
              <HardDrive size={13} />
              {formatFileSize(document.file_size)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formatDocumentDate(document.uploaded_at)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* View Details */}
            <button
              type="button"
              onClick={() => onView(document)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              title="View document metadata & analysis"
            >
              <Eye size={13} />
              <span>View</span>
            </button>

            {/* Ask AI */}
            <button
              type="button"
              onClick={() => onAskAi(document)}
              className="inline-flex items-center gap-1 rounded-lg bg-navy px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
              title="Ask BIS AI Assistant about this document"
            >
              <Sparkles size={13} className="text-saffron" />
              <span>Ask AI</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onDelete(document)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              aria-label={`Delete ${document.name}`}
              title="Delete document"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Table row representation for table view mode
 */
export function DocumentTableRow({
  document,
  onView,
  onAskAi,
  onDelete,
}) {
  const typeBadge = getFileTypeBadge(document.name)

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/70">
      {/* File Name & Category */}
      <td className="py-4 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-lg border font-bold text-[10px] shrink-0 ${typeBadge.bg} ${typeBadge.color}`}
          >
            {typeBadge.label}
          </span>
          <div className="min-w-0">
            <p
              onClick={() => onView(document)}
              className="cursor-pointer font-bold text-ink hover:text-navy truncate text-sm"
              title={document.name}
            >
              {document.name}
            </p>
            <p className="text-xs text-slate-500">{document.category}</p>
          </div>
        </div>
      </td>

      {/* Related Standard */}
      <td className="px-3 py-4 text-xs font-semibold text-slate-700">
        {document.related_standard_number ? (
          <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-navy">
            {document.related_standard_number}
          </span>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>

      {/* File Size */}
      <td className="px-3 py-4 text-xs text-slate-600">
        {formatFileSize(document.file_size)}
      </td>

      {/* Upload Date */}
      <td className="px-3 py-4 text-xs text-slate-600">
        {formatDocumentDate(document.uploaded_at)}
      </td>

      {/* Status */}
      <td className="px-3 py-4">
        <DocumentStatus status={document.status} stage={document.processing_stage} size="sm" />
      </td>

      {/* Actions */}
      <td className="py-4 pl-3 pr-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onView(document)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-ink"
            title="View Details"
          >
            <Eye size={15} />
          </button>
          <button
            type="button"
            onClick={() => onAskAi(document)}
            className="inline-flex items-center gap-1 rounded-lg bg-navy px-2 py-1 text-xs font-bold text-white hover:bg-slate-800"
            title="Ask AI"
          >
            <Sparkles size={12} className="text-saffron" />
            <span>Ask AI</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(document)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            title="Delete Document"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
