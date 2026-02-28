import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'zh' | 'en'

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

function detectLocale(): Locale {
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh')

  useEffect(() => {
    const saved = localStorage.getItem('resonance-locale')
    const initial = saved === 'zh' || saved === 'en' ? saved : detectLocale()
    setLocaleState(initial)
    document.documentElement.setAttribute('lang', initial === 'zh' ? 'zh-CN' : 'en')
  }, [])

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale)
    localStorage.setItem('resonance-locale', nextLocale)
    document.documentElement.setAttribute('lang', nextLocale === 'zh' ? 'zh-CN' : 'en')
  }

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}