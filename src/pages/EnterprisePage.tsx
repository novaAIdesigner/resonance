export default function EnterprisePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-white">2B Azure 用户入口</h1>
      <p className="mt-3 text-slate-300">企业用户通过 Azure Portal 管理资源采购、权限治理与账单。</p>
      <a
        href="https://portal.azure.com"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-md bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
      >
        打开 Azure Portal
      </a>
    </main>
  )
}