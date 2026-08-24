/**
 * @file src/components/assistant/ChatHeader.jsx
 * Header for the AI Assistant Chat Window with controls, status indicators, and drawer toggles.
 */

import { BotMessageSquare, BookOpen, Layers, Menu, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function ChatHeader({
  activeTitle = 'BIS AI Assistant',
  sourceCount = 0,
  onNewChat,
  onClearChat,
  onToggleSidebar,
  onToggleSources,
  sourcesOpen = false,
}) {
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  const handleConfirmClear = () => {
    onClearChat?.()
    setShowConfirmClear(false)
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3.5 sm:px-6">
      {/* Left: Mobile Nav Button & Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle conversations list"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-navy">
              <BotMessageSquare size={22} aria-hidden="true" />
            </span>
            {/* Online Status Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-ink sm:text-base">{activeTitle}</h2>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-navy">
                <Sparkles size={10} className="text-saffron" />
                RAG Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">Official Standards & Compliance Guidance</p>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle Sources Button for Mobile/Tablet */}
        {onToggleSources && (
          <button
            type="button"
            onClick={onToggleSources}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition xl:hidden ${
              sourcesOpen
                ? 'border-navy bg-navy text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-navy hover:text-navy'
            }`}
            aria-label="Toggle sources view"
          >
            <BookOpen size={14} />
            <span>Sources</span>
            {sourceCount > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  sourcesOpen ? 'bg-white text-navy' : 'bg-blue-100 text-navy'
                }`}
              >
                {sourceCount}
              </span>
            )}
          </button>
        )}

        {/* Clear Chat Button / Confirmation */}
        {showConfirmClear ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleConfirmClear}
              className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
            >
              Confirm Clear
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmClear(false)}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirmClear(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            title="Clear all messages in this conversation"
            aria-label="Clear conversation messages"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}

        {/* New Chat Button */}
        {onNewChat && (
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#062d5e] shadow-xs active:scale-95"
            aria-label="Start new conversation"
          >
            <Plus size={15} />
            <span>New Chat</span>
          </button>
        )}
      </div>
    </header>
  )
}
