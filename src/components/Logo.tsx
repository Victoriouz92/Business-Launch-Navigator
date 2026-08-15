// Compass-rose mark (8-point star), replacing the old rocket-in-a-box icon.
// Source: "Logo redesign exploration.zip" — see that archive's README for
// the full design spec (colors, minimum sizes, do/don't).

const BRAND = "#2563eb" // matches Tailwind's blue-600, used site-wide
const DEEP = "#1e3a8a"

const SIZE_PX: Record<"sm" | "md" | "lg" | "xl", number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 96,
}

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  /** Show the "Е О О Д" ring around the mark. Needs ≥72px (use size="xl") to stay legible. */
  letters?: boolean
  className?: string
}

export function Logo({ size = "md", letters = false, className }: LogoProps) {
  const px = SIZE_PX[size]
  const apex = letters ? 14 : 4
  const w = 32 - (32 - apex) * 0.225
  const minor = apex + (32 - apex) * 0.3
  const mw = 32 - (32 - minor) * 0.25

  function majorSpike(rot: number, light: string) {
    return (
      <g key={rot} transform={`rotate(${rot} 32 32)`}>
        <path d={`M32 ${apex} L32 32 L${w} ${w} Z`} fill={light} />
        <path d={`M32 ${apex} L${64 - w} ${w} L32 32 Z`} fill={DEEP} />
      </g>
    )
  }

  function minorSpike(rot: number) {
    return (
      <g key={`m${rot}`} transform={`rotate(${rot} 32 32)`}>
        <path d={`M32 ${minor} L32 32 L${mw} ${mw} Z`} fill={BRAND} />
        <path d={`M32 ${minor} L${64 - mw} ${mw} L32 32 Z`} fill={DEEP} />
      </g>
    )
  }

  return (
    <svg
      viewBox={letters ? "-9 -10 82 84" : "0 0 64 64"}
      width={px}
      height={px}
      className={`text-[#201e1d] dark:text-white ${className ?? ""}`}
      role="img"
      aria-label="Business Launch Navigator — Пътеводител за ЕООД"
    >
      {letters && (
        <>
          <circle cx="32" cy="32" r="22" fill="none" stroke={DEEP} strokeWidth="2" strokeDasharray="1.3 4.46" />
          <g
            fill="currentColor"
            style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
            fontSize="6.2"
            fontWeight="600"
            textAnchor="middle"
          >
            <text x="32" y="6.6">Е</text>
            <text x="60" y="34.2">О</text>
            <text x="32" y="62.4">Д</text>
            <text x="4" y="34.2">О</text>
          </g>
        </>
      )}
      {[45, 135, 225, 315].map(minorSpike)}
      {majorSpike(0, BRAND)}
      {[90, 180, 270].map((r) => majorSpike(r, "currentColor"))}
    </svg>
  )
}
