import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getOrCreateDefaultProject } from "@/lib/project"

/**
 * GET /api/budget
 * Returns the current user's planned budget (EUR), if any.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  const project = await getOrCreateDefaultProject(session.user.id)

  return NextResponse.json({ budgetEUR: project.budgetEUR })
}

/**
 * POST /api/budget
 * Saves the current user's planned budget (EUR).
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  try {
    const { budgetEUR } = await request.json()
    if (typeof budgetEUR !== "number" || isNaN(budgetEUR) || budgetEUR < 0) {
      return NextResponse.json({ error: "Невалидна стойност за бюджет." }, { status: 400 })
    }

    const project = await getOrCreateDefaultProject(session.user.id)
    await db.project.update({
      where: { id: project.id },
      data: { budgetEUR },
    })

    return NextResponse.json({ budgetEUR })
  } catch (error) {
    console.error("Save budget error:", error)
    return NextResponse.json({ error: "Грешка при запис. Опитайте отново." }, { status: 500 })
  }
}
