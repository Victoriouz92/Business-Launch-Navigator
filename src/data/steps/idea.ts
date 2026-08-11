import { Step } from "../roadmap"

export const ideaSteps: Step[] = [
  {
    id: "idea-validate",
    categoryId: "IDEA",
    order: 1,
    title: "Валидирай идеята си",
    priorityLevel: "strongly_recommended",
    difficulty: 2,
    explanation:
      "Преди да инвестираш време и пари, провери дали някой наистина иска това, което планираш да предложиш. Валидацията означава да получиш реални сигнали от потенциални клиенти — не мнението на приятели.",
    whyItMatters:
      "90% от стартъпите се провалят. Най-честата причина: правят нещо, което никой не иска. 30 минути проучване може да ти спести месеци загубено време.",
    whenToDo: "Най-първата стъпка, преди да правиш каквото и да е друго.",
    commonMistakes: [
      "Питаш приятели и семейство (те винаги казват 'страхотна идея')",
      "Прекарваш месеци в планиране без да говориш с реални хора",
      "Правиш продукт преди да потвърдиш, че има търсене",
      "Объркваш 'хубава идея' с 'нещо, за което хората ще платят'",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 3,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Google Trends — провери търсенето", url: "https://trends.google.com", isOfficial: false },
      { label: "AnswerThePublic — какво питат хората", url: "https://answerthepublic.com", isOfficial: false },
    ],
    faq: [
      { question: "Колко хора трябва да попитам?", answer: "Минимум 10-15 потенциални клиенти. Не приятели." },
      { question: "Какво ако идеята ми вече съществува?", answer: "Това е добър знак — значи има пазар. Въпросът е дали можеш да го направиш по-добре." },
    ],
    subTasks: [
      { index: 0, label: "Опиши идеята си в 1 изречение" },
      { index: 1, label: "Намери 3 конкурента и виж какво правят" },
      { index: 2, label: "Попитай 10 потенциални клиенти дали биха платили" },
      { index: 3, label: "Провери Google Trends за търсене" },
    ],
  },
  {
    id: "idea-audience",
    categoryId: "IDEA",
    order: 2,
    title: "Определи целевата аудитория",
    priorityLevel: "strongly_recommended",
    difficulty: 2,
    explanation:
      "Целева аудитория = конкретната група хора, на които продаваш. Не 'всички'. Колкото по-тясно дефинираш — толкова по-лесно ще продаваш.",
    whyItMatters:
      "Ако се опиташ да продаваш на 'всички', не продаваш на никого. Ясната аудитория определя тона, каналите, цената и продукта.",
    whenToDo: "Веднага след валидацията на идеята.",
    commonMistakes: [
      "Казваш 'моята аудитория са всички'",
      "Не дефинираш конкретен проблем, който решаваш",
      "Не знаеш къде тези хора прекарват времето си онлайн",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 2,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Facebook Audience Insights", url: "https://www.facebook.com/business/insights/tools/audience-insights", isOfficial: false },
    ],
    faq: [
      { question: "Колко тясна трябва да е аудиторията?", answer: "Достатъчно тясна, за да можеш да опишеш типичния клиент: възраст, проблем, къде е онлайн, колко може да плати." },
    ],
    subTasks: [
      { index: 0, label: "Опиши идеалния си клиент (възраст, проблем, доход)" },
      { index: 1, label: "Намери 3 места онлайн, където тези хора се събират" },
      { index: 2, label: "Запиши главния проблем, който решаваш за тях" },
    ],
  },
  {
    id: "idea-business-model",
    categoryId: "IDEA",
    order: 3,
    title: "Избери бизнес модел и цена",
    priorityLevel: "strongly_recommended",
    difficulty: 3,
    explanation:
      "Бизнес моделът определя КАК печелиш пари. Абонамент? Еднократна продажба? Комисионна? Реклама? Определи това ПРЕДИ да строиш.",
    whyItMatters:
      "Без ясен бизнес модел рискуваш да построиш нещо, което не може да генерира приход. Цената влияе на всичко — от маркетинга до типа клиенти.",
    whenToDo: "След като знаеш аудиторията и проблема, който решаваш.",
    commonMistakes: [
      "Не мислиш за пари докато не стане 'твърде късно'",
      "Слагаш цена твърде ниска от страх",
      "Копираш цената на конкурент без да разбереш защо е такава",
    ],
    estimatedCostBGN: 0,
    costVerifiedYear: 2026,
    estimatedDays: 2,
    requiredDocuments: [],
    usefulLinks: [
      { label: "Strategyzer Business Model Canvas", url: "https://www.strategyzer.com/library/the-business-model-canvas", isOfficial: false },
    ],
    faq: [
      { question: "Мога ли да сменя бизнес модела после?", answer: "Да, но е по-лесно да тръгнеш с правилния. Промяната после изисква преработка на продукта." },
      { question: "Каква е добра начална цена?", answer: "Зависи от стойността. Правило: цената трябва да е 10x по-малка от стойността, която клиентът получава." },
    ],
    subTasks: [
      { index: 0, label: "Избери тип модел (абонамент, еднократно, freemium)" },
      { index: 1, label: "Определи начална цена" },
      { index: 2, label: "Сравни с цените на 2-3 конкурента" },
    ],
  },
]
