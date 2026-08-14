import { getStepById, CATEGORIES, STEPS } from "@/data/roadmap"
import { getArticleBySlug } from "@/data/knowledge"
import { bgnToEur } from "@/lib/currency"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, AlertTriangle, FileText, Landmark, XCircle, Wallet, Lightbulb, Download, BookOpen } from "lucide-react"
import { InsuranceCalculator } from "@/components/InsuranceCalculator"
import { VatChecker } from "@/components/VatChecker"
import { StepCompleteButton } from "@/components/StepCompleteButton"
import { StepChecklist } from "@/components/StepChecklist"
import { Footer } from "@/components/Footer"
import { CategoryIconBadge } from "@/lib/categoryIcons"
import { UserMenu } from "@/components/UserMenu"

interface Props {
  params: Promise<{ stepId: string }>
}

/**
 * Confirmed official download links (Registry Agency template page, checked
 * this session — each URL resolved to a real PDF/DOCX file). Documents not
 * listed here don't have a distinct downloadable template (e.g. they're
 * personal documents, or obtained as the output of an earlier step).
 */
const REGISTRY_TEMPLATES_PAGE = "https://portal.registryagency.bg/document-template-cr"
const DOCUMENT_LINKS: Record<
  string,
  { url: string; hasFile: boolean; sourceLabel?: string; sourceUrl?: string }
> = {
  "Учредителен акт на ЕООД": { url: "https://portal.registryagency.bg/nested-page-file-download/938-1734089039", hasFile: true },
  "Учредителен акт": { url: "https://portal.registryagency.bg/nested-page-file-download/938-1734089039", hasFile: true },
  "Учредителен акт (копие)": { url: "https://portal.registryagency.bg/nested-page-file-download/938-1734089039", hasFile: true },
  "Декларация по чл. 13, ал. 4 от ТЗ": { url: "https://portal.registryagency.bg/nested-page-file-download/524-1600089858", hasFile: true },
  "Декларация по чл. 141, ал. 8 от ТЗ": { url: "https://portal.registryagency.bg/nested-page-file-download/856-1612775228", hasFile: true },
  "Заявление А4 (попълнено)": { url: "https://portal.registryagency.bg/nested-page-file-download/489-1711467727", hasFile: true },
  "Протокол-решение на едноличния собственик": {
    url: "/documents/protokol-reshenie-ednolichen-sobstvenik.docx",
    hasFile: true,
    sourceLabel: "Готов образец — не е официален държавен формуляр, виж и всички образци на официалния сайт",
    sourceUrl: REGISTRY_TEMPLATES_PAGE,
  },
  "Протокол-решение": {
    url: "/documents/protokol-reshenie-ednolichen-sobstvenik.docx",
    hasFile: true,
    sourceLabel: "Готов образец — не е официален държавен формуляр, виж и всички образци на официалния сайт",
    sourceUrl: REGISTRY_TEMPLATES_PAGE,
  },
  "Декларации по ТЗ": { url: REGISTRY_TEMPLATES_PAGE, hasFile: false },
}

export default async function StepPage({ params }: Props) {
  const { stepId } = await params
  const step = getStepById(stepId)
  if (!step) return notFound()

  const category = CATEGORIES.find((c) => c.id === step.categoryId)

  const priorityLabels: Record<string, string> = {
    legally_required: "Законово задължително",
    strongly_recommended: "Силно препоръчително",
    optional: "По избор",
    can_be_postponed: "Може да се отложи",
  }

  const priorityDotColors: Record<string, string> = {
    legally_required: "bg-red-500",
    strongly_recommended: "bg-amber-500",
    optional: "bg-green-500",
    can_be_postponed: "bg-slate-400",
  }

  const difficultyLabels = ["", "Лесно", "Не е сложно", "Средно", "Трудно", "Професионална помощ"]

  const officialLinks = step.usefulLinks.filter((l) => l.isOfficial)
  const otherLinks = step.usefulLinks.filter((l) => !l.isOfficial)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-shrink-0"
              aria-label="Обратно към табло"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Link>
            {category && <CategoryIconBadge categoryId={category.id} className="w-8 h-8" />}
            <div className="min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {category?.label}
              </p>
              <h1 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {step.title}
              </h1>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Priority + Difficulty + Cost + Time — at-a-glance summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AccentCard
            color={step.priorityLevel === "legally_required" ? "red" : step.priorityLevel === "strongly_recommended" ? "amber" : "green"}
            label="Статус"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${priorityDotColors[step.priorityLevel]}`} />
                {priorityLabels[step.priorityLevel]}
              </span>
            }
          />
          <AccentCard
            color="blue"
            label="Трудност"
            value={`${step.difficulty}/5 — ${difficultyLabels[step.difficulty]}`}
          />
          <AccentCard
            color="emerald"
            label="Цена"
            value={step.estimatedCostBGN > 0 ? `€${bgnToEur(step.estimatedCostBGN).toFixed(0)}` : "Безплатно"}
          />
          <AccentCard
            color="violet"
            label="Време"
            value={`${step.estimatedDays} ${step.estimatedDays === 1 ? "ден" : "дни"}`}
          />
        </div>

        {/* Financial Summary — accent box */}
        {(step.estimatedCostBGN > 0 || step.estimatedDays > 0) && (
          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-3">
              <Wallet className="w-4 h-4" />
              Финансови параметри
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Цена</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  {step.estimatedCostBGN > 0 ? `€${bgnToEur(step.estimatedCostBGN).toFixed(0)}` : "Безплатно"}
                </p>
                {step.estimatedCostBGN > 0 && (
                  <p className="text-xs text-emerald-500 dark:text-emerald-500 mt-0.5">
                    ({step.estimatedCostBGN} лв) • проверено {step.costVerifiedYear}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Времетраене</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  {step.estimatedDays} {step.estimatedDays === 1 ? "ден" : "дни"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Legal disclaimer for legally_required steps */}
        {step.priorityLevel === "legally_required" && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Тази информация е образователна и не представлява правен съвет. Консултирайте се с адвокат за вашата конкретна ситуация.
            </p>
          </div>
        )}

        {/* 1. Какво трябва да направиш */}
        <Section title="Какво трябва да направиш">{step.explanation}</Section>

        {step.id === "planning-budget" && <BudgetBreakdown />}
        {step.id === "planning-budget" && <InsuranceCalculator />}
        {step.id === "legal-vat-check" && <VatChecker />}

        {/* 2. Необходими документи */}
        {step.requiredDocuments.length > 0 && (
          <div>
            <SectionTitle>Необходими документи</SectionTitle>
            <ul className="space-y-2 mt-3">
              {step.requiredDocuments.map((d, i) => {
                const link = DOCUMENT_LINKS[d]
                return (
                  <li key={i} className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {d}
                      </span>
                      {link?.hasFile && (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 flex-shrink-0 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Изтегли
                        </a>
                      )}
                    </div>
                    {link && (
                      <a
                        href={link.sourceUrl ?? link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:underline"
                      >
                        {link.sourceLabel ?? (link.hasFile ? "Официален източник" : "Няма отделен образец — виж всички образци на официалния сайт")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              → Всички образци на Търговския регистър: <a href={REGISTRY_TEMPLATES_PAGE} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">portal.registryagency.bg/document-template-cr</a> — ползвай тази страница, ако файлът тук някога остарее.
            </p>
          </div>
        )}

        {/* 3. Как да го направиш */}
        {step.subTasks.length > 0 && (
          <div>
            <SectionTitle>Как да го направиш</SectionTitle>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{step.whenToDo}</p>
            <div className="mt-3">
              <StepChecklist stepId={step.id} subTasks={step.subTasks} />
            </div>
          </div>
        )}

        {/* 4. Защо е важно */}
        <Section title="Защо е важно">{step.whyItMatters}</Section>

        {/* 5. Чести грешки */}
        {step.commonMistakes.length > 0 && (
          <div>
            <SectionTitle>Чести грешки</SectionTitle>
            <ul className="space-y-2 mt-2">
              {step.commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Summary / Key takeaways */}
        {step.faq.length > 0 && (
          <div>
            <SectionTitle>Нека обобщим</SectionTitle>
            <div className="space-y-3 mt-2">
              {step.faq.map((item, i) => (
                <div key={i} className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.question}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Официален източник */}
        {step.usefulLinks.length > 0 && (
          <div>
            <SectionTitle>{officialLinks.length > 0 ? "Официален източник" : "Полезни връзки"}</SectionTitle>
            {officialLinks.length > 0 && (
              <ul className="space-y-2 mt-2">
                {officialLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {otherLinks.length > 0 && (
              <>
                {officialLinks.length > 0 && (
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-4 mb-1">
                    Други връзки
                  </p>
                )}
                <ul className="space-y-2 mt-2">
                  {otherLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Свързани наръчници */}
        {step.relatedArticles && step.relatedArticles.length > 0 && (
          <div>
            <SectionTitle>Свързани наръчници</SectionTitle>
            <ul className="space-y-2 mt-2">
              {step.relatedArticles.map((slug) => {
                const article = getArticleBySlug(slug)
                if (!article) return null
                return (
                  <li key={slug}>
                    <Link
                      href={`/guides/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                      {article.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Complete button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <StepCompleteButton stepId={step.id} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
      {children}
    </h3>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </p>
    </div>
  )
}

function BudgetBreakdown() {
  const mandatory = [
    { item: "Регистрация ЕООД (онлайн с КЕП/адвокат)", cost: 28, note: "€56.24 ако е на гише" },
    { item: "Нотариална заверка (спесимен + съгласие)", cost: 5, note: "€3–7 зависи от нотариуса" },
    { item: "Минимален капитал", cost: 1, note: "Законов минимум за ЕООД" },
    { item: "Банкова такса (набирателна сметка)", cost: 15, note: "€10–43 зависи от банката" },
  ]
  const monthly = [
    { item: "Счетоводител", cost: 35, note: "€25-75 зависи от оборота" },
    { item: "Осигуровки (управител)", cost: 172, note: "Ако се самоосигуряваш (мин. доход €620.20 от 01.08.2026)" },
    { item: "Банкова поддръжка", cost: 3, note: "€0-5/мес" },
  ]
  const optional = [
    { item: "Домейн (.bg или .com)", cost: 12, note: "€10-15/год" },
    { item: "Хостинг", cost: 0, note: "Vercel/Netlify — безплатно за старт" },
    { item: "Бизнес имейл", cost: 0, note: "Zoho Mail безплатен план" },
    { item: "SSL сертификат", cost: 0, note: "Безплатен (Let's Encrypt)" },
    { item: "Лого и дизайн", cost: 0, note: "Canva безплатно, или €50-200" },
    { item: "Google Workspace", cost: 6, note: "По желание, €6/мес" },
    { item: "Stripe акаунт", cost: 0, note: "Безплатен, 2.9% на транзакция" },
    { item: "Маркетинг (реклама)", cost: 0, note: "Започни органично, €0" },
    { item: "Електронен подпис (КЕП)", cost: 15, note: "За онлайн подаване в ТР" },
    { item: "Печат на фирмата", cost: 10, note: "Не е задължителен от 2018" },
  ]

  const mandatoryTotal = mandatory.reduce((s, i) => s + i.cost, 0)
  const monthlyTotal = monthly.reduce((s, i) => s + i.cost, 0)

  return (
    <div className="space-y-6">
      {/* Mandatory one-time */}
      <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-5">
        <h4 className="flex items-center gap-1.5 text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-wide mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          Задължителни еднократни разходи
        </h4>
        <table className="w-full text-sm">
          <tbody>
            {mandatory.map((row, i) => (
              <tr key={i} className="border-b border-red-100 dark:border-red-900/50 last:border-0">
                <td className="py-2 text-slate-700 dark:text-slate-300">{row.item}</td>
                <td className="py-2 text-right font-bold text-red-700 dark:text-red-300">€{row.cost}</td>
                <td className="py-2 pl-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-red-200 dark:border-red-700">
              <td className="pt-2 font-bold text-slate-900 dark:text-white">ОБЩО МИНИМУМ (онлайн)</td>
              <td className="pt-2 text-right font-bold text-red-700 dark:text-red-300 text-base">~€{mandatoryTotal}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Monthly */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5">
        <h4 className="flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
          Месечни разходи (след регистрация)
        </h4>
        <table className="w-full text-sm">
          <tbody>
            {monthly.map((row, i) => (
              <tr key={i} className="border-b border-amber-100 dark:border-amber-900/50 last:border-0">
                <td className="py-2 text-slate-700 dark:text-slate-300">{row.item}</td>
                <td className="py-2 text-right font-bold text-amber-700 dark:text-amber-300">€{row.cost}/мес</td>
                <td className="py-2 pl-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-amber-200 dark:border-amber-700">
              <td className="pt-2 font-bold text-slate-900 dark:text-white">ОБЩО МЕСЕЧНО</td>
              <td className="pt-2 text-right font-bold text-amber-700 dark:text-amber-300 text-base">~€{monthlyTotal}/мес</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Optional */}
      <div className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 p-5">
        <h4 className="flex items-center gap-1.5 text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wide mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          По избор (може да почака или е безплатно)
        </h4>
        <table className="w-full text-sm">
          <tbody>
            {optional.map((row, i) => (
              <tr key={i} className="border-b border-green-100 dark:border-green-900/50 last:border-0">
                <td className="py-2 text-slate-700 dark:text-slate-300">{row.item}</td>
                <td className="py-2 text-right font-bold text-green-700 dark:text-green-300">
                  {row.cost > 0 ? `€${row.cost}` : "€0"}
                </td>
                <td className="py-2 pl-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-5 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm text-blue-700 dark:text-blue-300 font-medium">
          <Lightbulb className="w-4 h-4" />
          Реалистичен минимум за стартиране на ЕООД:
        </p>
        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">
          ~€49 еднократно + ~€210/мес
        </p>
        <p className="text-xs text-blue-500 dark:text-blue-400 mt-2">
          Препоръчителен резерв за първите 3 месеца: ~€630 • Данни 2026
        </p>
      </div>
    </div>
  )
}

function AccentCard({ color, label, value }: { color: string; label: string; value: React.ReactNode }) {
  const colorMap: Record<string, string> = {
    red: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
    green: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40",
    blue: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40",
    emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
    violet: "border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40",
  }

  const textMap: Record<string, string> = {
    red: "text-red-700 dark:text-red-300",
    amber: "text-amber-700 dark:text-amber-300",
    green: "text-green-700 dark:text-green-300",
    blue: "text-blue-700 dark:text-blue-300",
    emerald: "text-emerald-700 dark:text-emerald-300",
    violet: "text-violet-700 dark:text-violet-300",
  }

  return (
    <div className={`rounded-xl border-2 p-4 text-center ${colorMap[color]}`}>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
      <p className={`mt-1 text-sm font-bold leading-tight ${textMap[color]}`}>{value}</p>
    </div>
  )
}
