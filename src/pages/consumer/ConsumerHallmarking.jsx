import ConsumerLayout from '../../layouts/ConsumerLayout'
import { HallmarkCard } from '../../components/consumer/ConsumerUI'
import { hallmarkingInfo } from '../../data/consumerMockData'
import { Link } from 'react-router-dom'

export default function ConsumerHallmarking() {
  return (
    <ConsumerLayout title="Hallmarking">
      <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl text-ink">Gold Hallmarking Guide</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Understand gold hallmarking, purity marks, and how to verify authentic precious metal jewellery.
        </p>
      </section>

      <section className="mt-7">
        <h3 className="text-lg font-bold text-ink">What is hallmarking?</h3>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="leading-7 text-slate-600">
            Hallmarking is an official certification that confirms the purity and authenticity of precious
            metals like gold, silver, and platinum. In India, the Bureau of Indian Standards (BIS) operates
            the Hallmarking Scheme through authorized Assaying and Hallmarking Centers (AHC).
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            A hallmark consists of several marks that together guarantee the purity of the metal and the
            legitimacy of the jeweler. When you buy hallmarked jewellery, you're assured of the actual
            purity content.
          </p>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Understanding purity marks</h2>
        <p className="mt-2 text-sm text-slate-600">
          These are the common purity marks you'll find on gold jewellery:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hallmarkingInfo.purityMarks.map((mark) => (
            <HallmarkCard key={mark.marking} {...mark} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Components of a hallmark</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {hallmarkingInfo.marks.map((mark) => (
            <article key={mark.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="font-bold text-ink">{mark.name}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{mark.description}</p>
              <div className="mt-3 rounded-lg bg-orange-50 p-3">
                <p className="text-xs font-semibold text-orange-700">Why it matters</p>
                <p className="mt-1 text-xs text-orange-600">{mark.importance}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Tips for buying hallmarked jewellery</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <ul className="space-y-3">
            {hallmarkingInfo.tips.map((tip, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-lg">💎</span>
                <span className="text-sm leading-6 text-slate-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-orange-50 p-6">
        <h3 className="font-bold text-ink">Have more questions about hallmarking?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Our AI Assistant can help you understand more about hallmarking standards and how to identify
          authentic jewellery.
        </p>
        <Link
          to="/consumer/assistant"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          Ask AI about Hallmarking
        </Link>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-ink">Important disclaimer</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This page provides educational information about hallmarking standards. It is not a verification
          system. For authentication of specific jewellery pieces, please visit an authorized Assaying and
          Hallmarking Center (AHC) recognized by BIS.
        </p>
      </section>
    </ConsumerLayout>
  )
}
