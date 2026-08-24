/**
 * @file src/components/testing/TestRequirementCard.jsx
 * Individual test requirement card component.
 */

export default function TestRequirementCard({
  test,
  onSelectTest,
  onFindLabs,
  isSelected = false,
}) {
  const getStatusColor = (status) => {
    return status === 'Required'
      ? 'bg-red-50 border-red-200 text-red-900'
      : 'bg-yellow-50 border-yellow-200 text-yellow-900'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Electrical Safety': 'bg-red-100 text-red-700',
      Performance: 'bg-blue-100 text-blue-700',
      Construction: 'bg-orange-100 text-orange-700',
      Durability: 'bg-green-100 text-green-700',
      Environmental: 'bg-purple-100 text-purple-700',
      'Marking & Packaging': 'bg-indigo-100 text-indigo-700',
    }
    return colors[category] || 'bg-slate-100 text-slate-700'
  }

  return (
    <button
      onClick={() => onSelectTest(test)}
      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
        isSelected
          ? 'border-navy bg-blue-50'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink">{test.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{test.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(test.category)}`}>
              {test.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(
                test.status
              )}`}
            >
              {test.status}
            </span>
          </div>

          {test.parameters && (
            <p className="mt-3 text-xs text-slate-500">
              <span className="font-semibold">Parameters:</span> {test.parameters}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onFindLabs(test)
          }}
          className="flex-shrink-0 rounded-lg bg-navy px-3 py-1 text-xs font-medium text-white hover:bg-blue-900"
        >
          Find Labs →
        </button>
      </div>
    </button>
  )
}
