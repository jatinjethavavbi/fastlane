'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { sections as defaultSections, type SectionConfig } from '@/data/showcase';
import { ArcDial } from './ArcDial';

interface ArcShowcaseProps {
  sections?: SectionConfig[];
  arcColor?: string;
}

export function ArcShowcase({
  sections = defaultSections,
  arcColor = '#0B6B4A',
}: ArcShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentZoneRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);

  const [autoScale, setAutoScale] = useState<number>(1);
  const totalSections = sections.length;

  // Discrete active section index (0 .. totalSections - 1)
  const [activeIndex, setActiveIndex] = useState(0);
  // Track scroll direction for content entry/exit animation (1 = down, -1 = up)
  const [direction, setDirection] = useState<number>(1);
  const prevProgressRef = useRef(0);

  // Auto-fit safety net: measures content inner vs available height
  useEffect(() => {
    const calculateScale = () => {
      if (!contentZoneRef.current || !contentInnerRef.current) return;
      const zoneHeight = contentZoneRef.current.clientHeight;
      const innerHeight = contentInnerRef.current.scrollHeight;

      if (innerHeight > zoneHeight && zoneHeight > 0) {
        const ratio = zoneHeight / innerHeight;
        // Apply smooth scale down to minimum 0.76 with slight buffer
        setAutoScale(Math.min(1, Math.max(0.76, ratio * 0.96)));
      } else {
        setAutoScale(1);
      }
    };

    calculateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && contentInnerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateScale();
      });
      resizeObserver.observe(contentInnerRef.current);
    }

    window.addEventListener('resize', calculateScale);
    return () => {
      window.removeEventListener('resize', calculateScale);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex]);

  // Scroll tracking across the tall wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed progress for silky smooth dial rotation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });

  // Fractional section index [0, totalSections - 1]
  const activeFloat = useTransform(
    smoothProgress,
    [0, 1],
    [0, Math.max(1, totalSections - 1)]
  );

  // Update active section and continuous float value
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest > prevProgressRef.current + 0.002) {
        setDirection(1);
      } else if (latest < prevProgressRef.current - 0.002) {
        setDirection(-1);
      }
      prevProgressRef.current = latest;

      if (totalSections <= 1) {
        setActiveIndex(0);
        return;
      }

      const clamped = Math.max(0, Math.min(1, latest));
      const floatVal = clamped * (totalSections - 1);

      const rounded = Math.min(
        totalSections - 1,
        Math.max(0, Math.round(floatVal))
      );
      setActiveIndex(rounded);
    });

    return () => unsubscribe();
  }, [smoothProgress, totalSections]);

  // Sync active section to URL hash without jumping
  useEffect(() => {
    const currentSection = sections[activeIndex];
    if (currentSection && typeof window !== 'undefined') {
      const targetHash = `#${currentSection.id}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    }
  }, [activeIndex, sections]);

  // Programmatic scroll to section by index
  const scrollToSection = useCallback(
    (index: number) => {
      if (!containerRef.current || totalSections <= 1) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const containerTop = rect.top + scrollTop;
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const fraction = index / (totalSections - 1);
      const targetY = containerTop + fraction * scrollableHeight;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    [totalSections]
  );

  // Keyboard navigation when showcase is active/visible
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (!inView || totalSections <= 1) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activeIndex < totalSections - 1) {
          e.preventDefault();
          scrollToSection(activeIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToSection(activeIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, totalSections, scrollToSection]);

  // Compute outer wrapper scroll height: N * 100vh + 20vh tail
  const containerHeight =
    totalSections <= 1 ? '120vh' : `calc(${totalSections * 100}vh + 20vh)`;

  const CurrentComponent = sections[activeIndex]?.Component || null;

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full bg-[#EEF4EF] text-[#0b0f0d]"
      style={{ height: containerHeight }}
    >
      {/* 
        INNER PINNED STAGE
        Stays fixed in viewport during scroll.
        Full height 100vh, overflow hidden.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* ============================================================= */}
        {/* MOBILE TOP PILL BAR (< 768px)                                */}
        {/* ============================================================= */}
        <div className="md:hidden w-full px-5 pt-20 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar z-30 border-b border-[rgba(11,107,74,0.1)] bg-[#EEF4EF]/95 backdrop-blur-md">
          {sections.map((sec, idx) => {
            const isCur = idx === activeIndex;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isCur
                    ? 'bg-[#0B6B4A] text-white shadow-sm'
                    : 'bg-white/70 text-[#44544d] hover:bg-white'
                }`}
              >
                {String(idx + 1).padStart(2, '0')} {sec.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================= */}
        {/* MAIN STAGE CONTENT ZONE                                       */}
        {/* Clear of navbar: pt-[88px] pb-[48px]                          */}
        {/* Left padding: clamp(32px, 4vw, 64px)                          */}
        {/* Max width: calc(100vw - 26vw - 48px - leftPadding)            */}
        {/* ============================================================= */}
        <div className="relative w-full flex-1 flex items-center h-full min-h-0 pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 md:px-0 box-border">
          {/* 
            LEFT CONTENT ZONE
            Dedicated clear zone that never overlaps the circle
          */}
          <div
            ref={contentZoneRef}
            className="w-full z-20 flex flex-col justify-center h-full min-h-0 overflow-hidden
                       md:pl-[clamp(32px,4vw,64px)] 
                       md:max-w-[calc(100vw-18vw-48px-clamp(32px,4vw,64px))]
                       lg:max-w-[calc(100vw-26vw-48px-clamp(32px,4vw,64px))]"
          >
            {/* Auto-fit container with ResizeObserver scale safety net */}
            <div
              ref={contentInnerRef}
              className="w-full"
              style={{
                transform: autoScale < 1 ? `scale(${autoScale})` : undefined,
                transformOrigin: 'left center',
                transition: 'transform 0.2s ease-out',
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={sections[activeIndex]?.id || 'empty'}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    y: direction > 0 ? 28 : -28,
                    filter: 'blur(3px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: direction > 0 ? -28 : 28,
                    filter: 'blur(3px)',
                    transition: {
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="w-full"
                >
                  {CurrentComponent && <CurrentComponent isActive={true} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 
            RIGHT ARC DIAL (Desktop & Tablet)
            Takes up 26vw on large screens, 18vw below 1024px
          */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[42%] lg:w-[36%] pointer-events-none z-10">
            <ArcDial
              sections={sections}
              activeFloat={activeFloat}
              activeIndex={activeIndex}
              onSelectSection={scrollToSection}
              arcColor={arcColor}
            />
          </div>
        </div>

        {/* Quiet Hairline Bottom Divider */}
        <div className="w-full h-[1px] bg-[rgba(11,107,74,0.08)]" />
      </div>
    </section>
  );
}