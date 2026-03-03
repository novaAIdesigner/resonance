import { useEffect, useMemo, useState } from 'react'
import { useLocale } from '../context/LocaleContext'

type DemoTranscript = {
  id: string
  fileName: string
  segments: Array<{ speaker: string; textZh: string; textEn: string; time: string }>
}

const silentDemoAudio =
  'data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAAAAAA'

const demoFiles: DemoTranscript[] = [
  {
    id: 'weekly-sync',
    fileName: 'weekly-sync-demo.wav',
    segments: [
      {
        speaker: 'Speaker 1',
        time: '00:02',
        textZh: '大家好，今天先同步版本发布风险和上线节奏。',
        textEn: 'Welcome everyone, today we align on release risk and rollout timing.',
      },
      {
        speaker: 'Speaker 2',
        time: '00:11',
        textZh: '语音识别准确率已经稳定在目标阈值以上。',
        textEn: 'ASR accuracy is now stable above our target threshold.',
      },
      {
        speaker: 'Speaker 3',
        time: '00:19',
        textZh: '我会补充客户侧反馈，并在会后发行动项。',
        textEn: 'I will add customer feedback and send action items after the meeting.',
      },
      {
        speaker: 'Speaker 1',
        time: '00:28',
        textZh: '另外请评估多语言场景下的性能波动，并给出回退策略。',
        textEn: 'Please also evaluate performance variance in multilingual scenarios and propose a fallback plan.',
      },
      {
        speaker: 'Speaker 2',
        time: '00:36',
        textZh: '已安排 A/B 评测，预计周五前提交完整报告。',
        textEn: 'A/B evaluation is scheduled and a full report will be delivered before Friday.',
      },
      {
        speaker: 'Speaker 3',
        time: '00:43',
        textZh: '我会把客户成功团队的反馈整合进下一轮里程碑。',
        textEn: 'I will integrate customer success feedback into the next milestone planning.',
      },
    ],
  },
  {
    id: 'cross-border',
    fileName: 'cross-border-collab-demo.wav',
    segments: [
      {
        speaker: 'Speaker 1',
        time: '00:03',
        textZh: '我们先确认多语会议转写与翻译需求。',
        textEn: 'Let us confirm multilingual transcription and translation requirements first.',
      },
      {
        speaker: 'Speaker 2',
        time: '00:10',
        textZh: '建议默认开启说话人分离，便于回溯责任人。',
        textEn: 'I suggest speaker diarization on by default for clearer ownership tracing.',
      },
      {
        speaker: 'Speaker 3',
        time: '00:17',
        textZh: '我们下周试点并评估会议洞察效果。',
        textEn: 'We will pilot next week and evaluate meeting insight quality.',
      },
      {
        speaker: 'Speaker 1',
        time: '00:26',
        textZh: '请确认同传输出是否需要同步 TTS 播报。',
        textEn: 'Please confirm whether simultaneous translation output also needs TTS playback.',
      },
      {
        speaker: 'Speaker 2',
        time: '00:33',
        textZh: '建议默认开启，用户可以按需关闭。',
        textEn: 'I recommend enabling it by default and allowing users to opt out.',
      },
      {
        speaker: 'Speaker 3',
        time: '00:41',
        textZh: '好的，发布说明里会明确该配置项。',
        textEn: 'Agreed, we will document this clearly in the release notes.',
      },
    ],
  },
]

export default function MeetingTranscriptionDemo() {
  const { locale } = useLocale()
  const [languageMode, setLanguageMode] = useState<'mono' | 'multi'>('multi')
  const [monoLanguage, setMonoLanguage] = useState('English')
  const [diarization] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedDemoId, setSelectedDemoId] = useState(demoFiles[0].id)
  const [currentFileName, setCurrentFileName] = useState<string | null>(null)
  const [audioSrc, setAudioSrc] = useState<string>(silentDemoAudio)
  const [transcript, setTranscript] = useState(demoFiles[0].segments)

  const selectedDemo = useMemo(
    () => demoFiles.find((item) => item.id === selectedDemoId) ?? demoFiles[0],
    [selectedDemoId],
  )

  const speakerColorMap = useMemo(() => {
    const colorClasses = ['text-cyan-200', 'text-violet-200', 'text-emerald-200', 'text-amber-200', 'text-sky-200']
    const uniqueSpeakers = Array.from(new Set(transcript.map((segment) => segment.speaker)))

    return uniqueSpeakers.reduce<Record<string, string>>((mapping, speaker, index) => {
      mapping[speaker] = colorClasses[index % colorClasses.length]
      return mapping
    }, {})
  }, [transcript])

  useEffect(() => {
    return () => {
      if (audioSrc.startsWith('blob:')) {
        URL.revokeObjectURL(audioSrc)
      }
    }
  }, [audioSrc])

  function applyDemoFile() {
    setCurrentFileName(selectedDemo.fileName)
    setAudioSrc(silentDemoAudio)
    setTranscript(selectedDemo.segments)
  }

  function applyUploadedFile(file: File) {
    if (audioSrc.startsWith('blob:')) {
      URL.revokeObjectURL(audioSrc)
    }

    setCurrentFileName(file.name)
    setAudioSrc(URL.createObjectURL(file))
    setTranscript([
      {
        speaker: 'Speaker 1',
        time: '00:01',
        textZh: '正在分析上传音频，请稍候生成转写结果。',
        textEn: 'Analyzing uploaded audio, transcription results will appear shortly.',
      },
      {
        speaker: 'Speaker 2',
        time: '00:08',
        textZh: '默认开启说话人分离，便于会议理解与追踪。',
        textEn: 'Speaker diarization is enabled by default for better meeting understanding.',
      },
      {
        speaker: 'Speaker 1',
        time: '00:16',
        textZh: '稍后将输出摘要、行动项与风险提醒。',
        textEn: 'Summary, action items, and risk reminders will be generated shortly.',
      },
      {
        speaker: 'Speaker 3',
        time: '00:24',
        textZh: '系统正在完成术语标准化与时间轴对齐。',
        textEn: 'The system is finalizing terminology normalization and timeline alignment.',
      },
    ])
  }

  return (
    <div className="relative z-10">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          {locale === 'en' ? 'Meeting Transcription & Analysis' : '会议转写分析'}
        </h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          {locale === 'en'
            ? 'Drag your meeting file to the left upload area or choose a demo file. Right side shows player and transcription.'
            : '将会议录音拖入左侧上传区，或选择示例文件；右侧可查看播放器与实时转写结果。'}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-cyan-200">
            <button
              type="button"
              onClick={() => setLanguageMode('multi')}
              className={`rounded-full px-3 py-1 transition ${languageMode === 'multi' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/70 text-slate-300'}`}
            >
              {locale === 'en' ? 'Multi-lingual' : '多语言'}
            </button>
            <button
              type="button"
              onClick={() => setLanguageMode('mono')}
              className={`rounded-full px-3 py-1 transition ${languageMode === 'mono' ? 'bg-cyan-400/25 text-cyan-100' : 'bg-slate-800/70 text-slate-300'}`}
            >
              {locale === 'en' ? 'Mono-lingual' : '单语言'}
            </button>
          </div>

          {languageMode === 'mono' ? (
            <div className="mb-3">
              <p className="mb-1 text-xs text-slate-300">
                {locale === 'en' ? 'Language' : '单语言选择'}
              </p>
              <select
                value={monoLanguage}
                onChange={(event) => setMonoLanguage(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100"
              >
                <option value="English">English</option>
                <option value="中文">中文</option>
                <option value="日本語">日本語</option>
                <option value="Español">Español</option>
              </select>
            </div>
          ) : null}

          <p className="mb-3 text-xs text-slate-300">
            {locale === 'en'
              ? `Speaker diarization: ${diarization ? 'ON' : 'OFF'}`
              : `说话人分离：${diarization ? '默认开启' : '关闭'}`}
          </p>

          <div className="mb-3 flex gap-2">
            <select
              value={selectedDemoId}
              onChange={(event) => setSelectedDemoId(event.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100"
            >
              {demoFiles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.fileName}
                </option>
              ))}
            </select>
            <button type="button" onClick={applyDemoFile} className="ghost-btn px-3 py-2 text-sm">
              {locale === 'en' ? 'Use Demo' : '加载示例'}
            </button>
          </div>

          <label
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              const file = event.dataTransfer.files?.[0]
              if (file) {
                applyUploadedFile(file)
              }
            }}
            className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition ${isDragging ? 'border-cyan-300 bg-cyan-400/10' : 'border-slate-600 bg-slate-950/45'}`}
          >
            <input
              type="file"
              accept="audio/*,video/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  applyUploadedFile(file)
                }
              }}
            />
            <p className="text-sm text-slate-200">
              {locale === 'en' ? 'Drag meeting file here' : '拖拽会议文件到此处'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {locale === 'en' ? 'or click to browse' : '或点击选择文件'}
            </p>
          </label>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
          <p className="text-sm text-slate-300">
            {locale === 'en' ? 'Player' : '播放器'}
            <span className="ml-2 text-cyan-200">{currentFileName ?? (locale === 'en' ? 'No file selected' : '未选择文件')}</span>
          </p>
          <audio controls className="mt-2 w-full" src={audioSrc} />

          <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-950/65 p-3">
            <p className="mb-2 text-sm font-medium text-white">
              {locale === 'en' ? 'Transcription' : '转写结果'}
            </p>
            <div className="mb-2 grid grid-cols-[110px_90px_1fr] gap-2 border-b border-slate-700/70 pb-1 text-[11px] uppercase tracking-[0.08em] text-cyan-200">
              <span>{locale === 'en' ? 'Speaker' : '说话人'}</span>
              <span>{locale === 'en' ? 'Time' : '时间'}</span>
              <span>{locale === 'en' ? 'Transcription' : '转写文本'}</span>
            </div>
            <div className="h-56 overflow-y-scroll text-sm">
              {transcript.map((segment, index) => (
                <div
                  key={`${segment.speaker}-${segment.time}-${index}`}
                  className="grid grid-cols-[120px_95px_1fr] gap-2 border-b border-slate-800/70 py-1.5 text-sm last:border-0"
                >
                  <span className={`truncate ${speakerColorMap[segment.speaker] ?? 'text-cyan-200'}`}>
                    {locale === 'en' ? segment.speaker : segment.speaker.replace('Speaker', '发言人')}
                  </span>
                  <span className="text-slate-400">{segment.time}</span>
                  <span className={`truncate text-[13px] ${speakerColorMap[segment.speaker] ?? 'text-slate-200'}`}>
                    {locale === 'en' ? segment.textEn : segment.textZh}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}