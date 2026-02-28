import { useEffect, useMemo, useState } from 'react'
import { useLocale } from '../context/LocaleContext'

type ThemeMode = 'light' | 'dark'

function getSystemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const { locale } = useLocale()
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('resonance-theme')
    const initial = saved === 'light' || saved === 'dark' ? saved : getSystemTheme()
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('resonance-theme')) {
        const next = event.matches ? 'dark' : 'light'
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
      }
    }

    media.addEventListener('change', onSystemChange)
    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  const nextLabel = useMemo(() => {
    if (locale === 'en') {
      return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    }

    return theme === 'dark' ? '切换浅色背景' : '切换深色背景'
  }, [locale, theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('resonance-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button type="button" onClick={toggleTheme} className="theme-slider" aria-label={nextLabel}>
      <span className={`theme-slider-track ${theme === 'light' ? 'is-light' : ''}`}>
        <span className="theme-slider-label">{locale === 'en' ? 'Theme' : '主题'}</span>
        <span className="theme-slider-knob" />
      </span>
    </button>
  )
}