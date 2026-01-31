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
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-400 uppercase mb-2 sm:mb-4">
            Website Service
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
            홈페이지도 함께 제작해드립니다
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto px-4">
            전문적인 랜딩페이지와 홈페이지 제작으로 비즈니스의 첫인상을 완성하세요.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left - Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-neutral-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-neutral-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-neutral-500 rounded-full blur-3xl" />
              </div>

              {/* Browser mockup */}
              <div className="relative bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-100 border-b">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neutral-300" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neutral-300" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neutral-300" />
                  </div>
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className="bg-white rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-neutral-400 text-center">
                      yourwebsite.com
                    </div>
                  </div>
                </div>
                {/* Browser content */}
                <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">
                  <div className="h-5 sm:h-6 lg:h-8 bg-neutral-200 rounded-lg w-1/3" />
                  <div className="h-3 sm:h-4 bg-neutral-100 rounded w-2/3" />
                  <div className="h-3 sm:h-4 bg-neutral-100 rounded w-1/2" />
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 lg:mt-6">
                    <div className="h-12 sm:h-16 lg:h-20 bg-neutral-100 rounded-lg" />
                    <div className="h-12 sm:h-16 lg:h-20 bg-neutral-100 rounded-lg" />
                    <div className="h-12 sm:h-16 lg:h-20 bg-neutral-100 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Floating phone mockup */}
              <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 w-20 sm:w-28 lg:w-32">
                <div className="bg-neutral-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl">
                  <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 space-y-1 sm:space-y-2">
                    <div className="h-2 sm:h-3 bg-neutral-200 rounded w-2/3" />
                    <div className="h-1.5 sm:h-2 bg-neutral-100 rounded w-full" />
                    <div className="h-1.5 sm:h-2 bg-neutral-100 rounded w-3/4" />
                    <div className="h-5 sm:h-6 lg:h-8 bg-neutral-900 rounded mt-1 sm:mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-neutral-100 flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-neutral-700" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-neutral-900 mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-5 sm:mt-6 lg:mt-8 flex justify-center lg:justify-start">
              <button className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-neutral-900 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                예시 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
