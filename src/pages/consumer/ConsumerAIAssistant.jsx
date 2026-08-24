import { BotMessageSquare, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'
import ConsumerLayout from '../../layouts/ConsumerLayout'
import { ConsumerSourceCard, ConsumerChatMessage } from '../../components/consumer/ConsumerUI'
import {
  consumerAISuggestions,
  consumerSources,
} from '../../data/consumerMockData'

const initialMessages = [
  {
    role: 'ai',
    text: 'Hello! I\'m here to help you understand BIS services, product standards, and consumer guidance. What would you like to know?',
  },
]

export default function ConsumerAIAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      { role: 'user', text: input },
      {
        role: 'ai',
        text: 'This is a demo response. In the next phase, this will provide source-aware guidance based on BIS information and consumer needs.',
      },
    ])
    setInput('')
  }

  return (
    <ConsumerLayout title="Ask BIS AI">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
        <section className="flex min-h-[680px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-50 text-orange-700">
                <BotMessageSquare size={19} />
              </span>
              <div>
                <h2 className="font-bold text-ink">BIS AI Assistant</h2>
                <p className="text-xs text-slate-500">Consumer guidance · sources shown separately</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:text-navy"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-5">
            {messages.map((message, index) => (
              <ConsumerChatMessage key={index} role={message.role} text={message.text} />
            ))}
            {messages.length <= 1 && (
              <p className="py-20 text-center text-sm text-slate-500">
                Start a new conversation using one of the suggestions below.
              </p>
            )}
          </div>
          <div className="border-t border-slate-100 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {consumerAISuggestions.map((item) => (
                <button
                  onClick={() => setInput(item)}
                  key={item}
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                type="text"
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              <button
                onClick={send}
                type="button"
                disabled={!input.trim()}
                className="rounded-lg bg-orange-600 p-2.5 text-white transition hover:bg-orange-700 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-ink">Sources</h3>
            <p className="mt-1 text-xs text-slate-500">Information used for this conversation</p>
            <div className="mt-4 space-y-3">
              {consumerSources.map((source) => (
                <ConsumerSourceCard key={source.title} {...source} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </ConsumerLayout>
  )
}
