/**
 * @file src/components/compliance/ComplianceChecklist.jsx
 * Main checklist component showing all compliance items with filtering.
 */

import { useState } from 'react'

export default function ComplianceChecklist({ items, onItemSelect, selectedItemId, onStatusChange, isLoading }) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200"></div>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">No items found</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 transition-colors ${
              selectedItemId === item.id ? 'bg-blue-50/70' : 'hover:bg-slate-50'
            }`}
          >
            <ComplianceItemRow
              item={item}
              isSelected={selectedItemId === item.id}
              onSelect={() => onItemSelect(item)}
              onStatusChange={onStatusChange}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Individual row item for checklist
 */
function ComplianceItemRow({ item, onSelect, onStatusChange }) {
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

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      className="w-full text-left cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleStatusToggle}
          disabled={isUpdating}
          aria-label={`Toggle status for ${item.title}`}
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

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-ink">{item.title}</h4>
              <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className={`whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(item.status)} border`}>
                {item.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
