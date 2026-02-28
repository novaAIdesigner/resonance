type ProductScore = {
  metric: string
  resonance: string
  gcp: string
  elevenLabs: string
  doubao: string
}

type BenchmarkBlock = {
  service: string
  notes: string
  rows: ProductScore[]
}

const benchmarkBlocks: BenchmarkBlock[] = [
  {
    service: 'TTS（Text to Speech）',
    notes: '实时流式合成，指标越低越好（MOS 越高越好）。',
    rows: [
      { metric: 'P50 延迟', resonance: '210ms', gcp: '290ms', elevenLabs: '260ms', doubao: '320ms' },
      { metric: 'RTF', resonance: '0.18', gcp: '0.27', elevenLabs: '0.22', doubao: '0.31' },
      { metric: 'MOS（Tier-1）', resonance: '4.58', gcp: '4.42', elevenLabs: '4.47', doubao: '4.31' },
      { metric: 'MOS（Tier-2）', resonance: '4.43', gcp: '4.26', elevenLabs: '4.21', doubao: '4.08' },
    ],
  },
  {
    service: 'ASR（Speech to Text）',
    notes: '包含实时识别与批量转写表现。',
    rows: [
      { metric: 'P50 延迟', resonance: '240ms', gcp: '320ms', elevenLabs: 'N/A', doubao: '360ms' },
      { metric: 'RTF', resonance: '0.22', gcp: '0.31', elevenLabs: 'N/A', doubao: '0.34' },
      { metric: '词错率 WER（Tier-1）', resonance: '6.2%', gcp: '7.8%', elevenLabs: 'N/A', doubao: '8.9%' },
      { metric: '词错率 WER（Tier-2）', resonance: '8.1%', gcp: '9.6%', elevenLabs: 'N/A', doubao: '10.8%' },
    ],
  },
  {
    service: 'Avatar（Interactive/Batch）',
    notes: '评估语音驱动数字人生成体验。',
    rows: [
      { metric: '首帧延迟', resonance: '580ms', gcp: 'N/A', elevenLabs: 'N/A', doubao: '850ms' },
      { metric: 'RTF（视频生成）', resonance: '0.46', gcp: 'N/A', elevenLabs: 'N/A', doubao: '0.69' },
      { metric: 'MOS（Tier-1）', resonance: '4.36', gcp: 'N/A', elevenLabs: 'N/A', doubao: '4.01' },
      { metric: 'MOS（Tier-2）', resonance: '4.22', gcp: 'N/A', elevenLabs: 'N/A', doubao: '3.88' },
    ],
  },
  {
    service: 'Speech Translation',
    notes: '语音输入到目标语输出的链路指标。',
    rows: [
      { metric: 'P50 延迟', resonance: '420ms', gcp: '510ms', elevenLabs: 'N/A', doubao: '560ms' },
      { metric: 'RTF', resonance: '0.31', gcp: '0.39', elevenLabs: 'N/A', doubao: '0.44' },
      { metric: 'MOS（Tier-1）', resonance: '4.31', gcp: '4.12', elevenLabs: 'N/A', doubao: '4.06' },
      { metric: 'MOS（Tier-2）', resonance: '4.15', gcp: '3.96', elevenLabs: 'N/A', doubao: '3.90' },
    ],
  },
]

export default function BenchmarkPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="section-title">Benchmarking Mockup</h1>
      <p className="mt-3 max-w-4xl text-slate-300">
        竞品覆盖 GCP、11Labs、豆包。每个服务按“列=产品、行=指标”展示，便于快速判断性能与语音质量。
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {benchmarkBlocks.map((block) => (
          <section key={block.service} className="glass-card overflow-hidden p-5">
            <h2 className="text-xl font-semibold text-white">{block.service}</h2>
            <p className="mt-1 text-sm text-slate-300">{block.notes}</p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-slate-900/95 px-4 py-3 text-left text-cyan-200">指标</th>
                    <th className="px-4 py-3 text-left text-cyan-200">Resonance</th>
                    <th className="px-4 py-3 text-left text-cyan-200">GCP</th>
                    <th className="px-4 py-3 text-left text-cyan-200">11Labs</th>
                    <th className="px-4 py-3 text-left text-cyan-200">Doubao</th>
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.metric} className="odd:bg-slate-900/45">
                      <td className="sticky left-0 bg-slate-900/95 px-4 py-3 font-medium text-slate-100">{row.metric}</td>
                      <td className="px-4 py-3 text-cyan-100">{row.resonance}</td>
                      <td className="px-4 py-3 text-slate-200">{row.gcp}</td>
                      <td className="px-4 py-3 text-slate-200">{row.elevenLabs}</td>
                      <td className="px-4 py-3 text-slate-200">{row.doubao}</td>
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