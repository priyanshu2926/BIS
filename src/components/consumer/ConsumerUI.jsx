import { ArrowRight, Check, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function TopicCard({ title, description, icon, to, onClick }) {
  const Component = to ? Link : 'button'
  const props = to ? { to } : { onClick, type: 'button' }

  return (
    <Component
      {...props}
      className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-soft"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700">
        Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </Component>
  )
}

export function ProductCard({ product, onViewMore, onAskAI }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-ink">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold text-orange-700">{product.standard}</p>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          {product.category}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
      <div className="mt-4 rounded-lg bg-orange-50 p-3">
        <p className="text-xs font-semibold text-orange-700">BIS Information</p>
        <p className="mt-1 text-xs leading-5 text-orange-600">{product.bisInfo}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={() => onViewMore(product)}
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-navy hover:border-navy"
        >
          Learn More
        </button>
        <button
          onClick={() => onAskAI(product)}
          type="button"
          className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-100"
        >
          Ask AI
        </button>
      </div>
    </article>
  )
}

export function SafetyCard({ title, description, details, icon }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-orange-200 hover:shadow-soft">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
            <Check size={16} className="mt-0.5 flex-shrink-0 text-orange-600" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function HallmarkCard({ marking, purity, description }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:border-orange-200 hover:shadow-soft">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-orange-50">
        <span className="text-2xl font-bold text-orange-700">{marking}</span>
      </div>
      <h3 className="mt-4 font-bold text-ink">{purity}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  )
}

export function ComplaintStepCard({ step, title, description, details }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-orange-100 font-bold text-orange-700">
          {step}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-ink">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
          <ul className="mt-3 space-y-1">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="mt-1 inline-block h-1 w-1 rounded-full bg-orange-400" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function ConsumerSourceCard({ title, description }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-bold text-orange-700">📄 {title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      <button type="button" className="mt-3 text-xs font-bold text-orange-700 hover:underline">
        View source
      </button>
    </article>
  )
}

export function ConsumerChatMessage({ role, text }) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          role === 'user'
            ? 'rounded-br-md bg-navy text-white'
            : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

export function QuickActionButton({ icon: Icon, title, text, to }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-soft"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-orange-700">
        <Icon size={24} />
      </span>
      <div>
        <h3 className="font-bold text-ink">{title}</h3>
        <p className="mt-0.5 text-xs leading-5 text-slate-600">{text}</p>
      </div>
    </Link>
  )
}

export function HeroSearchInput({ placeholder, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.elements[0]?.value
    if (value && onSubmit) onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl items-center gap-3 rounded-xl bg-white p-2">
      <Search className="ml-2 text-slate-400" size={20} />
      <input
        type="text"
        aria-label="Search a product or ask a question"
        className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-slate-400"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
      >
        Search
      </button>
    </form>
  )
}

export function RecentlyViewedCard({ title, type, date }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-orange-200">
      <h4 className="font-semibold text-ink">{title}</h4>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {type}
        </span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
    </article>
  )
}
