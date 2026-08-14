"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Новите пароли не съвпадат.")
      return
    }

    setStatus("saving")
    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Грешка при смяна на паролата.")
        setStatus("error")
      } else {
        setStatus("saved")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch {
      setError("Грешка при свързване със сървъра.")
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Обратно към табло"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Настройки</h1>
        </div>
      </header>

      <main id="main-content" className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
            Акаунт
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Имейл: <span className="font-medium text-slate-900 dark:text-white">{session?.user?.email ?? "…"}</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-4"
        >
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
            Смяна на парола
          </h2>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
          {status === "saved" && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3">
              <p className="text-sm text-green-700 dark:text-green-300">Паролата е сменена успешно.</p>
            </div>
          )}

          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Текуща парола
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Нова парола (мин. 8 символа, буква + число)
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirm-new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Потвърди нова парола
            </label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "saving"}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {status === "saving" ? "Запазване..." : "Смени паролата"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
