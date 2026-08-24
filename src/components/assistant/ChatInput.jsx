/**
 * @file src/components/assistant/ChatInput.jsx
 * Multi-line resilient Chat Input component with keyboard shortcuts and disabled state during processing.
 */

import { CornerDownLeft, Loader2, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ChatInput({
  onSendMessage,
  isSending = false,
  placeholder = 'Ask about BIS standards, certification schemes, testing procedures, or compliance...',
}) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`
    }
  }, [input])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!input.trim() || isSending) return
    onSendMessage(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xs transition focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/10"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          rows={1}
          placeholder={placeholder}
          className="max-h-36 min-h-[44px] w-full resize-none border-0 bg-transparent px-2.5 py-2 text-sm text-ink placeholder-slate-400 outline-none disabled:opacity-50"
          aria-label="Ask BIS AI Assistant"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label={isSending ? 'Sending message...' : 'Send message'}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold transition ${
            input.trim() && !isSending
              ? 'bg-navy text-white shadow-xs hover:bg-[#062d5e] active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <Loader2 size={18} className="animate-spin text-navy" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>

      {/* Helper Bar */}
      <div className="mt-1 flex items-center justify-between px-2 text-[11px] text-slate-400">
        <span className="hidden sm:inline-flex items-center gap-1">
          <CornerDownLeft size={11} /> Press <kbd className="font-mono rounded bg-slate-100 px-1 py-0.5 text-[10px] text-slate-600">Enter</kbd> to send, <kbd className="font-mono rounded bg-slate-100 px-1 py-0.5 text-[10px] text-slate-600">Shift + Enter</kbd> for new line
        </span>
        <span className="inline-flex items-center gap-1 ml-auto text-slate-400">
          <Sparkles size={11} className="text-saffron" /> BIS RAG Verified
        </span>
      </div>
    </form>
  )
}
