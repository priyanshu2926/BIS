import { useState } from 'react'
import IndustryHeader from '../components/industry/IndustryHeader'
import IndustrySidebar from '../components/industry/IndustrySidebar'

export default function IndustryLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return <div className="min-h-screen bg-mist"><IndustrySidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="lg:pl-64"><IndustryHeader title={title} onMenu={() => setSidebarOpen(true)} /><main className="mx-auto max-w-[1600px] p-4 sm:p-7">{children}</main></div></div>
}
