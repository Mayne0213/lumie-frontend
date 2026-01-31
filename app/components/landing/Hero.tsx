'use client';

import Image from 'next/image';

const companyLogos = ['삼성', 'LG', '현대', 'SK', '네이버'];

export default function Hero() {
  return (
    <section className="pt-36 pb-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-black" />
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border border-black" />
        <div className="absolute top-40 right-40 w-[400px] h-[400px] rounded-full border border-black" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-black" />
              <p className="text-xs font-semibold tracking-[0.2em] text-black/60 uppercase">
                새로운 기준을 제시합니다
              </p>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-black leading-[1.1] mb-8 tracking-tight">
              혁신과 우아함이
              <br />
              <span className="italic font-normal text-black/80">만나는 곳</span>
            </h1>

            <p className="text-lg font-normal text-black/50 leading-relaxed mb-12 max-w-lg">
              최고의 소프트웨어 경험을 선사합니다.
              완벽함을 추구하는 분들을 위해 설계되었습니다.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="flex-1 px-6 py-4 bg-neutral-50 border-0 text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all duration-300"
              />
              <button className="group relative bg-black text-white px-10 py-4 text-sm font-semibold tracking-wide overflow-hidden whitespace-nowrap transition-all duration-500 hover:shadow-2xl hover:shadow-black/25">
                <span className="relative z-10">무료 체험 신청</span>
                <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
            <p className="text-xs font-medium text-black/40">
              무료로 시작하세요. 약정 없이 이용 가능합니다.
            </p>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            {/* Main image container */}
            <div className="relative group">
              <div className="aspect-[4/3] bg-neutral-100 overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="/images/dashboard-hero.png"
                  alt="대시보드"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-black/10 -z-10" />
              <div className="absolute -inset-8 border border-black/5 -z-10" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black flex items-center justify-center">
              <span className="text-white text-xs font-semibold tracking-widest">AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
