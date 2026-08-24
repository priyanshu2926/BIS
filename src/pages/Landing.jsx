import { BadgeCheck, BotMessageSquare, BookOpenCheck, Building2, CheckCircle2, FileSearch, ShieldCheck, Sparkles, UserRound, Workflow } from 'lucide-react'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import SectionHeading from '../components/landing/SectionHeading'
import UserPathCard from '../components/landing/UserPathCard'

const features = [
  { icon: BotMessageSquare, title: 'AI Assistant', text: 'Ask questions in plain language and get guided answers.' },
  { icon: FileSearch, title: 'Standards Search', text: 'Find relevant standards and related information with ease.' },
  { icon: BadgeCheck, title: 'Certification Guidance', text: 'Understand the path to certification and compliance.' },
  { icon: ShieldCheck, title: 'Trusted BIS Sources', text: 'Stay grounded in reliable, source-aware BIS information.' },
]
const steps = [
  { icon: UserRound, label: 'User Question' }, { icon: Workflow, label: 'Understand Intent' }, { icon: BookOpenCheck, label: 'Retrieve BIS Information' }, { icon: Sparkles, label: 'AI Response' }, { icon: CheckCircle2, label: 'Sources' },
]

export default function Landing() {
  return <div id="home" className="overflow-x-hidden bg-white">
    <Navbar />
    <main>
      <section className="relative isolate overflow-hidden bg-mist" aria-labelledby="hero-title">
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-[radial-gradient(circle_at_75%_20%,rgba(230,126,34,.12),transparent_43%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-navy"><span className="h-2 w-2 rounded-full bg-saffron" /> Made for Indian Standards & BIS Services</div>
            <h1 id="hero-title" className="mt-7 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">Intelligent Access to <span className="text-navy">Indian Standards</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Understand standards, BIS services and certification with a clear, AI-powered guide built for industry and consumers.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#choose-path" className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900">Get Started</a><a href="#how-it-works" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy">How it works</a></div>
          </div>
          <div className="animate-rise-delay relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white"><BotMessageSquare size={20} /></span><div><p className="text-sm font-bold text-ink">BIS AI Assistant</p><p className="text-xs text-slate-500">Ready to guide you</p></div></div><span className="h-2.5 w-2.5 rounded-full bg-green-500" /></div>
              <div className="mt-7 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-700">How can I understand the certification requirements for my product?</div>
              <div className="mt-4 rounded-2xl bg-navy p-4 text-sm leading-6 text-white">I can help you explore standards, certification steps and the information you may need.</div>
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-medium text-slate-500"><ShieldCheck size={15} className="text-saffron" /> Designed for clarity, trust and accessibility</div>
            </div>
            <div className="absolute -bottom-5 -left-5 -z-10 h-28 w-28 rounded-full bg-orange-100" />
          </div>
        </div>
      </section>

      <section id="choose-path" className="scroll-mt-20 px-5 py-20 sm:px-8" aria-labelledby="path-heading"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Choose your experience" title="How can we help you?" description="Start with the experience designed around your needs." /><div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2"><UserPathCard icon={Building2} title="Industry" description="Find standards, understand certification requirements and navigate compliance." items={['Standards', 'Certification', 'Compliance', 'Testing']} to="/industry" tone="bg-navy" /><UserPathCard icon={UserRound} title="Consumer" description="Understand product standards, safety, hallmarking and BIS services." items={['Product information', 'Safety', 'Hallmarking', 'Consumer guidance']} to="/consumer" tone="bg-saffron" /></div></div></section>

      <section id="about" className="scroll-mt-20 bg-mist px-5 py-20 sm:px-8" aria-labelledby="features-heading"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="A clearer way forward" title="One trusted starting point" description="A future-ready interface for discovering and understanding BIS information." /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-navy"><Icon size={22} /></span><h3 className="mt-5 font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>

      <section id="how-it-works" className="scroll-mt-20 px-5 py-20 sm:px-8" aria-labelledby="works-heading"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Simple by design" title="How it works" description="A transparent flow from your question to useful, source-aware guidance." /><ol className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">{steps.map(({ icon: Icon, label }, index) => <li key={label} className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"><span className="absolute left-4 top-4 text-xs font-bold text-saffron">0{index + 1}</span><span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-navy"><Icon size={22} /></span><span className="mt-4 text-sm font-bold text-ink">{label}</span></li>)}</ol></div></section>
    </main>
    <Footer />
  </div>
}
