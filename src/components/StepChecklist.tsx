"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Check } from "lucide-react"

interface SubTask {
  index: number
  label: string
}

interface Props {
  stepId: string
  subTasks: SubTask[]
}

/**
 * Interactive checklist that persists checked items to the database,
 * scoped to the signed-in user's project.
 */
export function StepChecklist({ stepId, subTasks }: Props) {
  const { status } = useSession()
  const [checked, setChecked] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (status !== "authenticated") return
    let cancelled = false

    fetch(`/api/progress/subtask?stepId=${encodeURIComponent(stepId)}`)
      .then((res) => (res.ok ? res.json() : { checked: [] }))
      .then((data) => {
        if (!cancelled) setChecked(data.checked ?? [])
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [stepId, status])

  function toggle(index: number) {
    const willBeChecked = !checked.includes(index)
    setChecked((prev) =>
      willBeChecked ? [...prev, index] : prev.filter((i) => i !== index)
    )

    fetch("/api/progress/subtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepId, subTaskIndex: index }),
    }).catch(() => {
      // Revert the optimistic update if the request fails
      setChecked((prev) =>
        willBeChecked ? prev.filter((i) => i !== index) : [...prev, index]
      )
    })
  }

  const completedCount = checked.length
  const totalCount = subTasks.length

  if (!loaded) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
          Чеклист
        </h3>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {completedCount} от {totalCount}
        </span>
      </div>

      {/* Mini progress bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
        />
      </div>

      <ul className="space-y-2">
        {subTasks.map((task) => {
          const isChecked = checked.includes(task.index)
          return (
            <li key={task.index}>
              <button
                onClick={() => toggle(task.index)}
                className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isChecked
                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
                aria-label={`${isChecked ? "Отмаркирай" : "Маркирай"}: ${task.label}`}
              >
                {/* Checkbox */}
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-green-500 border-green-500"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </div>

                {/* Label */}
                <span
                  className={`text-sm transition-all ${
                    isChecked
                      ? "text-green-700 dark:text-green-300 line-through opacity-75"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {task.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
