import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'

export default function AccessSection() {
  const { locale } = useLocale()

  return (
    <section className="glass-card p-6">
      <h2 className="text-2xl font-semibold text-white">
        {locale === 'en' ? 'Start with Azure Speech Now' : '立即开始使用 Azure Speech'}
      </h2>
      <p className="mt-2 text-slate-300">
        {locale === 'en'
          ? 'Choose your path for personal top-up or enterprise Azure management.'
          : '按个人与企业两类入口快速开始。'}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link to="/consumer-auth" className="neon-btn inline-block">
          {locale === 'en' ? 'Personal Sign-up & Top-up' : '个人注册充值'}
        </Link>
        <Link to="/enterprise" className="ghost-btn inline-block">
          {locale === 'en' ? 'Enterprise Azure Portal' : '企业 Azure Portal'}
        </Link>
      </div>
    </section>
  )
}