import { Link } from 'react-router-dom'
import { valuePillars } from '../data/siteContent'

export default function ValueCards() {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-3">
      {valuePillars.map((pillar) => (
        <article key={pillar.title} className="glass-card p-6 transition duration-300 hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{pillar.subtitle}</p>
          <Link to={pillar.href} className="mt-4 inline-block text-cyan-300 transition hover:text-cyan-200">
            {pillar.cta} →
          </Link>
        </article>
      ))}
      </div>
    </section>
  )
}