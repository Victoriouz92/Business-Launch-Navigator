import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { POST } from "./route"

const { sendMock, dbMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  dbMock: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))
vi.mock("@/lib/db", () => ({ db: dbMock }))
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } }
  }),
}))

function postRequest(body: unknown) {
  return new Request("http://localhost/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

describe("/api/auth/forgot-password", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("RESEND_API_KEY", "re_test_key")
    vi.stubEnv("RESEND_FROM_EMAIL", "noreply@example.com")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("rejects an invalid email", async () => {
    const res = await POST(postRequest({ email: "not-an-email" }))
    expect(res.status).toBe(400)
  })

  it("returns the generic message even when the account does not exist (no enumeration)", async () => {
    dbMock.user.findUnique.mockResolvedValue(null)
    const res = await POST(postRequest({ email: "nobody@example.com" }))
    const body = await res.json()
    expect(res.status).toBe(200)
    expect(body.message).toMatch(/Ако този имейл/)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it("stores a hashed token and emails a reset link for an existing account", async () => {
    dbMock.user.findUnique.mockResolvedValue({ id: "u1", email: "real@example.com" })
    sendMock.mockResolvedValue({ id: "email_1" })

    const res = await POST(postRequest({ email: "real@example.com" }))
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.message).toMatch(/Ако този имейл/)

    expect(dbMock.user.update).toHaveBeenCalledTimes(1)
    const updateArgs = dbMock.user.update.mock.calls[0][0]
    expect(updateArgs.where).toEqual({ id: "u1" })
    expect(updateArgs.data.resetToken).toMatch(/^[a-f0-9]{64}$/) // sha256 hex digest
    expect(updateArgs.data.resetExpiry).toBeInstanceOf(Date)

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: "real@example.com" })
    )
    const emailBody = sendMock.mock.calls[0][0].text as string
    expect(emailBody).toMatch(/reset-password\?token=[a-f0-9]{64}/)
  })

  it("falls back to logging the link when Resend is not configured (dev)", async () => {
    vi.stubEnv("RESEND_API_KEY", "")
    dbMock.user.findUnique.mockResolvedValue({ id: "u1", email: "real@example.com" })
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    const res = await POST(postRequest({ email: "real@example.com" }))

    expect(res.status).toBe(200)
    expect(sendMock).not.toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("reset-password?token="))
    consoleSpy.mockRestore()
  })
})
