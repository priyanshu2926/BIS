/**
 * @file src/pages/industry/Certification.jsx
 * Production-grade Guided BIS Certification Assistant for Industry Users.
 * 
 * Features:
 * - 6-step guided wizard (Product -> Standard -> Requirements -> Testing -> Documents -> Roadmap)
 * - Dynamic standard and requirements discovery
 * - Document readiness tracking
 * - Visual 8-stage certification roadmap with timeline and milestone tracking
 * - Downloadable / printable compliance checklist generation
 * - Contextual 'Ask AI' integration
 * - Zero direct fetch/network calls in UI (all abstracted through useCertification hook & certificationApi)
 */

import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CertificationRoadmap from '../../components/certification/CertificationRoadmap'
import CertificationStepper from '../../components/certification/CertificationStepper'
import DocumentsStep from '../../components/certification/DocumentsStep'
import ProductStep from '../../components/certification/ProductStep'
import RequirementsStep from '../../components/certification/RequirementsStep'
import StandardStep from '../../components/certification/StandardStep'
import TestingStep from '../../components/certification/TestingStep'
import { useCertification } from '../../hooks/useCertification'
import IndustryLayout from '../../layouts/IndustryLayout'

export default function Certification() {
  const navigate = useNavigate()
  const {
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
    handleSelectProduct,
    handleCustomProductName,
    confirmProduct,
    confirmStandard,
    toggleDocumentPrepared,
    nextStep,
    prevStep,
    goToStep,
    resetFlow,
  } = useCertification()

  // Connect 'Ask AI' from certification roadmap to AI Assistant with rich context
  const handleAskAI = (context) => {
    const prompt = `I am planning BIS certification for my product "${context.productName}" under standard ${context.standardCode} (${roadmap?.scheme || 'Scheme-I'}). Can you provide detailed guidance on the in-house testing equipment, factory audit expectations, and common non-conformities to avoid during the inspection?`
    navigate('/industry/assistant', {
      state: {
        prompt,
        standardNumber: context.standardCode,
        standardTitle: context.productName,
      },
    })
  }

  const productName = selectedProduct ? selectedProduct.name : customProductName || 'Product'

  return (
    <IndustryLayout title="Certification Assistant">
      <div className="space-y-6">
        {/* ======================================================== */}
        {/* 1. Header Banner & Stepper                               */}
        {/* ======================================================== */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-soft space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron">
                <Sparkles size={13} />
                <span>BIS Product Certification Journey</span>
              </div>
              <h1 className="mt-1 text-xl font-extrabold text-ink sm:text-2xl">
                Guided Certification Assistant
              </h1>
            </div>

            <button
              type="button"
              onClick={resetFlow}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Restart Wizard
            </button>
          </div>

          {/* Stepper Component */}
          <CertificationStepper currentStep={currentStep} onStepClick={goToStep} />
        </section>

        {/* ======================================================== */}
        {/* 2. Error Banner                                          */}
        {/* ======================================================== */}
        {error && (
          <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 animate-rise">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-1 font-bold text-red-900 underline hover:no-underline"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. Dynamic Step Content Workspace                        */}
        {/* ======================================================== */}
        <main className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-soft">
          {isLoading ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-3 border-navy border-t-transparent" />
              <p className="text-xs font-bold text-slate-500">Processing certification requirements...</p>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <ProductStep
                  products={products}
                  selectedProduct={selectedProduct}
                  customProductName={customProductName}
                  onSelectProduct={handleSelectProduct}
                  onCustomProductChange={handleCustomProductName}
                  onContinue={confirmProduct}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 2 && (
                <StandardStep
                  productName={productName}
                  standards={applicableStandards}
                  selectedStandard={selectedStandard}
                  onSelectStandard={confirmStandard}
                  onBack={prevStep}
                  onContinue={() => confirmStandard(selectedStandard)}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 3 && (
                <RequirementsStep
                  standard={selectedStandard}
                  requirements={requirements}
                  onBack={prevStep}
                  onContinue={nextStep}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 4 && (
                <TestingStep
                  standard={selectedStandard}
                  testingRequirements={testingRequirements}
                  onBack={prevStep}
                  onContinue={nextStep}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 5 && (
                <DocumentsStep
                  documents={documents}
                  onTogglePrepared={toggleDocumentPrepared}
                  onBack={prevStep}
                  onContinue={nextStep}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 6 && (
                <CertificationRoadmap
                  roadmap={roadmap}
                  selectedProduct={selectedProduct}
                  selectedStandard={selectedStandard}
                  requirements={requirements}
                  testingRequirements={testingRequirements}
                  documents={documents}
                  onBack={prevStep}
                  onReset={resetFlow}
                  onAskAI={handleAskAI}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </main>
      </div>
    </IndustryLayout>
  )
}
