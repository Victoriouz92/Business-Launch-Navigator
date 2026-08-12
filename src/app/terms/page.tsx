import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Условия за ползване — Business Launch Navigator",
  description: "Условията, при които предоставяме Business Launch Navigator.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:underline">
          ← Начало
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Условия за ползване
        </h1>
        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
          Последна актуализация: 12 август 2026 г.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <Section title="Какво е Business Launch Navigator">
            <p>
              Безплатна интерактивна платформа, която помага при регистрацията и воденето на ЕООД в
              България — чеклист със стъпки и наръчници (Наръчници) със статии. Разработва се от VV
              Labs и е изцяло безплатна през бета фазата.
            </p>
          </Section>

          <Section title="Съдържанието не е правен или данъчен съвет">
            <p>
              Цялото съдържание в сайта — стъпки от чеклиста, статии в Наръчници, калкулатори — е
              <strong> образователно</strong> и се основава на публично достъпна информация към
              посочените дати на проверка. То не заменя консултация с адвокат, счетоводител или друг
              лицензиран специалист за твоя конкретен случай. Използваш информацията на своя отговорност.
            </p>
          </Section>

          <Section title="Безплатен достъп, без гаранции">
            <p>
              Услугата се предоставя „както е", без гаранция за непрекъсната наличност, липса на
              грешки, или актуалност на всяка правна/данъчна цифра във всеки момент. Полагаме грижа
              информацията да е вярна и обновена, но законодателството се променя — винаги провери
              официалните източници (НАП, Търговски регистър, НОИ), към които препращаме.
            </p>
          </Section>

          <Section title="Профил и отговорности">
            <ul className="list-disc list-inside space-y-1.5">
              <li>Създаването на профил е по избор — чеклистът работи и анонимно, в браузъра ти.</li>
              <li>Отговаряш за поверителността на паролата си.</li>
              <li>
                Можеш да поискаш изтриване на профила си по всяко време през{" "}
                <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                  контактната форма
                </Link>
                .
              </li>
              <li>Запазваме си правото да ограничим достъп при злоупотреба с услугата.</li>
            </ul>
          </Section>

          <Section title="Промени в услугата">
            <p>
              Проектът е в активна разработка — функции могат да се добавят, променят или премахват.
              При съществени промени в тези условия ще обновим датата по-горе.
            </p>
          </Section>

          <Section title="Приложимо право">
            <p>
              Тези условия се уреждат от българското законодателство. За обработката на лични данни виж{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Политиката за поверителност
              </Link>
              .
            </p>
          </Section>

          <Section title="Контакт">
            <p>
              Въпроси относно тези условия — през{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                формата за контакт
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
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
