"use client"

import { useState } from "react"
import { Category, Step } from "@/data/roadmap"
import { Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { CategoryIconBadge } from "@/lib/categoryIcons"
import { bgnToEur } from "@/lib/currency"

interface Props {
  categories: Category[]
  steps: Step[]
  completedStepIds: string[]
  onToggleStep?: (stepId: string) => void
  nextStepId?: string
}

export function RoadmapView({ categories, steps, completedStepIds, nextStepId }: Props) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  function toggleCategory(catId: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(catId)) next.delete(catId)
      else next.add(catId)
      return next
    })
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const catSteps = steps
          .filter((s) => s.categoryId === cat.id)
          .sort((a, b) => a.order - b.order)
        if (catSteps.length === 0) return null
        const completed = catSteps.filter((s) =>
          completedStepIds.includes(s.id)
        ).length
        const isOpen = !collapsed.has(cat.id)

        return (
          <div
            key={cat.id}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <CategoryIconBadge categoryId={cat.id} />
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {cat.label}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {completed} / {catSteps.length}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Steps List */}
            {isOpen && (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {catSteps.map((step) => (
                  <li key={step.id}>
                    <StepRow
                      step={step}
                      isCompleted={completedStepIds.includes(step.id)}
                      isNextStep={step.id === nextStepId}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

function StepRow({
  step,
  isCompleted,
  isNextStep,
}: {
  step: Step
  isCompleted: boolean
  isNextStep: boolean
}) {
  const priorityColors: Record<string, string> = {
    legally_required: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    strongly_recommended: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    optional: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    can_be_postponed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  }

  const priorityLabels: Record<string, string> = {
    legally_required: "Задължително",
    strongly_recommended: "Препоръчително",
    optional: "По избор",
    can_be_postponed: "Може по-късно",
  }

  const isMandatory = step.priorityLevel === "legally_required"

  const content = (
    <div
      className={`flex items-center gap-3 px-5 py-3 border-l-4 ${
        isMandatory ? "border-red-400 dark:border-red-600" : "border-transparent"
      }`}
    >
      {/* Status icon */}
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div
            className={`w-6 h-6 rounded-full border-2 ${
              isMandatory ? "border-red-400 dark:border-red-600" : "border-blue-400"
            }`}
          />
        )}
      </div>

      {/* Step info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-slate-900 dark:text-white">
          {step.title}
        </p>
      </div>

      {/* Priority badge */}
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[step.priorityLevel]}`}
      >
        {priorityLabels[step.priorityLevel]}
      </span>

      {/* Cost */}
      {step.estimatedCostBGN > 0 && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          €{bgnToEur(step.estimatedCostBGN).toFixed(0)}
        </span>
      )}

      {/* Edit link for completed steps */}
      {isCompleted && (
        <Link
          href={`/step/${step.id}`}
          className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          aria-label={`Редактирай ${step.title}`}
        >
          Редактирай
        </Link>
      )}
    </div>
  )

  if (isCompleted) {
    return <div>{content}</div>
  }

  return (
    <Link
      href={`/step/${step.id}`}
      className="block hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-current={isNextStep ? "step" : undefined}
    >
      {content}
    </Link>
  )
}
