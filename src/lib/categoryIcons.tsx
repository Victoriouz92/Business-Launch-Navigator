import {
  Lightbulb,
  ClipboardList,
  Scale,
  CreditCard,
  Globe,
  Settings,
  Megaphone,
  Bot,
  Handshake,
  Rocket,
  type LucideIcon,
} from "lucide-react"
import { CategoryId } from "@/data/roadmap"

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  IDEA: Lightbulb,
  PLANNING: ClipboardList,
  LEGAL: Scale,
  PAYMENTS: CreditCard,
  WEBSITE: Globe,
  TECHNICAL: Settings,
  MARKETING: Megaphone,
  AI: Bot,
  SALES: Handshake,
  LAUNCH: Rocket,
}

export function CategoryIconBadge({
  categoryId,
  className = "w-9 h-9",
  iconClassName = "w-[55%] h-[55%]",
}: {
  categoryId: CategoryId
  className?: string
  iconClassName?: string
}) {
  const Icon = CATEGORY_ICONS[categoryId]
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 ${className}`}
    >
      <Icon className={iconClassName} />
    </span>
  )
}
