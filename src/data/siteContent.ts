import type { Release, Scenario, Testimonial, ValuePillar } from '../types'

export const releases: Release[] = [
  {
    title: 'OmniTTS HD 2.5语音合成模型发布',
    titleZh: 'OmniTTS HD 2.5语音合成模型发布',
    titleEn: 'OmniTTS HD 2.5 Speech Synthesis Model Launch',
    summary:
      '🚀 Introducing Dragon HD Omni — Now in Preview! 在 Microsoft Foundry 预览可用：700+ 高质量音色、更强多语言与多风格控制、减少 SSML 调参并加快集成。适用于虚拟人、有声书、播客与无障碍场景，带来更自然、更具表现力的语音输出。',
    summaryZh:
      '🚀 Introducing Dragon HD Omni — Now in Preview! 在 Microsoft Foundry 预览可用：700+ 高质量音色、更强多语言与多风格控制、减少 SSML 调参并加快集成。适用于虚拟人、有声书、播客与无障碍场景，带来更自然、更具表现力的语音输出。',
    summaryEn:
      '🚀 Introducing Dragon HD Omni — now in Microsoft Foundry Preview: 700+ high-quality voices, stronger multilingual style control, reduced SSML tuning, and faster integration for avatars, audiobooks, podcasts, and accessibility experiences.',
    href: '/product/dragon-hd-omni',
  },
  {
    title: '声音美化复刻（Azure Personal Voice）',
    titleZh: '声音美化复刻（Azure Personal Voice）',
    titleEn: 'Voice Cloning & Enhancement (Azure Personal Voice)',
    summary:
      '基于 Azure Personal Voice 的声音复刻能力，支持个性化语音创建与品牌化声音体验。可用于内容创作、客户交互与无障碍语音应用。',
    summaryZh:
      '基于 Azure Personal Voice 的声音复刻能力，支持个性化语音创建与品牌化声音体验。可用于内容创作、客户交互与无障碍语音应用。',
    summaryEn:
      'Build branded and personalized voice experiences with Azure Personal Voice for content production, customer engagement, and accessibility scenarios.',
    href: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-overview',
  },
  {
    title: '车载大模型语音助手',
    titleZh: '车载大模型语音助手',
    titleEn: 'In-Vehicle LLM Voice Assistant',
    summary:
      '参考 Mercedes-Benz 与 Azure OpenAI 的实践，打造更智能的车载语音体验：自然对话、上下文理解与个性化座舱交互。',
    summaryZh:
      '参考 Mercedes-Benz 与 Azure OpenAI 的实践，打造更智能的车载语音体验：自然对话、上下文理解与个性化座舱交互。',
    summaryEn:
      'Inspired by Mercedes-Benz and Azure OpenAI best practices, deliver in-car voice experiences with natural dialogue, contextual understanding, and personalized cockpit interactions.',
    href: 'https://azure.microsoft.com/en-us/blog/mercedes-benz-enhances-drivers-experience-with-azure-openai-service/?msockid=0d6f5ffac8a36fd532fd4a14c9496e91',
  },
]

export const valuePillars: ValuePillar[] = [
  {
    title: '高性能',
    titleZh: '高性能',
    titleEn: 'High Performance',
    subtitle: 'Best in class，查看公开基准测试。',
    subtitleZh: 'Best in class，查看公开基准测试。',
    subtitleEn: 'Best in class, validated by public benchmark results.',
    cta: '进入 Benchmarking',
    ctaZh: '进入 Benchmarking',
    ctaEn: 'Open Benchmarking',
    href: '/benchmark',
  },
  {
    title: '低成本',
    titleZh: '低成本',
    titleEn: 'Cost Efficiency',
    subtitle: '核心能力 50% off，支持按量与套餐。',
    subtitleZh: '核心能力 50% off，支持按量与套餐。',
    subtitleEn: 'Up to 50% off on core capabilities with PAYG and package options.',
    cta: '进入报价页',
    ctaZh: '进入报价页',
    ctaEn: 'View Pricing',
    href: '/pricing',
  },
  {
    title: '全语言',
    titleZh: '全语言',
    titleEn: 'Global Language Coverage',
    subtitle: '覆盖主流语种与方言，满足全球应用。',
    subtitleZh: '覆盖主流语种与方言，满足全球应用。',
    subtitleEn: 'Support major languages and dialects for global deployment.',
    cta: '查看语言列表',
    ctaZh: '查看语言列表',
    ctaEn: 'Browse Languages',
    href: '/languages',
  },
]

export const scenarios: Scenario[] = [
  {
    name: '对话智能体（实时对话）',
    nameZh: '对话智能体（实时对话）',
    nameEn: 'Conversational Agent (Realtime)',
    description: '低延迟语音输入输出，适用于客服、销售与教育。',
    descriptionZh: '低延迟语音输入输出，适用于客服、销售与教育。',
    descriptionEn: 'Low-latency speech input/output for support, sales, and education scenarios.',
    endpoint: '/api/demo/realtime-agent',
    productHref: '/product/realtime-agent',
  },
  {
    name: '视频素材生成，配音',
    nameZh: '视频素材生成，配音',
    nameEn: 'Video Asset Generation & Dubbing',
    description: '通过脚本自动生成旁白并输出多语言音轨。',
    descriptionZh: '通过脚本自动生成旁白并输出多语言音轨。',
    descriptionEn: 'Generate narration from scripts and export multilingual audio tracks automatically.',
    endpoint: '/api/demo/video-voice',
    productHref: '/product/video-voice',
  },
  {
    name: '会议转写分析',
    nameZh: '会议转写分析',
    nameEn: 'Meeting Transcription & Analysis',
    description: '上传会议音频后返回转写、摘要和关键任务。',
    descriptionZh: '上传会议音频后返回转写、摘要和关键任务。',
    descriptionEn: 'Upload meeting audio to get transcripts, summaries, and key action items.',
    endpoint: '/api/demo/meeting-analysis',
    productHref: '/product/meeting-analysis',
  },
  {
    name: '同声传译',
    nameZh: '同声传译',
    nameEn: 'Simultaneous Interpretation',
    description: '实时翻译会议语音，支持多语种双向转换。',
    descriptionZh: '实时翻译会议语音，支持多语种双向转换。',
    descriptionEn: 'Translate live meeting speech in real time with multi-language bidirectional support.',
    endpoint: '/api/demo/simultaneous-interpretation',
    productHref: '/product/simultaneous-interpretation',
  },
  {
    name: '视频翻译',
    nameZh: '视频翻译',
    nameEn: 'Video Translation',
    description: '输入视频链接生成字幕与配音翻译版本。',
    descriptionZh: '输入视频链接生成字幕与配音翻译版本。',
    descriptionEn: 'Input a video URL to generate translated subtitles and dubbed output.',
    endpoint: '/api/demo/video-translation',
    productHref: '/product/video-translation',
  },
]

export const testimonials: Testimonial[] = [
  {
    customer: '某全球电商平台 CTO',
    customerZh: '某全球电商平台 CTO',
    customerEn: 'CTO, Global E-commerce Platform',
    quote: 'Resonance 让多语言客服响应效率提升 3 倍。',
    quoteZh: 'Resonance 让多语言客服响应效率提升 3 倍。',
    quoteEn: 'Resonance tripled our multilingual customer support response efficiency.',
  },
  {
    customer: '某头部教育科技公司产品总监',
    customerZh: '某头部教育科技公司产品总监',
    customerEn: 'Product Director, Leading EdTech Company',
    quote: '我们上线双语课堂后，内容制作成本下降 45%。',
    quoteZh: '我们上线双语课堂后，内容制作成本下降 45%。',
    quoteEn: 'After launching bilingual classrooms, our content production cost dropped by 45%.',
  },
  {
    customer: '某跨国制造企业信息化负责人',
    customerZh: '某跨国制造企业信息化负责人',
    customerEn: 'IT Lead, Multinational Manufacturing Enterprise',
    quote: '会议转写分析显著缩短了跨国项目对齐周期。',
    quoteZh: '会议转写分析显著缩短了跨国项目对齐周期。',
    quoteEn: 'Meeting transcription and analysis significantly reduced cross-border project alignment cycles.',
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