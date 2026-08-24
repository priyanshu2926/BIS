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

import { useCallback, useEffect, useState } from 'react'
import { complianceApi } from '../services/api/complianceApi'

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

        setProject(projData)
        setItems(itemsData || [])
        setSummary(summaryData)
        setFilters(filtersData || [])
      } catch (err) {
        setError(err.message || 'Failed to load compliance data')
        console.error('Compliance API error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCompliance()
  }, [projectId])

  /**
   * Filter items based on active filter
   */
  const filteredItems = useCallback(() => {
    if (activeFilter === 'All') return items
    if (activeFilter === 'Completed') return items.filter((i) => i.status === 'Completed')
    if (activeFilter === 'Pending') return items.filter((i) => i.status === 'Pending')
    if (activeFilter === 'Attention') return items.filter((i) => i.status === 'Attention')
    if (activeFilter === 'Documents') return items.filter((i) => i.category === 'Required Documents')
    if (activeFilter === 'Testing') return items.filter((i) => i.category === 'Test Report')
    return items
  }, [items, activeFilter])

  /**
   * Update compliance item status/details
   */
  const updateItemStatus = useCallback(
    async (itemId, updates) => {
      try {
        const updatedItem = await complianceApi.updateComplianceItem(itemId, updates)
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)))
        if (selectedItem?.id === itemId) {
          setSelectedItem(updatedItem)
        }
        return updatedItem
      } catch (err) {
        setError(err.message || 'Failed to update item')
        throw err
      }
    },
    [items, selectedItem]
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

  /**
   * Get filtered and sorted items
   */
  const getDisplayItems = useCallback(() => {
    const filtered = filteredItems()
    // Sort by priority (Critical > High > Medium > Low) then by status
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
    const statusOrder = { Attention: 0, Pending: 1, Completed: 2 }

    return filtered.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
      if (priorityDiff !== 0) return priorityDiff
      return (statusOrder[a.status] || 2) - (statusOrder[b.status] || 2)
    })
  }, [filteredItems])

  /**
   * Get summary statistics
   */
  const getStats = useCallback(() => {
    return {
      total: items.length,
      completed: items.filter((i) => i.status === 'Completed').length,
      pending: items.filter((i) => i.status === 'Pending').length,
      attention: items.filter((i) => i.status === 'Attention').length,
      progress: project?.overall_progress || 0,
    }
  }, [items, project])

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

    // Display
    filteredItems: getDisplayItems(),
    stats: getStats(),

    // Actions
    setActiveFilter,
    updateItemStatus,
    toggleItemStatus,
    markAsAttention,
    setSelectedItem,
  }
}
