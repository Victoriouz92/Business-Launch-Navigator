"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"

const STORAGE_KEY = "bln-progress"

/**
 * Hook for managing step completion progress.
 * Signed-in users get it synced to the database (scoped to their project).
 * Everyone else gets a localStorage-only version, so the checklist works
 * without an account — logging in is only needed to sync across devices.
 */
export function useProgress() {
  const { status } = useSession()
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (status !== "authenticated") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) setCompletedStepIds(JSON.parse(stored))
      } catch {
        // Ignore parse errors
      }
      setLoaded(true)
      return
    }

    let cancelled = false

    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : { completedStepIds: [] }))
      .then((data) => {
        if (!cancelled) setCompletedStepIds(data.completedStepIds ?? [])
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [status])

  // toggleStep is awaited by callers that navigate right after (e.g. the
  // "Complete" button), so the write must finish before we return — an
  // effect-based localStorage write or a fire-and-forget fetch can lose the
  // change if the page navigates away before it runs.
  const toggleStep = useCallback(
    async (stepId: string) => {
      const willComplete = !completedStepIds.includes(stepId)
      const nextIds = willComplete
        ? [...completedStepIds, stepId]
        : completedStepIds.filter((id) => id !== stepId)

      setCompletedStepIds(nextIds)

      if (status !== "authenticated") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds))
        } catch {
          // Ignore write errors
        }
        return
      }

      try {
        await fetch("/api/progress/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stepId }),
        })
      } catch {
        // Revert the optimistic update if the request fails
        setCompletedStepIds(completedStepIds)
      }
    },
    [status, completedStepIds]
  )

  const isCompleted = useCallback(
    (stepId: string) => completedStepIds.includes(stepId),
    [completedStepIds]
  )

  return { completedStepIds, toggleStep, isCompleted, loaded }
}
