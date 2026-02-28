import { Link, useParams } from 'react-router-dom'

export default function ProductPage() {
  const { slug = 'general' } = useParams()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-white">产品单页：{slug}</h1>
      <p className="mt-3 text-slate-300">
        该页面由静态模块渲染，可扩展到更多产品版本，不依赖 CMS。
      </p>
      <p className="mt-3 text-slate-300">Demo 交互通过服务端 API 代理以实现访问控制与按调用计费。</p>
      <Link to="/" className="mt-6 inline-block text-cyan-300 hover:text-cyan-200">
        返回首页
      </Link>
    </main>
  )
}