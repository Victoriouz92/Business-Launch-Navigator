"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/Logo"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<PageShell />}>
      <ResetPasswordForm />
    </Suspense>
  )
}

function PageShell({ children }: { children?: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">
            Нова парола
          </h1>
        </div>
        {children}
      </div>
    </main>
  )
}

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Паролите не съвпадат.")
      return
    }

    setStatus("sending")
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Грешка. Опитайте отново.")
        setStatus("error")
      } else {
        setStatus("done")
        setTimeout(() => router.push("/login"), 2000)
      }
    } catch {
      setError("Грешка при свързване със сървъра.")
      setStatus("error")
    }
  }

  if (!token) {
    return (
      <PageShell>
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Липсва или невалиден линк за смяна на паролата.
          </p>
          <Link href="/forgot-password" className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Заяви нов линк
          </Link>
        </div>
      </PageShell>
    )
  }

  if (status === "done") {
    return (
      <PageShell>
        <p className="text-sm text-center text-green-700 dark:text-green-400">
          Паролата е сменена успешно. Пренасочваме те към вход...
        </p>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Нова парола (мин. 8 символа, буква + число)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            maxLength={128}
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Потвърди парола
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {status === "sending" ? "Запазване..." : "Смени паролата"}
        </button>
      </form>
    </PageShell>
  )
}
