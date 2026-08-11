"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/Logo"
import { useBusinessType } from "@/hooks/useBusinessType"
import type { BusinessType } from "@/data/roadmap"

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string; description: string }[] = [
  { value: "online", label: "Онлайн бизнес", description: "Продаваш продукт/услуга през сайт, без физически обект" },
  { value: "offline", label: "Физически (офлайн) бизнес", description: "Работиш от физически обект, без онлайн продажби" },
  { value: "mixed", label: "Смесен", description: "Комбинация от онлайн и офлайн" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setBusinessType } = useBusinessType()
  const [type, setType] = useState<BusinessType | null>(null)
  const [vatExpect, setVatExpect] = useState<"yes" | "no" | "unsure" | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!type) return

    setBusinessType(type)
    try {
      if (vatExpect) localStorage.setItem("bln-vat-expect", vatExpect)
    } catch {
      // Ignore write errors
    }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">
            Няколко въпроса
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            За да персонализираме чеклиста ти
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Какъв тип бизнес планираш?
            </legend>
            <div className="space-y-2">
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                    type === opt.value
                      ? "border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="businessType"
                    value={opt.value}
                    checked={type === opt.value}
                    onChange={() => setType(opt.value)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {opt.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Очакваш ли годишен оборот над €51,130 (прага за задължителна регистрация по ДДС) през първата година?
            </legend>
            <div className="flex gap-2">
              {[
                { value: "yes" as const, label: "Да" },
                { value: "no" as const, label: "Не" },
                { value: "unsure" as const, label: "Не знам" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVatExpect(opt.value)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    vatExpect === opt.value
                      ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!type}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Покажи ми чеклиста
          </button>
        </form>
      </div>
    </div>
  )
}
