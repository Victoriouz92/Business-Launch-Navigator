// Types and constants for the Business Launch Navigator roadmap

export type PriorityLevel =
  | "legally_required"
  | "strongly_recommended"
  | "optional"
  | "can_be_postponed"

export type Difficulty = 1 | 2 | 3 | 4 | 5

export type BusinessType = "online" | "offline" | "mixed"

export type CategoryId =
  | "IDEA"
  | "PLANNING"
  | "LEGAL"
  | "PAYMENTS"
  | "WEBSITE"
  | "TECHNICAL"
  | "MARKETING"
  | "AI"
  | "SALES"
  | "LAUNCH"

export interface SubTask {
  index: number
  label: string
}

export interface UsefulLink {
  label: string
  url: string
  isOfficial: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Step {
  id: string
  categoryId: CategoryId
  order: number
  title: string
  priorityLevel: PriorityLevel
  difficulty: Difficulty
  explanation: string
  whyItMatters: string
  whenToDo: string
  commonMistakes: string[]
  estimatedCostBGN: number
  costVerifiedYear: number
  estimatedDays: number
  requiredDocuments: string[]
  usefulLinks: UsefulLink[]
  faq: FaqItem[]
  subTasks: SubTask[]
  /** Business types this step does NOT apply to. Undefined = relevant to everyone. */
  notRelevantFor?: BusinessType[]
  /** Slugs of related Наръчници (knowledge) articles, in src/data/knowledge.ts */
  relatedArticles?: string[]
}

export interface Category {
  id: CategoryId
  order: number
  label: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  { id: "IDEA", order: 1, label: "Идея", emoji: "💡" },
  { id: "PLANNING", order: 2, label: "Планиране", emoji: "📋" },
  { id: "LEGAL", order: 3, label: "Правни стъпки", emoji: "⚖️" },
  { id: "PAYMENTS", order: 4, label: "Плащания", emoji: "💳" },
  { id: "WEBSITE", order: 5, label: "Уебсайт", emoji: "🌐" },
  { id: "TECHNICAL", order: 6, label: "Техническа настройка", emoji: "⚙️" },
  { id: "MARKETING", order: 7, label: "Маркетинг", emoji: "📣" },
  { id: "AI", order: 8, label: "AI инструменти", emoji: "🤖" },
  { id: "SALES", order: 9, label: "Продажби", emoji: "🤝" },
  { id: "LAUNCH", order: 10, label: "Стартиране", emoji: "🚀" },
]

// Aggregate all steps from category files
import { ideaSteps } from "./steps/idea"
import { planningSteps } from "./steps/planning"
import { legalSteps } from "./steps/legal"
import { paymentsSteps } from "./steps/payments"
import { websiteSteps } from "./steps/website"
import { technicalSteps } from "./steps/technical"
import { marketingSteps } from "./steps/marketing"
import { aiSteps } from "./steps/ai"
import { salesSteps } from "./steps/sales"
import { launchSteps } from "./steps/launch"

export const STEPS: Step[] = [
  ...ideaSteps,
  ...planningSteps,
  ...legalSteps,
  ...paymentsSteps,
  ...websiteSteps,
  ...technicalSteps,
  ...marketingSteps,
  ...aiSteps,
  ...salesSteps,
  ...launchSteps,
]

// Helper: get steps for a category
export function getStepsForCategory(categoryId: CategoryId): Step[] {
  return STEPS.filter((s) => s.categoryId === categoryId).sort((a, b) => a.order - b.order)
}

// Helper: get a single step by ID
export function getStepById(stepId: string): Step | undefined {
  return STEPS.find((s) => s.id === stepId)
}

// Helper: is this step relevant for the given business type?
export function isStepRelevant(step: Step, businessType: BusinessType | null): boolean {
  if (!businessType || !step.notRelevantFor) return true
  return !step.notRelevantFor.includes(businessType)
}
