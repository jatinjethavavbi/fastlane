'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface NavbarProps {
  onStartNow?: () => void;
  ctaText?: string;
  className?: string;
}

export function Navbar({
  onStartNow,
  ctaText = 'Start now',
  className = '',
}: NavbarProps) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking via Framer Motion useScroll
  const { scrollY, scrollYProgress } = useScroll();

  // State: hidden on scroll-down, shown on scroll-up
  const [hidden, setHidden] = useState(false);

  // State: scrolled elevation & dimensions (scrollY > 20px)
  const [isScrolled, setIsScrolled] = useState(false);

  // Focus & hover tracking to keep navbar visible during interactions
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Ref tracking previous scroll position to filter jitters & calculate delta
  const prevScrollY = useRef(0);

  // Scroll progress spring for smooth 2px bottom progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // --------------------------------------------------------------------------
  // SMART SCROLL LOGIC
  // 1. Keeps navbar visible under 80px (top of page).
  // 2. Ignores trackpad bounce & micro-jitters (< 6px delta threshold).
  // 3. Slides out on scroll down (> 6px delta), slides in on scroll up (<-6px delta).
  // 4. Compacts height & intensifies blur when scrollY > 20px.
  // 5. Managed safely in useEffect to prevent SSR / insertion-effect hydration mismatches.
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!scrollY) return;
    const unsubscribe = scrollY.on('change', (current: number) => {
      const diff = current - prevScrollY.current;

      // Scrolled state check for 64px -> 56px and blur intensification
      setIsScrolled(current > 20);

      // Always keep visible when near the top of the page (< 80px)
      if (current < 80) {
        setHidden(false);
      } else if (diff > 6) {
        // Significant scroll down past 80px -> hide navbar
        setHidden(true);
      } else if (diff < -6) {
        // Meaningful scroll up -> show navbar immediately
        setHidden(false);
      }

      prevScrollY.current = current;
    });

    return () => unsubscribe();
  }, [scrollY]);

  // --------------------------------------------------------------------------
  // ANCHOR LINK NAVIGATION LISTENER
  // Re-shows navbar whenever an in-page hash/anchor navigation occurs
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      setHidden(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setHidden(false);
    const homeEl = document.getElementById('home');
    if (homeEl) {
      const topOffset = 84;
      const y = homeEl.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keep navbar visible if hovered, focused, or explicitly at top
  const shouldHide = hidden && !isHovered && !isFocused;

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4">
      <nav
        aria-label="Primary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={() => setIsFocused(false)}
        className={`pointer-events-auto w-[calc(100%-32px)] max-w-[920px] select-none ${className}`}
      >
        {/* Outer Animated Wrapper: Entrance Slide-Down & Scroll Hide/Show */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -24 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: shouldHide ? 0 : 1, y: 0 }
              : {
                  y: shouldHide ? '-130%' : 0,
                  opacity: shouldHide ? 0 : 1,
                }
          }
          transition={{ duration: 0.45, ease: EASE_OUT_CUBIC }}
          style={{ willChange: 'transform, opacity' }}
          className={`relative w-full rounded-full border border-[rgba(10,127,90,0.12)] px-4 sm:px-6 flex items-center justify-between overflow-hidden transition-all duration-300 ease-out ${
            isScrolled
              ? 'h-[56px] bg-white/88 backdrop-blur-[20px] shadow-[0_18px_36px_rgba(10,127,90,0.18),0_4px_12px_rgba(0,0,0,0.06)]'
              : 'h-[64px] bg-white/75 backdrop-blur-[12px] shadow-[0_12px_30px_rgba(10,127,90,0.12)]'
          }`}
        >
          {/* ============================================================= */}
          {/* SCROLL PROGRESS INDICATOR (2px Emerald Gradient Bar at Bottom)*/}
          {/* Scaled via useSpring, clipped neatly by rounded-full pill      */}
          {/* ============================================================= */}
          <motion.div
            style={{ scaleX, transformOrigin: 'left' }}
            className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#0a7f5a] via-[#10b981] to-[#34d399] z-30 pointer-events-none"
          />

          {/* ============================================================= */}
          {/* LEFT: FASTLANE LOGO MARK + WORDMARK                          */}
          {/* ============================================================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1, ease: EASE_OUT_CUBIC }}
            className="flex items-center z-10"
          >
            <motion.a
              href="#home"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, ease: EASE_OUT_CUBIC }}
              className="inline-flex items-center gap-2 sm:gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D084] rounded-full px-1.5 py-1 group cursor-pointer"
            >
              {/* Slanted Vector Emblem */}
              <svg
                width="24"
                height="18"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
              >
                <path
                  d="M7.8 2.2C8.2 1.4 9.0 1 9.9 1H23.2C24.2 1 24.8 2.0 24.3 2.9L22.7 5.7C22.3 6.5 21.5 6.9 20.6 6.9H7.3C6.3 6.9 5.7 5.9 6.2 5.0L7.8 2.2Z"
                  fill="#0b0f0d"
                />
                <path
                  d="M3.0 10.6C3.4 9.8 4.2 9.4 5.1 9.4H14.5C15.5 9.4 16.1 10.4 15.6 11.3L14.0 14.1C13.6 14.9 12.8 15.3 11.9 15.3H2.5C1.5 15.3 0.9 14.3 1.4 13.4L3.0 10.6Z"
                  fill="#00D084"
                />
              </svg>
              <span className="font-display text-[16px] font-semibold tracking-tight text-[#0b0f0d] group-hover:text-black transition-colors">
                Fastlane
              </span>
            </motion.a>
          </motion.div>

          {/* ============================================================= */}
          {/* RIGHT: "START NOW" BUTTON (Micro-Interactions)               */}
          {/* ============================================================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.18, ease: EASE_OUT_CUBIC }}
            className="flex items-center z-10"
          >
            <motion.button
              type="button"
              onClick={onStartNow}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: EASE_OUT_CUBIC }}
              className="group relative inline-flex items-center gap-2 bg-[#151413] hover:bg-black text-white text-xs sm:text-[13px] font-bold pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full border border-black/10 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_26px_rgba(10,127,90,0.45)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D084]"
            >
              <span className="tracking-tight">
                {ctaText}
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-800 text-[#00D084] group-hover:bg-[#00D084] group-hover:text-neutral-950 inline-flex items-center justify-center transition-all duration-200 shadow-sm group-hover:scale-105">
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]"
                  strokeWidth={2.4}
                />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
}
