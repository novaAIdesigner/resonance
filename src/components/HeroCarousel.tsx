import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { releases } from '../data/siteContent'
import { useLocale } from '../context/LocaleContext'

export default function HeroCarousel() {
  const { locale } = useLocale()
  const [index, setIndex] = useState(0)
  const current = useMemo(() => releases[index], [index])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % releases.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  function goPrev() {
    setIndex((prev) => (prev - 1 + releases.length) % releases.length)
  }

  function goNext() {
    setIndex((prev) => (prev + 1) % releases.length)
  }

  const isExternalHref = current.href.startsWith('http')

  return (
    <section className="hero-shell">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-2xl" />
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
        {locale === 'en' ? 'Latest Releases' : '最新发布'}
      </p>
      <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">{current.title}</h1>
      <p className="mt-4 max-w-2xl text-slate-300">{current.summary}</p>

      <button type="button" onClick={goPrev} aria-label="Previous slide" className="hero-nav-btn left-2 sm:left-4">
        &lt;
      </button>
      <button type="button" onClick={goNext} aria-label="Next slide" className="hero-nav-btn right-2 sm:right-4">
        &gt;
      </button>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {isExternalHref ? (
          <a href={current.href} target="_blank" rel="noreferrer" className="neon-btn">
            {locale === 'en' ? 'View Details' : '查看详情'}
          </a>
        ) : (
          <Link to={current.href} className="neon-btn">
            {locale === 'en' ? 'View Product Page' : '查看产品单页'}
          </Link>
        )}
        <div className="flex gap-2 rounded-full border border-cyan-300/20 bg-slate-900/60 px-3 py-2">
          {releases.map((release, i) => (
            <button
              type="button"
              key={release.title}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-8 rounded-full transition ${i === index ? 'bg-gradient-to-r from-cyan-300 to-violet-300' : 'bg-slate-700'}`}
              aria-label={`Go to release ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}