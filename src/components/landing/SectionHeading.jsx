export default function SectionHeading({ eyebrow, title, description, centered = true }) {
  return <div className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl`}>
    {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.16em] text-saffron">{eyebrow}</p>}
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
  </div>
}
