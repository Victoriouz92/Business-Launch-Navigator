import Link from "next/link"
import {
  TrendingUp,
  ListChecks,
  Lightbulb,
  Wrench,
  BookOpen,
  Info,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import type { ArticleBlock } from "@/data/knowledge"

const HEADING_ICONS: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  "list-checks": ListChecks,
  lightbulb: Lightbulb,
  wrench: Wrench,
}

/** Renders **bold** segments inside inline text as <strong>. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const Icon = (block.icon && HEADING_ICONS[block.icon]) || BookOpen
            return (
              <h2
                key={i}
                className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white pt-2"
              >
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                {block.text}
              </h2>
            )
          }

          case "paragraph":
            return (
              <p key={i} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <Inline text={block.text} />
              </p>
            )

          case "flow":
            return (
              <div key={i} className="flex flex-wrap items-center gap-2">
                {block.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1.5">
                      {j + 1}. {item}
                    </span>
                    {j < block.items.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )

          case "steps":
            return (
              <ol key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3"
                  >
                    {block.numbered !== false && (
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                        {j + 1}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <div className="mt-1 space-y-1">
                        {item.description.split("\n").map((line, k) => (
                          <p key={k} className="text-sm text-slate-600 dark:text-slate-300">
                            <Inline text={line} />
                          </p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {block.rows.map((row, j) => {
                      const isTotal = row[0]?.toUpperCase().startsWith("ОБЩО")
                      return (
                        <tr key={j} className={isTotal ? "bg-blue-50/50 dark:bg-blue-950/20" : undefined}>
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className={`px-4 py-2.5 whitespace-nowrap ${
                                isTotal
                                  ? "font-bold text-blue-700 dark:text-blue-300"
                                  : k === 0
                                    ? "text-slate-700 dark:text-slate-300"
                                    : "text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )

          case "callout":
            return (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4"
              >
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-800 dark:text-amber-300">{block.text}</p>
              </div>
            )

          case "cta":
            return (
              <div
                key={i}
                className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-6 text-center"
              >
                <p className="text-base font-bold text-blue-900 dark:text-blue-100">{block.title}</p>
                <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">{block.text}</p>
                <Link
                  href={block.href}
                  className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {block.buttonLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
