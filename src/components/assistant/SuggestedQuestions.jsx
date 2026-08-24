/**
 * @file src/components/assistant/SuggestedQuestions.jsx
 * Interactive suggested question cards for fast discovery and empty states.
 */

import { ArrowRight, BookOpen, CheckCircle2, FileQuestion, FileText, FlaskConical, HelpCircle, ShieldCheck } from 'lucide-react'

const DEFAULT_SUGGESTIONS = [
  {
    icon: FileQuestion,
    category: 'Standard Identification',
    question: 'Which Indian Standard applies to my product?',
    description: 'Find out the exact IS specification code and mandatory QCO coverage.',
  },
  {
    icon: ShieldCheck,
    category: 'Certification Scheme',
    question: 'Do I need mandatory BIS certification for my industry?',
    description: 'Understand Scheme-I (ISI Mark) vs Compulsory Registration Scheme (CRS).',
  },
  {
    icon: FileText,
    category: 'Documentation',
    question: 'What documents are required to apply for BIS Scheme-I license?',
    description: 'Factory layout, test equipment list, calibration certificates, and SIT.',
  },
  {
    icon: BookOpen,
    category: 'Plain Language',
    question: 'Explain IS 374:2019 electric ceiling fan standard in simple language',
    description: 'Understand technical insulation, air delivery, and testing clauses easily.',
  },
  {
    icon: FlaskConical,
    category: 'Testing & Labs',
    question: 'What lab testing procedures are required before audit?',
    description: 'In-house routine testing vs third-party NABL/BIS lab verification.',
  },
]

export default function SuggestedQuestions({ onSelectQuestion, suggestions = DEFAULT_SUGGESTIONS }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle size={16} className="text-saffron" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Suggested Compliance Questions
        </h4>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {suggestions.map((item, index) => {
          const Icon = item.icon || FileText
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectQuestion(item.question)}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 text-left transition duration-150 hover:-translate-y-0.5 hover:border-navy hover:bg-blue-50/30 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 group-hover:bg-blue-100 group-hover:text-navy">
                    <Icon size={12} />
                    {item.category}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-navy"
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-ink group-hover:text-navy">
                  {item.question}
                </p>
                {item.description && (
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
