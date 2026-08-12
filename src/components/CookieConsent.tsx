"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { COOKIE_CONSENT_KEY, type CookieConsentValue } from "@/lib/cookieConsent"

/**
 * Loads Google Analytics only after the visitor accepts cookies, and shows
 * the consent banner until a choice is made. GA4 must not fire before
 * consent — this component is the single gate for that.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (stored === "accepted" || stored === "declined") setConsent(stored)
    } catch {
      // Ignore read errors
    }
    setLoaded(true)
  }, [])

  function choose(value: CookieConsentValue) {
    setConsent(value)
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value)
    } catch {
      // Ignore write errors
    }
  }

  return (
    <>
      {gaId && consent === "accepted" && <GoogleAnalytics gaId={gaId} />}

      {loaded && consent === null && (
        <div
          role="dialog"
          aria-label="Съгласие за бисквитки"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg"
        >
          <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <Cookie className="hidden sm:block w-5 h-5 text-slate-400 flex-shrink-0" />
            <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">
              Използваме бисквитки за анализ на посещенията (Google Analytics), само след твоето съгласие. Прочети{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Политиката за поверителност
              </Link>
              .
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => choose("declined")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Отказвам
              </button>
              <button
                onClick={() => choose("accepted")}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Приемам
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
