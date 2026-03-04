import { Link } from 'react-router-dom'
import { valuePillars } from '../data/siteContent'
import { useLocale } from '../context/LocaleContext'

export default function ValueCards() {
  const { locale } = useLocale()

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-3">
        {valuePillars.map((pillar) => (
          <article key={pillar.title} className="glass-card p-6 transition duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-white">{locale === 'en' ? pillar.titleEn ?? pillar.title : pillar.titleZh ?? pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{locale === 'en' ? pillar.subtitleEn ?? pillar.subtitle : pillar.subtitleZh ?? pillar.subtitle}</p>
            <Link to={pillar.href} className="mt-4 inline-block text-cyan-300 transition hover:text-cyan-200">
              {(locale === 'en' ? pillar.ctaEn ?? pillar.cta : pillar.ctaZh ?? pillar.cta)} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}