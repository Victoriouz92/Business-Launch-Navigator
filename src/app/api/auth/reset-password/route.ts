import { NextResponse } from "next/server"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

/**
 * POST /api/auth/reset-password
 * Sets a new password given a valid, unexpired reset token from
 * /api/auth/forgot-password.
 */
export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Липсва или невалиден токен." }, { status: 400 })
    }

    if (!password || password.length < 8 || password.length > 128) {
      return NextResponse.json(
        { error: "Паролата трябва да е между 8 и 128 символа." },
        { status: 400 }
      )
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Паролата трябва да съдържа поне една буква и едно число." },
        { status: 400 }
      )
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")

    const user = await db.user.findFirst({
      where: { resetToken: tokenHash, resetExpiry: { gt: new Date() } },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Линкът е невалиден или е изтекъл. Заяви нов." },
        { status: 400 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetExpiry: null,
        failedLoginCount: 0,
        lockedUntil: null,
      },
    })

    return NextResponse.json({ message: "Паролата е сменена успешно." })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Грешка. Опитайте отново." }, { status: 500 })
  }
}
