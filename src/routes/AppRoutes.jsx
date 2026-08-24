import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import IndustryDashboard from '../pages/industry/IndustryDashboard'
import AIAssistant from '../pages/industry/AIAssistant'
import StandardsSearch from '../pages/industry/StandardsSearch'
import CertificationAssistant from '../pages/industry/CertificationAssistant'
import ComplianceChecklist from '../pages/industry/ComplianceChecklist'
import TestingLabs from '../pages/industry/TestingLabs'
import Documents from '../pages/industry/Documents'
import ConsumerDashboard from '../pages/consumer/ConsumerDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/industry" element={<IndustryDashboard />} />
      <Route path="/industry/assistant" element={<AIAssistant />} />
      <Route path="/industry/standards" element={<StandardsSearch />} />
      <Route path="/industry/certification" element={<CertificationAssistant />} />
      <Route path="/industry/compliance" element={<ComplianceChecklist />} />
      <Route path="/industry/testing" element={<TestingLabs />} />
      <Route path="/industry/documents" element={<Documents />} />
      <Route path="/consumer" element={<ConsumerDashboard />} />
    </Routes>
  )
}
