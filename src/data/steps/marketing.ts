import { Step } from "../roadmap"

export const marketingSteps: Step[] = [
  {
    id: "marketing-social",
    categoryId: "MARKETING",
    order: 1,
    title: "Създай бизнес профили в социалните мрежи",
    priorityLevel: "strongly_recommended",
    difficulty: 1,
    explanation:
      "Създай Facebook бизнес страница и Instagram профил (или LinkedIn за B2B). Не трябва да си активен навсякъде — избери 1-2 канала, където е аудиторията ти.",
    whyItMatters:
      "Социалните мрежи са безплатен канал за достигане до клиенти. Също така Google индексира профилите — подобряваш SEO.",
    whenToDo: "Когато имаш домейн и основна визия на бранда.",
    commonMistakes: [
      "Създаваш профили навсякъде и не поддържаш нито един",
      "Постваш само за продукта (трябва и стойност за аудиторията)",
      "Не отговаряш на съобщения/коментари",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Meta Business Suite", url: "https://business.facebook.com", isOfficial: false },
    ],
    faq: [
      { question: "Кои мрежи за B2B?", answer: "LinkedIn + Twitter/X. За B2C: Instagram + Facebook/TikTok." },
    ],
    subTasks: [
      { index: 0, label: "Избери 1-2 мрежи (където е аудиторията ти)" },
      { index: 1, label: "Създай бизнес профил с лого и описание" },
      { index: 2, label: "Направи 3 начални поста" },
    ],
  },
  {
    id: "marketing-seo",
    categoryId: "MARKETING",
    order: 2,
    title: "Основи на SEO",
    priorityLevel: "can_be_postponed",
    difficulty: 3,
    explanation:
      "SEO = оптимизация за търсачки. Целта: когато някой потърси твоя продукт/услуга в Google, да те намери. Основите са прости: добри заглавия, описания, бърз сайт.",
    whyItMatters:
      "Органичен трафик е безплатен и устойчив. Ако SEO работи, клиентите идват сами. Но резултатите отнемат 3-6 месеца.",
    whenToDo: "След като имаш работещ сайт със съдържание. Не бързай.",
    commonMistakes: [
      "Очакваш резултати за 1 седмица (SEO е бавно)",
      "Плащаш за 'SEO специалист' без да разбираш основите",
      "Пренебрегваш техническото SEO (бързина, мобилна версия)",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 7,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Google Search Console", url: "https://search.google.com/search-console", isOfficial: false },
      { label: "Ahrefs — безплатни SEO инструменти", url: "https://ahrefs.com/free-seo-tools", isOfficial: false },
    ],
    faq: [
      { question: "Да плащам ли за SEO?", answer: "Не в началото. Научи основите безплатно. Когато имаш приходи — тогава инвестирай." },
    ],
    subTasks: [
      { index: 0, label: "Регистрирай сайта в Google Search Console" },
      { index: 1, label: "Добави meta title и description на всяка страница" },
      { index: 2, label: "Провери скоростта на сайта (PageSpeed Insights)" },
    ],
  },
]
