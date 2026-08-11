import { Step } from "../roadmap"

export const aiSteps: Step[] = [
  {
    id: "ai-tools",
    categoryId: "AI",
    order: 1,
    title: "Използвай AI инструменти за ефективност",
    priorityLevel: "can_be_postponed",
    difficulty: 1,
    explanation:
      "AI инструменти като ChatGPT, Claude, Midjourney могат да ти спестят часове работа: писане на текстове, генериране на идеи, създаване на визуали, отговаряне на клиенти.",
    whyItMatters:
      "Като solo founder всяка спестена минута е ценна. AI те прави по-продуктивен без допълнителни разходи.",
    whenToDo: "Веднага — ползвай ги от ден 1 за всичко: текстове, имейли, планиране.",
    commonMistakes: [
      "Мислиш, че AI ще свърши ВСИЧКО вместо теб",
      "Не проверяваш изхода (AI греши, особено за факти)",
      "Плащаш за 10 AI инструмента вместо да научиш 1 добре",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [
      { label: "ChatGPT", url: "https://chat.openai.com", isOfficial: false },
      { label: "Claude (Anthropic)", url: "https://claude.ai", isOfficial: false },
      { label: "Canva — дизайн с AI", url: "https://canva.com", isOfficial: false },
    ],
    faq: [
      { question: "Безплатен ли е ChatGPT?", answer: "Базовата версия — да. GPT-4o Plus е $20/месец, но безплатната е достатъчна за старт." },
    ],
    subTasks: [
      { index: 0, label: "Регистрирай се в ChatGPT или Claude (безплатно)" },
      { index: 1, label: "Пробвай: помоли го да напише описание на бизнеса ти" },
      { index: 2, label: "Пробвай: помоли го да напише имейл до потенциален клиент" },
    ],
  },
]
