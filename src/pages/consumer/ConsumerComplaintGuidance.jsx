import ConsumerLayout from '../../layouts/ConsumerLayout'
import { ComplaintStepCard } from '../../components/consumer/ConsumerUI'
import { complaintSteps } from '../../data/consumerMockData'
import { Link } from 'react-router-dom'

export default function ConsumerComplaintGuidance() {
  return (
    <ConsumerLayout title="Complaint Guidance">
      <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl text-ink">Complaint Guidance</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Learn about the process for handling complaints against substandard or defective products.
        </p>
      </section>

      <section className="mt-7">
        <h3 className="text-lg font-bold text-ink">What is this guide for?</h3>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="leading-7 text-slate-600">
            This page provides educational guidance about the complaint process in India. It helps you
            understand the steps to take if you encounter issues with a product that may not meet BIS
            standards.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            <strong>Important:</strong> This is NOT a complaint submission system. You will need to contact
            the relevant authorities directly to file an official complaint.
          </p>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Complaint process flow</h2>
        <div className="mt-4 space-y-4">
          {complaintSteps.map((step) => (
            <ComplaintStepCard key={step.step} {...step} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Before you file a complaint</h2>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="space-y-4">
            <article>
              <h4 className="font-bold text-ink">📸 Document the issue</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Take clear photos of the product defect</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Photograph the packaging and any markings</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Note the date you discovered the issue</span>
                </li>
              </ul>
            </article>

            <article>
              <h4 className="font-bold text-ink">🧾 Keep purchase proof</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Save the receipt or invoice</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Keep the product packaging</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Note down batch/serial numbers</span>
                </li>
              </ul>
            </article>

            <article>
              <h4 className="font-bold text-ink">✍️ Record details</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Product name and specification</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Where you purchased it</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Price paid</span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <span>•</span> <span>Detailed description of the issue</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Relevant authorities</h2>
        <p className="mt-4 text-sm text-slate-600">
          <strong>Note:</strong> Contact details are not provided here. Please visit official government
          websites to find current contact information for:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-ink">Bureau of Indian Standards (BIS)</h4>
            <p className="mt-2 text-sm text-slate-600">
              For complaints related to BIS certification and ISI marked products.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-ink">State BIS Office</h4>
            <p className="mt-2 text-sm text-slate-600">
              For localized complaints and issues in your region.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-ink">Consumer Protection Authority</h4>
            <p className="mt-2 text-sm text-slate-600">
              For general consumer protection and product safety issues.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-ink">District Consumer Commission</h4>
            <p className="mt-2 text-sm text-slate-600">
              For formal complaint resolution at district level.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-orange-50 p-6">
        <h3 className="font-bold text-ink">Need guidance?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Our AI Assistant can help you understand the complaint process better and provide general guidance.
        </p>
        <Link
          to="/consumer/assistant"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          Ask AI for Guidance
        </Link>
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-ink">Important disclaimer</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This page provides educational information about the complaint process. It is not a legal guide
          and does not constitute professional advice. For specific legal or technical guidance, please
          consult official BIS resources or contact relevant authorities directly.
        </p>
      </section>
    </ConsumerLayout>
  )
}
