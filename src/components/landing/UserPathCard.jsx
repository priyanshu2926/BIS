import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserPathCard({ icon: Icon, title, description, items, to, tone }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-8">
      <div className={`absolute inset-x-0 top-0 h-1 ${tone}`} />
      <span className={`grid h-12 w-12 place-items-center rounded-xl ${tone} text-white`}><Icon size={24} aria-hidden="true" /></span>
      <h3 className="mt-6 text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 text-sm font-medium text-slate-700">
        {items.map((item) => <li key={item} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron" />{item}</li>)}
      </ul>
      <Link to={to} className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900">
        Enter {title} <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </article>
  )
}
