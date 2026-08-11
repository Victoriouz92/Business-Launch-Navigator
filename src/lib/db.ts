import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

// Driver adapter for Neon Postgres (required in Prisma 7)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

// Prisma singleton — prevents multiple connections in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
