export default function DeveloperPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-white">Developer 入口</h1>
      <p className="mt-3 text-slate-300">API 技术体系说明与文档入口。</p>
      <a
        href="https://learn.microsoft.com/azure/ai-services/speech-service/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-cyan-300 hover:text-cyan-200"
      >
        打开 API 文档
      </a>
    </main>
  )
}