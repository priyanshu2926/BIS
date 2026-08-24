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

import { useCallback, useEffect, useMemo, useState } from 'react'
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
    let isMounted = true

    async function loadInitialData() {
      try {
        setIsLoading(true)
        setError(null)
        const [prods, stds] = await Promise.all([
          testingApi.getProducts(),
          testingApi.getStandards(),
        ])

        if (isMounted) {
          setProducts(prods || [])
          setStandards(stds || [])

          // Pre-select first product
          if (prods && prods.length > 0) {
            setSelectedProduct(prods[0])
            if (prods[0].standard_id && stds && stds.length > 0) {
              const defaultStd = stds.find((s) => s.id === prods[0].standard_id)
              if (defaultStd) {
                setSelectedStandard(defaultStd)
              }
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load initial data')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInitialData()

    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Load test requirements when standard changes
   */
  useEffect(() => {
    let isMounted = true

    async function loadTests() {
      if (!selectedStandard) {
        setTestRequirements([])
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const tests = await testingApi.getTestRequirements(selectedStandard.id)
        if (isMounted) {
          setTestRequirements(tests || [])
          setTestFilter('All')
          setSelectedTest(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load test requirements')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTests()

    return () => {
      isMounted = false
    }
  }, [selectedStandard])

  /**
   * Select a product and its default standard
   */
  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product)

    // Find and select the associated standard
    if (product?.standard_id && standards.length > 0) {
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
   * Get filtered test requirements (memoized)
   */
  const filteredTests = useMemo(() => {
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
    } finally {
      setIsSearchingLabs(false)
    }
  }, [])

  /**
   * Get unique test categories from test requirements (memoized)
   */
  const testCategories = useMemo(() => {
    const categories = new Set()
    testRequirements.forEach((t) => {
      if (t.category) categories.add(t.category)
    })
    return Array.from(categories).sort()
  }, [testRequirements])

  /**
   * Get unique locations from laboratories (memoized)
   */
  const availableLocations = useMemo(() => {
    const locations = new Set()
    laboratories.forEach((lab) => {
      if (lab.location) locations.add(lab.location)
    })
    return Array.from(locations).sort()
  }, [laboratories])

  /**
   * Get statistics about test requirements (memoized)
   */
  const testStats = useMemo(() => {
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
    filteredTests,
    testStats,
    testCategories,
    availableLocations,

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
