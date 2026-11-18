'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, Sparkles, User, Activity, Zap } from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SectionProps {
  isActive?: boolean;
}

interface Persona {
  id: string;
  name: string;
  tags: string;
  moodColor: string;
  borderColor: string;
  glowColor: string;
  imgSrc: string;
  badgeIcon: React.ReactNode;
  statOnline: string;
  subMetrics: { label: string; value: string }[];
  graphPath: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'biohacker',
    name: 'Biohacker',
    tags: 'Science-backed · Stack-minded',
    moodColor: 'from-[#172554] via-[#1E3A8A] to-[#0A1128]',
    borderColor: 'rgba(59,130,246,0.3)',
    glowColor: 'rgba(59,130,246,0.2)',
    imgSrc: '/personas/biohacker.jpg',
    badgeIcon: <Activity className="w-3 h-3 text-blue-300" />,
    statOnline: 'Online · Daily',
    subMetrics: [
      { label: 'AGE', value: '25-45' },
      { label: 'SHARE', value: '34%' },
      { label: 'SPEND', value: '$99/mo' },
    ],
    graphPath: 'M 0 28 Q 30 24, 55 14 T 110 18 T 160 6 T 220 12',
  },
  {
    id: 'busy-professional',
    name: 'Busy Professional',
    tags: 'Time-poor · Under-served',
    moodColor: 'from-[#064E3B] via-[#0F766E] to-[#022C22]',
    borderColor: 'rgba(16,185,129,0.3)',
    glowColor: 'rgba(16,185,129,0.2)',
    imgSrc: '/personas/busy-professional.jpg',
    badgeIcon: <Zap className="w-3 h-3 text-emerald-300" />,
    statOnline: 'Online · 3pm Slump',
    subMetrics: [
      { label: 'AGE', value: '30-55' },
      { label: 'SHARE', value: '46%' },
      { label: 'SPEND', value: '$120/mo' },
    ],
    graphPath: 'M 0 26 Q 35 22, 70 12 T 130 16 T 180 4 T 220 8',
  },
  {
    id: 'fitness-lover',
    name: 'Fitness Lover',
    tags: 'Stack-swap · Pre-gym',
    moodColor: 'from-[#881337] via-[#9F1239] to-[#4C0519]',
    borderColor: 'rgba(244,63,94,0.3)',
    glowColor: 'rgba(244,63,94,0.2)',
    imgSrc: '/personas/fitness-lover.jpg',
    badgeIcon: <User className="w-3 h-3 text-rose-300" />,
    statOnline: 'Online · Pre-Gym',
    subMetrics: [
      { label: 'AGE', value: '20-38' },
      { label: 'SHARE', value: '20%' },
      { label: 'SPEND', value: '$79/mo' },
    ],
    graphPath: 'M 0 24 Q 25 20, 60 10 T 120 14 T 175 4 T 220 6',
  },
];

export function StudiesCompetitors({ isActive = true }: SectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePersonaIdx, setActivePersonaIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Animated stat counter values
  const [reviewsCount, setReviewsCount] = useState(0);
  const [rivalDaysCount, setRivalDaysCount] = useState(0);

  // Auto-advance accordion every 3.5s
  useEffect(() => {
    if (!isActive || isPaused) return;

    const timer = setInterval(() => {
      setActivePersonaIdx((prev) => (prev + 1) % PERSONAS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isActive, isPaused]);

  // Count-up stats on activation
  useEffect(() => {
    if (!isActive) {
      setReviewsCount(0);
      setRivalDaysCount(0);
      return;
    }

    const duration = 1200;
    const targetReviews = 12000;
    const targetDays = 214;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setReviewsCount(Math.floor(eased * targetReviews));
      setRivalDaysCount(Math.floor(eased * targetDays));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const reqId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(reqId);
  }, [isActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActivePersonaIdx((prev) => (prev + 1) % PERSONAS.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActivePersonaIdx((prev) => (prev - 1 + PERSONAS.length) % PERSONAS.length);
    }
  };

  return (
    <div
      className="w-full text-[#0b0f0d] select-none py-1"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Studies competitors section"
    >
      {/* ================================================================= */}
      {/* TWO-COLUMN GRID: Column A (Left) & Column B (Right)              */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* =============================================================== */}
        {/* COLUMN A: Header, Description, Stats Pair & Button Pill         */}
        {/* =============================================================== */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* 02 Label + Gold hairline */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[11px] uppercase font-bold tracking-[0.2em] text-[#0B6B4A]">
              02
            </span>
            <div className="w-10 h-[1px] bg-[#B79B5E]" />
          </motion.div>

          {/* Title: clamp(34px, 3.8vw, 56px), line-height 1.04 */}
          <h2 className="font-instrument text-[clamp(34px,3.8vw,56px)] leading-[1.04] font-normal tracking-tight text-[#0b0f0d]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_CUBIC }}
              >
                Studies your competitors
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[#7A8A82]"
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT_CUBIC }}
              >
                and your <em className="italic font-normal text-[#0B6B4A]">customers.</em>
              </motion.span>
            </span>
          </h2>

          {/* Description: 15px, line-height 1.55, max-width 420px, muted */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT_CUBIC }}
            className="font-sans text-[15px] leading-[1.55] text-[#44544d] max-w-[420px]"
          >
            Senna reads your competitors&apos; ads and organic posts and thousands of
            reviews across Reddit and Amazon, then finds the audiences they are missing.
          </motion.p>

          {/* Stats Pair & CTA Pill Button */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_CUBIC }}
            className="pt-2 flex flex-col gap-4"
          >
            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8">
              {/* Stat 1: 12,000+ */}
              <div className="flex flex-col">
                <span className="font-instrument text-[48px] font-normal tracking-tight text-[#0b0f0d] tabular-nums leading-none">
                  {reviewsCount >= 1000 ? reviewsCount.toLocaleString() : reviewsCount}+
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#44544d] font-bold mt-1.5">
                  REVIEWS READ
                </span>
              </div>

              {/* Hairline Divider */}
              <div className="w-[1px] h-9 bg-[rgba(11,107,74,0.16)]" />

              {/* Stat 2: 214 */}
              <div className="flex flex-col">
                <span className="font-instrument text-[48px] font-normal tracking-tight text-[#0b0f0d] tabular-nums leading-none">
                  {rivalDaysCount}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#44544d] font-bold mt-1.5">
                  DAY TOP RIVAL AD
                </span>
              </div>
            </div>

            {/* Button Pill: Height 40px, Text 13px */}
            <div className="pt-1">
              <button
                type="button"
                className="group inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#0b0f0d] text-white text-[13px] font-semibold tracking-wide hover:bg-[#0B6B4A] transition-colors duration-200 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B79B5E] group-hover:rotate-12 transition-transform duration-200" />
                <span>+ Own all-day energy</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:text-white transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* =============================================================== */}
        {/* COLUMN B: Three Persona Accordion Panels                        */}
        {/* Compact row with height clamp(220px, 34vh, 300px)               */}
        {/* =============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT_CUBIC }}
          className="w-full flex flex-col justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#44544d] font-bold mb-2">
            AUDIENCE PERSONA RADAR
          </span>

          <div className="w-full flex items-stretch gap-2 h-[clamp(220px,34vh,300px)] p-1.5 rounded-[22px] bg-black/[0.02] border border-[rgba(11,107,74,0.08)] overflow-hidden">
            {PERSONAS.map((persona, idx) => {
              const isCurrent = idx === activePersonaIdx;

              return (
                <motion.div
                  key={persona.id}
                  layout
                  onClick={() => setActivePersonaIdx(idx)}
                  transition={{
                    layout: { duration: 0.55, ease: EASE_OUT_CUBIC },
                  }}
                  className={`relative rounded-[18px] overflow-hidden cursor-pointer transition-shadow duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'w-[44%] flex-[2.4] shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
                      : 'w-[16%] flex-[0.8] hover:flex-[0.95] opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    border: `1px solid ${isCurrent ? persona.borderColor : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {/* Background Artwork */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${persona.moodColor}`}>
                    <Image
                      src={persona.imgSrc}
                      alt={persona.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center opacity-30 mix-blend-overlay"
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 28px ${persona.glowColor}`,
                      }}
                    />
                  </div>

                  {/* Active Panel View */}
                  {isCurrent ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 w-full h-full p-3.5 sm:p-4 flex flex-col justify-between text-white"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-mono text-[9px] text-white/90 uppercase tracking-widest font-semibold">
                            {persona.statOnline}
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
                          {persona.badgeIcon}
                        </div>
                      </div>

                      {/* Middle: Graph Curve */}
                      <div className="w-full my-auto py-1">
                        <div className="h-10 w-full relative flex items-center">
                          <svg
                            viewBox="0 0 220 35"
                            className="w-full h-full overflow-visible"
                            fill="none"
                          >
                            <path
                              d={persona.graphPath}
                              stroke="rgba(255,255,255,0.85)"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <circle cx="55" cy="14" r="2.5" fill="#ffffff" />
                            <circle cx="160" cy="6" r="3" fill="#34d399" />
                          </svg>
                        </div>

                        {/* Metric Row */}
                        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/15">
                          {persona.subMetrics.map((met) => (
                            <div key={met.label} className="flex flex-col">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-white/60">
                                {met.label}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-white tracking-tight">
                                {met.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Info: Name 24px serif, tags 10px mono */}
                      <div>
                        <h3 className="font-instrument text-[24px] font-normal tracking-tight text-white leading-tight">
                          {persona.name}
                        </h3>
                        <p className="font-mono text-[10px] text-white/75 tracking-[0.12em] uppercase mt-0.5">
                          {persona.tags}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* Inactive Panel View: Width 16%, vertical rotated name */
                    <div className="relative z-10 w-full h-full p-2.5 flex flex-col justify-between items-center text-white/80">
                      <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center">
                        {persona.badgeIcon}
                      </div>

                      <span
                        className="font-instrument text-[16px] sm:text-[18px] font-normal text-white/90 tracking-wide select-none whitespace-nowrap"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {persona.name}
                      </span>

                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
