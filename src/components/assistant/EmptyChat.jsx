/**
 * @file src/components/assistant/EmptyChat.jsx
 * Clean and informative empty state view when no messages exist in the conversation.
 */

import { Bot, CheckCircle, FileSearch, ShieldCheck } from 'lucide-react'
import SuggestedQuestions from './SuggestedQuestions'

export default function EmptyChat({ onSelectQuestion }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center py-6 px-4 text-center animate-rise">
      {/* Brand Icon Header */}
      <div className="relative mb-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-navy to-[#0c4a8a] text-white shadow-soft">
          <Bot size={32} aria-hidden="true" />
        </div>
        <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-saffron text-white ring-2 ring-white">
          <ShieldCheck size={14} />
        </span>
      </div>

      {/* Title & Subtitle */}
      <h2 className="text-xl font-bold text-ink sm:text-2xl">
        BIS AI Compliance Assistant
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
        Your intelligent guide for Indian Standards (IS), Scheme-I (ISI Mark) licensing,
        mandatory Quality Control Orders (QCO), laboratory testing, and audit preparation.
      </p>

      {/* Feature highlights */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 w-full text-left">
        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-navy">
            <FileSearch size={15} />
          </span>
          <div>
            <p className="text-xs font-bold text-ink">Source-Backed Answers</p>
            <p className="text-[11px] text-slate-500">Every response cites specific IS clauses and gazettes.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
            <ShieldCheck size={15} />
          </span>
          <div>
            <p className="text-xs font-bold text-ink">Scheme-I & CRS Coverage</p>
            <p className="text-[11px] text-slate-500">Guidance for domestic, foreign, and electronics manufacturers.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-800">
            <CheckCircle size={15} />
          </span>
          <div>
            <p className="text-xs font-bold text-ink">Audit Preparation</p>
            <p className="text-[11px] text-slate-500">Document checklists and in-house testing guidelines.</p>
          </div>
        </div>
      </div>

      {/* Suggested Questions Section */}
      <div className="mt-7 w-full border-t border-slate-200 pt-6">
        <SuggestedQuestions onSelectQuestion={onSelectQuestion} />
      </div>
    </div>
  )
}
