'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onStartNow: () => void;
}

export function Navbar({ onStartNow }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none px-4 sm:px-8 pt-3 sm:pt-4">
      <div
        className={`mx-auto pointer-events-auto flex items-center justify-between rounded-full transition-all duration-300 ease-out ${
          isScrolled
            ? 'max-w-[780px] bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/75 px-4 sm:px-5 py-2 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),0_4px_14px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.04)]'
            : 'max-w-[1280px] bg-transparent border border-transparent px-2 sm:px-4 py-2 shadow-none'
        }`}
      >
        {/* Fastlane Emblem + Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2.5 text-[#111114] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-full pl-1 pr-2 py-1"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 26 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M7.8 2.2C8.2 1.4 9.0 1 9.9 1H23.2C24.2 1 24.8 2.0 24.3 2.9L22.7 5.7C22.3 6.5 21.5 6.9 20.6 6.9H7.3C6.3 6.9 5.7 5.9 6.2 5.0L7.8 2.2Z"
              fill="#0E0E11"
            />
            <path
              d="M3.0 10.6C3.4 9.8 4.2 9.4 5.1 9.4H14.5C15.5 9.4 16.1 10.4 15.6 11.3L14.0 14.1C13.6 14.9 12.8 15.3 11.9 15.3H2.5C1.5 15.3 0.9 14.3 1.4 13.4L3.0 10.6Z"
              fill="#0E0E11"
            />
          </svg>
          <span className="font-display text-[17px] font-semibold tracking-tight text-[#111114]">
            Fastlane
          </span>
        </a>

        {/* Glossy 3D Start Now Pill with Circular Arrow Badge */}
        <button
          type="button"
          onClick={onStartNow}
          className="group inline-flex items-center gap-2.5 bg-gradient-to-b from-[#2A2A2F] via-[#141418] to-[#09090B] hover:from-[#33333A] hover:via-[#1B1B20] hover:to-[#0E0E11] active:scale-[0.98] text-white text-[13px] sm:text-sm font-semibold pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full border border-black/80 shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.28)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
        >
          <span>Start now</span>
          <span className="w-7 h-7 rounded-full bg-white/12 border border-white/10 inline-flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
          </span>
        </button>
      </div>
    </header>
  );
}
