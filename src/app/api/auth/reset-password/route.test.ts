import { describe, it, expect, vi, beforeEach } from "vitest"
import crypto from "crypto"
import { POST } from "./route"

const { dbMock } = vi.hoisted(() => ({
  dbMock: {
    user: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}))
vi.mock("@/lib/db", () => ({ db: dbMock }))

function postRequest(body: unknown) {
  return new Request("http://localhost/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

describe("/api/auth/reset-password", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("rejects a missing token", async () => {
    const res = await POST(postRequest({ password: "newpass123" }))
    expect(res.status).toBe(400)
  })

  it("rejects a weak password", async () => {
    const res = await POST(postRequest({ token: "abc", password: "short" }))
    expect(res.status).toBe(400)
    expect(dbMock.user.findFirst).not.toHaveBeenCalled()
  })

  it("rejects an expired or unknown token", async () => {
    dbMock.user.findFirst.mockResolvedValue(null)
    const res = await POST(postRequest({ token: "does-not-exist", password: "newpass123" }))
    expect(res.status).toBe(400)
    expect(dbMock.user.update).not.toHaveBeenCalled()
  })

  it("looks up the user by the SHA-256 hash of the raw token, not the raw token itself", async () => {
    const rawToken = "raw-token-value"
    const expectedHash = crypto.createHash("sha256").update(rawToken).digest("hex")
    dbMock.user.findFirst.mockResolvedValue(null)

    await POST(postRequest({ token: rawToken, password: "newpass123" }))

    const whereArg = dbMock.user.findFirst.mock.calls[0][0].where
    expect(whereArg.resetToken).toBe(expectedHash)
    expect(whereArg.resetToken).not.toBe(rawToken)
  })

  it("resets the password and clears reset/lockout fields on success", async () => {
    dbMock.user.findFirst.mockResolvedValue({ id: "u1" })
    dbMock.user.update.mockResolvedValue({})

    const res = await POST(postRequest({ token: "valid-token", password: "newpass123" }))
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.message).toMatch(/успешно/)

    const updateArgs = dbMock.user.update.mock.calls[0][0]
    expect(updateArgs.where).toEqual({ id: "u1" })
    expect(updateArgs.data.resetToken).toBeNull()
    expect(updateArgs.data.resetExpiry).toBeNull()
    expect(updateArgs.data.failedLoginCount).toBe(0)
    expect(updateArgs.data.lockedUntil).toBeNull()
    expect(typeof updateArgs.data.passwordHash).toBe("string")
    expect(updateArgs.data.passwordHash).not.toBe("newpass123")
  })
})
