import { ARTICLE_ICONS, ARTICLE_TONES, type ArticleIconKey, type ArticleTone } from "@/lib/articleIcons"

export function ArticleHero({
  icon,
  tone = "blue",
  compact = false,
}: {
  icon: ArticleIconKey
  tone?: ArticleTone
  compact?: boolean
}) {
  const Icon = ARTICLE_ICONS[icon] ?? ARTICLE_ICONS.documents

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${ARTICLE_TONES[tone]} flex items-center justify-center flex-shrink-0 ${
        compact ? "h-24 w-24 sm:h-28 sm:w-28" : "h-40 sm:h-52 w-full"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.18), transparent 55%)",
        }}
      />
      <Icon
        className={compact ? "w-9 h-9 text-white/90" : "w-14 h-14 sm:w-16 sm:h-16 text-white/90"}
        strokeWidth={1.5}
      />
    </div>
  )
}
