"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"])

/**
 * Restores the old browser behavior where Backspace navigates back, for
 * anyone used to it — but only when focus isn't in something editable
 * (otherwise it would eat text input instead of deleting a character).
 */
export function BackspaceNav() {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Backspace") return

      const target = e.target as HTMLElement | null
      if (
        target &&
        (EDITABLE_TAGS.has(target.tagName) || target.isContentEditable)
      ) {
        return
      }

      router.back()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}
