import { Step } from "../roadmap"

export const paymentsSteps: Step[] = [
  {
    id: "payments-bank-account",
    categoryId: "PAYMENTS",
    order: 1,
    title: "Открий бизнес банкова сметка",
    priorityLevel: "legally_required",
    difficulty: 2,
    explanation:
      "Всяко ЕООД трябва да има фирмена сметка за приходи и разходи. Не ползвай личната си сметка за бизнес дейност — счетоводството ще е невъзможно.",
    whyItMatters:
      "НАП изисква разделяне на лични и фирмени финанси. Без бизнес сметка не можеш да получаваш фактурирани плащания легално.",
    whenToDo: "Веднага след получаване на ЕИК (регистрация на фирмата).",
    commonMistakes: [
      "Ползваш лична сметка за фирмени плащания",
      "Не сравняваш таксите между банките (разликата е €3-15/месец)",
      "Избираш банка само по навик, без да провериш онлайн банкиране",
    ],
    estimatedCostBGN: 10,
    costVerifiedYear: 2026,
    estimatedDays: 2,
    requiredDocuments: [
      "ЕИК (от Търговския регистър)",
      "Лична карта на управителя",
      "Учредителен акт (копие)",
    ],
    usefulLinks: [
      { label: "БНБ — списък на лицензирани банки", url: "https://bnb.bg", isOfficial: true },
    ],
    faq: [
      { question: "Коя банка е най-добра за ЕООД?", answer: "Зависи от нуждите. За онлайн бизнес: Revolut Business (€0/месец) или UniCredit Bulbank (добро онлайн банкиране). Сравни таксите." },
      { question: "Revolut Business брои ли се?", answer: "Да, Revolut Business е лицензирана в ЕС. Приема се от НАП. Но имай и BG сметка за местни плащания." },
    ],
    subTasks: [
      { index: 0, label: "Сравни условията на 3 банки (такси, онлайн достъп)" },
      { index: 1, label: "Посети клон или кандидатствай онлайн" },
      { index: 2, label: "Дай IBAN-а на счетоводителя" },
    ],
  },
  {
    id: "payments-online",
    categoryId: "PAYMENTS",
    order: 2,
    title: "Настрой онлайн плащания (Stripe)",
    priorityLevel: "strongly_recommended",
    difficulty: 3,
    explanation:
      "За да приемаш картови плащания онлайн, ти трябва payment processor. Stripe работи в България, приема Visa/Mastercard и се интегрира лесно.",
    whyItMatters:
      "Без онлайн плащания губиш клиенти. 80%+ от онлайн покупките стават с карта. Stripe е стандартът за стартъпи.",
    whenToDo: "Когато имаш продукт/услуга готова за продажба и работещ сайт.",
    commonMistakes: [
      "Отлагаш интеграцията и губиш готови да платят клиенти",
      "Не настройваш правилно фактурирането",
      "Забравяш за 3D Secure (задължително в ЕС)",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 3,
    requiredDocuments: [
      "ЕИК на фирмата",
      "Бизнес сметка (IBAN)",
      "Уебсайт с описание на продукта/услугата",
    ],
    usefulLinks: [
      { label: "Stripe — регистрация за България", url: "https://stripe.com/bg", isOfficial: false },
      { label: "Stripe Docs — интеграция", url: "https://docs.stripe.com", isOfficial: false },
    ],
    faq: [
      { question: "Колко взима Stripe?", answer: "2.9% + €0.25 на транзакция за европейски карти. Без месечна такса." },
      { question: "Има ли алтернативи?", answer: "PayPal, Revolut Pay, myPOS. Stripe е най-developer-friendly. За прост магазин — myPOS или PayPal." },
    ],
    subTasks: [
      { index: 0, label: "Създай Stripe акаунт с фирмени данни" },
      { index: 1, label: "Верифицирай бизнеса (ЕИК + IBAN)" },
      { index: 2, label: "Интегрирай Stripe в сайта или ползвай Payment Links" },
    ],
  },
]
