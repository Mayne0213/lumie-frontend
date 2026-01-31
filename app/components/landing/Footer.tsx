'use client';

export default function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-widest text-neutral-900 uppercase">
            Lumie
          </a>

          {/* Copyright */}
          <div className="text-sm font-normal text-neutral-400">
            © 2024 Lumie. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
