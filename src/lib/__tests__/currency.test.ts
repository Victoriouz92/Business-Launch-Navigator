import { describe, it, expect } from "vitest"
import { bgnToEur, BGN_PER_EUR } from "../currency"

describe("bgnToEur", () => {
  it("converts the official euro-adoption peg exactly", () => {
    expect(bgnToEur(BGN_PER_EUR)).toBeCloseTo(1, 10)
  })

  it("converts a known registration fee (56.24 лв → €28.75)", () => {
    expect(bgnToEur(56.24)).toBeCloseTo(28.75, 1)
  })

  it("returns 0 for 0 лв", () => {
    expect(bgnToEur(0)).toBe(0)
  })
})
