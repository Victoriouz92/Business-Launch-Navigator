export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <main className="flex flex-col items-center gap-8 px-6 py-16 text-center max-w-2xl">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Business Launch Navigator
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
          Твоят пътеводител за стартиране на бизнес в България.
          Стъпка по стъпка — от идея до първия клиент.
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
          <FeatureCard emoji="📋" title="Пълен пътеводител" description="20+ стъпки за регистрация на ЕООД" />
          <FeatureCard emoji="💰" title="Минимални разходи" description="Безплатни алтернативи за всяко нещо" />
          <FeatureCard emoji="⚖️" title="Официални източници" description="НАП, Търговски регистър, НОИ" />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Започни безплатно
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Вход
          </a>
        </div>

        {/* Trust note */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Безплатен план • Без кредитна карта • Фокус върху ЕООД в България
        </p>
      </main>
    </div>
  )
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
      <span className="text-2xl">{emoji}</span>
      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}
