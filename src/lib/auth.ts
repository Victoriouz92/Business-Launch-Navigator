import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

/**
 * NextAuth configuration for Business Launch Navigator.
 * Uses email/password credentials provider with SQLite DB.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Парола", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        if (!email || !password) return null

        // Find user in DB
        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user) return null

        // Check account lockout
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          return null // Account locked
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash)

        if (!isValid) {
          // Increment failed login count
          const newCount = user.failedLoginCount + 1
          await db.user.update({
            where: { id: user.id },
            data: {
              failedLoginCount: newCount,
              lockedUntil: newCount >= 5
                ? new Date(Date.now() + 15 * 60 * 1000) // Lock 15 min
                : null,
            },
          })
          return null
        }

        // Reset failed count on success
        if (user.failedLoginCount > 0) {
          await db.user.update({
            where: { id: user.id },
            data: { failedLoginCount: 0, lockedUntil: null },
          })
        }

        return { id: user.id, email: user.email }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
