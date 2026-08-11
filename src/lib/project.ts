import { db } from "@/lib/db"

/**
 * Returns the user's default project, creating one on first use.
 * The app currently tracks a single business per account, so there's
 * always exactly one project per user.
 */
export async function getOrCreateDefaultProject(userId: string) {
  const existing = await db.project.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
  })
  if (existing) return existing

  return db.project.create({
    data: {
      userId,
      name: "Моят бизнес",
      businessType: "EOOD",
    },
  })
}
