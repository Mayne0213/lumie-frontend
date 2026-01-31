'use client';

import Image from 'next/image';

const companyLogos = ['삼성', 'LG', '현대', 'SK', '네이버'];

export default function Hero() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] hidden md:block">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] rounded-full border border-black" />
        <div className="absolute top-10 md:top-20 right-10 md:right-20 w-[300px] md:w-[450px] lg:w-[600px] h-[300px] md:h-[450px] lg:h-[600px] rounded-full border border-black" />
        <div className="absolute top-20 md:top-40 right-20 md:right-40 w-[200px] md:w-[300px] lg:w-[400px] h-[200px] md:h-[300px] lg:h-[400px] rounded-full border border-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
              <span className="w-8 sm:w-10 lg:w-12 h-px bg-black" />
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-black/60 uppercase">
                새로운 기준을 제시합니다
              </p>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black leading-[1.1] mb-4 sm:mb-6 lg:mb-8 tracking-tight">
              혁신과 우아함이
              <br />
              <span className="italic font-normal text-black/80">만나는 곳</span>
            </h1>

            <p className="text-base sm:text-lg font-normal text-black/50 leading-relaxed mb-6 sm:mb-8 lg:mb-12 max-w-lg mx-auto lg:mx-0">
              최고의 소프트웨어 경험을 선사합니다.
              완벽함을 추구하는 분들을 위해 설계되었습니다.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-neutral-50 border-0 text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all duration-300 text-sm sm:text-base"
              />
              <button className="group relative bg-black text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm font-semibold tracking-wide overflow-hidden whitespace-nowrap transition-all duration-500 hover:shadow-2xl hover:shadow-black/25">
                <span className="relative z-10">무료 체험 신청</span>
                <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
            <p className="text-xs font-medium text-black/40">
              무료로 시작하세요. 약정 없이 이용 가능합니다.
            </p>
          </div>

          {/* Right content - Image */}
          <div className="relative mt-8 lg:mt-0">
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
              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 border border-black/10 -z-10 hidden sm:block" />
              <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 border border-black/5 -z-10 hidden sm:block" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-black flex items-center justify-center">
              <span className="text-white text-[10px] sm:text-xs font-semibold tracking-widest">AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
