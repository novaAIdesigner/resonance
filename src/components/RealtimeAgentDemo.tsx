import { useMemo, useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import bobAvatar from '../assets/bob.png'
import debAvatar from '../assets/deb.png'
import noraAvatar from '../assets/nora.png'

type DemoPersona = {
  key: 'travel' | 'teacher' | 'pizza'
  labelZh: string
  labelEn: string
  roleZh: string
  roleEn: string
  tone: string
  image: string
}

type ModelTier = {
  tier: 'Pro' | 'Standard' | 'Lite' | 'Bring your Foundry Model'
  options: string[]
}

const personas: DemoPersona[] = [
  {
    key: 'travel',
    labelZh: 'Deb · 旅行顾问',
    labelEn: 'Deb · Travel Agent',
    roleZh: 'Deb - your travel agent',
    roleEn: 'Deb - your travel agent',
    tone: 'from-fuchsia-400/35 via-cyan-300/15 to-transparent',
    image: debAvatar,
  },
  {
    key: 'teacher',
    labelZh: 'Nora · 语言老师',
    labelEn: 'Nora · Language Teacher',
    roleZh: 'Nora - your language teacher',
    roleEn: 'Nora - your language teacher',
    tone: 'from-teal-400/35 via-sky-300/15 to-transparent',
    image: noraAvatar,
  },
  {
    key: 'pizza',
    labelZh: 'Milo · 点餐助手',
    labelEn: 'Milo · Pizza Ordering',
    roleZh: 'Bob - your pizza ordering assistant',
    roleEn: 'Bob - your pizza ordering assistant',
    tone: 'from-amber-400/30 via-rose-300/15 to-transparent',
    image: bobAvatar,
  },
]

const modelTiers: ModelTier[] = [
  {
    tier: 'Pro',
    options: ['GPT Realtime', 'GPT-4o', 'GPT-4.1', 'GPT-5 (preview)', 'GPT-5 Chat (preview)'],
  },
  {
    tier: 'Standard',
    options: ['GPT Realtime Mini', 'GPT-4o Mini', 'GPT-4.1 Mini', 'GPT-5 Mini (preview)'],
  },
  {
    tier: 'Lite',
    options: ['Phi4-MM Realtime (preview)', 'Phi4 Mini (preview)', 'GPT-5 Nano (preview)'],
  },
  {
    tier: 'Bring your Foundry Model',
    options: ['Custom Foundry Endpoint'],
  },
]

export default function RealtimeAgentDemo() {
  const { locale } = useLocale()
  const [active, setActive] = useState<DemoPersona['key']>('travel')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [isTalking, setIsTalking] = useState(false)
  const [model, setModel] = useState('GPT Realtime')

  const current = useMemo(() => personas.find((item) => item.key === active) ?? personas[0], [active])

  function addAgentReply(seed?: string) {
    const base =
      active === 'teacher'
        ? locale === 'en'
          ? 'Great! Let us practice a short dialogue with natural speaking pace.'
          : '好的，我们来用自然语速进行一段简短对话练习。'
        : active === 'pizza'
          ? locale === 'en'
            ? 'Order captured. I can confirm flavor, size, and delivery ETA in one turn.'
            : '已收到订单，我可以一轮内确认口味、规格和送达时间。'
          : locale === 'en'
            ? 'I can plan your trip with voice and map-ready suggestions in real time.'
            : '我可以实时用语音为你规划行程并给出可执行建议。'

    setMessages((prev) => [...prev, seed ? `You: ${seed}` : locale === 'en' ? 'You started speaking...' : '你开始说话…', `${current.roleEn}: ${base}`])
  }

  function onSpeak() {
    setIsTalking(true)
    addAgentReply()
    setTimeout(() => setIsTalking(false), 1200)
  }

  function onSend() {
    const content = input.trim()
    if (!content) {
      return
    }
    addAgentReply(content)
    setInput('')
  }

  return (
    <div className="relative z-10">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {locale === 'en' ? 'Realtime Conversational Agent' : '实时对话智能体'}
          </h3>
          <p className="mt-2 max-w-3xl text-slate-300">
            {locale === 'en'
              ? 'End-to-end latency under 600ms, model-pluggable architecture (1000+ LLMs), and one-photo avatar onboarding.'
              : '端到端延迟 < 600ms，模型可插拔（1000+ 大模型），一张照片即可使用。'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-cyan-100">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1">E2E &lt; 600ms</span>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1">1000+ Model Plugins</span>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1">
            {locale === 'en' ? 'One-photo Avatar' : '一张照片开通虚拟人'}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl bg-slate-900/45 p-5">
          <div className="relative mx-auto h-64 w-64">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${current.tone} blur-2xl`} />
            <div className="absolute inset-4 rounded-full border border-cyan-200/25 bg-slate-800/65" />
            <div className="absolute inset-[18px] rounded-full border-4 border-cyan-200/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={current.image} alt={current.roleEn} className="h-52 w-52 rounded-full object-cover" />
            </div>
            {isTalking ? (
              <div className="absolute inset-[18px] animate-pulse rounded-full border-4 border-cyan-300/65" />
            ) : null}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-white">{current.roleZh}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/45 p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {personas.map((persona) => (
              <button
                key={persona.key}
                type="button"
                onClick={() => setActive(persona.key)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${active === persona.key ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/75 text-slate-300 hover:text-white'}`}
              >
                {locale === 'en' ? persona.labelEn : persona.labelZh}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
              {locale === 'en' ? 'Generative AI Model' : '生成式 AI 模型'}
            </p>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="w-full rounded-lg border border-cyan-300/25 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none"
            >
              {modelTiers.map((tier) => (
                <optgroup key={tier.tier} label={tier.tier}>
                  {tier.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3">
            <div className="max-h-40 space-y-2 overflow-y-auto text-sm text-slate-200">
              {messages.length === 0 ? (
                <p className="text-slate-400">
                  {locale === 'en'
                    ? 'Click Speak or type a message to start the demo conversation.'
                    : '点击“说话”或输入文字，即可开始 Demo 对话。'}
                </p>
              ) : (
                messages.map((msg, idx) => (
                  <p key={`${msg}-${idx}`} className="rounded bg-slate-900/70 px-2 py-1">
                    {msg}
                  </p>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="neon-btn" onClick={onSpeak}>
                {locale === 'en' ? 'Speak' : '点击说话'}
              </button>
              <div className="flex min-w-[260px] flex-1 items-center rounded-full border border-slate-700 bg-slate-900/80 px-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      onSend()
                    }
                  }}
                  className="w-full bg-transparent py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
                  placeholder={locale === 'en' ? 'Or type a message...' : '或输入文本进行对话...'}
                />
              </div>
              <button type="button" className="ghost-btn" onClick={onSend}>
                {locale === 'en' ? 'Send' : '发送'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}