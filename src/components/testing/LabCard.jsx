/**
 * @file src/components/testing/LabCard.jsx
 * Individual laboratory card component.
 */

export default function LabCard({ lab, onSelectLab, isSelected = false }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accredited':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Registered':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelectLab(lab)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelectLab(lab)
        }
      }}
      className={`w-full rounded-lg border-2 p-5 text-left transition-all cursor-pointer ${
        isSelected
          ? 'border-navy bg-blue-50'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-ink">{lab.name}</h3>
            <span
              className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold border ${getStatusColor(
                lab.status
              )}`}
            >
              {lab.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-600">
            📍 {lab.location}, {lab.state}
          </p>

          {/* Testing capabilities */}
          <div className="mt-3">
            <p className="text-xs font-semibold text-slate-700">Test Categories:</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {lab.test_categories.slice(0, 3).map((cat) => (
                <span key={cat} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {cat}
                </span>
              ))}
              {lab.test_categories.length > 3 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  +{lab.test_categories.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Quick info */}
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
            <div>
              <span className="font-semibold">Turnaround:</span> {lab.turnaround_days} days
            </div>
            <div>
              {lab.accepts_online_submissions ? (
                <span className="text-green-700">✓ Online Submissions</span>
              ) : (
                <span className="text-slate-500">Physical Submission Only</span>
              )}
            </div>
          </div>

          {lab.accreditation && (
            <p className="mt-2 text-xs text-slate-500">
              <span className="font-semibold">Accreditation:</span> {lab.accreditation}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelectLab(lab)
          }}
          className="flex-shrink-0 rounded-lg bg-navy px-3 py-1 text-xs font-medium text-white hover:bg-blue-900"
        >
          Details →
        </button>
      </div>
    </div>
  )
}
