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
  return new Request("http://localhost/api/business-type", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

describe("/api/business-type", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("GET", () => {
    it("returns 401 when not authenticated", async () => {
      authMock.mockResolvedValue(null)
      const res = await GET()
      expect(res.status).toBe(401)
      expect(dbMock.project.findFirst).not.toHaveBeenCalled()
    })

    it("returns the existing project's onlineOfflineType", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue({ id: "p1", onlineOfflineType: "online" })
      const res = await GET()
      const body = await res.json()
      expect(res.status).toBe(200)
      expect(body.onlineOfflineType).toBe("online")
    })

    it("creates a default project on first use", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue(null)
      dbMock.project.create.mockResolvedValue({ id: "p1", onlineOfflineType: null })
      const res = await GET()
      expect(dbMock.project.create).toHaveBeenCalledTimes(1)
      expect(res.status).toBe(200)
    })
  })

  describe("POST", () => {
    it("returns 401 when not authenticated", async () => {
      authMock.mockResolvedValue(null)
      const res = await POST(postRequest({ onlineOfflineType: "online" }))
      expect(res.status).toBe(401)
    })

    it("rejects an invalid business type", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      const res = await POST(postRequest({ onlineOfflineType: "spaceship" }))
      expect(res.status).toBe(400)
      expect(dbMock.project.update).not.toHaveBeenCalled()
    })

    it("saves a valid business type", async () => {
      authMock.mockResolvedValue({ user: { id: "u1" } })
      dbMock.project.findFirst.mockResolvedValue({ id: "p1" })
      dbMock.project.update.mockResolvedValue({})
      const res = await POST(postRequest({ onlineOfflineType: "mixed" }))
      const body = await res.json()
      expect(res.status).toBe(200)
      expect(body.onlineOfflineType).toBe("mixed")
      expect(dbMock.project.update).toHaveBeenCalledWith({
        where: { id: "p1" },
        data: { onlineOfflineType: "mixed" },
      })
    })
  })
})
