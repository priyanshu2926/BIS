/**
 * @file src/components/compliance/ComplianceItem.jsx
 * Individual compliance item component with status indicator and actions.
 */

import { useState } from 'react'

export default function ComplianceItem({
  item,
  onStatusChange,
  onSelectItem,
  isSelected = false,
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusToggle = async (e) => {
    e.stopPropagation()
    setIsUpdating(true)
    try {
      const newStatus = item.status === 'Completed' ? 'Pending' : 'Completed'
      await onStatusChange(item.id, { status: newStatus })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900'
      case 'Pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'Attention':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      default:
        return 'bg-slate-50 border-slate-200 text-slate-900'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return '✓'
      case 'Pending':
        return '○'
      case 'Attention':
        return '!'
      default:
        return '•'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600'
      case 'High':
        return 'text-orange-600'
      case 'Medium':
        return 'text-blue-600'
      case 'Low':
        return 'text-green-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <button
      onClick={() => onSelectItem(item)}
      className={`w-full text-left transition-all ${
        isSelected ? 'ring-2 ring-navy' : ''
      } rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox-like status indicator */}
        <button
          onClick={handleStatusToggle}
          disabled={isUpdating}
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 font-bold transition-all ${
            item.status === 'Completed'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
              : item.status === 'Attention'
                ? 'border-orange-400 bg-orange-50 text-orange-600'
                : 'border-slate-300 bg-white hover:border-navy'
          } ${isUpdating ? 'opacity-50' : ''}`}
        >
          {getStatusIcon(item.status)}
        </button>

        {/* Item content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                  item.status
                )} border`}
              >
                {item.status}
              </span>
              <span className={`whitespace-nowrap text-xs font-medium ${getPriorityColor(item.priority)}`}>
                {item.priority} Priority
              </span>
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-600">{item.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-1">
              {item.category}
            </span>
            {item.is_mandatory && (
              <span className="rounded-full bg-red-100 px-2 py-1 text-red-700">
                Mandatory
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
