/**
 * @file src/hooks/useDocuments.js
 * Custom React Hook for BIS Industry Documents Workspace.
 * 
 * Manages document lifecycle, upload simulation, search/filters,
 * details inspection, delete actions, and context-aware AI Assistant navigation.
 * Keeps UI components 100% free of direct network or API logic.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { documentsApi } from '../services/api/documentsApi'
import { DOCUMENT_STATUS } from '../types/documents'

export function useDocuments() {
  const navigate = useNavigate()

  // Data states
  const [documents, setDocuments] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    ready: 0,
    processing: 0,
    failed: 0,
  })

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('latest')

  // Loading & Action states
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFileName, setUploadingFileName] = useState('')
  const [error, setError] = useState(null)

  // Selection & Modal states
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Polling interval ref for processing documents
  const pollTimerRef = useRef(null)

  /**
   * Fetch documents and dashboard statistics
   */
  const fetchDocuments = useCallback(async (showSkeleton = false) => {
    if (showSkeleton) setIsLoading(true)
    setError(null)
    try {
      const [docsResponse, statsResponse] = await Promise.all([
        documentsApi.getDocuments(),
        documentsApi.getDocumentStats(),
      ])
      setDocuments(docsResponse.documents || [])
      setStats(statsResponse || { total: 0, ready: 0, processing: 0, failed: 0 })
    } catch (err) {
      setError(err.message || 'Failed to load documents.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchDocuments(true)
  }, [fetchDocuments])

  // Periodic polling when any document is in 'processing' status
  useEffect(() => {
    const hasProcessingDocs = documents.some(
      (d) => d.status === DOCUMENT_STATUS.PROCESSING || d.status === DOCUMENT_STATUS.UPLOADING
    )

    if (hasProcessingDocs) {
      pollTimerRef.current = setInterval(() => {
        fetchDocuments(false)
      }, 3000)
    } else {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current)
        pollTimerRef.current = null
      }
    }

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current)
      }
    }
  }, [documents, fetchDocuments])

  /**
   * Filtered and sorted documents based on user criteria
   */
  const filteredDocuments = useMemo(() => {
    let result = [...documents]

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q) ||
          (doc.related_standard_number && doc.related_standard_number.toLowerCase().includes(q)) ||
          (doc.summary && doc.summary.toLowerCase().includes(q))
      )
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((doc) => doc.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter((doc) => doc.category === categoryFilter)
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      }
      if (sortBy === 'oldest') {
        return new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'size_desc') {
        return b.file_size - a.file_size
      }
      return 0
    })

    return result
  }, [documents, searchQuery, statusFilter, categoryFilter, sortBy])

  /**
   * Upload Document action
   */
  const handleUploadDocument = async ({ file, category, related_standard_number }) => {
    if (!file) return
    setIsUploading(true)
    setUploadProgress(0)
    setUploadingFileName(file.name)
    setError(null)

    try {
      const uploadedDoc = await documentsApi.uploadDocument(
        {
          file,
          name: file.name,
          file_size: file.size,
          file_type: file.type || 'application/pdf',
          category: category || 'Product Specification',
          related_standard_number: related_standard_number || null,
        },
        (progress) => {
          setUploadProgress(progress)
        }
      )

      await fetchDocuments(false)
      setIsUploadModalOpen(false)
      return uploadedDoc
    } catch (err) {
      setError(err.message || 'Document upload failed. Please try again.')
      throw err
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      setUploadingFileName('')
    }
  }

  /**
   * Open delete confirmation modal for a specific document
   */
  const promptDeleteDocument = (doc) => {
    setDeleteCandidate(doc)
  }

  /**
   * Cancel pending deletion
   */
  const cancelDeleteDocument = () => {
    setDeleteCandidate(null)
  }

  /**
   * Execute deletion
   */
  const confirmDeleteDocument = async () => {
    if (!deleteCandidate) return
    setIsDeleting(true)
    try {
      await documentsApi.deleteDocument(deleteCandidate.id)
      if (selectedDocument?.id === deleteCandidate.id) {
        setSelectedDocument(null)
        setIsDetailsOpen(false)
      }
      setDeleteCandidate(null)
      await fetchDocuments(false)
    } catch (err) {
      setError(err.message || 'Failed to delete document.')
    } finally {
      setIsDeleting(false)
    }
  }

  /**
   * Open document details view
   */
  const openDocumentDetails = (doc) => {
    setSelectedDocument(doc)
    setIsDetailsOpen(true)
  }

  /**
   * Close document details view
   */
  const closeDocumentDetails = () => {
    setIsDetailsOpen(false)
    setSelectedDocument(null)
  }

  /**
   * Retry processing for failed document
   */
  const retryProcessing = async (id) => {
    try {
      await documentsApi.retryDocumentProcessing(id)
      await fetchDocuments(false)
      if (selectedDocument?.id === id) {
        const updated = await documentsApi.getDocumentById(id)
        setSelectedDocument(updated)
      }
    } catch (err) {
      setError(err.message || 'Failed to retry processing.')
    }
  }

  /**
   * Ask AI about document - Navigates to AI Assistant passing document context
   */
  const askAiAboutDocument = (doc) => {
    const documentName = doc.name || 'Document'
    const standardInfo = doc.related_standard_number ? ` under standard ${doc.related_standard_number}` : ''
    const prompt = `Can you analyze the document "${documentName}" (${doc.category}${standardInfo}) and outline the key technical parameters, test results, and compliance requirements?`

    navigate('/industry/assistant', {
      state: {
        prompt,
        documentId: doc.id,
        documentName: doc.name,
        standardNumber: doc.related_standard_number,
        documentContext: {
          document_id: doc.id,
          document_name: doc.name,
          category: doc.category,
          standard_number: doc.related_standard_number,
        },
      },
    })
  }

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setSearchQuery('')
    setStatusFilter('All')
    setCategoryFilter('All')
    setSortBy('latest')
  }

  return {
    // Data & Stats
    documents,
    filteredDocuments,
    stats,
    selectedDocument,

    // Filter states & setters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    resetFilters,

    // Lifecycle & Action states
    isLoading,
    isUploading,
    uploadProgress,
    uploadingFileName,
    error,
    setError,
    isDeleting,
    deleteCandidate,

    // Modal controls
    isDetailsOpen,
    isUploadModalOpen,
    setIsUploadModalOpen,

    // Actions
    fetchDocuments,
    handleUploadDocument,
    promptDeleteDocument,
    cancelDeleteDocument,
    confirmDeleteDocument,
    openDocumentDetails,
    closeDocumentDetails,
    retryProcessing,
    askAiAboutDocument,
  }
}
