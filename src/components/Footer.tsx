import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const nav = [
  { labelZh: '产品总览', labelEn: 'Overview', to: '/' },
  { labelZh: 'Benchmark', labelEn: 'Benchmark', to: '/benchmark' },
  { labelZh: '报价', labelEn: 'Pricing', to: '/pricing' },
  { labelZh: '语言列表', labelEn: 'Languages', to: '/languages' },
  { labelZh: '开发者入口', labelEn: 'Developers', to: '/developer' },
  { labelZh: '安全与合规', labelEn: 'Compliance', to: '/security' },
  { labelZh: '个人注册充值', labelEn: 'Personal Top-up', to: '/consumer-auth' },
  { labelZh: '企业 Azure 入口', labelEn: 'Enterprise Portal', to: '/enterprise' },
  { labelZh: '表演者合作', labelEn: 'Creator Partnership', to: '/creator-partnership' },
]

export default function Footer() {
  const { locale } = useLocale()

  return (
    <footer className="site-footer border-t border-cyan-300/10 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="glass-card grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="text-slate-300 transition hover:text-cyan-200">
              {locale === 'en' ? item.labelEn : item.labelZh}
            </Link>
          ))}
          <a
            href="https://learn.microsoft.com/azure/ai-services/speech-service/"
            className="text-slate-300 transition hover:text-cyan-200"
            target="_blank"
            rel="noreferrer"
          >
            {locale === 'en' ? 'SDK & Docs' : 'SDK 与文档'}
          </a>
          <div className="lg:col-span-4 flex flex-wrap items-center justify-end gap-3 pt-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}