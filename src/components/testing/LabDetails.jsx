/**
 * @file src/components/testing/LabDetails.jsx
 * Detailed view for selected laboratory.
 */

export default function LabDetails({ lab, onClose, onViewRequirements, testName }) {
  if (!lab) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Select a laboratory to view details</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">{lab.name}</h2>
          <p className="mt-1 text-slate-600">
            📍 {lab.location}, {lab.state}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close details"
          >
            ✕
          </button>
        )}
      </div>

      {/* Key info boxes */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Status</p>
          <p className="mt-2 font-semibold text-ink">{lab.status}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Turnaround Time</p>
          <p className="mt-2 font-semibold text-ink">{lab.turnaround_days} days</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Online Submissions</p>
          <p className="mt-2 font-semibold text-ink">
            {lab.accepts_online_submissions ? '✓ Yes' : '✗ No'}
          </p>
        </div>
      </div>

      {/* Accreditation */}
      {lab.accreditation && (
        <div className="mt-6 rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
          <p className="text-xs font-semibold text-green-900">Accreditation</p>
          <p className="mt-1 text-sm text-green-800">{lab.accreditation}</p>
        </div>
      )}

      {/* Test categories */}
      <div className="mt-6">
        <p className="font-semibold text-ink">Test Categories Offered</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {lab.test_categories.map((category) => (
            <span key={category} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-6">
        <p className="font-semibold text-ink">Capabilities</p>
        <ul className="mt-3 space-y-2">
          {lab.capabilities.map((capability, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-navy">✓</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact info - clearly marked as demo */}
      <div className="mt-6 rounded-lg bg-orange-50 p-4 border-l-4 border-orange-500">
        <p className="text-xs font-semibold text-orange-900">⚠️ Demo Contact Information</p>
        <div className="mt-3 space-y-2 text-sm text-orange-800">
          <p>
            <span className="font-medium">Phone:</span> {lab.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {lab.email}
          </p>
          <p>
            <span className="font-medium">Website:</span> {lab.website}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        {testName && onViewRequirements && (
          <button
            onClick={onViewRequirements}
            className="rounded-lg border border-navy bg-white px-4 py-2 font-medium text-navy hover:bg-navy hover:text-white"
          >
            ← Back to Test: {testName}
          </button>
        )}

        <button
          onClick={onClose}
          className="ml-auto rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-blue-900"
        >
          Close
        </button>
      </div>
    </div>
  )
}
