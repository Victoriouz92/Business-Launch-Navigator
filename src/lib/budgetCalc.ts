import { bgnToEur } from "./currency"
import type { Step } from "@/data/roadmap"

export interface BudgetTiers {
  /** Legally required steps (priorityLevel "legally_required") */
  mandatory: number
  /** Strongly recommended steps */
  likely: number
  /** Optional or postponable steps */
  optional: number
  /** mandatory + likely — the realistic amount a budget should cover */
  core: number
  /** core + optional — everything, including nice-to-haves */
  total: number
}

/** Remaining cost (in EUR) of not-yet-completed steps, split into 3 priority tiers. */
export function calculateBudgetTiers(steps: Step[], completedStepIds: string[]): BudgetTiers {
  const remaining = steps.filter((s) => !completedStepIds.includes(s.id))
  const sumCost = (list: Step[]) => list.reduce((sum, s) => sum + bgnToEur(s.estimatedCostBGN), 0)

  const mandatory = sumCost(remaining.filter((s) => s.priorityLevel === "legally_required"))
  const likely = sumCost(remaining.filter((s) => s.priorityLevel === "strongly_recommended"))
  const optional = sumCost(
    remaining.filter((s) => s.priorityLevel === "optional" || s.priorityLevel === "can_be_postponed")
  )
  const core = mandatory + likely

  return { mandatory, likely, optional, core, total: core + optional }
}
