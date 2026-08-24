/**
 * @file src/components/certification/CertificationStepper.jsx
 * Responsive 6-step progress stepper component for the BIS Certification Journey.
 */

import { Check, ChevronRight } from 'lucide-react'
import { CERTIFICATION_STEPS } from '../../types/certification'

export default function CertificationStepper({ currentStep = 1, onStepClick }) {
  const currentStepObj = CERTIFICATION_STEPS.find((s) => s.id === currentStep) || CERTIFICATION_STEPS[0]
  const progressPercent = Math.round(((currentStep - 1) / (CERTIFICATION_STEPS.length - 1)) * 100)

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <nav aria-label="Certification Progress">
          <ol className="flex items-center justify-between">
            {CERTIFICATION_STEPS.map((step, index) => {
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep
              const isPending = step.id > currentStep

              return (
                <li key={step.id} className="relative flex-1 first:pl-0 last:pr-0">
                  <div className="flex flex-col items-center text-center">
                    {/* Step Icon / Circle */}
                    <button
                      type="button"
                      onClick={() => onStepClick?.(step.id)}
                      disabled={isPending}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`z-10 grid h-10 w-10 place-items-center rounded-2xl text-xs font-bold transition duration-200 ${
                        isCompleted
                          ? 'bg-navy text-white hover:bg-[#062d5e] cursor-pointer shadow-xs'
                          : isCurrent
                          ? 'bg-saffron text-white ring-4 ring-orange-100 shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? <Check size={18} strokeWidth={2.5} /> : step.id}
                    </button>

                    {/* Step Label */}
                    <div className="mt-2.5">
                      <span
                        className={`block text-xs font-bold transition ${
                          isCurrent
                            ? 'text-navy font-extrabold'
                            : isCompleted
                            ? 'text-ink'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="hidden text-[10px] text-slate-400 lg:block">
                        {step.description}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Line between steps */}
                  {index < CERTIFICATION_STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className={`absolute top-5 left-1/2 -z-0 h-0.5 w-full transition-all duration-300 ${
                        step.id < currentStep ? 'bg-navy' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      {/* Mobile Compact Stepper */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs md:hidden">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-saffron">
              Step {currentStep} of {CERTIFICATION_STEPS.length}
            </span>
            <h3 className="font-extrabold text-ink text-sm">{currentStepObj.label}</h3>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-bold text-navy text-[11px]">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-navy to-saffron transition-all duration-300"
            style={{ width: `${Math.max(16, progressPercent)}%` }}
          />
        </div>

        {/* Step Pills Quick Navigation */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {CERTIFICATION_STEPS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onStepClick?.(s.id)}
              disabled={s.id > currentStep}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition shrink-0 ${
                s.id === currentStep
                  ? 'bg-navy text-white'
                  : s.id < currentStep
                  ? 'bg-blue-50 text-navy'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {s.id}. {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
