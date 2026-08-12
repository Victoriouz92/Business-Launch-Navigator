import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, ListChecks } from "lucide-react"
import { getArticleBySlug, getAllArticleSlugs } from "@/data/knowledge"
import { STEPS, CATEGORIES } from "@/data/roadmap"
import { ArticleBlocks } from "@/components/ArticleBlocks"
import { ArticleHero } from "@/components/ArticleHero"
import { Logo } from "@/components/Logo"
import { Footer } from "@/components/Footer"
import { InsuranceCalculator } from "@/components/InsuranceCalculator"
import { VatChecker } from "@/components/VatChecker"

/** Article slugs that embed one of the interactive calculators after the article body. */
const ARTICLE_CALCULATORS: Record<string, "insurance" | "vat"> = {
  "minimalen-osiguritelen-dohod-sol": "insurance",
  "eood-danatsi-i-osigurovki": "insurance",
  "dds-registracia-prag-vod-vop": "vat",
  "fakturirane-chujdbina-dds-eood": "vat",
}

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: `${article.title} — Business Launch Navigator`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedDate,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return notFound()

  const relatedSteps = STEPS.filter((s) => s.relatedArticles?.includes(article.slug))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate ?? article.publishedDate,
    author: { "@type": "Organization", name: "VV Labs" },
    publisher: { "@type": "Organization", name: "VV Labs" },
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/guides"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Обратно към наръчниците"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-bold text-slate-900 dark:text-white">Business Launch Navigator</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          <Link href="/guides" className="hover:underline">Наръчници</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-500 dark:text-slate-400">{article.title}</span>
        </nav>

        <article>
          <ArticleHero icon={article.heroIcon} tone={article.heroTone} />

          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.publishedDate}>Публикувано: {article.publishedDate}</time>
            {article.updatedDate && (
              <span>· Обновено: {article.updatedDate}</span>
            )}
          </div>

          <div className="mt-6">
            <ArticleBlocks blocks={article.blocks} />
          </div>

          {ARTICLE_CALCULATORS[article.slug] === "insurance" && (
            <div className="mt-6">
              <InsuranceCalculator />
            </div>
          )}
          {ARTICLE_CALCULATORS[article.slug] === "vat" && (
            <div className="mt-6">
              <VatChecker />
            </div>
          )}

          {relatedSteps.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                Свързани стъпки от чеклиста
              </h3>
              <ul className="space-y-2 mt-3">
                {relatedSteps.map((step) => {
                  const category = CATEGORIES.find((c) => c.id === step.categoryId)
                  return (
                    <li key={step.id}>
                      <Link
                        href={`/step/${step.id}`}
                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <ListChecks className="w-3.5 h-3.5 flex-shrink-0" />
                        {category?.label ? `${category.label}: ` : ""}
                        {step.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
