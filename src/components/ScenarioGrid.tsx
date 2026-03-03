import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scenarios } from '../data/siteContent'
import { runDemo } from '../lib/api'
import MeetingTranscriptionDemo from './MeetingTranscriptionDemo'
import RealtimeAgentDemo from './RealtimeAgentDemo'
import SimultaneousInterpretationDemo from './SimultaneousInterpretationDemo'
import VideoTranslationDemo from './VideoTranslationDemo'
import VideoVoiceDemo from './VideoVoiceDemo'

export default function ScenarioGrid() {
  const [results, setResults] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const realtimeScenarioName = '对话智能体（实时对话）'
  const videoVoiceScenarioName = '视频素材生成，配音'
  const meetingScenarioName = '会议转写分析'
  const simultaneousScenarioName = '同声传译'
  const videoTranslationScenarioName = '视频翻译'
  const otherScenarios = scenarios.filter(
    (scenario) =>
      scenario.name !== realtimeScenarioName &&
      scenario.name !== videoVoiceScenarioName &&
      scenario.name !== meetingScenarioName &&
      scenario.name !== simultaneousScenarioName &&
      scenario.name !== videoTranslationScenarioName,
  )
  const accentStyles = [
    'from-cyan-400/20 via-cyan-400/5 to-transparent',
    'from-violet-400/20 via-violet-400/5 to-transparent',
    'from-teal-400/20 via-teal-400/5 to-transparent',
    'from-sky-400/20 via-sky-400/5 to-transparent',
    'from-fuchsia-400/20 via-fuchsia-400/5 to-transparent',
  ]

  async function onTryDemo(name: string, endpoint: string) {
    setLoading(name)
    try {
      const data = await runDemo(endpoint, { text: 'demo request' })
      setResults((prev) => ({ ...prev, [name]: JSON.stringify(data) }))
    } catch (error) {
      const message = error instanceof Error ? error.message : '请求失败'
      setResults((prev) => ({ ...prev, [name]: message }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="section-title">应用场景</h2>
        <p className="mt-2 text-slate-300">覆盖实时对话、会议分析、同传与视频语音生产，统一通过服务端 API 接入，便于权限治理与商业计费。</p>
      </div>
      <div className="flex flex-col gap-5">
        <article className="glass-card relative overflow-hidden p-6">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[0]}`} />
          <RealtimeAgentDemo />
        </article>

        <article className="glass-card relative overflow-hidden p-6">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[1]}`} />
          <VideoVoiceDemo />
        </article>

        <article className="glass-card relative overflow-hidden p-6">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[2]}`} />
          <MeetingTranscriptionDemo />
        </article>

        <article className="glass-card relative overflow-hidden p-6">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[3]}`} />
          <SimultaneousInterpretationDemo />
        </article>

        <article className="glass-card relative overflow-hidden p-6">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[4]}`} />
          <VideoTranslationDemo />
        </article>

        {otherScenarios.map((scenario, index) => (
          <article key={scenario.name} className="glass-card relative overflow-hidden p-6">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accentStyles[index % accentStyles.length]}`} />
            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold text-white">{scenario.name}</h3>
                <p className="mt-2 text-sm text-slate-200">{scenario.description}</p>
                <p className="mt-2 text-xs text-cyan-200/90">API: {scenario.endpoint}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <button
                  className="neon-btn px-3 py-2 text-sm disabled:opacity-60"
                  disabled={loading === scenario.name}
                  onClick={() => onTryDemo(scenario.name, scenario.endpoint)}
                >
                  {loading === scenario.name ? '调用中...' : '快速体验 Demo'}
                </button>
                <Link to={scenario.productHref} className="ghost-btn px-3 py-2 text-sm">
                  产品单页
                </Link>
              </div>
            </div>
            <pre className="relative z-10 mt-4 overflow-x-auto rounded-lg border border-slate-700/70 bg-slate-950/80 p-3 text-xs text-cyan-100/90">
              {results[scenario.name] ?? `POST ${scenario.endpoint}`}
            </pre>
          </article>
        ))}
      </div>
    </section>
  )
}