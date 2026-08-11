"use client"

import { useTheme } from "@/hooks/useTheme"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggle, loaded } = useTheme()

  if (!loaded) return null

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-label={theme === "dark" ? "Превключи на светла тема" : "Превключи на тъмна тема"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  )
}
