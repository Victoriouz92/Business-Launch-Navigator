"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Copy, Check } from "lucide-react"

const IBAN = process.env.NEXT_PUBLIC_DONATION_IBAN || ""
const HOLDER = process.env.NEXT_PUBLIC_DONATION_HOLDER || ""

export function SupportProject({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [copied, setCopied] = useState(false)

  async function copyIban() {
    if (!IBAN) return
    try {
      await navigator.clipboard.writeText(IBAN)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — user can still select and copy manually
    }
  }

  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 flex items-start gap-3">
        <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Помогнете за бъдещото развитие
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Проектът е и ще остане безплатен. Ако желаете, можете да подкрепите развитието му.
          </p>
          <Link
            href="/support"
            className="inline-block mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Научете повече →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <Heart className="w-6 h-6 text-rose-500" />
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          Подкрепете проекта
        </h1>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Business Launch Navigator е и ще остане напълно безплатен за ползване. Проектът се
        поддържа в свободното време на автора. Ако ви е бил
        полезен и желаете да помогнете за бъдещото му развитие, можете да направите доброволно
        дарение по банковата сметка по-долу.
      </p>

      <div className="mt-5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
        {IBAN ? (
          <>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
              IBAN
            </p>
            <div className="flex items-center justify-between gap-3">
              <code className="text-sm font-mono text-slate-900 dark:text-white break-all">
                {IBAN}
              </code>
              <button
                onClick={copyIban}
                className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Копирано" : "Копирай"}
              </button>
            </div>
            {HOLDER && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Титуляр: {HOLDER}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Банковата сметка за дарения предстои да бъде добавена тук.
          </p>
        )}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        Дарението е напълно доброволно и не отключва допълнителни функции — всичко в
        приложението остава достъпно безплатно за всички потребители.
      </p>
    </div>
  )
}
