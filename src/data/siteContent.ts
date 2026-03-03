import type { Release, Scenario, Testimonial, ValuePillar } from '../types'

export const releases: Release[] = [
  {
    title: 'OmniTTS HD 2.5语音合成模型发布',
    summary:
      '🚀 Introducing Dragon HD Omni — Now in Preview! 在 Microsoft Foundry 预览可用：700+ 高质量音色、更强多语言与多风格控制、减少 SSML 调参并加快集成。适用于虚拟人、有声书、播客与无障碍场景，带来更自然、更具表现力的语音输出。',
    href: '/product/dragon-hd-omni',
  },
  {
    title: '声音美化复刻（Azure Personal Voice）',
    summary:
      '基于 Azure Personal Voice 的声音复刻能力，支持个性化语音创建与品牌化声音体验。可用于内容创作、客户交互与无障碍语音应用。',
    href: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-overview',
  },
  {
    title: '车载大模型语音助手',
    summary:
      '参考 Mercedes-Benz 与 Azure OpenAI 的实践，打造更智能的车载语音体验：自然对话、上下文理解与个性化座舱交互。',
    href: 'https://azure.microsoft.com/en-us/blog/mercedes-benz-enhances-drivers-experience-with-azure-openai-service/?msockid=0d6f5ffac8a36fd532fd4a14c9496e91',
  },
]

export const valuePillars: ValuePillar[] = [
  {
    title: '高性能',
    subtitle: 'Best in class，查看公开基准测试。',
    cta: '进入 Benchmarking',
    href: '/benchmark',
  },
  {
    title: '低成本',
    subtitle: '核心能力 50% off，支持按量与套餐。',
    cta: '进入报价页',
    href: '/pricing',
  },
  {
    title: '全语言',
    subtitle: '覆盖主流语种与方言，满足全球应用。',
    cta: '查看语言列表',
    href: '/languages',
  },
]

export const scenarios: Scenario[] = [
  {
    name: '对话智能体（实时对话）',
    description: '低延迟语音输入输出，适用于客服、销售与教育。',
    endpoint: '/api/demo/realtime-agent',
    productHref: '/product/realtime-agent',
  },
  {
    name: '视频素材生成，配音',
    description: '通过脚本自动生成旁白并输出多语言音轨。',
    endpoint: '/api/demo/video-voice',
    productHref: '/product/video-voice',
  },
  {
    name: '会议转写分析',
    description: '上传会议音频后返回转写、摘要和关键任务。',
    endpoint: '/api/demo/meeting-analysis',
    productHref: '/product/meeting-analysis',
  },
  {
    name: '同声传译',
    description: '实时翻译会议语音，支持多语种双向转换。',
    endpoint: '/api/demo/simultaneous-interpretation',
    productHref: '/product/simultaneous-interpretation',
  },
  {
    name: '视频翻译',
    description: '输入视频链接生成字幕与配音翻译版本。',
    endpoint: '/api/demo/video-translation',
    productHref: '/product/video-translation',
  },
]

export const testimonials: Testimonial[] = [
  {
    customer: '某全球电商平台 CTO',
    quote: 'Resonance 让多语言客服响应效率提升 3 倍。',
  },
  {
    customer: '某头部教育科技公司产品总监',
    quote: '我们上线双语课堂后，内容制作成本下降 45%。',
  },
  {
    customer: '某跨国制造企业信息化负责人',
    quote: '会议转写分析显著缩短了跨国项目对齐周期。',
  },
]

export const languages = [
  '中文',
  'English',
  '日本語',
  '한국어',
  'Español',
  'Français',
  'Deutsch',
  'Português',
  'Italiano',
  'العربية',
]