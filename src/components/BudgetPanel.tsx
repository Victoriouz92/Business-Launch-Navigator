"use client"

import { useState } from "react"
import { Wallet, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useBudget } from "@/hooks/useBudget"
import { calculateBudgetTiers } from "@/lib/budgetCalc"
import type { Step } from "@/data/roadmap"

export function BudgetPanel({ steps, completedStepIds }: { steps: Step[]; completedStepIds: string[] }) {
  const { budget, setBudget, loaded } = useBudget()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const [expanded, setExpanded] = useState(false)

  function saveBudget(value: number) {
    setBudget(value)
    setEditing(false)
  }

  if (!loaded) return null

  const { mandatory, likely, optional, core, total } = calculateBudgetTiers(steps, completedStepIds)

  if (budget === null || editing) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          <Wallet className="w-4 h-4" />
          Какъв бюджет си предвидил за стартиране на бизнеса?
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const n = parseFloat(draft)
            if (!isNaN(n) && n >= 0) saveBudget(n)
          }}
          className="flex gap-2"
        >
          <input
            type="number"
            min="0"
            step="10"
            inputMode="decimal"
            autoFocus={editing}
            defaultValue={budget ?? undefined}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="напр. 500"
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <span className="self-center text-sm text-slate-400 dark:text-slate-500">€</span>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Запази
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Отказ
            </button>
          )}
        </form>
      </div>
    )
  }

  const usagePercent = core > 0 && budget > 0 ? Math.min(100, Math.round((core / budget) * 100)) : 0
  const diff = budget - core
  const overBudget = diff < 0

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Wallet className="w-4 h-4" />
          Твоят бюджет
        </p>
        <button
          onClick={() => {
            setDraft(String(budget))
            setEditing(true)
          }}
          className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <Pencil className="w-3 h-3" />
          Промени
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">€{budget.toFixed(0)}</span>
        <span className={`text-sm font-medium ${overBudget ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
          {overBudget ? `не достигат €${Math.abs(diff).toFixed(0)}` : `остават €${diff.toFixed(0)}`}
        </span>
      </div>

      <div
        className="mt-3 w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
        role="progressbar"
        aria-valuenow={usagePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Използване на бюджета от задължителните и вероятните разходи"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${overBudget ? "bg-red-500" : "bg-emerald-500"}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>Задължителни + вероятни: €{core.toFixed(0)}</span>
        <span>{usagePercent}%</span>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {expanded ? "Скрий разбивката" : "Виж разбивката по категории"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
          <BudgetRow label="🔴 Задължителни" value={mandatory} />
          <BudgetRow label="🟡 Вероятни" value={likely} />
          <BudgetRow label="⚪ По желание" value={optional} />
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-semibold text-slate-900 dark:text-white">
            <span>Общо (с по избор)</span>
            <span>€{total.toFixed(0)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function BudgetRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-slate-600 dark:text-slate-300">
      <span>{label}</span>
      <span className="font-medium">€{value.toFixed(0)}</span>
    </div>
  )
}
