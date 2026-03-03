import { useMemo, useState } from 'react'

type BusinessMode = 'creator' | 'enterprise'

type CreatorUsagePrice = {
  service: string
  unit: string
  price: string
  note: string
}

type CreatorPackage = {
  tier: string
  monthly: string
  quota: string
  overage: string
  fit: string
}

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

const creatorUsagePrices: CreatorUsagePrice[] = [
  {
    service: '对话智能体（实时对话）',
    unit: '按分钟（双向音频）',
    price: '¥0.65 / 分钟',
    note: '适用于客服、销售、教育等低延迟语音交互场景',
  },
  {
    service: '视频素材生成，配音',
    unit: '按字符',
    price: '¥15 / 100万字符',
    note: '支持多音色配音与批量脚本生成',
  },
  {
    service: '会议转写分析',
    unit: '按音频时长',
    price: '¥2.2 / 小时',
    note: '含说话人分离、摘要与行动项提取',
  },
  {
    service: '同声传译',
    unit: '按分钟（实时流）',
    price: '¥0.95 / 分钟',
    note: '支持多语实时互译，可联动 TTS 输出',
  },
  {
    service: '视频翻译',
    unit: '按视频分钟',
    price: '¥1.9 / 分钟',
    note: '包含字幕翻译与配音输出',
  },
]

const creatorPackages: CreatorPackage[] = [
  {
    tier: 'Creator Starter',
    monthly: '¥199 / 月',
    quota: '含 500 分钟语音调用 + 300 万字符 TTS',
    overage: '超额按随用随付 9 折',
    fit: '个人创作者 / 播客试运行',
  },
  {
    tier: 'Creator Pro',
    monthly: '¥699 / 月',
    quota: '含 2,500 分钟语音调用 + 1,500 万字符 TTS',
    overage: '超额按随用随付 8 折',
    fit: '稳定更新的内容团队',
  },
  {
    tier: 'Creator Studio',
    monthly: '¥1,999 / 月',
    quota: '含 10,000 分钟语音调用 + 6,000 万字符 TTS',
    overage: '超额按随用随付 7 折',
    fit: '多账号协同与工作室批量生产',
  },
]

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
  const [businessMode, setBusinessMode] = useState<BusinessMode>('creator')
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
        选择适合你的商业模式：个人创作者可用随用随付或包月套餐；企业方案对齐 Azure AI Speech 官方计费体系。
      </p>

      <section className="glass-card mt-6 p-4">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">商业模式</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setBusinessMode('creator')}
            className={`rounded-lg px-4 py-2 text-sm transition ${businessMode === 'creator' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-900/60 text-slate-300 hover:text-white'}`}
          >
            个人创作者（随用随付 / 包月）
          </button>
          <button
            type="button"
            onClick={() => setBusinessMode('enterprise')}
            className={`rounded-lg px-4 py-2 text-sm transition ${businessMode === 'enterprise' ? 'bg-violet-400/25 text-violet-100' : 'bg-slate-900/60 text-slate-300 hover:text-white'}`}
          >
            企业定价（Azure AI Speech）
          </button>
        </div>
      </section>

      {businessMode === 'creator' ? (
        <section className="mt-6 space-y-4">
          <article className="glass-card overflow-hidden p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">个人创作者 · 随用随付</h2>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">Pay as you go</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-cyan-200">
                    <th className="px-2 py-2">服务能力（与首页功能对齐）</th>
                    <th className="px-2 py-2">计费单位</th>
                    <th className="px-2 py-2">价格</th>
                    <th className="px-2 py-2">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorUsagePrices.map((item) => (
                    <tr key={item.service} className="border-t border-slate-700/50 text-slate-200">
                      <td className="px-2 py-2">{item.service}</td>
                      <td className="px-2 py-2">{item.unit}</td>
                      <td className="px-2 py-2">{item.price}</td>
                      <td className="px-2 py-2">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="glass-card overflow-hidden p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">个人创作者 · 包月套餐</h2>
              <span className="rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-xs text-violet-100">Monthly package</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-cyan-200">
                    <th className="px-2 py-2">套餐</th>
                    <th className="px-2 py-2">月费</th>
                    <th className="px-2 py-2">包含额度</th>
                    <th className="px-2 py-2">超额计费</th>
                    <th className="px-2 py-2">适用对象</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorPackages.map((item) => (
                    <tr key={item.tier} className="border-t border-slate-700/50 text-slate-200">
                      <td className="px-2 py-2">{item.tier}</td>
                      <td className="px-2 py-2">{item.monthly}</td>
                      <td className="px-2 py-2">{item.quota}</td>
                      <td className="px-2 py-2">{item.overage}</td>
                      <td className="px-2 py-2">{item.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <p className="text-xs text-slate-400">
            说明：个人创作者套餐格式参考行业常见语音平台写法，具体账单以控制台结算页为准。
          </p>
        </section>
      ) : (
        <section className="mt-6">
          <p className="mb-4 text-sm text-slate-300">
            企业报价按“付费模式 → 服务类别 → Model/API → 收费项目、单价”组织，生产报价请以 Azure 官方定价页面实时区域价格为准。
          </p>

          <div className="grid gap-4 lg:grid-cols-[240px_240px_1fr]">
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
        </section>
      )}
    </main>
  )
}