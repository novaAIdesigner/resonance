import { useLocale } from '../context/LocaleContext'

export default function CreatorPartnershipPage() {
  const { locale } = useLocale()

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="section-title">
        {locale === 'en' ? 'Performer & Voice Actor Partnership' : '表演者与配音演员合作'}
      </h1>
      <p className="mt-3 text-slate-300">
        {locale === 'en'
          ? 'Resonance provides collaboration channels for performers and voice actors, including transparent revenue sharing and licensing operations support.'
          : 'Resonance 为表演者和配音演员提供合作入口，支持透明利润分成与授权运营。'}
      </p>

      <section className="glass-card mt-6 p-6">
        <h2 className="text-xl font-semibold text-white">{locale === 'en' ? 'Program Highlights' : '合作亮点'}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
          <li>{locale === 'en' ? 'Revenue sharing by usage and package type' : '按调用量与套餐类型进行利润分享'}</li>
          <li>{locale === 'en' ? 'Commercial authorization and scope guidance' : '商业授权范围与使用边界指导'}</li>
          <li>{locale === 'en' ? 'License contract templates and onboarding support' : '许可协议模板与上架流程支持'}</li>
        </ul>
      </section>
    </main>
  )
}