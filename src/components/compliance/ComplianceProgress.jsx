/**
 * @file src/components/compliance/ComplianceProgress.jsx
 * Progress display component showing overall compliance percentage and item counts.
 */

export default function ComplianceProgress({ project }) {
  if (!project) return null

  const progress = project.overall_progress || 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-bold text-ink">Overall progress</p>
          <p className="mt-1 text-sm text-slate-500">
            {project.completed_items} of {project.completed_items + project.pending_items + project.attention_items} items complete
          </p>
        </div>
        <span className="text-3xl font-bold text-navy">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-navy to-saffron transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-emerald-50 p-3">
          <p className="text-xs font-semibold text-emerald-900">Completed</p>
          <p className="mt-2 text-xl font-bold text-emerald-600">{project.completed_items}</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-3">
          <p className="text-xs font-semibold text-yellow-900">Pending</p>
          <p className="mt-2 text-xl font-bold text-yellow-600">{project.pending_items}</p>
        </div>
        <div className="rounded-lg bg-orange-50 p-3">
          <p className="text-xs font-semibold text-orange-900">Attention</p>
          <p className="mt-2 text-xl font-bold text-orange-600">{project.attention_items}</p>
        </div>
      </div>
    </div>
  )
}
