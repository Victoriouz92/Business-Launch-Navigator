import { describe, it, expect, vi, beforeEach } from "vitest"
import { GET, POST } from "./route"

const { authMock, dbMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  dbMock: {
    project: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}))
vi.mock("@/lib/auth", () => ({ auth: authMock }))
vi.mock("@/lib/db", () => ({ db: dbMock }))

function postRequest(body: unknown) {
  return new Request("http://localhost/api/budget", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

describe("/api/budget", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("GET", () => {
    it("returns 401 when not authenticated", async () => {
      authMock.mockResolvedValue(null)
      const res = await GET()
      expect(res.status).toBe(401)
    })

    it("returns the existing project's budgetEUR", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue({ id: "p1", budgetEUR: 500 })
      const res = await GET()
      const body = await res.json()
      expect(res.status).toBe(200)
      expect(body.budgetEUR).toBe(500)
    })
  })

  describe("POST", () => {
    it("returns 401 when not authenticated", async () => {
      authMock.mockResolvedValue(null)
      const res = await POST(postRequest({ budgetEUR: 500 }))
      expect(res.status).toBe(401)
    })

    it.each([
      ["a string", "500"],
      ["NaN", NaN],
      ["a negative number", -10],
    ])("rejects %s as budgetEUR", async (_label, value) => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      const res = await POST(postRequest({ budgetEUR: value }))
      expect(res.status).toBe(400)
      expect(dbMock.project.update).not.toHaveBeenCalled()
    })

    it("accepts 0 as a valid budget", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue({ id: "p1" })
      dbMock.project.update.mockResolvedValue({})
      const res = await POST(postRequest({ budgetEUR: 0 }))
      expect(res.status).toBe(200)
    })

    it("saves a valid budget", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue({ id: "p1" })
      dbMock.project.update.mockResolvedValue({})
      const res = await POST(postRequest({ budgetEUR: 750 }))
      const body = await res.json()
      expect(res.status).toBe(200)
      expect(body.budgetEUR).toBe(750)
      expect(dbMock.project.update).toHaveBeenCalledWith({
        where: { id: "p1" },
        data: { budgetEUR: 750 },
      })
    })
  })
})
