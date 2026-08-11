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
  type LucideIcon,
} from "lucide-react"

export const ARTICLE_ICONS: Record<string, LucideIcon> = {
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
}

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
