import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getOrCreateDefaultProject } from "@/lib/project"

const VALID_TYPES = ["online", "offline", "mixed"]

/**
 * GET /api/business-type
 * Returns the current user's onboarding business-type answer, if any.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  const project = await getOrCreateDefaultProject(session.user.id)

  return NextResponse.json({ onlineOfflineType: project.onlineOfflineType })
}

/**
 * POST /api/business-type
 * Saves the current user's onboarding business-type answer.
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  try {
    const { onlineOfflineType } = await request.json()
    if (!VALID_TYPES.includes(onlineOfflineType)) {
      return NextResponse.json({ error: "Невалиден тип бизнес." }, { status: 400 })
    }

    const project = await getOrCreateDefaultProject(session.user.id)
    await db.project.update({
      where: { id: project.id },
      data: { onlineOfflineType },
    })

    return NextResponse.json({ onlineOfflineType })
  } catch (error) {
    console.error("Save business type error:", error)
    return NextResponse.json({ error: "Грешка при запис. Опитайте отново." }, { status: 500 })
  }
}
