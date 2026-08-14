"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, Plus, Wallet } from "lucide-react"
import { Footer } from "@/components/Footer"
import { UserMenu } from "@/components/UserMenu"

interface Expense {
  id: string
  name: string
  amount: number
  category: string
  type: "Еднократен" | "Месечен" | "Годишен"
  date: string
}

const STORAGE_KEY = "bln-expenses"

const CATEGORIES = [
  "Такси и регистрации",
  "Счетоводство",
  "Осигуровки",
  "Данъци",
  "Хостинг и домейн",
  "Инструменти",
  "Маркетинг",
  "Друго",
]

const TYPES = ["Еднократен", "Месечен", "Годишен"] as const

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loaded, setLoaded] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [type, setType] = useState<Expense["type"]>("Еднократен")
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setExpenses(JSON.parse(stored))
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses, loaded])

  const addExpense = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !amount) return
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      type,
      date,
    }
    setExpenses((prev) => [newExpense, ...prev])
    setName("")
    setAmount("")
  }, [name, amount, category, type, date])

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((ex) => ex.id !== id))
  }, [])

  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date))
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const monthlyTotal = expenses
    .filter((e) => e.type === "Месечен")
    .reduce((s, e) => s + e.amount, 0)
  const oneTimeTotal = expenses
    .filter((e) => e.type === "Еднократен")
    .reduce((s, e) => s + e.amount, 0)

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Зареждане...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Обратно към табло"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Link>
            <h1 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Разходи
            </h1>
          </div>
          <UserMenu />
        </div>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TotalCard label="Общо" value={total} />
          <TotalCard label="Месечни" value={monthlyTotal} />
          <TotalCard label="Еднократни" value={oneTimeTotal} />
        </div>

        {/* Add form */}
        <form onSubmit={addExpense} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
            Добави разход
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Наименование"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
            <input
              type="number"
              placeholder="Сума (€)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Категория"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Expense["type"])}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Тип разход"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Дата"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Добави разход"
            >
              <Plus className="w-4 h-4" />
              Добави
            </button>
          </div>
        </form>

        {/* Expenses list */}
        {sorted.length === 0 ? (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-8">
            Няма добавени разходи.
          </p>
        ) : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Наименование</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-300 hidden sm:table-cell">Категория</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Тип</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Сума</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600 dark:text-slate-300 hidden sm:table-cell">Дата</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sorted.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{exp.name}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{exp.category}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{exp.type}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">€{exp.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{exp.date}</td>
                    <td className="px-2 py-3">
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        aria-label={`Изтрий ${exp.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function TotalCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-center">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
        €{value.toFixed(2)}
      </p>
    </div>
  )
}
