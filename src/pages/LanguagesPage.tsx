type LanguageRow = {
  locale: string
  language: string
  asr: string
  tts: string
  translation: string
  model: string
}

type TierGroup = {
  tier: 'Tier-1' | 'Tier-2' | 'Tier-3'
  note: string
  rows: LanguageRow[]
}

const languageGroups: TierGroup[] = [
  {
    tier: 'Tier-1',
    note: '主力商业语言，覆盖完整实时 + 批处理 + 翻译能力。',
    rows: [
      { locale: 'en-US', language: 'English (US)', asr: 'RT + Batch', tts: 'Neural + HD', translation: '✅', model: 'RT-Prime / TTS-v3' },
      { locale: 'zh-CN', language: '中文（普通话）', asr: 'RT + Batch', tts: 'Neural + HD', translation: '✅', model: 'RT-Prime / CN-VoiceX' },
      { locale: 'ja-JP', language: '日本語', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Prime / JP-Voice' },
      { locale: 'de-DE', language: 'Deutsch', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Prime / EU-Voice' },
      { locale: 'fr-FR', language: 'Français', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Prime / EU-Voice' },
    ],
  },
  {
    tier: 'Tier-2',
    note: '区域核心语言，支持实时识别与标准语音合成。',
    rows: [
      { locale: 'es-MX', language: 'Español (MX)', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Lite / LATAM-Voice' },
      { locale: 'pt-BR', language: 'Português (BR)', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Lite / LATAM-Voice' },
      { locale: 'ko-KR', language: '한국어', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Lite / KR-Voice' },
      { locale: 'it-IT', language: 'Italiano', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Lite / EU-Voice' },
      { locale: 'ar-SA', language: 'العربية (SA)', asr: 'RT', tts: 'Neural', translation: '✅', model: 'RT-Lite / MENA-Voice' },
    ],
  },
  {
    tier: 'Tier-3',
    note: '长尾语言，优先覆盖识别与翻译能力。',
    rows: [
      { locale: 'sw-KE', language: 'Kiswahili (KE)', asr: 'RT', tts: '基础音色', translation: '✅', model: 'RT-Edge / Global-Voice' },
      { locale: 'vi-VN', language: 'Tiếng Việt', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Edge / SEA-Voice' },
      { locale: 'th-TH', language: 'ไทย', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Edge / SEA-Voice' },
      { locale: 'tr-TR', language: 'Türkçe', asr: 'RT + Batch', tts: 'Neural', translation: '✅', model: 'RT-Edge / EU-Voice' },
      { locale: 'uk-UA', language: 'Українська', asr: 'RT', tts: '基础音色', translation: '✅', model: 'RT-Edge / Global-Voice' },
    ],
  },
]

export default function LanguagesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="section-title">语言列表（Tier 分组）</h1>
      <p className="mt-3 max-w-5xl text-slate-300">
        参考 Azure Speech 语言支持结构重构：每行一个语言，每列对应服务/产品/模型能力，按 Tier-1/2/3 分组用于产品规划与快速售前说明。
      </p>

      <div className="mt-8 space-y-6">
        {languageGroups.map((group) => (
          <section key={group.tier} className="glass-card overflow-hidden p-5">
            <h2 className="text-xl font-semibold text-white">{group.tier}</h2>
            <p className="mt-1 text-sm text-slate-300">{group.note}</p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-300/20 text-left text-cyan-200">
                    <th className="px-3 py-2">语言</th>
                    <th className="px-3 py-2">Locale</th>
                    <th className="px-3 py-2">ASR（实时/离线）</th>
                    <th className="px-3 py-2">TTS（产品）</th>
                    <th className="px-3 py-2">Speech Translation</th>
                    <th className="px-3 py-2">推荐模型</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((item) => (
                    <tr key={item.locale} className="border-b border-slate-800/60 text-slate-200 last:border-0">
                      <td className="px-3 py-2">{item.language}</td>
                      <td className="px-3 py-2 text-cyan-100">{item.locale}</td>
                      <td className="px-3 py-2">{item.asr}</td>
                      <td className="px-3 py-2">{item.tts}</td>
                      <td className="px-3 py-2">{item.translation}</td>
                      <td className="px-3 py-2">{item.model}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}