import {
  FileSignature,
  Scale,
  PiggyBank,
  FileText,
  Gavel,
  Landmark,
  Banknote,
  Tag,
  Receipt,
  ListChecks,
  PauseCircle,
  Globe,
  CreditCard,
  Percent,
  Calculator,
  Store,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Wrench,
  BarChart3,
  Clock,
  ShoppingCart,
  Search,
  Users,
  HelpCircle,
} from "lucide-react"

/** Hero-banner icons for Наръчници (knowledge) articles. Key must match Article.heroIcon. */
export const ARTICLE_ICONS = {
  registration: FileSignature,
  comparison: Scale,
  capital: PiggyBank,
  documents: FileText,
  lawyer: Gavel,
  registry: Landmark,
  bank: Banknote,
  naming: Tag,
  taxes: Receipt,
  checklist: ListChecks,
  dormant: PauseCircle,
  "invoice-abroad": Globe,
  pos: CreditCard,
  vat: Percent,
  accounting: Calculator,
  patent: Store,
  "annual-close": ClipboardCheck,
  insurance: ShieldCheck,
}

export type ArticleIconKey = keyof typeof ARTICLE_ICONS

/** Icons for `heading` blocks inside article/step content. Key must match ArticleBlock's heading `icon`. */
export const HEADING_ICONS = {
  "trending-up": TrendingUp,
  "list-checks": ListChecks,
  lightbulb: Lightbulb,
  wrench: Wrench,
  scale: Scale,
  "piggy-bank": PiggyBank,
  "file-text": FileText,
  "bar-chart": BarChart3,
  landmark: Landmark,
  "credit-card": CreditCard,
  clock: Clock,
  banknote: Banknote,
  tag: Tag,
  globe: Globe,
  "shopping-cart": ShoppingCart,
  search: Search,
  users: Users,
  question: HelpCircle,
}

export type HeadingIconKey = keyof typeof HEADING_ICONS

export const ARTICLE_TONES = {
  blue: "from-blue-500 to-blue-700",
  emerald: "from-emerald-500 to-teal-700",
  violet: "from-violet-500 to-purple-700",
  amber: "from-amber-500 to-orange-700",
  red: "from-red-500 to-rose-700",
  teal: "from-teal-500 to-cyan-700",
  indigo: "from-indigo-500 to-blue-700",
} as const

export type ArticleTone = keyof typeof ARTICLE_TONES
