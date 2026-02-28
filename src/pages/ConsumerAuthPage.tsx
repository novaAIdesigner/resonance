export default function ConsumerAuthPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-white">2C 登录与充值</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold text-white">登录方式</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>手机号随机密码登录</li>
            <li>微信扫码登录</li>
          </ul>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold text-white">充值方式</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>微信扫码充值</li>
            <li>支付宝扫码充值</li>
            <li>Voucher 充值</li>
          </ul>
        </section>
      </div>
    </main>
  )
}