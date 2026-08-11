import { Rocket } from "lucide-react"

const SIZES = {
  sm: { box: "w-8 h-8 rounded-lg", icon: "w-4 h-4" },
  md: { box: "w-10 h-10 rounded-xl", icon: "w-5 h-5" },
  lg: { box: "w-14 h-14 rounded-2xl", icon: "w-7 h-7" },
}

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { box, icon } = SIZES[size]
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center bg-blue-600 text-white ${box}`}
    >
      <Rocket className={icon} />
    </span>
  )
}
