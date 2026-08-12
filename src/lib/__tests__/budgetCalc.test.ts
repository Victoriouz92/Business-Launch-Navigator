import { describe, it, expect } from "vitest"
import { calculateBudgetTiers } from "../budgetCalc"
import type { Step } from "@/data/roadmap"

function makeStep(overrides: Partial<Step> & Pick<Step, "id" | "priorityLevel" | "estimatedCostBGN">): Step {
  return {
    categoryId: "LEGAL",
    order: 1,
    title: overrides.id,
    difficulty: 1,
    explanation: "",
    whyItMatters: "",
    whenToDo: "",
    commonMistakes: [],
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [],
    faq: [],
    subTasks: [],
    ...overrides,
  }
}

describe("calculateBudgetTiers", () => {
  it("splits remaining cost into mandatory / likely / optional tiers", () => {
    const steps: Step[] = [
      makeStep({ id: "a", priorityLevel: "legally_required", estimatedCostBGN: 1.95583 * 100 }), // €100
      makeStep({ id: "b", priorityLevel: "strongly_recommended", estimatedCostBGN: 1.95583 * 50 }), // €50
      makeStep({ id: "c", priorityLevel: "optional", estimatedCostBGN: 1.95583 * 20 }), // €20
      makeStep({ id: "d", priorityLevel: "can_be_postponed", estimatedCostBGN: 1.95583 * 10 }), // €10
    ]

    const tiers = calculateBudgetTiers(steps, [])

    expect(tiers.mandatory).toBeCloseTo(100, 1)
    expect(tiers.likely).toBeCloseTo(50, 1)
    expect(tiers.optional).toBeCloseTo(30, 1) // optional + can_be_postponed combined
    expect(tiers.core).toBeCloseTo(150, 1) // mandatory + likely
    expect(tiers.total).toBeCloseTo(180, 1) // everything
  })

  it("excludes already-completed steps from every tier", () => {
    const steps: Step[] = [
      makeStep({ id: "a", priorityLevel: "legally_required", estimatedCostBGN: 1.95583 * 100 }),
      makeStep({ id: "b", priorityLevel: "legally_required", estimatedCostBGN: 1.95583 * 50 }),
    ]

    const tiers = calculateBudgetTiers(steps, ["a"])

    expect(tiers.mandatory).toBeCloseTo(50, 1)
  })

  it("returns all-zero tiers when every step is completed", () => {
    const steps: Step[] = [makeStep({ id: "a", priorityLevel: "legally_required", estimatedCostBGN: 100 })]

    const tiers = calculateBudgetTiers(steps, ["a"])

    expect(tiers).toEqual({ mandatory: 0, likely: 0, optional: 0, core: 0, total: 0 })
  })

  it("returns all-zero tiers for an empty step list", () => {
    const tiers = calculateBudgetTiers([], [])
    expect(tiers).toEqual({ mandatory: 0, likely: 0, optional: 0, core: 0, total: 0 })
  })
})
