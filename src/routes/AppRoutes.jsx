import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import IndustryDashboard from '../pages/industry/IndustryDashboard'
import ConsumerDashboard from '../pages/consumer/ConsumerDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/industry" element={<IndustryDashboard />} />
      <Route path="/consumer" element={<ConsumerDashboard />} />
    </Routes>
  )
}
