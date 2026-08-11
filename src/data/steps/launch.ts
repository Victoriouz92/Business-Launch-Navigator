import { Step } from "../roadmap"

export const launchSteps: Step[] = [
  {
    id: "launch-checklist",
    categoryId: "LAUNCH",
    order: 1,
    title: "Финален чеклист преди старт",
    priorityLevel: "strongly_recommended",
    difficulty: 2,
    explanation:
      "Преди да обявиш бизнеса публично, провери: фирмата регистрирана ли е? Счетоводител имаш ли? Сайтът работи ли? Може ли да приемеш плащане? Всичко друго може да почака.",
    whyItMatters:
      "Чеклистът предпазва от пропуски. Един пропуснат елемент (напр. липса на privacy policy) може да те изложи на глоба.",
    whenToDo: "Когато си завършил всички legally_required стъпки.",
    commonMistakes: [
      "Стартираш без да можеш да приемеш плащане",
      "Нямаш Privacy Policy на сайта",
      "Не си казал на счетоводителя че вече имаш приходи",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [],
    faq: [
      {
        question: "Кога съм готов за старт?",
        answer: "Когато: 1) имаш ЕИК, 2) имаш счетоводител, 3) можеш да приемеш плащане, 4) имаш минимален продукт.",
      },
    ],
    subTasks: [
      { index: 0, label: "Фирма регистрирана: ДА / НЕ" },
      { index: 1, label: "Счетоводител наличен: ДА / НЕ" },
      { index: 2, label: "Бизнес сметка: ДА / НЕ" },
      { index: 3, label: "Може да приема плащания: ДА / НЕ" },
      { index: 4, label: "Уебсайт работи: ДА / НЕ" },
      { index: 5, label: "Privacy Policy на сайта: ДА / НЕ" },
    ],
  },
  {
    id: "launch-go-live",
    categoryId: "LAUNCH",
    order: 2,
    title: "Стартирай! 🎉",
    priorityLevel: "strongly_recommended",
    difficulty: 1,
    explanation:
      "Обяви публично, че бизнесът ти работи. Кажи на приятели, публикувай в социалните мрежи, изпрати на списъка с потенциални клиенти. Done is better than perfect.",
    whyItMatters:
      "Нищо не се случва докато не кажеш на света, че съществуваш. Всяка забавяне от тук нататък е перфекционизъм, а не подготовка.",
    whenToDo: "Днес. Ако чеклистът е завършен — няма какво да чакаш.",
    commonMistakes: [
      "Чакаш 'перфектния момент' (не съществува)",
      "Не казваш на никого, че си стартирал",
      "Очакваш клиенти да дойдат сами без промоция",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 1,
    requiredDocuments: [],
    usefulLinks: [],
    faq: [
      {
        question: "Какво ако никой не купи?",
        answer: "Нормално е в началото. Продължавай да достигаш до хора. Всеки 'не' е стъпка към 'да'.",
      },
    ],
    subTasks: [
      { index: 0, label: "Публикувай анонс в социалните мрежи" },
      { index: 1, label: "Изпрати лично съобщение на 10 потенциални клиента" },
      { index: 2, label: "Поздрави се — ти вече си предприемач! 🚀" },
    ],
  },
]
