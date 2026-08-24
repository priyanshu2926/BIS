/**
 * @file src/components/compliance/RequirementDetails.jsx
 * Detailed view for selected compliance requirement.
 */

import { useNavigate } from 'react-router-dom'

export default function RequirementDetails({ item, onClose, onStatusChange, isUpdating = false }) {
  const navigate = useNavigate()

  if (!item) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Select an item to view details</p>
      </div>
    )
  }

  const handleMarkComplete = async () => {
    await onStatusChange(item.id, { status: 'Completed' })
  }

  const handleMarkPending = async () => {
    await onStatusChange(item.id, { status: 'Pending' })
  }

  const handleMarkAttention = async () => {
    await onStatusChange(item.id, { status: 'Attention' })
  }

  const handleAskAI = () => {
    // Navigate to assistant with context
    navigate('/industry/assistant', {
      state: { requirementContext: item.title },
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 bg-red-50'
      case 'High':
        return 'text-orange-600 bg-orange-50'
      case 'Medium':
        return 'text-blue-600 bg-blue-50'
      case 'Low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-600 bg-emerald-50'
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'Attention':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">{item.title}</h2>
          <p className="mt-2 text-slate-600">{item.description}</p>
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

      {/* Meta information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Status</p>
          <p className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(item.status)}`}>
            {item.status}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Priority</p>
          <p className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getPriorityColor(item.priority)}`}>
            {item.priority}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Category</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{item.category}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Mandatory</p>
          <p className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            {item.is_mandatory ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      {/* Additional details */}
      {item.notes && (
        <div className="mt-6 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
          <p className="text-xs font-semibold text-blue-900">Notes</p>
          <p className="mt-1 text-sm text-blue-800">{item.notes}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        {item.status !== 'Completed' && (
          <button
            onClick={handleMarkComplete}
            disabled={isUpdating}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Mark Complete
          </button>
        )}

        {item.status !== 'Pending' && (
          <button
            onClick={handleMarkPending}
            disabled={isUpdating}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Mark Pending
          </button>
        )}

        {item.status !== 'Attention' && (
          <button
            onClick={handleMarkAttention}
            disabled={isUpdating}
            className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 font-medium text-orange-700 hover:bg-orange-100 disabled:opacity-50"
          >
            Mark for Attention
          </button>
        )}

        <button
          onClick={handleAskAI}
          className="ml-auto rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-blue-900"
        >
          Ask AI →
        </button>
      </div>
    </div>
  )
}
