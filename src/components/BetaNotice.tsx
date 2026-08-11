import { FlaskConical } from "lucide-react"

export function BetaNotice() {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 py-3 text-sm text-blue-800 dark:text-blue-300">
      <FlaskConical className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p>
        <span className="font-medium">Бета версия.</span> Проектът е в ранна фаза на разработка и се подобрява с обратна връзка от потребители. Всички функции са напълно безплатни.
      </p>
    </div>
  )
}
