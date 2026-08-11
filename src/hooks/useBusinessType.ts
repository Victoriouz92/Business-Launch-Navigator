"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import type { BusinessType } from "@/data/roadmap"

const STORAGE_KEY = "bln-business-type"

/**
 * Hook for reading/saving the onboarding business-type answer.
 * Signed-in users get it synced to their project; everyone else gets a
 * localStorage-only version, matching useProgress's dual-mode approach.
 */
export function useBusinessType() {
  const { status } = useSession()
  const [businessType, setBusinessTypeState] = useState<BusinessType | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (status !== "authenticated") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) setBusinessTypeState(stored as BusinessType)
      } catch {
        // Ignore read errors
      }
      setLoaded(true)
      return
    }

    let cancelled = false

    fetch("/api/business-type")
      .then((res) => (res.ok ? res.json() : { onlineOfflineType: null }))
      .then((data) => {
        if (!cancelled) setBusinessTypeState(data.onlineOfflineType ?? null)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [status])

  const setBusinessType = useCallback(
    (type: BusinessType) => {
      setBusinessTypeState(type)

      if (status !== "authenticated") {
        try {
          localStorage.setItem(STORAGE_KEY, type)
        } catch {
          // Ignore write errors
        }
        return
      }

      fetch("/api/business-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onlineOfflineType: type }),
      }).catch(() => {
        // Best-effort — local state already reflects the choice
      })
    },
    [status]
  )

  return { businessType, setBusinessType, loaded }
}
