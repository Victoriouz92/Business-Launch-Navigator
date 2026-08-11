// Types and aggregation for the public knowledge layer (Наръчници).
// Mirrors the pattern used by roadmap.ts / data/steps — one file per
// article under src/data/knowledge/, aggregated here.

export type ArticleBlock =
  | { type: "heading"; text: string; icon?: string }
  | { type: "paragraph"; text: string }
  | { type: "flow"; items: string[] }
  | {
      type: "steps"
      numbered?: boolean
      items: { title: string; description: string }[]
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; text: string; tone?: "info" | "tip" | "warning" }
  | { type: "cta"; title: string; text: string; buttonLabel: string; href: string }

export interface Article {
  slug: string
  title: string
  metaDescription: string
  /** ISO date (YYYY-MM-DD) */
  publishedDate: string
  updatedDate?: string
  blocks: ArticleBlock[]
}

import { kakSeRegistriraEood } from "./knowledge/kak-se-registrira-eood"

export const ARTICLES: Article[] = [kakSeRegistriraEood]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
