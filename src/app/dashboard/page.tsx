"use client"

import { CATEGORIES, STEPS, isStepRelevant } from "@/data/roadmap"
import { RoadmapView } from "@/components/RoadmapView"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Footer } from "@/components/Footer"
import { BetaNotice } from "@/components/BetaNotice"
import { Logo } from "@/components/Logo"
import { UserMenu } from "@/components/UserMenu"
import { useProgress } from "@/hooks/useProgress"
import { useBusinessType } from "@/hooks/useBusinessType"
import Link from "next/link"
import { Receipt, MessageCircle, Heart, BookOpen } from "lucide-react"

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  online: "онлайн бизнес",
  offline: "офлайн бизнес",
  mixed: "смесен бизнес",
}

export default function DashboardPage() {
  const { completedStepIds, toggleStep, loaded } = useProgress()
  const { businessType } = useBusinessType()

  const relevantSteps = STEPS.filter((s) => isStepRelevant(s, businessType))
  const notRelevantSteps = STEPS.filter((s) => !isStepRelevant(s, businessType))
  const totalSteps = relevantSteps.length

  const mandatoryCostEUR = relevantSteps
    .filter((s) => s.priorityLevel === "legally_required")
    .reduce((sum, s) => sum + s.estimatedCostBGN / 1.95583, 0)

  const remainingCostEUR = relevantSteps
    .filter((s) => !completedStepIds.includes(s.id))
    .reduce((sum, s) => sum + s.estimatedCostBGN / 1.95583, 0)

  // Find next recommended step: first incomplete step, by category order then step order
  // (all steps are unlocked — this is just a suggestion, not an enforced sequence)
  const nextStep = relevantSteps
    .filter((s) => !completedStepIds.includes(s.id))
    .sort((a, b) => {
      const catA = CATEGORIES.find((c) => c.id === a.categoryId)?.order ?? 0
      const catB = CATEGORIES.find((c) => c.id === b.categoryId)?.order ?? 0
      if (catA !== catB) return catA - catB
      return a.order - b.order
    })[0]

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
          <Link href="/dashboard" className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg">
            <Logo size="sm" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Business Launch Navigator
            </h1>
          </Link>
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline mr-2">{completedStepIds.length} / {totalSteps} стъпки</span>
            <Link
              href="/expenses"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Receipt className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] leading-none">Разходи</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] leading-none">Контакт</span>
            </Link>
            <Link
              href="/guides"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] leading-none">Наръчници</span>
            </Link>
            <Link
              href="/support"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Heart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] leading-none">Подкрепа</span>
            </Link>
            <div className="ml-1">
              <ThemeToggle />
            </div>
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
          steps={relevantSteps}
          completedStepIds={completedStepIds}
          onToggleStep={toggleStep}
          nextStepId={nextStep?.id}
        />

        {/* Not relevant for this business type */}
        {notRelevantSteps.length > 0 && (
          <div className="mt-8 opacity-70">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
              Нямаш нужда от това
            </h2>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {notRelevantSteps.map((step) => (
                  <li key={step.id}>
                    <Link
                      href={`/step/${step.id}`}
                      className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {step.title}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                        Не се отнася за {BUSINESS_TYPE_LABELS[businessType ?? ""] ?? "избрания тип бизнес"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
