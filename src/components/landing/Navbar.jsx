import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Brand from '../common/Brand'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How it works', href: '#how-it-works' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Brand />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ label, href }) => <a key={label} href={href} className="text-sm font-medium text-slate-600 transition hover:text-navy">{label}</a>)}
          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-navy" aria-label="Select language">
            English <ChevronDown size={15} aria-hidden="true" />
          </button>
          <a href="#choose-path" className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900">Get Started</a>
        </div>
        <button type="button" className="rounded-lg p-2 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {open && <div id="mobile-menu" className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">
        <div className="flex flex-col gap-1 pt-3">
          {navLinks.map(({ label, href }) => <a key={label} href={href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-mist">{label}</a>)}
          <button type="button" className="flex items-center gap-1 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-mist">English <ChevronDown size={15} aria-hidden="true" /></button>
          <a href="#choose-path" onClick={closeMenu} className="mt-2 rounded-lg bg-navy px-4 py-3 text-center text-sm font-semibold text-white">Get Started</a>
        </div>
      </div>}
    </header>
  )
}
