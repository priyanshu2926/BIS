/**
 * @file src/hooks/useTesting.js
 * Custom hook managing testing workspace state and operations.
 * 
 * Orchestrates:
 * - Product and standard selection
 * - Test requirements loading and filtering
 * - Laboratory search and filtering
 * - Details view management
 */

import { useCallback, useEffect, useState } from 'react'
import { testingApi } from '../services/api/testingApi'

export function useTesting() {
  // Products and standards
  const [products, setProducts] = useState([])
  const [standards, setStandards] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedStandard, setSelectedStandard] = useState(null)

  // Test requirements
  const [testRequirements, setTestRequirements] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [testFilter, setTestFilter] = useState('All') // 'All', 'Required', 'Recommended'

  // Laboratory search
  const [laboratories, setLaboratories] = useState([])
  const [selectedLaboratory, setSelectedLaboratory] = useState(null)
  const [labSearchQuery, setLabSearchQuery] = useState('')
  const [labFilters, setLabFilters] = useState({
    location: '',
    test_category: '',
    status: 'All',
  })

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchingLabs, setIsSearchingLabs] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Load products and standards on mount
   */
  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true)
        setError(null)
        const [prods, stds] = await Promise.all([
          testingApi.getProducts(),
          testingApi.getStandards(),
        ])
        setProducts(prods || [])
        setStandards(stds || [])

        // Pre-select first product
        if (prods && prods.length > 0) {
          handleSelectProduct(prods[0])
        }
      } catch (err) {
        setError(err.message || 'Failed to load initial data')
        console.error('Testing API error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  /**
   * Load test requirements when standard changes
   */
  useEffect(() => {
    async function loadTests() {
      if (!selectedStandard) {
        setTestRequirements([])
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const tests = await testingApi.getTestRequirements(selectedStandard.id)
        setTestRequirements(tests || [])
        setTestFilter('All')
        setSelectedTest(null)
      } catch (err) {
        setError(err.message || 'Failed to load test requirements')
        console.error('Test requirements error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadTests()
  }, [selectedStandard])

  /**
   * Select a product and its default standard
   */
  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product)

    // Find and select the associated standard
    if (product.standard_id && standards.length > 0) {
      const standard = standards.find((s) => s.id === product.standard_id)
      if (standard) {
        setSelectedStandard(standard)
      }
    }
  }, [standards])

  /**
   * Select a standard
   */
  const handleSelectStandard = useCallback((standard) => {
    setSelectedStandard(standard)
  }, [])

  /**
   * Get filtered test requirements
   */
  const getFilteredTests = useCallback(() => {
    if (testFilter === 'All') return testRequirements
    return testRequirements.filter((t) => t.status === testFilter)
  }, [testRequirements, testFilter])

  /**
   * Search laboratories with filters
   */
  const searchLaboratories = useCallback(async () => {
    try {
      setIsSearchingLabs(true)
      setError(null)

      const filters = {
        query: labSearchQuery,
        ...labFilters,
      }

      const results = await testingApi.searchLaboratories(filters)
      setLaboratories(results || [])
    } catch (err) {
      setError(err.message || 'Failed to search laboratories')
      console.error('Laboratory search error:', err)
    } finally {
      setIsSearchingLabs(false)
    }
  }, [labSearchQuery, labFilters])

  /**
   * Get laboratories for a specific test category
   */
  const getLabsForTestCategory = useCallback(async (testCategory) => {
    try {
      setIsSearchingLabs(true)
      setError(null)
      const results = await testingApi.getLabsByTestCategory(testCategory)
      setLaboratories(results || [])
    } catch (err) {
      setError(err.message || 'Failed to find labs for test')
      console.error('Labs by category error:', err)
    } finally {
      setIsSearchingLabs(false)
    }
  }, [])

  /**
   * Get unique test categories from test requirements
   */
  const getTestCategories = useCallback(() => {
    const categories = new Set()
    testRequirements.forEach((t) => categories.add(t.category))
    return Array.from(categories).sort()
  }, [testRequirements])

  /**
   * Get unique locations from laboratories
   */
  const getLocations = useCallback(() => {
    const locations = new Set()
    laboratories.forEach((lab) => locations.add(lab.location))
    return Array.from(locations).sort()
  }, [laboratories])

  /**
   * Get statistics about test requirements
   */
  const getTestStats = useCallback(() => {
    return {
      total: testRequirements.length,
      required: testRequirements.filter((t) => t.status === 'Required').length,
      recommended: testRequirements.filter((t) => t.status === 'Recommended').length,
    }
  }, [testRequirements])

  return {
    // Data
    products,
    standards,
    testRequirements,
    laboratories,
    selectedProduct,
    selectedStandard,
    selectedTest,
    selectedLaboratory,

    // Filters and search
    testFilter,
    labSearchQuery,
    labFilters,
    filteredTests: getFilteredTests(),
    testStats: getTestStats(),
    testCategories: getTestCategories(),
    availableLocations: getLocations(),

    // State
    isLoading,
    isSearchingLabs,
    error,

    // Actions
    handleSelectProduct,
    handleSelectStandard,
    setTestFilter,
    setSelectedTest,
    setSelectedLaboratory,
    setLabSearchQuery,
    setLabFilters,
    searchLaboratories,
    getLabsForTestCategory,
  }
}
