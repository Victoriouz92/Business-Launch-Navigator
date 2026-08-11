import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

/**
 * POST /api/account/change-password
 * Changes the password of the currently signed-in user.
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!newPassword || newPassword.length < 8 || newPassword.length > 128) {
      return NextResponse.json(
        { error: "Новата парола трябва да е между 8 и 128 символа." },
        { status: 400 }
      )
    }
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Новата парола трябва да съдържа поне една буква и едно число." },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({ where: { id: session.user.id } })
    if (!user) {
      return NextResponse.json({ error: "Потребителят не е намерен." }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword ?? "", user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: "Текущата парола е грешна." }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)
    await db.user.update({ where: { id: user.id }, data: { passwordHash } })

    return NextResponse.json({ message: "Паролата е сменена успешно." }, { status: 200 })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json(
      { error: "Грешка при смяна на паролата. Опитайте отново." },
      { status: 500 }
    )
  }
}
