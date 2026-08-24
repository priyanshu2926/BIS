/**
 * @file src/components/compliance/ComplianceSummary.jsx
 * Visual summary showing documents, testing, and requirements progress.
 */

export default function ComplianceSummary({ summary }) {
  if (!summary) return null

  const SummaryCard = ({ label, completed, total, percentage }) => (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div className="mt-3 space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-navy">{percentage}%</span>
          <span className="text-xs text-slate-500">
            {completed}/{total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-navy to-saffron transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <h2 className="font-bold text-ink">Compliance Summary</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Documents"
          completed={summary.documents.completed}
          total={summary.documents.total}
          percentage={summary.documents.percentage}
        />
        <SummaryCard
          label="Testing"
          completed={summary.testing.completed}
          total={summary.testing.total}
          percentage={summary.testing.percentage}
        />
        <SummaryCard
          label="Requirements"
          completed={summary.requirements.completed}
          total={summary.requirements.total}
          percentage={summary.requirements.percentage}
        />
      </div>

      {/* Overall status */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-navy to-blue-900 p-4 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-100">Overall Compliance Status</p>
            <p className="mt-1 text-3xl font-bold">{summary.overall_percentage}%</p>
          </div>
          <span className="inline-block rounded-full bg-white bg-opacity-20 px-4 py-2 font-medium">
            {summary.status}
          </span>
        </div>
      </div>
    </div>
  )
}
