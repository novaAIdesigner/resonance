import { Link } from 'react-router-dom'
import AccessSection from '../components/AccessSection'
import HeroCarousel from '../components/HeroCarousel'
import ScenarioGrid from '../components/ScenarioGrid'
import TestimonialCarousel from '../components/TestimonialCarousel'
import ValueCards from '../components/ValueCards'
import { useLocale } from '../context/LocaleContext'

export default function HomePage() {
  const { locale } = useLocale()

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
      <HeroCarousel />
      <ValueCards />
      <ScenarioGrid />
      <TestimonialCarousel />
      <AccessSection />

      <section className="glass-card p-6">
        <h2 className="section-title">
          {locale === 'en' ? 'Why Speech Studio + Resonance' : '为什么选择 Speech Studio + Resonance'}
        </h2>
        <p className="mt-2 text-slate-300">
          {locale === 'en'
            ? 'Speech Studio solves discoverability and productization gaps with a direct experience layer, API-first workflow, and clear monetization paths.'
            : 'Speech Studio 通过可体验入口、API 体系和清晰计费，解决了服务不可见与 2C 不友好的问题。'}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-cyan-300/15 bg-slate-900/45 p-4">
            <h3 className="text-lg font-semibold text-white">
              {locale === 'en' ? 'For Developers' : '面向开发人员'}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              <li>{locale === 'en' ? 'Unified SDK and API docs' : '统一 SDK 与 API 文档体系'}</li>
              <li>{locale === 'en' ? 'GitHub sample code for fast integration' : 'GitHub 示例代码快速接入'}</li>
              <li>{locale === 'en' ? 'Production-ready security and compliance baseline' : '生产可用的安全合规基线'}</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="https://learn.microsoft.com/en-us/azure/ai-services/speech-service/" target="_blank" rel="noreferrer" className="ghost-btn px-3 py-2 text-sm">
                {locale === 'en' ? 'SDK & Docs' : 'SDK 与文档'}
              </a>
              <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk" target="_blank" rel="noreferrer" className="ghost-btn px-3 py-2 text-sm">
                GitHub Samples
              </a>
            </div>
          </article>

          <article className="rounded-xl border border-cyan-300/15 bg-slate-900/45 p-4">
            <h3 className="text-lg font-semibold text-white">
              {locale === 'en' ? 'For Business Decision Makers' : '面向商业决策人员'}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              <li>{locale === 'en' ? 'Transparent pricing and capacity planning' : '透明价格与容量规划'}</li>
              <li>{locale === 'en' ? 'Enterprise compliance and governance readiness' : '企业级合规与治理可落地'}</li>
              <li>{locale === 'en' ? 'Responsible AI alignment for regulated scenarios' : '符合负责任 AI 要求，适配监管场景'}</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="https://learn.microsoft.com/en-us/azure/compliance/" target="_blank" rel="noreferrer" className="ghost-btn px-3 py-2 text-sm">
                {locale === 'en' ? 'Security & Compliance' : '安全与合规'}
              </a>
              <a href="https://learn.microsoft.com/en-us/legal/ai-code-of-conduct" target="_blank" rel="noreferrer" className="ghost-btn px-3 py-2 text-sm">
                {locale === 'en' ? 'Responsible AI' : '负责任 AI'}
              </a>
            </div>
          </article>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-300/15 bg-slate-900/45 p-4">
          <h3 className="text-lg font-semibold text-white">
            {locale === 'en' ? 'Performer & Voice Actor Partnership' : '表演者 / 配音演员合作计划'}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {locale === 'en'
              ? 'Join voice asset collaborations with revenue sharing, usage authorization guidance, and licensing support.'
              : '开放语音资产合作，提供利润分享、授权使用指导与许可证支持。'}
          </p>
          <Link to="/creator-partnership" className="neon-btn mt-3 inline-block text-sm">
            {locale === 'en' ? 'Apply for Partnership' : '申请合作入口'}
          </Link>
        </div>
      </section>
    </main>
  )
}