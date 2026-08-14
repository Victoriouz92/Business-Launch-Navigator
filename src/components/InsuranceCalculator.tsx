"use client"

import { useState } from "react"

/**
 * Калкулатор за осигуровки при ЕООД + трудов договор.
 *
 * Логика (2026, България в Еврозоната):
 * - Максимален осигурителен доход: €2,300/мес (от 01.08.2026)
 * - Минимален осигурителен доход за самоосигуряващи се: €620.20/мес (от 01.08.2026; €550.66 преди това)
 * - Ако заплатата на трудов договор >= максимума → доплащане = €0
 * - Ако заплатата < максимума → самоосигуряваш се върху разликата (мин. основата по-горе)
 * - Осигурителни вноски за самоосигуряващ се (ДОО 14.8% + УПФ 5% + ЗО 8% = 27.8%, с ОЗМ +3.5% → 31.3%)
 */

const MAX_INSURANCE_INCOME = 2300 // €/мес (от 01.08.2026, бюджет ДОО 2026)
const MIN_SELF_EMPLOYED_INCOME = 620.2 // €/мес (мин. осигурителен доход за СОЛ от 01.08.2026)
const CONTRIBUTION_RATE = 0.313 // ДОО+УПФ+ЗО 27.8% + ОЗМ 3.5% = 31.3%

export function InsuranceCalculator() {
  const [salary, setSalary] = useState<string>("")
  const [result, setResult] = useState<{
    base: number
    monthly: number
    message: string
  } | null>(null)

  function calculate() {
    const salaryNum = parseFloat(salary)
    if (isNaN(salaryNum) || salaryNum < 0) {
      setResult(null)
      return
    }

    if (salaryNum >= MAX_INSURANCE_INCOME) {
      setResult({
        base: 0,
        monthly: 0,
        message: `Заплатата ти (€${salaryNum.toFixed(0)}) е над максималния осигурителен доход (€${MAX_INSURANCE_INCOME}). Не дължиш допълнителни осигуровки като самоосигуряващ се.`,
      })
    } else {
      const remaining = MAX_INSURANCE_INCOME - salaryNum
      const base = Math.max(MIN_SELF_EMPLOYED_INCOME, Math.min(remaining, MIN_SELF_EMPLOYED_INCOME))
      // Self-employed must insure on at least MIN, but not more than remaining to max
      const actualBase = Math.min(remaining, Math.max(base, MIN_SELF_EMPLOYED_INCOME))
      const monthly = actualBase * CONTRIBUTION_RATE

      setResult({
        base: actualBase,
        monthly,
        message:
          salaryNum === 0
            ? `Без трудов договор — осигуряваш се на минимума (€${MIN_SELF_EMPLOYED_INCOME}/мес).`
            : `Разлика до максимума: €${remaining.toFixed(0)}. Осигуряваш се върху €${actualBase.toFixed(0)}/мес.`,
      })
    }
  }

  return (
    <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 p-5">
      <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wide mb-3">
        🧮 Калкулатор: Осигуровки при трудов договор + ЕООД
      </h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
        Ако вече работиш на трудов договор, може да не дължиш пълния размер осигуровки като самоосигуряващ се. Въведи нетната си заплата за да видиш.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label
            htmlFor="salary-input"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Брутна месечна заплата (€)
          </label>
          <input
            id="salary-input"
            type="number"
            min="0"
            max="10000"
            step="50"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            placeholder="напр. 1200"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={calculate}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
        >
          Изчисли
        </button>
      </div>

      {result && (
        <div className="mt-4 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 p-4 space-y-2">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {result.message}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              ~€{result.monthly.toFixed(0)}/мес
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              допълнителни осигуровки
            </span>
          </div>
          {result.monthly > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Осигурителна основа: €{result.base.toFixed(0)} × 31.3% = €{result.monthly.toFixed(0)}
              <br />
              Макс. осигурителен доход 2026: €{MAX_INSURANCE_INCOME}/мес
            </p>
          )}
          {result.monthly === 0 && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✓ Не дължиш допълнителни осигуровки от ЕООД-то!
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        * Приблизителна стойност. Данните са актуални към 13 август 2026 г. Консултирай се със счетоводител за точната сума.
      </p>
    </div>
  )
}
