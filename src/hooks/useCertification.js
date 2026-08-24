/**
 * @file src/hooks/useCertification.js
 * Custom hook managing the 6-step BIS Certification Journey workflow.
 * 
 * Orchestrates step progression, product & standard selection,
 * asynchronous requirement retrieval, document checklist state, and roadmap generation.
 */

import { useCallback, useEffect, useState } from 'react'
import { certificationApi } from '../services/api/certificationApi'

export function useCertification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [customProductName, setCustomProductName] = useState('')
  const [applicableStandards, setApplicableStandards] = useState([])
  const [selectedStandard, setSelectedStandard] = useState(null)
  const [requirements, setRequirements] = useState([])
  const [testingRequirements, setTestingRequirements] = useState([])
  const [documents, setDocuments] = useState([])
  const [roadmap, setRoadmap] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [checklistGenerated, setChecklistGenerated] = useState(false)

  // Load product options on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)
        const prods = await certificationApi.getProductOptions()
        setProducts(prods || [])
        // Pre-select default product for immediate demo convenience
        if (prods && prods.length > 0) {
          setSelectedProduct(prods[0])
        }
      } catch (err) {
        setError('Failed to load product options.')
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  /**
   * Select a product preset or custom string
   */
  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product)
    setCustomProductName('')
    setError(null)
  }, [])

  const handleCustomProductName = useCallback((name) => {
    setCustomProductName(name)
    setSelectedProduct(null)
    setError(null)
  }, [])

  /**
   * Confirm product and load applicable standards (Step 1 -> Step 2)
   */
  const confirmProduct = useCallback(async () => {
    const productQuery = selectedProduct ? selectedProduct.name : customProductName.trim()
    if (!productQuery) {
      setError('Please select or enter a manufactured product name.')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const standards = await certificationApi.getApplicableStandards(productQuery)
      setApplicableStandards(standards || [])

      // Auto-select primary standard if available
      if (standards && standards.length > 0) {
        setSelectedStandard(standards[0])
      }
      setCurrentStep(2)
    } catch (err) {
      setError('Unable to retrieve applicable standards for this product.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedProduct, customProductName])

  /**
   * Confirm standard and load requirements, tests, & documents (Step 2 -> Step 3)
   */
  const confirmStandard = useCallback(
    async (standard) => {
      const targetStandard = standard || selectedStandard
      if (!targetStandard) {
        setError('Please select an applicable standard.')
        return
      }

      setSelectedStandard(targetStandard)

      try {
        setIsLoading(true)
        setError(null)

        const [reqs, tests, docs] = await Promise.all([
          certificationApi.getRequirements(targetStandard.id),
          certificationApi.getTestingRequirements(targetStandard.id),
          certificationApi.getRequiredDocuments(targetStandard.id),
        ])

        setRequirements(reqs || [])
        setTestingRequirements(tests || [])
        setDocuments(docs || [])
        setCurrentStep(3)
      } catch (err) {
        setError('Failed to retrieve compliance and testing requirements.')
      } finally {
        setIsLoading(false)
      }
    },
    [selectedStandard]
  )

  /**
   * Toggle document prepared/pending state (Step 5)
   */
  const toggleDocumentPrepared = useCallback((docId) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, prepared: !d.prepared } : d))
    )
  }, [])

  /**
   * Generate Certification Roadmap & Checklist (Step 6)
   */
  const generateRoadmap = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const productName = selectedProduct ? selectedProduct.name : customProductName || 'Product'
      const standardNumber = selectedStandard ? selectedStandard.standard_number : 'IS Standard (Demo)'
      const preparedDocsCount = documents.filter((d) => d.prepared).length
      const totalDocsCount = documents.length || 6

      const roadmapData = await certificationApi.generateRoadmap({
        productName,
        standardNumber,
        preparedDocsCount,
        totalDocsCount,
      })

      setRoadmap(roadmapData)
      setChecklistGenerated(true)
    } catch (err) {
      setError('Failed to generate certification roadmap.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedProduct, customProductName, selectedStandard, documents])

  // Automatically refresh roadmap when navigating to Step 6
  useEffect(() => {
    if (currentStep === 6) {
      generateRoadmap()
    }
  }, [currentStep, generateRoadmap])

  /**
   * Navigation Helpers
   */
  const nextStep = useCallback(() => {
    if (currentStep === 1) {
      confirmProduct()
    } else if (currentStep === 2) {
      confirmStandard()
    } else {
      setCurrentStep((prev) => Math.min(6, prev + 1))
    }
  }, [currentStep, confirmProduct, confirmStandard])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
    setError(null)
  }, [])

  const goToStep = useCallback(
    (stepNumber) => {
      // Guard jumping ahead without selections
      if (stepNumber >= 2 && !selectedProduct && !customProductName) return
      if (stepNumber >= 3 && !selectedStandard) return
      setCurrentStep(stepNumber)
      setError(null)
    },
    [selectedProduct, customProductName, selectedStandard]
  )

  const resetFlow = useCallback(() => {
    setCurrentStep(1)
    if (products.length > 0) {
      setSelectedProduct(products[0])
    }
    setCustomProductName('')
    setApplicableStandards([])
    setSelectedStandard(null)
    setRequirements([])
    setTestingRequirements([])
    setDocuments([])
    setRoadmap(null)
    setChecklistGenerated(false)
    setError(null)
  }, [products])

  return {
    currentStep,
    products,
    selectedProduct,
    customProductName,
    applicableStandards,
    selectedStandard,
    requirements,
    testingRequirements,
    documents,
    roadmap,
    isLoading,
    error,
    checklistGenerated,
    handleSelectProduct,
    handleCustomProductName,
    confirmProduct,
    confirmStandard,
    toggleDocumentPrepared,
    generateRoadmap,
    nextStep,
    prevStep,
    goToStep,
    resetFlow,
  }
}
