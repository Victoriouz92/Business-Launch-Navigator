"use client"

import { useState, useRef, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Settings, LogOut, ChevronDown, User, UserPlus, LogIn } from "lucide-react"

export function UserMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  if (status === "loading") return null

  const email = session?.user?.email

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 p-1 pr-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label="Профил"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {email ? (
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
            {email.charAt(0).toUpperCase()}
          </span>
        ) : (
          <span className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-600 text-white flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4" />
          </span>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 z-20"
        >
          {email ? (
            <>
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Влязъл като</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{email}</p>
              </div>
              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Settings className="w-4 h-4" />
                Настройки
              </Link>
              <button
                role="menuitem"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut className="w-4 h-4" />
                Изход
              </button>
            </>
          ) : (
            <>
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Гост</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Прогресът се пази само в този браузър.
                </p>
              </div>
              <Link
                href="/register"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                <UserPlus className="w-4 h-4" />
                Създайте профил
              </Link>
              <Link
                href="/login"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <LogIn className="w-4 h-4" />
                Вход
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
