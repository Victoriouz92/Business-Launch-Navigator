import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Политика за поверителност — Business Launch Navigator",
  description: "Каква информация събира Business Launch Navigator, защо, и какви права имаш.",
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:underline">
          ← Начало
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Политика за поверителност
        </h1>
        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
          Последна актуализация: 12 август 2026 г.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <Section title="Кой обработва данните">
            <p>
              Business Launch Navigator се разработва и поддържа от Виктор Велев (Victor Velev), под
              името VV Labs. Проектът не е регистрирано юридическо лице — VV Labs е име на проекта, не
              на фирма. Администратор на личните данни е физическото лице Виктор Велев. За въпроси
              относно тази политика или твоите данни, пиши през{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                формата за контакт
              </Link>
              .
            </p>
          </Section>

          <Section title="Какви данни събираме">
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong>При регистрация на профил:</strong> имейл адрес и парола (съхранена само като
                хеш, никога в четим вид).
              </li>
              <li>
                <strong>Прогрес в чеклиста:</strong> кои стъпки си отбелязал като завършени, отговорите
                ти от onboarding-а (тип бизнес, планиран бюджет) — само ако имаш профил. Без профил
                същите данни се пазят единствено в браузъра ти (localStorage) и никога не достигат до
                нашите сървъри.
              </li>
              <li>
                <strong>Съобщения през контактната форма:</strong> имейлът и текста, който въведеш,
                изпратени директно към нас за отговор.
              </li>
              <li>
                <strong>Анонимна статистика за посещения (Google Analytics):</strong> само след твоето
                изрично съгласие през банера за бисквитки — виж секцията по-долу.
              </li>
            </ul>
          </Section>

          <Section title="Защо събираме тези данни">
            <p>
              Изключително за да работи услугата: да пазим прогреса ти между устройства, да отговорим на
              съобщенията ти, и — при съгласие — да разберем кои части от сайта са полезни, за да го
              подобряваме. Не продаваме и не споделяме данните ти с трети страни за маркетингови цели.
            </p>
          </Section>

          <Section title="Бисквитки и Google Analytics">
            <p>
              Ползваме Google Analytics 4, за да видим общи, анонимизирани данни за посещенията (напр.
              кои страници се четат най-много). Скриптът се зарежда <strong>само след</strong> като
              натиснеш „Приемам“ в банера за бисквитки — можеш по всяко време да откажеш или да изчистиш
              избора си, като изтриеш localStorage данните на сайта от настройките на браузъра си.
              Google обработва тези данни съгласно{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                собствената си политика за поверителност
              </a>
              .
            </p>
          </Section>

          <Section title="Къде се съхраняват данните">
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong>База данни</strong> (профили, прогрес): Neon (PostgreSQL), сървър в ЕС
                (Франкфурт, Германия).
              </li>
              <li>
                <strong>Хостинг на сайта:</strong> Vercel.
              </li>
              <li>
                <strong>Изпращане на имейли</strong> от контактната форма: Resend.
              </li>
              <li>
                <strong>Анализ на трафика</strong> (при съгласие): Google Analytics.
              </li>
              <li>
                <strong>Технически грешки</strong> (crash/bug доклади, за да поправяме проблеми):
                Sentry. Не изисква отделно съгласие като Google Analytics, тъй като е техническа
                необходимост за поддръжка на услугата, не проследяване на поведение — данните са
                стек следи (stack traces) на грешки, не лична информация за навигацията ти.
              </li>
            </ul>
            <p className="mt-2">
              Всеки от тези доставчици обработва само необходимия минимум данни, за да предостави
              съответната услуга.
            </p>
          </Section>

          <Section title="Твоите права">
            <p>Имаш право по всяко време да:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-1">
              <li>поискаш копие от данните, които пазим за теб;</li>
              <li>поискаш корекция на неточни данни;</li>
              <li>поискаш пълно изтриване на профила и данните си;</li>
              <li>оттеглиш съгласието си за Google Analytics по всяко време.</li>
            </ul>
            <p className="mt-2">
              За изтриване или корекция на профила, пиши ни през{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                контактната форма
              </Link>{" "}
              — ще обработим заявката без излишно забавяне.
            </p>
          </Section>

          <Section title="Задържане на данни">
            <p>
              Пазим данните на профила ти, докато съществува. Ако поискаш изтриване, го извършваме без
              излишно забавяне. Анонимните аналитични данни в Google Analytics се задържат съгласно
              стандартните настройки на GA4.
            </p>
          </Section>

          <Section title="Промени в тази политика">
            <p>
              Проектът се развива активно — тази политика може да се обновява. Датата
              на последната актуализация е посочена в началото на страницата.
            </p>
          </Section>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{title}</h2>
      {children}
    </section>
  )
}
