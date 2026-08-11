import { Step } from "../roadmap"

export const websiteSteps: Step[] = [
  {
    id: "website-domain",
    categoryId: "WEBSITE",
    order: 1,
    title: "Регистрирай домейн",
    priorityLevel: "strongly_recommended",
    difficulty: 1,
    explanation:
      "Домейнът е адресът на сайта ти (напр. moiatbiznes.bg). Избери кратко, запомнящо се име. Регистрацията отнема минути и струва €10-13/година.",
    whyItMatters:
      "Без домейн нямаш професионално онлайн присъствие. Безплатните адреси (subdomain.wordpress.com) изглеждат несериозно.",
    whenToDo: "Когато знаеш името на бизнеса. Може преди регистрация на фирмата.",
    commonMistakes: [
      "Избираш твърде дълъг или сложен домейн",
      "Не проверяваш дали е свободен преди да регистрираш фирмата",
      "Купуваш от скъп регистратор (разликата може да е 2-3x)",
    ],
    estimatedCostBGN: 20,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Register.bg — .bg домейни", url: "https://register.bg", isOfficial: true },
      { label: "Namecheap — .com домейни", url: "https://namecheap.com", isOfficial: false },
    ],
    faq: [
      { question: ".bg или .com?", answer: "За български пазар: .bg. За международен: .com. Ако можеш — вземи и двата." },
      { question: "Колко струва?", answer: ".com = ~€10/год. .bg = ~€13/год от Register.bg." },
    ],
    subTasks: [
      { index: 0, label: "Избери домейн име (кратко, без тирета)" },
      { index: 1, label: "Провери дали е свободен" },
      { index: 2, label: "Регистрирай го" },
    ],
    notRelevantFor: ["offline"],
  },
  {
    id: "website-build",
    categoryId: "WEBSITE",
    order: 2,
    title: "Създай уебсайт или лендинг страница",
    priorityLevel: "strongly_recommended",
    difficulty: 3,
    explanation:
      "Не ти трябва сложен сайт за старт. Една лендинг страница, която обяснява какво правиш и как клиентите да се свържат с теб, е достатъчна.",
    whyItMatters:
      "Сайтът е твоята визитка 24/7. Клиентите ще те проверят онлайн преди да решат да платят. Stripe също изисква уебсайт.",
    whenToDo: "Паралелно с регистрацията на фирмата. Може преди.",
    commonMistakes: [
      "Перфекционизъм — чакаш месеци за 'перфектния' сайт",
      "Плащаш за скъп дизайнер преди да имаш клиенти",
      "Не включваш ясен 'call to action' (какво да направи посетителят)",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 3,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Vercel — безплатен хостинг", url: "https://vercel.com", isOfficial: false },
      { label: "Carrd — прости лендинг страници ($9/год)", url: "https://carrd.co", isOfficial: false },
    ],
    faq: [
      { question: "Трябва ли ми програмист?", answer: "Не за лендинг. Carrd, Wix, WordPress — всички имат drag-and-drop. За SaaS/app — да, трябва ти developer." },
      { question: "Безплатен хостинг окей ли е?", answer: "За старт — да. Vercel, Netlify, GitHub Pages са безплатни и бързи. Мигрираш после ако трябва." },
    ],
    subTasks: [
      { index: 0, label: "Избери платформа (Vercel, Carrd, WordPress)" },
      { index: 1, label: "Напиши текст: какво правиш, за кого, как да те намерят" },
      { index: 2, label: "Публикувай и свържи домейна" },
    ],
    notRelevantFor: ["offline"],
  },
]
