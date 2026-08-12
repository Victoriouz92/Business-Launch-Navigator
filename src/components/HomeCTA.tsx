"use client"

import Link from "next/link"
import { useBusinessType } from "@/hooks/useBusinessType"

export function HomeCTA() {
  const { businessType, loaded } = useBusinessType()

  const alreadyOnboarded = loaded && businessType !== null
  const href = alreadyOnboarded ? "/dashboard" : "/onboarding"
  const label = alreadyOnboarded ? "Продължи към таблото" : "Старт"

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-white font-semibold text-lg hover:bg-blue-700 transition-colors"
    >
      {label}
    </Link>
  )
}
