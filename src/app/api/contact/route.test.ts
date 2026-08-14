import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { POST } from "./route"

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))
vi.mock("resend", () => ({
  // A regular `function` (not an arrow) so it's usable as a constructor —
  // the route calls `new Resend(apiKey)`.
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } }
  }),
}))

function postRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

describe("/api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Ensure a clean slate — tests below opt in to configured env explicitly.
    vi.stubEnv("RESEND_API_KEY", "")
    vi.stubEnv("CONTACT_TO_EMAIL", "")
    vi.stubEnv("RESEND_FROM_EMAIL", "")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("rejects a missing/invalid email", async () => {
    const res = await POST(postRequest({ email: "not-an-email", message: "Валидно съобщение с достатъчно дължина." }))
    expect(res.status).toBe(400)
  })

  it("rejects a too-short message", async () => {
    const res = await POST(postRequest({ email: "test@example.com", message: "късо" }))
    expect(res.status).toBe(400)
  })

  it("returns 503 when Resend env vars are not configured", async () => {
    const res = await POST(
      postRequest({ email: "test@example.com", message: "Валидно съобщение с достатъчно дължина." })
    )
    expect(res.status).toBe(503)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it("sends the email and returns 200 when fully configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key")
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com")
    vi.stubEnv("RESEND_FROM_EMAIL", "noreply@example.com")
    sendMock.mockResolvedValue({ id: "email_123" })

    const res = await POST(
      postRequest({ email: "visitor@example.com", message: "Валидно съобщение с достатъчно дължина." })
    )

    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "noreply@example.com",
        to: "owner@example.com",
        replyTo: "visitor@example.com",
      })
    )
  })
})
