import { useEffect, useState } from 'react'
import { testimonials } from '../data/siteContent'
import { useLocale } from '../context/LocaleContext'

export default function TestimonialCarousel() {
  const { locale } = useLocale()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const item = testimonials[index]

  return (
    <section className="testimonial-shell p-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
        {locale === 'en' ? 'Customer Stories' : '客户案例与证言'}
      </p>
      <blockquote className="mt-3 text-xl text-slate-100">“{item.quote}”</blockquote>
      <p className="mt-2 text-sm text-slate-400">— {item.customer}</p>
    </section>
  )
}