import { Step } from "../roadmap"

export const technicalSteps: Step[] = [
  {
    id: "technical-email",
    categoryId: "TECHNICAL",
    order: 1,
    title: "Настрой бизнес имейл",
    priorityLevel: "strongly_recommended",
    difficulty: 1,
    explanation:
      "Бизнес имейл = info@tvoiabiznes.bg вместо ivan_2003@gmail.com. Изглежда професионално и вдъхва доверие. Google Workspace или Zoho Mail са най-лесните опции.",
    whyItMatters:
      "Клиентите ще те приемат по-сериозно. Gmail адресите за бизнес кореспонденция изглеждат непрофесионално.",
    whenToDo: "Веднага след като имаш домейн.",
    commonMistakes: [
      "Ползваш лична поща за бизнес кореспонденция",
      "Не настройваш SPF/DKIM (мейлите отиват в спам)",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Zoho Mail — безплатен бизнес имейл", url: "https://zoho.com/mail", isOfficial: false },
      { label: "Google Workspace", url: "https://workspace.google.com", isOfficial: false },
    ],
    faq: [
      { question: "Има ли безплатна опция?", answer: "Да — Zoho Mail предлага безплатен план за 1 потребител с custom domain." },
    ],
    subTasks: [
      { index: 0, label: "Избери доставчик (Zoho безплатно / Google Workspace 5 EUR/мес)" },
      { index: 1, label: "Свържи домейна (MX records)" },
      { index: 2, label: "Създай адреса (info@, hello@)" },
    ],
  },
  {
    id: "technical-analytics",
    categoryId: "TECHNICAL",
    order: 2,
    title: "Добави Google Analytics",
    priorityLevel: "optional",
    difficulty: 2,
    explanation:
      "Google Analytics ти показва колко хора посещават сайта, откъде идват и какво правят. Безплатно е и се настройва за 10 минути.",
    whyItMatters:
      "Без данни не знаеш дали маркетингът ти работи. Analytics е основата за всички бъдещи решения.",
    whenToDo: "Веднага след като имаш работещ сайт.",
    commonMistakes: [
      "Не го слагаш от начало и губиш месеци данни",
      "Не настройваш events/goals (само pageviews не са достатъчни)",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Google Analytics 4", url: "https://analytics.google.com", isOfficial: false },
      { label: "Google Search Console", url: "https://search.google.com/search-console", isOfficial: false },
    ],
    faq: [
      { question: "GA4 или Universal Analytics?", answer: "GA4 — Universal вече не работи. GA4 е единствената актуална версия." },
    ],
    subTasks: [
      { index: 0, label: "Създай GA4 property" },
      { index: 1, label: "Добави tracking кода в сайта" },
      { index: 2, label: "Добави Google Search Console (bonus)" },
    ],
  },
]
