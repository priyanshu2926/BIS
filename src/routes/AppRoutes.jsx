import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import IndustryDashboard from '../pages/industry/IndustryDashboard'
import IndustryAssistant from '../pages/industry/IndustryAssistant'
import Standards from '../pages/industry/Standards'
import CertificationAssistant from '../pages/industry/CertificationAssistant'
import ComplianceChecklist from '../pages/industry/ComplianceChecklist'
import TestingLabs from '../pages/industry/TestingLabs'
import Documents from '../pages/industry/Documents'
import ConsumerDashboard from '../pages/consumer/ConsumerDashboard'
import ConsumerAIAssistant from '../pages/consumer/ConsumerAIAssistant'
import ConsumerProductsSearch from '../pages/consumer/ConsumerProductsSearch'
import ConsumerProductSafety from '../pages/consumer/ConsumerProductSafety'
import ConsumerHallmarking from '../pages/consumer/ConsumerHallmarking'
import ConsumerComplaintGuidance from '../pages/consumer/ConsumerComplaintGuidance'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/industry" element={<IndustryDashboard />} />
      <Route path="/industry/assistant" element={<IndustryAssistant />} />
      <Route path="/industry/standards" element={<Standards />} />
      <Route path="/industry/certification" element={<CertificationAssistant />} />
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
  )
}
