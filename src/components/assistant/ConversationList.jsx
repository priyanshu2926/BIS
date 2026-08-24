/**
 * @file src/components/assistant/ConversationList.jsx
 * Grouped conversation history sidebar with time segmentation, search filter,
 * creation and deletion controls.
 */

import { Clock, MessageSquare, Plus, Search, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'

/**
 * Group conversations into Today, Yesterday, Previous 7 Days, Older
 */
function groupConversations(conversations) {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000
  const lastWeekStart = todayStart - 7 * 24 * 60 * 1000

  const groups = {
    today: [],
    yesterday: [],
    previousWeek: [],
    older: [],
  }

  conversations.forEach((conv) => {
    const time = new Date(conv.updated_at || conv.created_at).getTime()
    if (time >= todayStart) {
      groups.today.push(conv)
    } else if (time >= yesterdayStart) {
      groups.yesterday.push(conv)
    } else if (time >= lastWeekStart) {
      groups.previousWeek.push(conv)
    } else {
      groups.older.push(conv)
    }
  })

  return [
    { label: 'Today', items: groups.today },
    { label: 'Yesterday', items: groups.yesterday },
    { label: 'Previous 7 Days', items: groups.previousWeek },
    { label: 'Older', items: groups.older },
  ].filter((g) => g.items.length > 0)
}

export default function ConversationList({
  conversations = [],
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onCloseMobile,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  // Filter conversations by search term
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return conversations
    const term = searchTerm.toLowerCase()
    return conversations.filter(
      (c) =>
        (c.title && c.title.toLowerCase().includes(term)) ||
        (c.last_message && c.last_message.toLowerCase().includes(term))
    )
  }, [conversations, searchTerm])

  const grouped = useMemo(() => groupConversations(filtered), [filtered])

  const handleDelete = (e, id) => {
    e.stopPropagation()
    if (confirmDeleteId === id) {
      onDeleteConversation?.(id)
      setConfirmDeleteId(null)
    } else {
      setConfirmDeleteId(id)
    }
  }

  return (
    <aside className="flex h-full w-full flex-col bg-white">
      {/* Top Header & New Conversation Button */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-navy" />
            <h3 className="font-bold text-ink text-sm">Conversations</h3>
          </div>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
              aria-label="Close conversation drawer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            onNewConversation?.()
            onCloseMobile?.()
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 px-3 text-xs font-bold text-navy transition hover:bg-blue-100 active:scale-98"
        >
          <Plus size={16} />
          New Conversation
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chat history..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-1.5 pl-8 pr-3 text-xs text-ink placeholder-slate-400 outline-none focus:border-navy focus:bg-white transition"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Conversation List / Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {grouped.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            {searchTerm ? 'No matching conversations' : 'No conversation history yet'}
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-1.5 px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Clock size={11} />
                <span>{group.label}</span>
              </div>

              <div className="space-y-1">
                {group.items.map((conv) => {
                  const isActive = conv.id === currentConversationId
                  const isDeleting = confirmDeleteId === conv.id

                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        onSelectConversation?.(conv.id)
                        onCloseMobile?.()
                      }}
                      className={`group relative flex cursor-pointer items-start justify-between rounded-xl p-2.5 transition ${
                        isActive
                          ? 'border border-blue-200 bg-blue-50/80 text-navy shadow-xs'
                          : 'border border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p
                          className={`truncate text-xs font-bold ${
                            isActive ? 'text-navy' : 'text-ink'
                          }`}
                        >
                          {conv.title || 'New Conversation'}
                        </p>
                        {conv.last_message && (
                          <p className="mt-0.5 truncate text-[11px] text-slate-500">
                            {conv.last_message}
                          </p>
                        )}
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, conv.id)}
                        className={`rounded-lg p-1 transition ${
                          isDeleting
                            ? 'bg-red-600 text-white opacity-100'
                            : 'text-slate-400 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100'
                        }`}
                        title={isDeleting ? 'Click again to confirm delete' : 'Delete conversation'}
                        aria-label={`Delete conversation ${conv.title}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
