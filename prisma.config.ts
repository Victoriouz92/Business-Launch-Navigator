import { config } from "dotenv"
import { defineConfig, env } from "prisma/config"

// .env.local is loaded first so it takes precedence over .env,
// matching Next.js's own env-file precedence.
config({ path: ".env.local" })
config({ path: ".env" })

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL") ?? "file:./prisma/dev.db",
  },
})
