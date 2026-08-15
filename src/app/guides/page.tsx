import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Calendar } from "lucide-react"
import { ARTICLES } from "@/data/knowledge"
import { Logo } from "@/components/Logo"
import { ArticleHero } from "@/components/ArticleHero"
import { Footer } from "@/components/Footer"
import { SmartHomeLink } from "@/components/SmartHomeLink"

export const metadata: Metadata = {
  title: "Наръчници — Business Launch Navigator",
  description:
    "Практически наръчници за стартиране и управление на бизнес в България — регистрация на ЕООД, данъци, осигуровки и още.",
}

export default function GuidesPage() {
  const articles = [...ARTICLES].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <SmartHomeLink
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            ariaLabel="Начало"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </SmartHomeLink>
          <SmartHomeLink className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-bold text-slate-900 dark:text-white">Business Launch Navigator</span>
          </SmartHomeLink>
        </div>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Наръчници</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Практически наръчници за стартиране и управление на бизнес в България — с реални цифри и връзки към официалните източници.
        </p>

        <div className="mt-8 space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/guides/${article.slug}`}
              className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <ArticleHero icon={article.heroIcon} tone={article.heroTone} compact />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white">{article.title}</h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {article.metaDescription}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={article.publishedDate}>{article.publishedDate}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
