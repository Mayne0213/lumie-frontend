'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-14">
          <a href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-bold text-base">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              Lumie
            </span>
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a href="#" className="px-5 py-2.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors duration-300">
            로그인
          </a>
          <button className="group relative  rounded-xl bg-black text-white px-7 py-3 text-sm font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20">
            <span className="relative z-10">시작하기</span>
            <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
