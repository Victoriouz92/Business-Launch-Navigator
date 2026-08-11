import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

/**
 * Redirects unauthenticated visitors away from account-only pages.
 * Named `proxy.ts` per Next.js 16's rename of `middleware.ts`.
 */
export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/expenses/:path*",
    "/step/:path*",
    "/settings/:path*",
  ],
}
