import ConsumerLayout from '../../layouts/ConsumerLayout'
import { SafetyCard } from '../../components/consumer/ConsumerUI'
import { safetyGuidelines } from '../../data/consumerMockData'
import { Link } from 'react-router-dom'

export default function ConsumerProductSafety() {
  return (
    <ConsumerLayout title="Product Safety">
      <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl text-ink">Product Safety Guide</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Learn how to identify safe products, understand BIS markings, and make informed purchasing decisions.
        </p>
      </section>

      <section className="mt-7">
        <h3 className="text-lg font-bold text-ink">Why product standards matter</h3>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="leading-7 text-slate-600">
            Product standards, set by the Bureau of Indian Standards (BIS), ensure that products meet
            minimum requirements for safety, quality, and performance. When you buy an ISI-marked
            product, you're choosing something that has been tested and verified to be safe and reliable.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            This guide helps you understand what to look for when buying products and how to verify that
            what you're purchasing meets BIS standards.
          </p>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Key safety checks</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {safetyGuidelines.map((guideline) => (
            <SafetyCard key={guideline.title} {...guideline} />
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-ink">Important reminders</h3>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold text-ink">Always check for the ISI mark</p>
              <p className="mt-1 text-sm text-slate-600">
                The ISI mark should be clearly visible on the product or its packaging.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold text-ink">Read product instructions</p>
              <p className="mt-1 text-sm text-slate-600">
                Always follow manufacturer instructions for proper usage and maintenance.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold text-ink">Report defects</p>
              <p className="mt-1 text-sm text-slate-600">
                If you find a defective product, report it to the seller or manufacturer.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold text-ink">Keep receipts</p>
              <p className="mt-1 text-sm text-slate-600">
                Always keep your purchase receipt for warranty and complaint purposes.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-orange-50 p-6">
        <h3 className="font-bold text-ink">Have questions?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Ask our AI Assistant for more information about specific products or safety concerns.
        </p>
        <Link
          to="/consumer/assistant"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          Ask AI Assistant
        </Link>
      </section>
    </ConsumerLayout>
  )
}
