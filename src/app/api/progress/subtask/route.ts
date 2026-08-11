import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getOrCreateDefaultProject } from "@/lib/project"

/**
 * GET /api/progress/subtask?stepId=...
 * Returns the checked sub-task indices for one step.
 */
export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const stepId = searchParams.get("stepId")
  if (!stepId) {
    return NextResponse.json({ error: "Липсва stepId." }, { status: 400 })
  }

  const project = await getOrCreateDefaultProject(session.user.id)

  const stepProgress = await db.stepProgress.findUnique({
    where: { projectId_stepId: { projectId: project.id, stepId } },
    include: { subTaskProgress: { where: { completed: true } } },
  })

  return NextResponse.json({
    checked: stepProgress?.subTaskProgress.map((s) => s.subTaskIndex) ?? [],
  })
}

/**
 * POST /api/progress/subtask
 * Toggles a single sub-task's completed status.
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  try {
    const { stepId, subTaskIndex } = await request.json()
    if (!stepId || typeof stepId !== "string" || typeof subTaskIndex !== "number") {
      return NextResponse.json({ error: "Невалидни данни." }, { status: 400 })
    }

    const project = await getOrCreateDefaultProject(session.user.id)

    // A sub-task needs a parent StepProgress row to attach to; checking a
    // sub-task does not mark the whole step as completed.
    const stepProgress = await db.stepProgress.upsert({
      where: { projectId_stepId: { projectId: project.id, stepId } },
      update: {},
      create: { projectId: project.id, stepId, completed: false },
    })

    const existing = await db.subTaskProgress.findUnique({
      where: {
        stepProgressId_subTaskIndex: { stepProgressId: stepProgress.id, subTaskIndex },
      },
    })

    const nextCompleted = !existing?.completed

    const updated = await db.subTaskProgress.upsert({
      where: {
        stepProgressId_subTaskIndex: { stepProgressId: stepProgress.id, subTaskIndex },
      },
      update: { completed: nextCompleted },
      create: { stepProgressId: stepProgress.id, subTaskIndex, completed: nextCompleted },
    })

    return NextResponse.json({ completed: updated.completed })
  } catch (error) {
    console.error("Toggle subtask progress error:", error)
    return NextResponse.json({ error: "Грешка при запис на прогреса." }, { status: 500 })
  }
}
