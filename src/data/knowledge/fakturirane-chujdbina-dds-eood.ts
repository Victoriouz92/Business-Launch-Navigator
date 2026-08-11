import { Article } from "../knowledge"

export const fakturiraneChujdbinaDdsEood: Article = {
  slug: "fakturirane-chujdbina-dds-eood",
  title: "Фактуриране към чужбина и онлайн услуги (Google, Meta, Upwork): ДДС капани за ЕООД",
  metaDescription:
    "Ползваш ли реклами във Facebook или услуги от ЕС? Научи кога е задължителна регистрацията по чл. 97а от ЗДДС и как да избегнеш глоби от НАП.",
  publishedDate: "2026-08-11",
  heroIcon: "invoice-abroad",
  heroTone: "violet",
  blocks: [
    { type: "heading", icon: "globe", text: "Специалната регистрация по чл. 97а от ЗДДС" },
    {
      type: "paragraph",
      text: "Много нови собственици на фирми смятат, че щом нямат оборот от 51 130 € (~100 000 лв.), нямат нищо общо с ДДС. Това е опасна заблуда!",
    },
    {
      type: "paragraph",
      text: "Ако твоята фирма купува или продава услуги в рамките на ЕС, подлежиш на задължителна регистрация по чл. 97а от ЗДДС:",
    },
    {
      type: "steps",
      numbered: false,
      items: [
        {
          title: "Примери",
          description: "Купуване на реклама от Meta (Facebook/Instagram) или Google Ads, ползване на платформи като Upwork, Fiverr, Stripe, Canva, Zoom.",
        },
        {
          title: "Срок",
          description: "Регистрацията трябва да се направи най-малко 7 дни преди първата сделка или плащане!",
        },
      ],
    },

    { type: "heading", icon: "lightbulb", text: "Какво означава тази регистрация за теб?" },
    {
      type: "steps",
      numbered: false,
      items: [
        {
          title: "Няма 20% ДДС за български клиенти",
          description: "Тази регистрация НЕ те задължава да начисляваш ДДС на местните си клиенти.",
        },
        {
          title: "Месечно отчитане",
          description: "Всяка месечна фактура от Meta или Google трябва да се предава на счетоводителя за подаване на ДДС дневници и VIES декларация.",
        },
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "Глоба: покупката на реклама във Facebook без регистрация по чл. 97а води до санкции от НАП, започващи от 250.00 € (~500 лв.).",
    },

    { type: "heading", icon: "wrench", text: "Избегни данъчните капани навреме" },
    {
      type: "cta",
      title: "Прегледай стъпките за ДДС регистрация и фактуриране",
      text: "Възползвай се от нашия безплатен интерактивен чеклист, за да не пропуснеш регистрация по чл. 97а.",
      buttonLabel: "Стартирай безплатно",
      href: "/onboarding",
    },
  ],
}
