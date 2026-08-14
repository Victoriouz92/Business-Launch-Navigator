import Link from "next/link"
import { SupportProject } from "@/components/SupportProject"

export const metadata = {
  title: "Подкрепете проекта — Business Launch Navigator",
}

export default function SupportPage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="text-sm text-slate-500 dark:text-slate-400 hover:underline"
        >
          ← Начало
        </Link>
        <div className="mt-4">
          <SupportProject variant="full" />
        </div>
      </div>
    </main>
  )
}
