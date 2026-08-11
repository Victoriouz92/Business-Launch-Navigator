"use client"

import { useProgress } from "@/hooks/useProgress"
import { Check } from "lucide-react"

interface Props {
  stepId: string
}

export function StepCompleteButton({ stepId }: Props) {
  const { isCompleted, toggleStep } = useProgress()
  const completed = isCompleted(stepId)

  if (completed) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm border border-green-300 dark:border-green-700">
          <Check className="w-4 h-4" />
          Завършена ✓
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1"
          aria-label="Редактирай тази стъпка"
        >
          Редактирай
        </button>
        <button
          onClick={() => toggleStep(stepId)}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1 transition-colors"
          aria-label="Отмяна на завършване"
        >
          Отмяна
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => toggleStep(stepId)}
      className="w-full py-3 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-label="Маркирай стъпката като завършена"
    >
      ✓ Маркирай като завършена
    </button>
  )
}
