import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

type InternalFooterLink = {
  labelZh: string
  labelEn: string
  to: string
}

type ExternalFooterLink = {
  labelZh: string
  labelEn: string
  href: string
}

type FooterLink = InternalFooterLink | ExternalFooterLink

type FooterGroup = {
  titleZh: string
  titleEn: string
  links: FooterLink[]
}

const footerGroups: FooterGroup[] = [
  {
    titleZh: '产品',
    titleEn: 'Products',
    links: [
      { labelZh: '产品总览', labelEn: 'Overview', to: '/' },
      { labelZh: 'Benchmark', labelEn: 'Benchmark', to: '/benchmark' },
      { labelZh: '报价', labelEn: 'Pricing', to: '/pricing' },
      { labelZh: '语言列表', labelEn: 'Languages', to: '/languages' },
    ],
  },
  {
    titleZh: '方案与入口',
    titleEn: 'Solutions',
    links: [
      { labelZh: '开发者入口', labelEn: 'Developers', to: '/developer' },
      { labelZh: '企业 Azure 入口', labelEn: 'Enterprise Portal', to: '/enterprise' },
      { labelZh: '个人注册充值', labelEn: 'Personal Top-up', to: '/consumer-auth' },
      { labelZh: '表演者合作', labelEn: 'Creator Partnership', to: '/creator-partnership' },
    ],
  },
  {
    titleZh: '资源',
    titleEn: 'Resources',
    links: [
      { labelZh: '安全与合规', labelEn: 'Compliance', to: '/security' },
      {
        labelZh: 'SDK 与文档',
        labelEn: 'SDK & Docs',
        href: 'https://learn.microsoft.com/azure/ai-services/speech-service/',
      },
    ],
  },
]

export default function Footer() {
  const { locale } = useLocale()

  return (
    <footer className="site-footer bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 rounded-2xl bg-slate-900/45 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.titleEn} className="space-y-2">
              <p className="text-sm font-semibold text-cyan-200">{locale === 'en' ? group.titleEn : group.titleZh}</p>
              <div className="flex flex-col gap-2 text-sm">
                {group.links.map((item) =>
                  'to' in item ? (
                    <Link key={item.to} to={item.to} className="text-slate-300 transition hover:text-cyan-200">
                      {locale === 'en' ? item.labelEn : item.labelZh}
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-slate-300 transition hover:text-cyan-200"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {locale === 'en' ? item.labelEn : item.labelZh}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1 lg:self-end lg:justify-self-end flex flex-wrap items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}