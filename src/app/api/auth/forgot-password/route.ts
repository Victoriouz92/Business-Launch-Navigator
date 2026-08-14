import { NextResponse } from "next/server"
import crypto from "crypto"
import { Resend } from "resend"
import { db } from "@/lib/db"
import { SITE_URL } from "@/lib/site"

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

/**
 * POST /api/auth/forgot-password
 * Sends a password-reset link if the email belongs to an account.
 * Always responds with the same generic message, whether or not the
 * account exists, to avoid leaking which emails are registered.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@") || email.length > 320) {
      return NextResponse.json({ error: "Невалиден имейл адрес." }, { status: 400 })
    }

    const genericResponse = NextResponse.json({
      message: "Ако този имейл е регистриран, изпратихме линк за смяна на паролата.",
    })

    const user = await db.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) return genericResponse

    const rawToken = crypto.randomBytes(32).toString("hex")
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex")

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: tokenHash,
        resetExpiry: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    })

    const resetUrl = `${SITE_URL}/reset-password?token=${rawToken}`

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    if (!apiKey || !from) {
      // Dev fallback — no email provider configured locally.
      console.log(`[forgot-password] RESEND not configured, reset link: ${resetUrl}`)
      return genericResponse
    }

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to: user.email,
      subject: "Смяна на паролата — Business Launch Navigator",
      text: `Получихме заявка за смяна на паролата за твоя профил.\n\nАко това си бил ти, смени паролата си тук (валидно 1 час):\n${resetUrl}\n\nАко не си заявявал това, просто игнорирай този имейл — паролата ти няма да се промени.`,
    })

    return genericResponse
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Грешка. Опитайте отново." }, { status: 500 })
  }
}
