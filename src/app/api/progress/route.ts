import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getOrCreateDefaultProject } from "@/lib/project"

/**
 * GET /api/progress
 * Returns the completed step ids for the current user's project.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не сте влезли в профила си." }, { status: 401 })
  }

  const project = await getOrCreateDefaultProject(session.user.id)

  const stepProgress = await db.stepProgress.findMany({
    where: { projectId: project.id, completed: true },
    select: { stepId: true },
  })

  return NextResponse.json({
    completedStepIds: stepProgress.map((s) => s.stepId),
  })
}
