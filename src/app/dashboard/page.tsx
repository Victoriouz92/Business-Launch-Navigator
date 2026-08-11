"use client"

import { CATEGORIES, STEPS, getStepsForCategory } from "@/data/roadmap"
import { RoadmapView } from "@/components/RoadmapView"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Footer } from "@/components/Footer"
import { BetaNotice } from "@/components/BetaNotice"
import { Logo } from "@/components/Logo"
import { UserMenu } from "@/components/UserMenu"
import { useProgress } from "@/hooks/useProgress"
import Link from "next/link"
import { Receipt, MessageCircle, Heart } from "lucide-react"

export default function DashboardPage() {
  const { completedStepIds, toggleStep, loaded } = useProgress()
  const totalSteps = STEPS.length

  const totalCostEUR = STEPS.reduce(
    (sum, s) => sum + s.estimatedCostBGN / 1.95583, 0
  )
  const mandatoryCostEUR = STEPS
    .filter((s) => s.priorityLevel === "legally_required")
    .reduce((sum, s) => sum + s.estimatedCostBGN / 1.95583, 0)

  const remainingCostEUR = STEPS
    .filter((s) => !completedStepIds.includes(s.id))
    .reduce((sum, s) => sum + s.estimatedCostBGN / 1.95583, 0)

  // Find next recommended step: first unlocked incomplete step in sequential order
  const nextStep = (() => {
    const unlocked: typeof STEPS = []
    for (const cat of CATEGORIES.sort((a, b) => a.order - b.order)) {
      const catSteps = getStepsForCategory(cat.id)
      for (let i = 0; i < catSteps.length; i++) {
        const step = catSteps[i]
        const isCompleted = completedStepIds.includes(step.id)
        const isUnlocked = i === 0 || completedStepIds.includes(catSteps[i - 1].id)
        if (isUnlocked && !isCompleted) {
          unlocked.push(step)
        }
      }
    }
    // Pick by lowest category order, then lowest step order
    return unlocked.sort((a, b) => {
      const catA = CATEGORIES.find((c) => c.id === a.categoryId)?.order ?? 0
      const catB = CATEGORIES.find((c) => c.id === b.categoryId)?.order ?? 0
      if (catA !== catB) return catA - catB
      return a.order - b.order
    })[0]
  })()

  const progressPercent = totalSteps > 0
    ? Math.round((completedStepIds.length / totalSteps) * 100)
    : 0

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Зареждане...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Business Launch Navigator
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{completedStepIds.length} / {totalSteps} стъпки</span>
            <Link
              href="/expenses"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Разходи"
            >
              <Receipt className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <Link
              href="/contact"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Свържете се с нас"
            >
              <MessageCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <Link
              href="/support"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Подкрепете проекта"
            >
              <Heart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <BetaNotice />
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Общ прогрес
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {progressPercent}%
            </span>
          </div>
          <div
            className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Общ прогрес"
          >
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Прогрес"
            value={`${progressPercent}%`}
            sub={`${completedStepIds.length} от ${totalSteps} стъпки`}
          />
          <SummaryCard
            label="Оставащ бюджет"
            value={`€${remainingCostEUR.toFixed(0)}`}
            sub={`Задължителни: €${mandatoryCostEUR.toFixed(0)}`}
          />
          <SummaryCard
            label="Следваща стъпка"
            value={nextStep?.title ?? "Всичко е готово! 🎉"}
            sub={nextStep ? (CATEGORIES.find((c) => c.id === nextStep.categoryId)?.label ?? "") : ""}
          />
        </div>

        {/* Roadmap */}
        <RoadmapView
          categories={CATEGORIES}
          steps={STEPS}
          completedStepIds={completedStepIds}
          onToggleStep={toggleStep}
          nextStepId={nextStep?.id}
        />
      </main>

      <Footer />
    </div>
  )
}

function SummaryCard({ label, value, sub }: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white truncate">
        {value}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{sub}</p>
    </div>
  )
}
