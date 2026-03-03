import { useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import usFlag from '../assets/flags/us.png'
import deFlag from '../assets/flags/de.png'
import cnFlag from '../assets/flags/cn.png'
import esFlag from '../assets/flags/es.png'
import frFlag from '../assets/flags/fr.png'
import jpFlag from '../assets/flags/jp.png'
import krFlag from '../assets/flags/kr.png'
import ptFlag from '../assets/flags/pt.png'
import itFlag from '../assets/flags/it.png'
import saFlag from '../assets/flags/sa.png'
import inFlag from '../assets/flags/in.png'
import trFlag from '../assets/flags/tr.png'
import ruFlag from '../assets/flags/ru.png'
import vnFlag from '../assets/flags/vn.png'
import thFlag from '../assets/flags/th.png'

type PresetScenario = {
  id: 'podcast' | 'drama' | 'course'
  labelZh: string
  labelEn: string
}

type LanguageOption = {
  id: string
  label: string
  flagIcon: string
}

const scenarios: PresetScenario[] = [
  { id: 'podcast', labelZh: '播客', labelEn: 'Podcast' },
  { id: 'drama', labelZh: '短剧', labelEn: 'Short Drama' },
  { id: 'course', labelZh: '课程', labelEn: 'Course' },
]

const targetLanguages: LanguageOption[] = [
  { id: 'en', label: 'English', flagIcon: usFlag },
  { id: 'de', label: 'German', flagIcon: deFlag },
  { id: 'zh', label: 'Chinese', flagIcon: cnFlag },
  { id: 'es', label: 'Spanish', flagIcon: esFlag },
  { id: 'fr', label: 'French', flagIcon: frFlag },
  { id: 'ja', label: 'Japanese', flagIcon: jpFlag },
  { id: 'ko', label: 'Korean', flagIcon: krFlag },
  { id: 'pt', label: 'Portuguese', flagIcon: ptFlag },
  { id: 'it', label: 'Italian', flagIcon: itFlag },
  { id: 'ar', label: 'Arabic', flagIcon: saFlag },
  { id: 'hi', label: 'Hindi', flagIcon: inFlag },
  { id: 'tr', label: 'Turkish', flagIcon: trFlag },
  { id: 'ru', label: 'Russian', flagIcon: ruFlag },
  { id: 'vi', label: 'Vietnamese', flagIcon: vnFlag },
  { id: 'th', label: 'Thai', flagIcon: thFlag },
]

const sourceLanguageByScenario: Record<PresetScenario['id'], string> = {
  podcast: 'English',
  drama: '中文',
  course: 'Español',
}

const previewFrame =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="%23253550" offset="0"/><stop stop-color="%2310142a" offset="1"/></linearGradient></defs><rect width="1280" height="720" fill="url(%23g)"/><circle cx="980" cy="560" r="140" fill="%232a7f5f" opacity="0.45"/><rect x="700" y="120" width="420" height="420" rx="36" fill="%231d2238"/><text x="110" y="628" fill="%23cde9ff" font-size="42" font-family="Arial">Video Translation Preview</text></svg>'

export default function VideoTranslationDemo() {
  const { locale } = useLocale()
  const [activeScenario, setActiveScenario] = useState<PresetScenario['id']>('podcast')
  const [activeLanguage, setActiveLanguage] = useState<LanguageOption['id']>('de')
  const [voiceCloneEnabled, setVoiceCloneEnabled] = useState(true)

  const sourceLanguage = sourceLanguageByScenario[activeScenario]

  return (
    <div className="relative z-10">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          {locale === 'en' ? 'Video Translation' : '视频翻译'}
        </h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          {locale === 'en'
            ? 'Configure source video, source language, target language, and voice cloning to generate translated video output.'
            : '配置源视频、源语言、目标语言与声音复刻，快速生成视频翻译结果。'}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
              {locale === 'en' ? 'Source video' : '源视频'}
            </p>
            <div className="flex gap-2">
              <select
                value={activeScenario}
                onChange={(event) => setActiveScenario(event.target.value as PresetScenario['id'])}
                className="min-w-[180px] flex-1 rounded-xl border border-slate-700 bg-slate-950/75 px-3 py-3 text-sm text-slate-100"
              >
                {scenarios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {locale === 'en' ? item.labelEn : item.labelZh}
                  </option>
                ))}
              </select>
              <a
                href="/consumer-auth"
                className="rounded-lg border border-cyan-300/30 bg-slate-900/70 px-3 py-3 text-xs text-cyan-100 hover:border-cyan-300/60"
              >
                {locale === 'en' ? 'Upload' : '上传'}
              </a>
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
              {locale === 'en' ? 'Source language' : '源语言'}
            </p>
            <div className="w-full rounded-xl border border-slate-700 bg-slate-950/75 px-3 py-3 text-sm text-slate-100">
              {sourceLanguage}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">
                {locale === 'en' ? 'Target language' : '目标语言'}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <span>{locale === 'en' ? 'Voice clone' : '声音复刻'}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={voiceCloneEnabled}
                  onClick={() => setVoiceCloneEnabled((v) => !v)}
                  className={`relative h-6 w-12 rounded-full transition ${voiceCloneEnabled ? 'bg-cyan-400' : 'bg-slate-600'}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${voiceCloneEnabled ? 'left-6' : 'left-1'}`}
                  />
                </button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-x-4 gap-y-4">
              {targetLanguages.map((item) => {
                const active = item.id === activeLanguage
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveLanguage(item.id)}
                    title={item.label}
                    className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition ${active ? 'bg-cyan-500/85 ring-2 ring-cyan-200' : 'bg-slate-100/80 hover:bg-slate-100'}`}
                  >
                    <img src={item.flagIcon} alt={item.label} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                )
              })}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100/80 text-xs font-semibold text-slate-700">
                +79
              </div>
            </div>
          </div>
        </div>

        <div>
          <video controls className="aspect-video w-full rounded-2xl border border-slate-700/70 bg-black" poster={previewFrame} />
        </div>
      </div>
    </div>
  )
}
