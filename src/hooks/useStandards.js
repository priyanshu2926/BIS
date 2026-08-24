/**
 * @file src/hooks/useStandards.js
 * Custom hook for state management of Indian Standards Search.
 * 
 * Encapsulates search filters, pagination, bookmark toggling,
 * detailed standard selection, loading and error states.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { standardsApi } from '../services/api/standardsApi'

const INITIAL_FILTERS = {
  query: '',
  category: 'All',
  product_category: 'All',
  status: 'All',
  saved_only: false,
  sort_by: 'relevance',
}

export function useStandards(initialParams = {}) {
  const [filters, setFilters] = useState({ ...INITIAL_FILTERS, ...initialParams })
  const [standards, setStandards] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [selectedStandard, setSelectedStandard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingId, setIsSavingId] = useState(null)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [productCategories, setProductCategories] = useState([])
  const [savedCount, setSavedCount] = useState(0)

  // Track latest search query for cancellation / race conditions
  const searchRequestIdRef = useRef(0)

  /**
   * Fetch filter options (categories & product categories)
   */
  const loadFilterOptions = useCallback(async () => {
    try {
      const [catList, prodCatList, savedTotal] = await Promise.all([
        standardsApi.getCategories(),
        standardsApi.getProductCategories(),
        standardsApi.getSavedCount(),
      ])
      setCategories(catList || [])
      setProductCategories(prodCatList || [])
      setSavedCount(savedTotal || 0)
    } catch {
      // Silently continue if category lookup fails
    }
  }, [])

  /**
   * Execute standards search with current filters & page
   */
  const fetchStandards = useCallback(async () => {
    const currentRequestId = ++searchRequestIdRef.current
    setIsLoading(true)
    setError(null)

    try {
      const response = await standardsApi.searchStandards({
        ...filters,
        page,
        limit,
      })

      // Guard against race conditions
      if (currentRequestId !== searchRequestIdRef.current) return

      setStandards(response.items || [])
      setTotal(response.total || 0)
      setTotalPages(response.total_pages || 1)
      setHasNext(response.has_next || false)
    } catch (err) {
      if (currentRequestId !== searchRequestIdRef.current) return
      setError(err.message || 'Unable to search standards. Please check your connection and try again.')
    } finally {
      if (currentRequestId === searchRequestIdRef.current) {
        setIsLoading(false)
      }
    }
  }, [filters, page, limit])

  // Initial load of filter metadata
  useEffect(() => {
    loadFilterOptions()
  }, [loadFilterOptions])

  // Re-fetch standards whenever filters or page change
  useEffect(() => {
    fetchStandards()
  }, [fetchStandards])

  /**
   * Update search query with auto-reset to page 1
   */
  const setQuery = useCallback((query) => {
    setFilters((prev) => ({ ...prev, query }))
    setPage(1)
  }, [])

  /**
   * Update single filter property with auto-reset to page 1
   */
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }, [])

  /**
   * Batch update filters
   */
  const setMultipleFilters = useCallback((updates) => {
    setFilters((prev) => ({ ...prev, ...updates }))
    setPage(1)
  }, [])

  /**
   * Reset all filters to default
   */
  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS)
    setPage(1)
  }, [])

  /**
   * Change page
   */
  const changePage = useCallback(
    (newPage) => {
      if (newPage < 1 || newPage > totalPages || newPage === page) return
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [page, totalPages]
  )

  /**
   * Toggle save / bookmark status for a standard
   */
  const toggleSaveStandard = useCallback(
    async (standardId) => {
      if (!standardId || isSavingId) return

      const target = standards.find((s) => s.id === standardId) || selectedStandard
      if (!target) return

      const isCurrentlySaved = target.saved
      setIsSavingId(standardId)

      // Optimistic UI update
      setStandards((prev) =>
        prev.map((s) => (s.id === standardId ? { ...s, saved: !isCurrentlySaved } : s))
      )
      if (selectedStandard && selectedStandard.id === standardId) {
        setSelectedStandard((prev) => ({ ...prev, saved: !isCurrentlySaved }))
      }
      setSavedCount((prev) => (isCurrentlySaved ? Math.max(0, prev - 1) : prev + 1))

      try {
        if (isCurrentlySaved) {
          await standardsApi.unsaveStandard(standardId)
        } else {
          await standardsApi.saveStandard(standardId)
        }
      } catch {
        // Revert optimistic update on failure
        setStandards((prev) =>
          prev.map((s) => (s.id === standardId ? { ...s, saved: isCurrentlySaved } : s))
        )
        if (selectedStandard && selectedStandard.id === standardId) {
          setSelectedStandard((prev) => ({ ...prev, saved: isCurrentlySaved }))
        }
        setSavedCount((prev) => (isCurrentlySaved ? prev + 1 : Math.max(0, prev - 1)))
        setError('Failed to update bookmark status.')
      } finally {
        setIsSavingId(null)
      }
    },
    [standards, selectedStandard, isSavingId]
  )

  /**
   * Select a standard to view its full details
   */
  const selectStandard = useCallback(
    async (standardOrId) => {
      if (typeof standardOrId === 'object' && standardOrId !== null) {
        setSelectedStandard(standardOrId)
        return
      }

      try {
        const fullStandard = await standardsApi.getStandardById(standardOrId)
        setSelectedStandard(fullStandard)
      } catch {
        setError('Failed to load standard details.')
      }
    },
    []
  )

  /**
   * Close details view
   */
  const closeStandardDetails = useCallback(() => {
    setSelectedStandard(null)
  }, [])

  return {
    standards,
    total,
    page,
    limit,
    totalPages,
    hasNext,
    filters,
    selectedStandard,
    isLoading,
    isSavingId,
    error,
    categories,
    productCategories,
    savedCount,
    setQuery,
    setFilter,
    setMultipleFilters,
    resetFilters,
    changePage,
    toggleSaveStandard,
    selectStandard,
    closeStandardDetails,
    retry: fetchStandards,
  }
}
