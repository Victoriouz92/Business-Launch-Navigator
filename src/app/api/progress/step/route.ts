import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getOrCreateDefaultProject } from "@/lib/project"

/**
 * POST /api/progress/step
 * Toggles a step's completed status for the current user's project.
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  try {
    const { stepId } = await request.json()
    if (!stepId || typeof stepId !== "string") {
      return NextResponse.json({ error: "Липсва stepId." }, { status: 400 })
    }

    const project = await getOrCreateDefaultProject(session.user.id)

    const existing = await db.stepProgress.findUnique({
      where: { projectId_stepId: { projectId: project.id, stepId } },
    })

    const nextCompleted = !existing?.completed

    const updated = await db.stepProgress.upsert({
      where: { projectId_stepId: { projectId: project.id, stepId } },
      update: { completed: nextCompleted, completedAt: nextCompleted ? new Date() : null },
      create: {
        projectId: project.id,
        stepId,
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date() : null,
      },
    })

    return NextResponse.json({ completed: updated.completed })
  } catch (error) {
    console.error("Toggle step progress error:", error)
    return NextResponse.json({ error: "Грешка при запис на прогреса." }, { status: 500 })
  }
}
