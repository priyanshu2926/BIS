import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Lazy-loaded route components for optimal initial bundle size and fast page loads
const Landing = lazy(() => import('../pages/Landing'))
const IndustryDashboard = lazy(() => import('../pages/industry/IndustryDashboard'))
const IndustryAssistant = lazy(() => import('../pages/industry/IndustryAssistant'))
const Standards = lazy(() => import('../pages/industry/Standards'))
const Certification = lazy(() => import('../pages/industry/Certification'))
const ComplianceChecklist = lazy(() => import('../pages/industry/ComplianceChecklist'))
const TestingLabs = lazy(() => import('../pages/industry/TestingLabs'))
const Documents = lazy(() => import('../pages/industry/Documents'))
const ConsumerDashboard = lazy(() => import('../pages/consumer/ConsumerDashboard'))
const ConsumerAIAssistant = lazy(() => import('../pages/consumer/ConsumerAIAssistant'))
const ConsumerProductsSearch = lazy(() => import('../pages/consumer/ConsumerProductsSearch'))
const ConsumerProductSafety = lazy(() => import('../pages/consumer/ConsumerProductSafety'))
const ConsumerHallmarking = lazy(() => import('../pages/consumer/ConsumerHallmarking'))
const ConsumerComplaintGuidance = lazy(() => import('../pages/consumer/ConsumerComplaintGuidance'))

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center p-8" aria-label="Loading page content...">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-navy" />
        <span className="text-xs font-semibold text-slate-500">Loading BIS Assistant...</span>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/industry" element={<IndustryDashboard />} />
        <Route path="/industry/assistant" element={<IndustryAssistant />} />
        <Route path="/industry/standards" element={<Standards />} />
        <Route path="/industry/certification" element={<Certification />} />
        <Route path="/industry/compliance" element={<ComplianceChecklist />} />
        <Route path="/industry/testing" element={<TestingLabs />} />
        <Route path="/industry/documents" element={<Documents />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
        <Route path="/consumer/assistant" element={<ConsumerAIAssistant />} />
        <Route path="/consumer/products" element={<ConsumerProductsSearch />} />
        <Route path="/consumer/safety" element={<ConsumerProductSafety />} />
        <Route path="/consumer/hallmarking" element={<ConsumerHallmarking />} />
        <Route path="/consumer/complaints" element={<ConsumerComplaintGuidance />} />
      </Routes>
    </Suspense>
  )
}
