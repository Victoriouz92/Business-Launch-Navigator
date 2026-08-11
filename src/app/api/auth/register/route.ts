import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

/**
 * POST /api/auth/register
 * Creates a new user account in the SQLite database.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate email
    if (!email || !email.includes("@") || email.length > 320) {
      return NextResponse.json(
        { error: "Невалиден имейл адрес." },
        { status: 400 }
      )
    }

    // Validate password
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

    // Check duplicate email
    const existing = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Този имейл вече е регистриран." },
        { status: 409 }
      )
    }

    // Hash password (bcrypt cost 12)
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
      },
    })

    return NextResponse.json(
      { message: "Акаунтът е създаден успешно.", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "Грешка при регистрация. Опитайте отново." },
      { status: 500 }
    )
  }
}
