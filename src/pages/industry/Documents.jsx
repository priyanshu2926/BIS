/**
 * @file src/pages/industry/Documents.jsx
 * Industry Documents & Document Intelligence Workspace - Phase 11.
 * 
 * Features:
 * - Centralized Document repository for BIS standards, test reports, and factory dossiers
 * - Multi-stage RAG document processing pipeline status tracking
 * - File upload simulation with drag-and-drop & progress bar
 * - Search, multi-criteria filtering (status, category), and sorting
 * - Detailed Document Inspection with AI executive summaries and extracted requirements
 * - "Ask AI" context handoff to the BIS AI Assistant
 * - Delete confirmation modal and retry actions
 * - 100% decoupled architecture (API -> mock -> hook -> UI) ready for FastAPI backend
 */

import { useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import IndustryLayout from '../../layouts/IndustryLayout'
import DocumentHeader from '../../components/documents/DocumentHeader'
import DocumentList from '../../components/documents/DocumentList'
import DocumentUpload from '../../components/documents/DocumentUpload'
import DocumentDetails from '../../components/documents/DocumentDetails'
import DocumentSkeleton from '../../components/documents/DocumentSkeleton'
import { useDocuments } from '../../hooks/useDocuments'

export default function Documents() {
  const {
    documents,
    filteredDocuments,
    stats,
    selectedDocument,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    resetFilters,
    isLoading,
    isUploading,
    uploadProgress,
    error,
    setError,
    isDeleting,
    deleteCandidate,
    isDetailsOpen,
    isUploadModalOpen,
    setIsUploadModalOpen,
    fetchDocuments,
    handleUploadDocument,
    promptDeleteDocument,
    cancelDeleteDocument,
    confirmDeleteDocument,
    openDocumentDetails,
    closeDocumentDetails,
    retryProcessing,
    askAiAboutDocument,
  } = useDocuments()

  return (
    <IndustryLayout title="Documents">
      <div className="space-y-6">
        {/* Error Banner */}
        {error && (
          <div className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fetchDocuments(true)}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-rose-700"
              >
                <RefreshCw size={12} />
                Retry
              </button>
              <button
                type="button"
                onClick={() => setError(null)}
                className="rounded-lg p-1 text-rose-500 hover:bg-rose-100"
                aria-label="Dismiss error"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && documents.length === 0 ? (
          <DocumentSkeleton />
        ) : (
          <>
            {/* Dashboard Header & Statistics */}
            <DocumentHeader
              stats={stats}
              onOpenUpload={() => setIsUploadModalOpen(true)}
            />

            {/* Document List & Filter Area */}
            <DocumentList
              documents={filteredDocuments}
              totalCount={documents.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onResetFilters={resetFilters}
              onViewDocument={openDocumentDetails}
              onAskAi={askAiAboutDocument}
              onDeleteDocument={promptDeleteDocument}
              onOpenUpload={() => setIsUploadModalOpen(true)}
            />
          </>
        )}

        {/* Backend & RAG Readiness Notice */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/40 p-4 text-xs text-slate-600">
          <Sparkles size={16} className="text-navy shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-ink">Phase 11 Document Intelligence Workspace:</span>{' '}
            Documents uploaded here are prepared for vector indexing, chunking, and AI Q&A. Connected
            to FastAPI document processing backend via standard API contracts.
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      <DocumentUpload
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadDocument}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      {/* Document Details Drawer / Modal */}
      <DocumentDetails
        document={selectedDocument}
        isOpen={isDetailsOpen}
        onClose={closeDocumentDetails}
        onAskAi={askAiAboutDocument}
        onDelete={(doc) => {
          closeDocumentDetails()
          promptDeleteDocument(doc)
        }}
        onRetry={retryProcessing}
      />

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={!isDeleting ? cancelDeleteDocument : undefined}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl animate-rise">
            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-600 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-ink">Delete Document</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Are you sure you want to delete{' '}
                  <span className="font-bold text-ink">{deleteCandidate.name}</span>? This action
                  will remove the document and its AI vector embeddings from the workspace.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={cancelDeleteDocument}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteDocument}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-soft transition hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={13} />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </IndustryLayout>
  )
}
