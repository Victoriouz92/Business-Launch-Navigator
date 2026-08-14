"use client"

import { useState } from "react"
import Link from "next/link"

export default function ContactPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Съобщението не можа да бъде изпратено.")
        setStatus("error")
      } else {
        setStatus("sent")
      }
    } catch {
      setError("Грешка при свързване със сървъра.")
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-sm text-center">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Съобщението е изпратено
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Ще се свържем с вас възможно най-скоро.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Начало
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Свържете се с нас
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Имате ли въпрос или се нуждаете от разяснение? Пишете ни.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Имейл за връзка
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Съобщение
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={10}
              maxLength={4000}
              rows={5}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none resize-none"
              placeholder="Нуждаете се от разяснение по някоя стъпка или искате да споделите обратна връзка?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {status === "sending" ? "Изпращане..." : "Изпрати"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Начало
          </Link>
        </p>
      </div>
    </main>
  )
}
