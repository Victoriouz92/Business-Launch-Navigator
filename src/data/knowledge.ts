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
  /** Key into ARTICLE_ICONS (src/lib/articleIcons.ts) for the hero banner */
  heroIcon: string
  /** Key into ARTICLE_TONES (src/lib/articleIcons.ts) for the hero banner color */
  heroTone?: "blue" | "emerald" | "violet" | "amber" | "red" | "teal" | "indigo"
  blocks: ArticleBlock[]
}

import { kakSeRegistriraEood } from "./knowledge/kak-se-registrira-eood"
import { eoodIliOod } from "./knowledge/eood-ili-ood"
import { minimalenKapitalEood } from "./knowledge/minimalen-kapital-eood"
import { neobhodimiDokumentiZaEood } from "./knowledge/neobhodimi-dokumenti-za-eood"
import { samostoyatelnaRegistraciaVsAdvokat } from "./knowledge/samostoyatelna-registracia-vs-advokat"
import { targovskiRegistarTaksiIPodavane } from "./knowledge/targovski-registar-taksi-i-podavane"
import { nabiratelnaSmetkaEood } from "./knowledge/nabiratelna-smetka-eood"
import { kodKidIImeNaFirma } from "./knowledge/kod-kid-i-ime-na-fima"
import { eoodDanatsiIOsigurovki } from "./knowledge/eood-danatsi-i-osigurovki"
import { stapkiSledRegistraciaEood } from "./knowledge/stapki-sled-registracia-eood"
import { firmaBezDeynostZadaljenia } from "./knowledge/firma-bez-deynost-zadaljenia"
import { fakturiraneChujdbinaDdsEood } from "./knowledge/fakturirane-chujdbina-dds-eood"
import { kasovAparatVsPochtenskiPrevod } from "./knowledge/kasov-aparat-vs-pochtenski-prevod"

export const ARTICLES: Article[] = [
  kakSeRegistriraEood,
  eoodIliOod,
  minimalenKapitalEood,
  neobhodimiDokumentiZaEood,
  samostoyatelnaRegistraciaVsAdvokat,
  targovskiRegistarTaksiIPodavane,
  nabiratelnaSmetkaEood,
  kodKidIImeNaFirma,
  eoodDanatsiIOsigurovki,
  stapkiSledRegistraciaEood,
  firmaBezDeynostZadaljenia,
  fakturiraneChujdbinaDdsEood,
  kasovAparatVsPochtenskiPrevod,
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
