import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'

export default function Header() {
  const { locale } = useLocale()

  return (
    <header className="site-header sticky top-0 z-50 border-b border-cyan-300/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png"
            alt="Microsoft"
            className="h-5 w-auto"
            loading="lazy"
          />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-xl font-bold text-transparent">
            Resonance
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-slate-300 transition hover:text-white">
            {locale === 'en' ? 'Home' : '首页'}
          </Link>
          <a
            href="https://portal.azure.com"
            target="_blank"
            rel="noreferrer"
            className="ghost-btn px-3 py-2 text-sm"
          >
            Azure Portal
          </a>
          <Link to="/consumer-auth" className="neon-btn px-3 py-2 text-sm">
            {locale === 'en' ? 'Sign in' : '2C 登录'}
          </Link>
        </nav>
      </div>
    </header>
  )
}