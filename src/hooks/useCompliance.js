/**
 * @file src/hooks/useCompliance.js
 * Custom hook managing compliance workspace state and operations.
 * 
 * Orchestrates:
 * - Compliance project loading
 * - Compliance items management
 * - Filtering and sorting
 * - Item status updates
 * - Summary data
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { complianceApi } from '../services/api/complianceApi'

const PRIORITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 }
const STATUS_ORDER = { Attention: 0, Pending: 1, Completed: 2 }

export function useCompliance(projectId = 'comp_proj_001') {
  const [project, setProject] = useState(null)
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState(null)
  const [filters, setFilters] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  /**
   * Load compliance project, items, summary, and filters
   */
  useEffect(() => {
    let isMounted = true

    async function loadCompliance() {
      try {
        setIsLoading(true)
        setError(null)

        const [projData, itemsData, summaryData, filtersData] = await Promise.all([
          complianceApi.getComplianceProject(projectId),
          complianceApi.getComplianceItems(projectId),
          complianceApi.getComplianceSummary(projectId),
          complianceApi.getComplianceFilters(projectId),
        ])

        if (isMounted) {
          setProject(projData)
          setItems(itemsData || [])
          setSummary(summaryData)
          setFilters(filtersData || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load compliance data')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCompliance()

    return () => {
      isMounted = false
    }
  }, [projectId])

  /**
   * Filter and sort items based on active filter without mutating state
   */
  const displayItems = useMemo(() => {
    let filtered = items
    if (activeFilter === 'Completed') {
      filtered = items.filter((i) => i.status === 'Completed')
    } else if (activeFilter === 'Pending') {
      filtered = items.filter((i) => i.status === 'Pending')
    } else if (activeFilter === 'Attention') {
      filtered = items.filter((i) => i.status === 'Attention')
    } else if (activeFilter === 'Documents') {
      filtered = items.filter((i) => i.category === 'Required Documents')
    } else if (activeFilter === 'Testing') {
      filtered = items.filter((i) => i.category === 'Test Report')
    }

    return filtered.slice().sort((a, b) => {
      const priorityDiff = (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
      if (priorityDiff !== 0) return priorityDiff
      return (STATUS_ORDER[a.status] ?? 2) - (STATUS_ORDER[b.status] ?? 2)
    })
  }, [items, activeFilter])

  /**
   * Summary statistics memoized
   */
  const stats = useMemo(() => {
    return {
      total: items.length,
      completed: items.filter((i) => i.status === 'Completed').length,
      pending: items.filter((i) => i.status === 'Pending').length,
      attention: items.filter((i) => i.status === 'Attention').length,
      progress: project?.overall_progress || 0,
    }
  }, [items, project])

  /**
   * Update compliance item status/details
   */
  const updateItemStatus = useCallback(
    async (itemId, updates) => {
      try {
        const updatedItem = await complianceApi.updateComplianceItem(itemId, updates)
        setItems((prevItems) => prevItems.map((i) => (i.id === itemId ? updatedItem : i)))
        setSelectedItem((prev) => (prev?.id === itemId ? updatedItem : prev))
        return updatedItem
      } catch (err) {
        setError(err.message || 'Failed to update item')
        throw err
      }
    },
    []
  )

  /**
   * Toggle item completion status
   */
  const toggleItemStatus = useCallback(
    async (itemId) => {
      const item = items.find((i) => i.id === itemId)
      if (!item) return

      const newStatus = item.status === 'Completed' ? 'Pending' : 'Completed'
      return updateItemStatus(itemId, { status: newStatus })
    },
    [items, updateItemStatus]
  )

  /**
   * Mark item as requiring attention
   */
  const markAsAttention = useCallback(
    (itemId) => updateItemStatus(itemId, { status: 'Attention' }),
    [updateItemStatus]
  )

  return {
    // Data
    project,
    items,
    summary,
    filters,
    activeFilter,
    selectedItem,
    isLoading,
    error,

    // Display (memoized)
    filteredItems: displayItems,
    stats,

    // Actions
    setActiveFilter,
    updateItemStatus,
    toggleItemStatus,
    markAsAttention,
    setSelectedItem,
  }
}
