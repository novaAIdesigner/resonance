import { useMemo, useState, type ChangeEvent } from 'react'
import { useLocale } from '../context/LocaleContext'

type DemoSpeech = {
  id: string
  fileName: string
  sourceTextZh: string
  sourceTextEn: string
  translatedTextZh: string
  translatedTextEn: string
}

const demoSpeeches: DemoSpeech[] = [
  {
    id: 'airport-nav',
    fileName: 'airport-navigation-demo.mp3',
    sourceTextZh: '我现在只能说英语，但请帮我导航：前方红绿灯路口左转，500米后右转进入主路。',
    sourceTextEn:
      'I can only speak English now, but please navigate me: turn left at the next traffic light and then right in 500 meters to the main road.',
    translatedTextZh: '我现在只能说英语，但请帮我导航：前方红绿灯路口左转，500米后右转进入主路。',
    translatedTextEn:
      'I can only speak English now, but please navigate me: turn left at the next traffic light and then right in 500 meters to the main road.',
  },
  {
    id: 'hotel-checkin',
    fileName: 'hotel-checkin-demo.mp3',
    sourceTextZh: '您好，我预订了两晚房间，想确认早餐时间和延迟退房政策。',
    sourceTextEn:
      'Hello, I booked a room for two nights and would like to confirm breakfast time and late checkout policy.',
    translatedTextZh: '您好，我预订了两晚房间，想确认早餐时间和延迟退房政策。',
    translatedTextEn:
      'Hello, I booked a room for two nights and would like to confirm breakfast time and late checkout policy.',
  },
]

const sourceLanguages = ['Auto detect', 'English', '中文', '日本語', 'Español']
const targetLanguages = ['Chinese Simplified', 'English', 'Japanese', 'Spanish']

export default function SimultaneousInterpretationDemo() {
  const { locale } = useLocale()
  const [sourceLanguage, setSourceLanguage] = useState('Auto detect')
  const [targetLanguage, setTargetLanguage] = useState('Chinese Simplified')
  const [ttsMode, setTtsMode] = useState<'off' | 'simultaneous' | 'alternating'>('simultaneous')
  const [selectedDemoId, setSelectedDemoId] = useState(demoSpeeches[0].id)
  const [fileName, setFileName] = useState<string>('Copilot_Audio_20260121_144951.mp3')
  const [isRecording, setIsRecording] = useState(false)
  const [sourceText, setSourceText] = useState(demoSpeeches[0].sourceTextZh)
  const [translatedText, setTranslatedText] = useState(demoSpeeches[0].translatedTextZh)

  const selectedDemo = useMemo(
    () => demoSpeeches.find((speech) => speech.id === selectedDemoId) ?? demoSpeeches[0],
    [selectedDemoId],
  )

  function useDemoAudio() {
    const speech = selectedDemo
    setFileName(selectedDemo.fileName)
    setSourceText(locale === 'en' ? speech.sourceTextEn : speech.sourceTextZh)
    setTranslatedText(locale === 'en' ? speech.translatedTextEn : speech.translatedTextZh)
  }

  function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setSourceText(
      locale === 'en'
        ? 'Uploaded source audio detected. This demo simulates source transcript extraction before translation.'
        : '已检测到上传音频。此 Demo 将先模拟源语音转写，再进行翻译输出。',
    )
    setTranslatedText(
      locale === 'en'
        ? 'Translation output will appear here after streaming interpretation is completed.'
        : '同声传译完成后，目标语言文本将在此处输出。',
    )
  }

  return (
    <div className="relative z-10">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          {locale === 'en' ? 'Simultaneous Interpretation' : '同声传译'}
        </h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          {locale === 'en'
            ? 'Simple setup: source language on top, target language below, with preloaded audio / recording / upload and optional TTS playback.'
            : '简化配置：顶部源语言（默认自动识别）与目标语言选择，下方支持预制音频/录音/上传，并可开启TTS播报。'}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
            {locale === 'en' ? 'Source Language' : '源语言'}
          </p>
          <select
            value={sourceLanguage}
            onChange={(event) => setSourceLanguage(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100"
          >
            {sourceLanguages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <p className="text-sm text-slate-200">{locale === 'en' ? 'Source audio' : '源语音输入'}</p>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedDemoId}
              onChange={(event) => setSelectedDemoId(event.target.value)}
              className="min-w-[180px] flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-slate-100"
            >
              {demoSpeeches.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.fileName}
                </option>
              ))}
            </select>
            <button type="button" onClick={useDemoAudio} className="ghost-btn px-2 py-1.5 text-xs">
              {locale === 'en' ? '🎧 Demo' : '🎧 预制文件'}
            </button>
            <button
              type="button"
              onClick={() => setIsRecording((v) => !v)}
              className="ghost-btn px-2 py-1.5 text-xs"
            >
              {isRecording ? (locale === 'en' ? '⏹ Stop' : '⏹ 停止') : locale === 'en' ? '🎙 Record' : '🎙 录音'}
            </button>
            <label className="ghost-btn cursor-pointer px-2 py-1.5 text-xs">
              {locale === 'en' ? '⤴ Upload' : '⤴ 上传'}
              <input type="file" accept="audio/*" className="hidden" onChange={onUpload} />
            </label>
          </div>

          <p className="text-sm font-medium text-white">{locale === 'en' ? 'Source text' : '源语言文本'}</p>
          <textarea
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            className="h-44 w-full resize-none rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-sm text-slate-100 outline-none"
          />
        </div>

        <div className="space-y-4">
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
            {locale === 'en' ? 'Target Language' : '目标语言'}
          </p>
          <select
            value={targetLanguage}
            onChange={(event) => setTargetLanguage(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100"
          >
            {targetLanguages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <p className="mb-2 mt-3 text-xs uppercase tracking-[0.16em] text-cyan-200">
            {locale === 'en' ? 'TTS Playback' : 'TTS播报'}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTtsMode('off')}
              className={`rounded-full px-3 py-1.5 transition ${ttsMode === 'off' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/70 text-slate-300'}`}
            >
              {locale === 'en' ? 'Off' : '关闭'}
            </button>
            <button
              type="button"
              onClick={() => setTtsMode('simultaneous')}
              className={`rounded-full px-3 py-1.5 transition ${ttsMode === 'simultaneous' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/70 text-slate-300'}`}
            >
              {locale === 'en' ? 'Simultaneous' : '同声'}
            </button>
            <button
              type="button"
              onClick={() => setTtsMode('alternating')}
              className={`rounded-full px-3 py-1.5 transition ${ttsMode === 'alternating' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/70 text-slate-300'}`}
            >
              {locale === 'en' ? 'Alternating' : '交替'}
            </button>
          </div>

          <div className="text-sm font-medium text-white">{locale === 'en' ? 'Target text' : '目标语言文本'}</div>
          <textarea
            value={translatedText}
            onChange={(event) => setTranslatedText(event.target.value)}
            className="h-44 w-full resize-none rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-sm text-slate-100 outline-none"
          />
          <div className="text-right text-xs text-slate-300">
            {locale === 'en' ? 'Source file' : '源文件'}: <span className="text-cyan-200">{fileName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
