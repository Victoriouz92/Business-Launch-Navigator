"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"

/**
 * Hook for managing step completion progress.
 * Persists to the database, scoped to the signed-in user's project.
 */
export function useProgress() {
  const { status } = useSession()
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (status !== "authenticated") return
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

  const toggleStep = useCallback((stepId: string) => {
    setCompletedStepIds((prev) => {
      const willComplete = !prev.includes(stepId)
      return willComplete ? [...prev, stepId] : prev.filter((id) => id !== stepId)
    })

    fetch("/api/progress/step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepId }),
    }).catch(() => {
      // Revert the optimistic update if the request fails
      setCompletedStepIds((cur) =>
        cur.includes(stepId) ? cur.filter((id) => id !== stepId) : [...cur, stepId]
      )
    })
  }, [])

  const isCompleted = useCallback(
    (stepId: string) => completedStepIds.includes(stepId),
    [completedStepIds]
  )

  return { completedStepIds, toggleStep, isCompleted, loaded }
}
