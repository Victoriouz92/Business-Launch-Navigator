import { describe, it, expect } from "vitest"
import { isStepRelevant } from "../roadmap"
import type { Step } from "../roadmap"

function makeStep(overrides: Partial<Step> = {}): Step {
  return {
    id: "test-step",
    categoryId: "LEGAL",
    order: 1,
    title: "Test step",
    priorityLevel: "strongly_recommended",
    difficulty: 1,
    explanation: "",
    whyItMatters: "",
    whenToDo: "",
    commonMistakes: [],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [],
    faq: [],
    subTasks: [],
    ...overrides,
  }
}

describe("isStepRelevant", () => {
  it("is relevant when businessType is null (anonymous, pre-onboarding)", () => {
    const step = makeStep({ notRelevantFor: ["offline"] })
    expect(isStepRelevant(step, null)).toBe(true)
  })

  it("is relevant when the step has no notRelevantFor list", () => {
    const step = makeStep()
    expect(isStepRelevant(step, "offline")).toBe(true)
  })

  it("is relevant when businessType is not in notRelevantFor", () => {
    const step = makeStep({ notRelevantFor: ["offline"] })
    expect(isStepRelevant(step, "online")).toBe(true)
  })

  it("is not relevant when businessType is in notRelevantFor", () => {
    const step = makeStep({ notRelevantFor: ["offline"] })
    expect(isStepRelevant(step, "offline")).toBe(false)
  })
})
