import { useMemo, useState } from 'react'
import { useLocale } from '../context/LocaleContext'

type VoicePreset = {
  id: string
  name: string
  style: string
  category: 'hyper-realistic' | 'pro-dubbing'
  gradient: string
}

const voicePresets: VoicePreset[] = [
  {
    id: 'spuds',
    name: 'Spuds Oxley',
    style: 'Cinematic Narrator',
    category: 'hyper-realistic',
    gradient: 'from-cyan-400 to-purple-500',
  },
  {
    id: 'james',
    name: 'James',
    style: 'Husky Storyteller',
    category: 'pro-dubbing',
    gradient: 'from-rose-500 to-amber-500',
  },
  {
    id: 'cassidy',
    name: 'Cassidy',
    style: 'Crisp Podcaster',
    category: 'pro-dubbing',
    gradient: 'from-sky-400 to-fuchsia-500',
  },
  {
    id: 'hope',
    name: 'Hope',
    style: 'Social Media',
    category: 'hyper-realistic',
    gradient: 'from-blue-400 to-orange-500',
  },
  {
    id: 'michael',
    name: 'Michael C. Vincent',
    style: 'Suspenseful Storyteller',
    category: 'pro-dubbing',
    gradient: 'from-indigo-500 to-cyan-400',
  },
]

const languageOptions = ['English', '中文', '日本語', 'Español']

export default function VideoVoiceDemo() {
  const { locale } = useLocale()
  const [selectedVoiceId, setSelectedVoiceId] = useState('spuds')
  const [language, setLanguage] = useState('English')
  const [script, setScript] = useState(
    'In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind...'
  )
  const [isPlaying, setIsPlaying] = useState(false)

  const selectedVoice = useMemo(
    () => voicePresets.find((voice) => voice.id === selectedVoiceId) ?? voicePresets[0],
    [selectedVoiceId],
  )

  const categoryLabel = (category: VoicePreset['category']) => {
    if (locale === 'en') {
      return category === 'hyper-realistic' ? 'Hyper-realistic' : 'Professional Dubbing'
    }
    return category === 'hyper-realistic' ? '超拟真' : '专业配音'
  }

  function onPlay() {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1100)
  }

  return (
    <div className="relative z-10">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {locale === 'en' ? 'Video Content Generation (Podcast & Dubbing)' : '视频素材生成，配音'}
          </h3>
          <p className="mt-2 max-w-3xl text-slate-300">
            {locale === 'en'
              ? 'Pick a voice persona, input your script, and generate podcast-ready dubbing tracks in one click.'
              : '选择音色与语言，输入脚本后即可快速生成播客与视频配音素材。'}
          </p>
        </div>
      </div>

      <div className="grid gap-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/50 lg:grid-cols-2">
        <div className="border-b border-slate-700/70 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-xs uppercase tracking-[0.16em] text-cyan-200">
              {locale === 'en' ? 'Language' : '语言选择'}
            </label>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-md border border-cyan-300/25 bg-slate-950/70 px-2 py-1 text-xs text-slate-100"
            >
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-2.5 py-1 text-cyan-100">
              {locale === 'en' ? 'Tag' : '分类'}：{categoryLabel('hyper-realistic')}
            </span>
            <span className="rounded-full border border-violet-300/25 bg-violet-400/10 px-2.5 py-1 text-violet-100">
              {locale === 'en' ? 'Tag' : '分类'}：{categoryLabel('pro-dubbing')}
            </span>
          </div>

          <div className="space-y-2">
            {voicePresets.map((voice) => {
              const active = voice.id === selectedVoiceId
              return (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => setSelectedVoiceId(voice.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${active ? 'bg-slate-200/10' : 'bg-transparent hover:bg-slate-200/5'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`h-5 w-5 rounded-full bg-gradient-to-r ${voice.gradient}`} />
                    <span className="text-base font-semibold text-white">{voice.name}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm text-amber-200/90">{voice.style}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${voice.category === 'hyper-realistic' ? 'bg-cyan-400/15 text-cyan-100' : 'bg-violet-400/15 text-violet-100'}`}
                    >
                      {categoryLabel(voice.category)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button type="button" className="ghost-btn rounded-full px-4 py-2 text-sm">
              {locale === 'en' ? 'Explore 10,000+ voices' : '探索 10,000+ 音色'}
            </button>
            <div className="flex gap-2 text-lg text-slate-400">
              <button type="button" className="px-2 hover:text-slate-200">
                ‹
              </button>
              <button type="button" className="px-2 hover:text-slate-200">
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <label className="mb-2 block text-sm text-slate-300">
            {locale === 'en' ? 'Enter your own text' : '输入你的文案'}
          </label>
          <textarea
            value={script}
            onChange={(event) => setScript(event.target.value)}
            className="h-44 w-full resize-none rounded-xl border border-slate-700/70 bg-slate-950/70 p-3 text-lg leading-relaxed text-slate-100 outline-none"
          />

          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={onPlay}
              className="rounded-full bg-black px-6 py-2 text-base font-semibold text-white transition hover:bg-slate-900"
            >
              {isPlaying ? (locale === 'en' ? 'Playing...' : '播放中...') : locale === 'en' ? 'Play' : '播放'}
            </button>
          </div>

          <p className="mt-3 text-xs text-cyan-200/90">
            {locale === 'en'
              ? `Selected voice: ${selectedVoice.name} · ${selectedVoice.style}`
              : `当前音色：${selectedVoice.name} · ${selectedVoice.style}`}
          </p>
        </div>
      </div>
    </div>
  )
}