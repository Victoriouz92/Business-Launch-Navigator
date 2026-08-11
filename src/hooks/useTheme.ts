"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "bln-theme"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Read from localStorage or system preference
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "dark" || stored === "light") {
      setTheme(stored)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, loaded])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  return { theme, toggle, loaded }
}
