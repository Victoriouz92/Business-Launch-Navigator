import Link from "next/link"
import { SupportProject } from "@/components/SupportProject"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 mt-12 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SupportProject variant="compact" />
          <ContactTeaser />
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Developed by VV Labs EOOD
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500 space-y-1">
            <p className="font-medium">Източници и актуалност:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Данните за такси и осигуровки са актуални към 2026 г.</li>
              <li>Информацията е образователна и не представлява правен съвет.</li>
              <li>
                Източници: Търговски регистър (portal.registryagency.bg), НАП (nap.bg), МТСП (mlsp.government.bg)
              </li>
              <li>Последна проверка: август 2026</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

function ContactTeaser() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        Имате ли въпрос?
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Ако се нуждаете от разяснение или искате да споделите обратна връзка, пишете ни.
      </p>
      <Link
        href="/contact"
        className="inline-block mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        Свържете се с нас →
      </Link>
    </div>
  )
}
