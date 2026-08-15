import Link from "next/link"
import { ClipboardList, Wallet, Scale, Building2, type LucideIcon } from "lucide-react"
import { Logo } from "@/components/Logo"
import { HomeCTA } from "@/components/HomeCTA"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <main id="main-content" className="flex flex-col items-center gap-8 px-6 py-16 text-center max-w-2xl">
        {/* Specificity badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-950/50 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300">
          <Building2 className="w-4 h-4" />
          Специализирано за регистрация на ЕООД
        </span>

        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-4">
          <Logo size="xl" letters />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Business Launch Navigator
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
          Твоят пътеводител за <strong className="font-semibold text-slate-900 dark:text-white">регистрация на ЕООД</strong> в България.
          Стъпка по стъпка — от идея до първия клиент.
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
          <FeatureCard icon={ClipboardList} title="Пълен пътеводител" description="20+ стъпки за регистрация на ЕООД" />
          <FeatureCard icon={Wallet} title="Минимални разходи" description="Безплатни алтернативи за всяко нещо" />
          <FeatureCard icon={Scale} title="Официални източници" description="НАП, Търговски регистър, НОИ" />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <HomeCTA />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Влизането е по избор — само за да запазиш прогреса на всички устройства.
          </p>
        </div>

        {/* Trust note */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Напълно безплатно • Без кредитна карта • Фокус върху ЕООД в България
        </p>

        {/* Secondary links */}
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/login" className="hover:text-slate-700 dark:hover:text-slate-200 hover:underline">
            Вход
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/guides" className="hover:text-slate-700 dark:hover:text-slate-200 hover:underline">
            Наръчници
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/support" className="hover:text-slate-700 dark:hover:text-slate-200 hover:underline">
            Подкрепете проекта
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-slate-700 dark:hover:text-slate-200 hover:underline">
            Свържете се с нас
          </Link>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}
