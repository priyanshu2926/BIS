import { Bookmark, BotMessageSquare, ClipboardCheck, FileText, FlaskConical, LayoutDashboard, Menu, Settings, ShieldCheck, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Brand from '../common/Brand'

const items = [
  { to: '/industry', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/industry/assistant', label: 'AI Assistant', icon: BotMessageSquare },
  { to: '/industry/standards', label: 'Standards', icon: FileText },
  { to: '/industry/certification', label: 'Certification', icon: ShieldCheck },
  { to: '/industry/compliance', label: 'Compliance', icon: ClipboardCheck },
  { to: '/industry/testing', label: 'Testing & Labs', icon: FlaskConical },
  { to: '/industry/documents', label: 'Documents', icon: FileText },
]

function SidebarContent({ close }) {
  return <><div className="px-5 py-5"><Brand /></div><nav className="flex-1 px-3" aria-label="Industry workspace navigation">{items.map(({ to, label, icon: Icon, end }) => <NavLink end={end} key={to} to={to} onClick={close} className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${isActive ? 'bg-blue-50 text-navy' : 'text-slate-600 hover:bg-slate-50 hover:text-navy'}`}><Icon size={19} aria-hidden="true" />{label}</NavLink>)}<button type="button" className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-navy"><Bookmark size={19} />Saved <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">3</span></button></nav><div className="border-t border-slate-100 p-3"><button type="button" className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Settings size={19} />Settings</button></div></>
}

export default function IndustrySidebar({ open, onClose }) {
  return <><aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex"><SidebarContent /></aside><div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}><button type="button" aria-label="Close navigation" onClick={onClose} className={`absolute inset-0 bg-slate-900/35 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} /><aside className={`absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}><button type="button" onClick={onClose} className="absolute right-3 top-4 rounded-lg p-2 text-slate-500" aria-label="Close navigation"><X size={20} /></button><SidebarContent close={onClose} /></aside></div></>
}

export function MobileMenuButton({ onClick }) { return <button type="button" onClick={onClick} className="rounded-lg p-2 text-navy hover:bg-blue-50 lg:hidden" aria-label="Open navigation"><Menu size={22} /></button> }
