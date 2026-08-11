"use client"

import { useState, useEffect } from "react"
import { Percent, ExternalLink, Info } from "lucide-react"

/**
 * Проверка за задължителна регистрация по ЗДДС.
 *
 * Основания за регистрация (данни към 01.01.2026, след въвеждането на еврото):
 * - Чл. 96 ЗДДС — задължителна при облагаем оборот €51,130 за последните 12 месеца
 * - Чл. 97а ЗДДС — задължителна преди сделката при трансгранични B2B услуги в ЕС, без праг по сума
 * - Чл. 99 ЗДДС (ВОП) — задължителна при вътреобщностни придобивания над 20 000 лв. (~€10,225) за календарната година
 * - Дистанционни продажби / OSS — общ праг за целия ЕС от €10,000/година (различен от прага по чл. 99)
 * - Доброволна регистрация — възможна по всяко време, без праг
 * - Нови режими за малък бизнес (Глава 21б ЗДДС, от 2026) — национален до €51,130, за целия ЕС до €100,000
 */

const MANDATORY_THRESHOLD = 51130 // € за последните 12 месеца, чл. 96 ЗДДС

export function VatChecker() {
  const [turnover, setTurnover] = useState<string>("")
  const [checked, setChecked] = useState(false)
  const [expectsAboveThreshold, setExpectsAboveThreshold] = useState(false)

  useEffect(() => {
    try {
      setExpectsAboveThreshold(localStorage.getItem("bln-vat-expect") === "yes")
    } catch {
      // Ignore read errors
    }
  }, [])

  const turnoverNum = parseFloat(turnover)
  const isMandatory = !isNaN(turnoverNum) && turnoverNum >= MANDATORY_THRESHOLD

  return (
    <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20 p-5">
      <h4 className="flex items-center gap-1.5 text-sm font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wide mb-3">
        <Percent className="w-4 h-4" />
        Проверка: трябва ли да се регистрираш по ДДС
      </h4>

      {expectsAboveThreshold && !checked && (
        <div className="flex items-start gap-2 mb-4 rounded-lg bg-teal-100/70 dark:bg-teal-900/30 px-3 py-2">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-teal-700 dark:text-teal-400" />
          <p className="text-xs text-teal-800 dark:text-teal-300">
            При onboarding-a спомена, че очакваш оборот над прага — провери по-долу.
          </p>
        </div>
      )}
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
        Въведи очаквания облагаем оборот за последните 12 месеца, за да видиш дали регистрацията по общия праг е задължителна.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label
            htmlFor="turnover-input"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Облагаем оборот за 12 месеца (€)
          </label>
          <input
            id="turnover-input"
            type="number"
            min="0"
            step="1000"
            value={turnover}
            onChange={(e) => {
              setTurnover(e.target.value)
              setChecked(false)
            }}
            onKeyDown={(e) => e.key === "Enter" && setChecked(true)}
            placeholder="напр. 30000"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setChecked(true)}
          className="px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap"
        >
          Провери
        </button>
      </div>

      {checked && !isNaN(turnoverNum) && (
        <div className="mt-4 rounded-lg bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-4">
          {isMandatory ? (
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              При оборот €{turnoverNum.toFixed(0)} регистрацията по общия праг (чл. 96 ЗДДС, €{MANDATORY_THRESHOLD.toLocaleString("bg-BG")}) е задължителна.
            </p>
          ) : (
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              При оборот €{turnoverNum.toFixed(0)} не достигаш общия праг за задължителна регистрация (€{MANDATORY_THRESHOLD.toLocaleString("bg-BG")}). Виж по-долу другите основания — някои от тях нямат праг по сума.
            </p>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Други основания за регистрация
        </p>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <li>
            <span className="font-medium text-slate-800 dark:text-slate-200">Чл. 97а</span> — трансгранични B2B услуги в ЕС: задължителна регистрация преди сделката, без праг по сума.
          </li>
          <li>
            <span className="font-medium text-slate-800 dark:text-slate-200">Чл. 99 (ВОП)</span> — вътреобщностно придобиване на стоки над 20 000 лв. (~€10,225) за календарната година.
          </li>
          <li>
            <span className="font-medium text-slate-800 dark:text-slate-200">Дистанционни продажби / OSS</span> — общ праг за целия ЕС от €10,000/година (различен от прага по чл. 99).
          </li>
          <li>
            <span className="font-medium text-slate-800 dark:text-slate-200">Доброволна регистрация</span> — възможна по всяко време, без праг.
          </li>
          <li>
            <span className="font-medium text-slate-800 dark:text-slate-200">Нов режим за малък бизнес (Глава 21б, от 2026 г.)</span> — позволява да останеш нерегистриран дори при трансгранична търговия: национален до €51,130, за целия ЕС до €100,000.
          </li>
        </ul>
      </div>

      <a
        href="https://nra.bg/wps/portal/nra/taxes/dds-v-balgariya/registratsiya-po-zdds"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-xs text-teal-700 dark:text-teal-400 hover:underline"
      >
        Източник: nra.bg — Регистрация по ЗДДС
        <ExternalLink className="w-3 h-3" />
      </a>

      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        * Информацията е образователна, не представлява данъчен съвет. Прагове към 01.01.2026 г. (след въвеждането на еврото). Консултирай се със счетоводител за твоя конкретен случай.
      </p>
    </div>
  )
}
