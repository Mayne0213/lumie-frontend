'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '무료',
    period: '',
    description: '개인 사용자를 위한 기본 기능',
    features: [
      '월 50회 AI 작업',
      '기본 에이전트 2개',
      '1GB 저장공간',
      '커뮤니티 지원',
    ],
    buttonText: '무료로 시작하기',
    buttonStyle: 'outline',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '₩30,000',
    period: '/월',
    description: '소규모 팀을 위한 필수 기능',
    features: [
      '월 300회 AI 작업',
      '기본 에이전트 5개',
      '10GB 저장공간',
      '이메일 지원',
      '기본 분석 리포트',
    ],
    buttonText: '시작하기',
    buttonStyle: 'outline',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '₩50,000',
    period: '/월',
    description: '성장하는 팀을 위한 고급 기능',
    features: [
      '월 1,000회 AI 작업',
      '모든 에이전트 무제한',
      '50GB 저장공간',
      '우선 지원',
      '고급 분석 및 인사이트',
      '팀 협업 기능',
    ],
    buttonText: '프로 시작하기',
    buttonStyle: 'filled',
    highlighted: true,
    badge: '인기',
  },
  {
    name: 'Enterprise',
    price: '₩100,000',
    period: '/월',
    description: '대규모 조직을 위한 엔터프라이즈 솔루션',
    features: [
      '무제한 AI 작업',
      '커스텀 에이전트 생성',
      '무제한 저장공간',
      '전담 매니저 지원',
      'API 액세스',
      'SSO 및 SCIM 지원',
    ],
    buttonText: '영업팀 문의',
    buttonStyle: 'outline',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-4">
            요금제
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            팀에 맞는 플랜을 선택하세요
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            모든 플랜에서 14일 무료 체험을 제공합니다. 언제든지 취소 가능합니다.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-neutral-900 text-white shadow-2xl shadow-neutral-900/20 lg:scale-105'
                  : 'bg-neutral-50 hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3
                className={`text-xl font-bold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ${
                      plan.highlighted ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-sm mb-8 ${
                  plan.highlighted ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {plan.description}
              </p>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 mb-8 ${
                  plan.buttonStyle === 'filled'
                    ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                    : plan.highlighted
                    ? 'border border-neutral-700 text-white hover:bg-neutral-800'
                    : 'border border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-white'
                }`}
              >
                {plan.buttonText}
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-violet-400' : 'text-violet-600'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-neutral-400 mt-12">
          대규모 조직 또는 특별한 요구사항이 있으신가요?{' '}
          <a href="#" className="text-neutral-900 font-medium hover:underline">
            맞춤 견적 문의하기
          </a>
        </p>
      </div>
    </section>
  );
}
