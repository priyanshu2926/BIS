/**
 * @file src/components/assistant/TypingIndicator.jsx
 * Professional typing/analyzing indicator for assistant response generation.
 */

import { Bot, Sparkles } from 'lucide-react'

export default function TypingIndicator({ text = 'BIS Assistant is analyzing standards & guidelines...' }) {
  return (
    <div className="flex items-start gap-3.5 animate-rise" aria-live="polite" aria-busy="true">
      {/* Bot Avatar */}
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy text-white shadow-xs">
        <Bot size={18} aria-hidden="true" />
      </div>

      {/* Typing Bubble */}
      <div className="flex flex-col gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-navy animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-saffron animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-navy animate-bounce" />
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Sparkles size={12} className="text-saffron animate-pulse" />
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}
