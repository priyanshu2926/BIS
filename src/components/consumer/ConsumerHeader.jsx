import { ChevronRight, Search, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MobileMenuButton } from './ConsumerSidebar'

export default function ConsumerHeader({ title, onMenu }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onMenu} />
        <div className="min-w-0">
          <div className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
            Consumer Workspace <ChevronRight size={13} /> <span>{title}</span>
          </div>
          <h1 className="truncate text-lg font-bold text-ink sm:mt-0.5">{title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            to="/consumer/assistant"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:border-orange-200 hover:text-orange-700 md:flex"
          >
            <Search size={16} />
            Quick AI access
          </Link>
          <Link
            to="/consumer/assistant"
            className="rounded-lg p-2 text-navy hover:bg-blue-50 md:hidden"
            aria-label="Open AI Assistant"
          >
            <HelpCircle size={20} />
          </Link>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-orange-100 text-xs font-bold text-orange-700"
            aria-label="Profile"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  )
}
