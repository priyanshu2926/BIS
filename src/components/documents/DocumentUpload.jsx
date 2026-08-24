/**
 * @file src/components/documents/DocumentUpload.jsx
 * Professional Document Upload Modal and Dropzone for BIS Industry Documents.
 * 
 * Supports:
 * - Drag and drop with visual cues
 * - Native file picker fallback
 * - File metadata inspection (name, type, formatted size)
 * - Category classification & related standard tagging
 * - Progress bar simulation with cancel/remove actions
 * - Error validation (file size, file type)
 */

import { useState, useRef } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  FileCheck,
  FileText,
  Loader2,
  Tag,
  UploadCloud,
  X,
} from 'lucide-react'
import {
  DOCUMENT_CATEGORIES,
  formatFileSize,
  getFileTypeBadge,
} from '../../types/documents'

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024 // 25 MB
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.txt', '.png', '.jpg', '.jpeg']

export default function DocumentUpload({
  isOpen,
  onClose,
  onUpload,
  isUploading,
  uploadProgress,
}) {
  const fileInputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [category, setCategory] = useState('Product Specification')
  const [relatedStandard, setRelatedStandard] = useState('IS 374:2019')
  const [validationError, setValidationError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  if (!isOpen) return null

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const validateAndSetFile = (file) => {
    setValidationError(null)
    setUploadSuccess(false)

    if (!file) return

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(`File size exceeds 25 MB limit (${formatFileSize(file.size)}).`)
      return
    }

    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setValidationError(
        `File type "${ext}" is not supported. Please upload a PDF, Word, Excel, Text, or Image file.`
      )
      return
    }

    setSelectedFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const handleClearSelectedFile = () => {
    setSelectedFile(null)
    setValidationError(null)
    setUploadSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile || isUploading) return

    try {
      await onUpload({
        file: selectedFile,
        category,
        related_standard_number: relatedStandard,
      })
      setUploadSuccess(true)
      setTimeout(() => {
        handleClearSelectedFile()
        onClose()
      }, 1200)
    } catch (err) {
      setValidationError(err.message || 'Upload failed. Please try again.')
    }
  }

  const typeBadge = selectedFile ? getFileTypeBadge(selectedFile.name) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={!isUploading ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-navy">
              <UploadCloud size={19} />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink">Upload Document</h3>
              <p className="text-xs text-slate-500">
                BIS standard compliance, lab reports, and technical dossiers
              </p>
            </div>
          </div>
          {!isUploading && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Validation Error Banner */}
          {validationError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Success Banner */}
          {uploadSuccess && (
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Document uploaded successfully! Starting background RAG indexing...</span>
            </div>
          )}

          {/* Drag & Drop Zone */}
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
                dragOver
                  ? 'border-navy bg-blue-50/70 scale-[0.99]'
                  : 'border-slate-300 bg-slate-50/60 hover:border-navy hover:bg-blue-50/30'
              }`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-navy shadow-sm">
                <UploadCloud size={24} />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">
                Drag and drop your file here, or{' '}
                <span className="text-navy underline">browse</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PDF, DOCX, XLSX, TXT, PNG, JPG (up to 25 MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            /* Selected File Card */
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg border font-bold text-xs shrink-0 ${typeBadge.bg} ${typeBadge.color}`}
                  >
                    {typeBadge.label}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(selectedFile.size)} · {selectedFile.type || 'Document'}
                    </p>
                  </div>
                </div>

                {!isUploading && !uploadSuccess && (
                  <button
                    type="button"
                    onClick={handleClearSelectedFile}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1 text-navy">
                      <Loader2 size={12} className="animate-spin" /> Uploading to secure storage...
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-navy transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Metadata Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                Document Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading || uploadSuccess}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy disabled:bg-slate-50"
              >
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                Related Standard (Optional)
              </label>
              <input
                type="text"
                value={relatedStandard}
                onChange={(e) => setRelatedStandard(e.target.value)}
                disabled={isUploading || uploadSuccess}
                placeholder="e.g. IS 374:2019"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Info Notice */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11px] leading-relaxed text-slate-600">
            <span className="font-bold text-navy">Simulated Document Processing:</span> Uploaded files are automatically fed into the mock RAG pipeline where OCR text extraction, chunking, and AI summary generation are simulated.
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedFile || isUploading || uploadSuccess}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-slate-800 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Uploading ({uploadProgress}%)
                </>
              ) : uploadSuccess ? (
                <>
                  <CheckCircle2 size={14} />
                  Uploaded
                </>
              ) : (
                <>
                  <UploadCloud size={14} />
                  Confirm Upload
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
