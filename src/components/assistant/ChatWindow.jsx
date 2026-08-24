/**
 * @file src/components/assistant/ChatWindow.jsx
 * Main chat container handling scroll orchestration, message streaming states,
 * error banners with retry, and chat input.
 */

import { AlertCircle, ArrowDown, RefreshCw, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import EmptyChat from './EmptyChat'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({
  messages = [],
  isLoading = false,
  isSending = false,
  isRegeneratingId = null,
  error = null,
  onSendMessage,
  onRegenerate,
  onViewSource,
  onRetry,
  onDismissError,
}) {
  const messagesEndRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  // Scroll to bottom helper
  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  // Scroll on new message or sending
  useEffect(() => {
    scrollToBottom('smooth')
  }, [messages, isSending])

  // Track scroll position to show/hide "Scroll to Bottom" button
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    setShowScrollBottom(distanceFromBottom > 150)
  }

  return (
    <div className="relative flex h-full flex-col bg-slate-50/50">
      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6"
      >
        {isLoading ? (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
            <p className="text-xs font-semibold text-slate-500">Loading conversation...</p>
          </div>
        ) : messages.length === 0 ? (
          <EmptyChat onSelectQuestion={onSendMessage} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRegenerate={onRegenerate}
                onViewSource={onViewSource}
                isRegenerating={isRegeneratingId === message.id}
              />
            ))}

            {/* Typing / Analysis Indicator */}
            {isSending && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom('smooth')}
          className="absolute bottom-24 right-8 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy shadow-md border border-slate-200 transition hover:bg-slate-50 active:scale-95 animate-rise"
          aria-label="Scroll to newest messages"
        >
          <ArrowDown size={16} />
        </button>
      )}

      {/* Bottom Area: Error Banner & Input */}
      <div className="border-t border-slate-200/80 bg-white p-3.5 sm:p-4">
        <div className="mx-auto max-w-3xl space-y-3">
          {/* Error Banner */}
          {error && (
            <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50/90 p-3 text-xs text-red-800 animate-rise">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
              <div className="flex items-center gap-2">
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex items-center gap-1 font-bold text-red-900 underline hover:no-underline"
                  >
                    <RefreshCw size={12} />
                    Retry
                  </button>
                )}
                {onDismissError && (
                  <button
                    type="button"
                    onClick={onDismissError}
                    className="rounded p-1 text-red-500 hover:bg-red-100"
                    aria-label="Dismiss error"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <ChatInput onSendMessage={onSendMessage} isSending={isSending} />
        </div>
      </div>
    </div>
  )
}
