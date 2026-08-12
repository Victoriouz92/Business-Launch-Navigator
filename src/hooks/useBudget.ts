"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { BUDGET_STORAGE_KEY } from "@/lib/budget"

/**
 * Hook for reading/saving the planned budget (EUR).
 * Signed-in users get it synced to their project; everyone else gets a
 * localStorage-only version, matching useBusinessType's dual-mode approach.
 */
export function useBudget() {
  const { status } = useSession()
  const [budget, setBudgetState] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (status !== "authenticated") {
      try {
        const stored = localStorage.getItem(BUDGET_STORAGE_KEY)
        if (stored) setBudgetState(parseFloat(stored))
      } catch {
        // Ignore read errors
      }
      setLoaded(true)
      return
    }

    let cancelled = false

    fetch("/api/budget")
      .then((res) => (res.ok ? res.json() : { budgetEUR: null }))
      .then((data) => {
        if (!cancelled) setBudgetState(data.budgetEUR ?? null)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [status])

  const setBudget = useCallback(
    (value: number) => {
      setBudgetState(value)

      if (status !== "authenticated") {
        try {
          localStorage.setItem(BUDGET_STORAGE_KEY, String(value))
        } catch {
          // Ignore write errors
        }
        return
      }

      fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budgetEUR: value }),
      }).catch(() => {
        // Best-effort — local state already reflects the choice
      })
    },
    [status]
  )

  return { budget, setBudget, loaded }
}
