import { useMemo, useState } from 'react'

type PriceItem = {
  charge: string
  unitPrice: string
}

type ApiModel = {
  name: string
  items: PriceItem[]
}

type ServiceCategory = {
  category: string
  models: ApiModel[]
}

type PricingMenu = {
  mode: 'Pay as you go' | '套餐包'
  services: ServiceCategory[]
}

const pricingMenus: PricingMenu[] = [
  {
    mode: 'Pay as you go',
    services: [
      {
        category: 'Speech to Text',
        models: [
          {
            name: 'Real-time Streaming / Standard',
            items: [{ charge: '实时转写', unitPrice: '$1 / hour' }],
          },
          {
            name: 'Real-time Streaming / Custom',
            items: [
              { charge: '实时转写', unitPrice: '$1.20 / hour' },
              { charge: 'Endpoint Hosting', unitPrice: '$0.0538 / model / hour' },
            ],
          },
          {
            name: 'Enhanced Add-ons',
            items: [
              { charge: 'Continuous Language ID', unitPrice: '$0.30 / hour / feature' },
              { charge: 'Diarization', unitPrice: '$0.30 / hour / feature' },
              { charge: 'Pronunciation Assessment', unitPrice: '$0.30 / hour / feature' },
            ],
          },
          {
            name: 'Offline (File Based)',
            items: [
              { charge: 'Fast Transcription / Standard', unitPrice: '$0.36 / hour' },
              { charge: 'Batch Transcription / Standard', unitPrice: '$0.18 / hour' },
              { charge: 'Fast Transcription / Custom', unitPrice: '$0.45 / hour' },
              { charge: 'Batch Transcription / Custom', unitPrice: '$0.22 / hour' },
            ],
          },
          {
            name: 'Custom Speech Training',
            items: [{ charge: '训练计算', unitPrice: '$10.00 / compute hour' }],
          },
        ],
      },
      {
        category: 'Speech Translation',
        models: [
          {
            name: 'Standard Translation API',
            items: [{ charge: 'Real-time Speech Translation', unitPrice: '$2.50 / audio hour' }],
          },
        ],
      },
      {
        category: 'Text to Speech / Avatar',
        models: [
          {
            name: 'Neural TTS',
            items: [{ charge: 'Synthesis (real-time + batch)', unitPrice: '$15 / 1M characters' }],
          },
          {
            name: 'Custom Voice Professional',
            items: [
              { charge: 'Synthesis', unitPrice: '$24 / 1M characters' },
              { charge: 'Training', unitPrice: '$52 / compute hour' },
            ],
          },
          {
            name: 'Avatar',
            items: [{ charge: 'Interactive/Batch Avatar', unitPrice: '按分钟计费（以官方页面实时价格为准）' }],
          },
        ],
      },
    ],
  },
  {
    mode: '套餐包',
    services: [
      {
        category: 'Speech to Text Commitment Tier',
        models: [
          {
            name: 'Standard',
            items: [
              { charge: '2,000 小时包', unitPrice: '$1,600（$0.80/hour）' },
              { charge: '10,000 小时包', unitPrice: '$6,500（$0.65/hour）' },
              { charge: '50,000 小时包', unitPrice: '$25,000（$0.50/hour）' },
            ],
          },
          {
            name: 'Custom',
            items: [
              { charge: '2,000 小时包', unitPrice: '$1,920（$0.96/hour）' },
              { charge: '10,000 小时包', unitPrice: '$7,800（$0.78/hour）' },
              { charge: '50,000 小时包', unitPrice: '$30,000（$0.60/hour）' },
            ],
          },
        ],
      },
      {
        category: 'Text to Speech Commitment Tier',
        models: [
          {
            name: 'Neural',
            items: [
              { charge: '80M 字符', unitPrice: '$960（$12 / 1M）' },
              { charge: '400M 字符', unitPrice: '$3,900（$9.75 / 1M）' },
              { charge: '2,000M 字符', unitPrice: '$15,000（$7.50 / 1M）' },
            ],
          },
        ],
      },
    ],
  },
]

export default function PricingPage() {
  const [mode, setMode] = useState<PricingMenu['mode']>('Pay as you go')
  const [category, setCategory] = useState('Speech to Text')

  const currentMode = useMemo(() => pricingMenus.find((menu) => menu.mode === mode) ?? pricingMenus[0], [mode])
  const categories = useMemo(() => currentMode.services.map((service) => service.category), [currentMode])
  const currentCategory = useMemo(
    () => currentMode.services.find((service) => service.category === category) ?? currentMode.services[0],
    [currentMode, category],
  )

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="section-title">Pricing</h1>
      <p className="mt-3 max-w-5xl text-slate-300">
        按“付费模式 → 服务类别 → Model/API → 收费项目、单价”组织。页面价格用于网站展示 mockup，生产报价请以 Azure 官方定价页面实时区域价格为准。
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[240px_240px_1fr]">
        <section className="glass-card p-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">付费模式</p>
          <div className="flex flex-col gap-2">
            {pricingMenus.map((menu) => (
              <button
                key={menu.mode}
                type="button"
                onClick={() => {
                  setMode(menu.mode)
                  setCategory(menu.services[0].category)
                }}
                className={`rounded-lg px-3 py-2 text-left text-sm transition ${mode === menu.mode ? 'bg-cyan-400/20 text-cyan-100' : 'bg-slate-900/60 text-slate-300 hover:text-white'}`}
              >
                {menu.mode}
              </button>
            ))}
          </div>
        </section>

        <section className="glass-card p-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">服务类别</p>
          <div className="flex flex-col gap-2">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition ${currentCategory.category === name ? 'bg-violet-400/20 text-violet-100' : 'bg-slate-900/60 text-slate-300 hover:text-white'}`}
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section className="glass-card overflow-hidden p-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">Model / API</p>
          <div className="space-y-4">
            {currentCategory.models.map((model) => (
              <article key={model.name} className="rounded-xl border border-cyan-300/15 bg-slate-900/55 p-4">
                <h2 className="text-lg font-semibold text-white">{model.name}</h2>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-cyan-200">
                        <th className="px-2 py-2">收费项目</th>
                        <th className="px-2 py-2">单价</th>
                      </tr>
                    </thead>
                    <tbody>
                      {model.items.map((item) => (
                        <tr key={item.charge} className="border-t border-slate-700/50 text-slate-200">
                          <td className="px-2 py-2">{item.charge}</td>
                          <td className="px-2 py-2">{item.unitPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}