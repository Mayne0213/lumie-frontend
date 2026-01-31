'use client';

import { Monitor, Smartphone, Zap, Palette, Code, Rocket } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: '맞춤 디자인',
    description: '브랜드 아이덴티티에 맞는 유니크한 디자인',
  },
  {
    icon: Smartphone,
    title: '반응형 제작',
    description: '모든 디바이스에서 완벽한 사용자 경험',
  },
  {
    icon: Zap,
    title: '빠른 퍼포먼스',
    description: '최적화된 코드로 빠른 로딩 속도',
  },
  {
    icon: Code,
    title: '최신 기술 스택',
    description: 'Next.js, React, Tailwind CSS 활용',
  },
];

const portfolioItems = [
  { name: 'SaaS 랜딩페이지', color: 'from-neutral-700 to-neutral-900' },
  { name: '스타트업 홈페이지', color: 'from-neutral-600 to-neutral-800' },
  { name: '포트폴리오 사이트', color: 'from-neutral-500 to-neutral-700' },
];

export default function WebsiteService() {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-4">
            Website Service
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            홈페이지도 함께 제작해드립니다
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            전문적인 랜딩페이지와 홈페이지 제작으로 비즈니스의 첫인상을 완성하세요.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Mockup */}
          <div className="relative">
            <div className="relative bg-neutral-900 rounded-3xl p-8 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-500 rounded-full blur-3xl" />
              </div>

              {/* Browser mockup */}
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-neutral-400 text-center">
                      yourwebsite.com
                    </div>
                  </div>
                </div>
                {/* Browser content */}
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-neutral-200 rounded-lg w-1/3" />
                  <div className="h-4 bg-neutral-100 rounded w-2/3" />
                  <div className="h-4 bg-neutral-100 rounded w-1/2" />
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="h-20 bg-neutral-100 rounded-lg" />
                    <div className="h-20 bg-neutral-100 rounded-lg" />
                    <div className="h-20 bg-neutral-100 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Floating phone mockup */}
              <div className="absolute -right-4 -bottom-4 w-32">
                <div className="bg-neutral-800 rounded-2xl p-2 shadow-xl">
                  <div className="bg-white rounded-xl p-3 space-y-2">
                    <div className="h-3 bg-neutral-200 rounded w-2/3" />
                    <div className="h-2 bg-neutral-100 rounded w-full" />
                    <div className="h-2 bg-neutral-100 rounded w-3/4" />
                    <div className="h-8 bg-neutral-900 rounded mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <Rocket className="w-4 h-4" />
                예시 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
