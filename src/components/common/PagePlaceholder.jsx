import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from './Brand'

export default function PagePlaceholder({ title, description, accent }) {
  return (
    <main className="min-h-screen bg-mist">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Brand />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-saffron">
            <ArrowLeft size={17} aria-hidden="true" /> Back to home
          </Link>
        </div>
      </header>
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${accent}`}><Sparkles size={16} /> Phase 1 preview</span>
          <h1 className="mt-7 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="font-semibold text-navy">Workspace foundation ready</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">This dedicated experience will grow with guided AI assistance, standards information and services in the next phase.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
