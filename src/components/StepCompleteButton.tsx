"use client"

import { useProgress } from "@/hooks/useProgress"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

interface Props {
  stepId: string
}

export function StepCompleteButton({ stepId }: Props) {
  const { isCompleted, toggleStep } = useProgress()
  const router = useRouter()
  const completed = isCompleted(stepId)

  if (completed) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm border border-green-300 dark:border-green-700">
          <Check className="w-4 h-4" />
          Завършена
        </span>
        <button
          onClick={() => toggleStep(stepId)}
          className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1 transition-colors"
        >
          Отбележи като незавършена
        </button>
      </div>
    )
  }

  async function handleComplete() {
    await toggleStep(stepId)
    router.push("/dashboard")
  }

  return (
    <button
      onClick={handleComplete}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Check className="w-4 h-4" />
      Завърши
    </button>
  )
}
