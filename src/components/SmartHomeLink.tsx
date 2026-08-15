"use client"

import Link from "next/link"
import { useBusinessType } from "@/hooks/useBusinessType"

/**
 * A "go home" link that's actually useful once you've onboarded — goes to
 * /dashboard instead of the marketing "/" landing page, so clicking the
 * logo or a back-arrow doesn't dump an existing user back at "Продължи
 * към таблото" when they're already past that.
 */
export function SmartHomeLink({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}) {
  const { businessType, loaded } = useBusinessType()
  const href = loaded && businessType !== null ? "/dashboard" : "/"

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
