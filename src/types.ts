export type Release = {
  title: string
  summary: string
  href: string
  titleZh?: string
  titleEn?: string
  summaryZh?: string
  summaryEn?: string
}

export type ValuePillar = {
  title: string
  subtitle: string
  cta: string
  href: string
  titleZh?: string
  titleEn?: string
  subtitleZh?: string
  subtitleEn?: string
  ctaZh?: string
  ctaEn?: string
}

export type Scenario = {
  name: string
  description: string
  endpoint: string
  productHref: string
  nameZh?: string
  nameEn?: string
  descriptionZh?: string
  descriptionEn?: string
}

export type Testimonial = {
  customer: string
  quote: string
  customerZh?: string
  customerEn?: string
  quoteZh?: string
  quoteEn?: string
}