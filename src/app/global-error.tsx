"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="bg">
      <body className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">Нещо се обърка.</h1>
          <p className="mt-2 text-sm text-slate-500">
            Опитай да презаредиш страницата. Ако продължава, пиши ни през страницата за контакт.
          </p>
        </div>
      </body>
    </html>
  )
}
