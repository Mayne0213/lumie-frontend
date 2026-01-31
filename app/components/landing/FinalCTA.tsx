'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-violet-50/50">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6">
        {/* Gradient Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400">
          {/* Content */}
          <div className="relative z-10 text-center pt-8 sm:pt-10 md:pt-12 lg:pt-16 px-4">
            {/* Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-4 sm:mb-5 lg:mb-6 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-violet-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 lg:mb-6">
              Save 6-7 days every week.
            </h2>
            <button className="px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 bg-neutral-900 text-white text-sm font-semibold tracking-wide rounded-full hover:bg-neutral-800 transition-colors">
              Get started FREE
            </button>
          </div>

          {/* Mockups - inside gradient, clipped at bottom */}
          <div className="relative z-10 mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-12">
            <div className="relative max-w-6xl mx-auto">
              {/* Desktop Mockup */}
              <div className="rounded-t-lg sm:rounded-t-xl overflow-hidden shadow-2xl border border-white/20 border-b-0 bg-white">
                <Image
                  src="/images/finalcta.png"
                  alt="Dashboard preview"
                  width={1200}
                  height={750}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-pink-300/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
