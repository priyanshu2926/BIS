import { useState } from 'react'
import ConsumerHeader from '../components/consumer/ConsumerHeader'
import ConsumerSidebar from '../components/consumer/ConsumerSidebar'

export default function ConsumerLayout({ title = 'Consumer Workspace', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-mist">
      <ConsumerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <ConsumerHeader title={title} onMenu={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-[1600px] p-4 sm:p-7">{children}</main>
      </div>
    </div>
  )
}
