'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
          <a href="/" className="group flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-bold text-sm sm:text-base">L</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-black">
              Lumie
            </span>
          </a>
        </div>

        {/* Desktop Right side */}
        <div className="hidden sm:flex items-center gap-2">
          <a href="#" className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors duration-300">
            로그인
          </a>
          <button className="group relative rounded-lg sm:rounded-xl bg-black text-white px-4 sm:px-5 lg:px-7 py-2.5 sm:py-3 text-sm font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20">
            <span className="relative z-10">시작하기</span>
            <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 text-black"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-black/5 px-4 py-4 space-y-3">
          <a href="#" className="block py-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors">
            로그인
          </a>
          <button className="w-full bg-black text-white px-4 py-3 text-sm font-semibold rounded-lg">
            시작하기
          </button>
        </div>
      )}
    </header>
  );
}
