import { useLocale } from '../context/LocaleContext'

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="lang-toggle" role="group" aria-label="Language switcher">
      <button type="button" className={locale === 'zh' ? 'is-active' : ''} onClick={() => setLocale('zh')}>
        中文
      </button>
      <button type="button" className={locale === 'en' ? 'is-active' : ''} onClick={() => setLocale('en')}>
        EN
      </button>
    </div>
  )
}