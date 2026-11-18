'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, ArrowRight, Zap, Play } from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SectionProps {
  isActive?: boolean;
}

interface AdCardItem {
  id: string;
  name: string;
  tag: string;
  imgSrc: string;
  videoSrc: string;
  category: 'remix' | 'trending' | 'creator';
  angle: string;
}

const AD_ITEMS: AdCardItem[] = [
  {
    id: 'competitor',
    name: 'Competitor Ad',
    tag: 'COMPETITOR',
    imgSrc: '/showcase/ads/competitor.jpg',
    videoSrc: '/ads/center-3.mp4',
    category: 'remix',
    angle: 'Benchmark: Huel single-benefit static angle',
  },
  {
    id: 'ag1-remix',
    name: 'AG1 Remix',
    tag: 'AG1 REMIX',
    imgSrc: '/showcase/ads/ag1-remix.jpg',
    videoSrc: '/ads/left-5.mp4',
    category: 'remix',
    angle: 'Net-new rewrite: 75 whole-food vitamins hook',
  },
  {
    id: 'chalkboard',
    name: 'Chalkboard Explainer',
    tag: 'CHALKBOARD',
    imgSrc: '/showcase/ads/chalkboard.jpg',
    videoSrc: '/ads/left-1.mp4',
    category: 'trending',
    angle: 'Stop-motion chalkboard ingredient deconstruct',
  },
  {
    id: 'claymation',
    name: 'Claymation Table',
    tag: 'CLAYMATION',
    imgSrc: '/showcase/ads/claymation.jpg',
    videoSrc: '/ads/left-2.mp4',
    category: 'trending',
    angle: 'Hand-crafted clay figurine tabletop scene',
  },
  {
    id: 'baby-podcast',
    name: 'Baby Podcast',
    tag: 'BABY PODCAST',
    imgSrc: '/showcase/ads/baby-podcast.jpg',
    videoSrc: '/ads/left-3.mp4',
    category: 'trending',
    angle: 'High-retention humor hook with studio mic',
  },
  {
    id: 'green-screen',
    name: 'Green Screen Reaction',
    tag: 'GREEN SCREEN',
    imgSrc: '/showcase/ads/green-screen.jpg',
    videoSrc: '/ads/center-4.mp4',
    category: 'creator',
    angle: 'Split-view live commentary & reaction format',
  },
  {
    id: 'notes-app',
    name: 'Notes App Checklist',
    tag: 'NOTES APP',
    imgSrc: '/showcase/ads/notes-app.jpg',
    videoSrc: '/ads/center-6.mp4',
    category: 'trending',
    angle: 'Relatable native iOS Notes breakdown',
  },
  {
    id: 'routine',
    name: 'Morning Routine Vlog',
    tag: 'ROUTINE',
    imgSrc: '/showcase/ads/routine.jpg',
    videoSrc: '/ads/right-2.mp4',
    category: 'creator',
    angle: 'Unfiltered bathroom morning habit integration',
  },
  {
    id: 'ai-creator',
    name: 'AI Wellness Creator',
    tag: 'AI CREATOR',
    imgSrc: '/showcase/ads/ai-creator.jpg',
    videoSrc: '/ads/center-1.mp4',
    category: 'creator',
    angle: 'Hyper-realistic AI creator kitchen walkthrough',
  },
  {
    id: 'qa-sticker',
    name: 'Q&A Sticker Hook',
    tag: 'Q&A STICKER',
    imgSrc: '/showcase/ads/qa-sticker.jpg',
    videoSrc: '/ads/left-8.mp4',
    category: 'creator',
    angle: 'Direct skepticism objection handling sticker',
  },
];

export function CreatesTheAds({ isActive = true }: SectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isApproved, setIsApproved] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'remix' | 'trending' | 'creator'>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Animated stat counter values
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      setIsApproved(false);
      // Pause all videos when inactive
      Object.values(videoRefs.current).forEach((video) => {
        if (video) video.pause();
      });
      return;
    }

    // Play all videos when active
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    });

    // Count up 0 -> 30
    let startTimestamp: number | null = null;
    const duration = 1000;
    const targetCount = 30;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * targetCount));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const reqId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(reqId);
    };
  }, [isActive]);

  const handleApproveAll = () => {
    setIsApproved((prev) => !prev);
  };

  const row1 = AD_ITEMS.slice(0, 5);
  const row2 = AD_ITEMS.slice(5, 10);

  return (
    <div className="w-full text-[#0b0f0d] select-none py-1">
      {/* ================================================================= */}
      {/* TWO-COLUMN GRID: Column A & Column B (gap 32-40px)                */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* =============================================================== */}
        {/* COLUMN A: Header, Description, Batch Action Bar, Metrics        */}
        {/* =============================================================== */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {/* 03 Label + Gold hairline */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="flex items-center gap-2.5"
          >
            <span className="font-mono text-[11px] uppercase font-bold tracking-[0.2em] text-[#0B6B4A]">
              03
            </span>
            <div className="w-8 h-[1px] bg-[#B79B5E]" />
          </motion.div>

          {/* Title: clamp(32px, 3.4vw, 50px), line-height 1.04 */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: EASE_OUT_CUBIC }}
            className="font-instrument text-[clamp(32px,3.4vw,50px)] leading-[1.04] font-normal tracking-tight text-[#0b0f0d]"
          >
            Creates <em className="italic font-normal text-[#0B6B4A]">the ads.</em>
          </motion.h2>

          {/* Description: 14-15px, line-height 1.5, max-width 420px, muted */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT_CUBIC }}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.5] text-[#44544d] max-w-[420px]"
          >
            Dozens of net-new concepts per campaign: competitor remixes, trending formats, AI creators, statics and memes. You approve, Senna makes.
          </motion.p>

          {/* SENNA Batch Control Bar (Exact content: SENNA 30 ads ready + Approve all) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT_CUBIC }}
            className="relative w-full max-w-[420px] h-[44px] rounded-full bg-white border border-[rgba(11,107,74,0.14)] shadow-[0_4px_16px_rgba(11,107,74,0.06)] px-2.5 sm:px-3 flex items-center justify-between"
          >
            {/* Left: SENNA badge + 30 ads ready */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#0b0f0d] text-white font-mono text-[9px] font-bold tracking-widest uppercase">
                SENNA
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[12px] sm:text-[13px] text-[#0b0f0d] font-semibold tracking-tight">
                <span className="text-[#0B6B4A] tabular-nums font-bold text-[14px]">
                  {count}
                </span>
                <span className="text-[#44544d] font-normal">ads ready</span>
              </div>
            </div>

            {/* Right: Approve All Button Pill */}
            <button
              type="button"
              onClick={handleApproveAll}
              className={`inline-flex items-center gap-1.5 h-[32px] px-3 sm:px-3.5 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-wide transition-all duration-300 shadow-xs cursor-pointer select-none ${
                isApproved
                  ? 'bg-[#0B6B4A] text-white'
                  : 'bg-[#0b0f0d] text-white hover:bg-[#0B6B4A]'
              }`}
            >
              {isApproved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>30 Approved</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#B79B5E]" />
                  <span>Approve all</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Stats & Key Angles Row (hairline dividers) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT_CUBIC }}
            className="pt-1"
          >
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(11,107,74,0.12)] max-w-[420px]">
              <div className="flex flex-col">
                <span className="font-instrument text-[24px] sm:text-[26px] text-[#0B6B4A] font-normal tabular-nums leading-none">
                  30
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#44544d] font-bold mt-1">
                  Concepts Batch
                </span>
              </div>

              <div className="flex flex-col border-l border-[rgba(11,107,74,0.12)] pl-3">
                <span className="font-instrument text-[24px] sm:text-[26px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  10
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#44544d] font-bold mt-1">
                  Format Types
                </span>
              </div>

              <div className="flex flex-col border-l border-[rgba(11,107,74,0.12)] pl-3">
                <span className="font-instrument text-[24px] sm:text-[26px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  1-Click
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#44544d] font-bold mt-1">
                  Batch Approval
                </span>
              </div>
            </div>

            {/* Hovered Concept Angle Inspector Note */}
            <div className="mt-2.5 min-h-[22px] flex items-center">
              {hoveredCard ? (
                <div className="flex items-center gap-1.5 text-[11px] text-[#0B6B4A] font-mono tracking-tight animate-fadeIn">
                  <Zap className="w-3 h-3 text-[#B79B5E]" />
                  <span className="font-semibold">{AD_ITEMS.find((c) => c.id === hoveredCard)?.tag}:</span>
                  <span className="text-[#44544d] font-sans font-normal truncate max-w-[300px]">
                    {AD_ITEMS.find((c) => c.id === hoveredCard)?.angle}
                  </span>
                </div>
              ) : (
                <span className="font-mono text-[10px] text-[#7A8A82] tracking-wider uppercase">
                  Hover any ad to play preview and inspect angle
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* =============================================================== */}
        {/* COLUMN B: Format Cards Grid with Video Motion Playback          */}
        {/* =============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT_CUBIC }}
          className="flex flex-col gap-2 justify-between"
        >
          {/* Header Row: Label & Category Chips */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#44544d] font-bold">
              GENERATED FORMAT MATRIX
            </span>
            <div className="flex items-center gap-1">
              {(['all', 'remix', 'trending', 'creator'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2 py-0.5 rounded-full font-mono text-[8.5px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#0B6B4A] text-white'
                      : 'bg-black/[0.04] text-[#44544d] hover:bg-black/[0.08]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Container: 2 Rows matching the reference design with Live Videos */}
          <div className="w-full flex flex-col gap-2.5 p-2 rounded-[20px] bg-black/[0.02] border border-[rgba(11,107,74,0.08)]">
            {/* ROW 1: Competitor -> Remix, Chalkboard, Claymation, Baby Podcast */}
            <div className="flex items-center gap-1.5 sm:gap-2 justify-between">
              {row1.map((item, idx) => {
                const isMatch = activeFilter === 'all' || activeFilter === item.category;
                const isHovered = hoveredCard === item.id;

                return (
                  <React.Fragment key={item.id}>
                    {/* Transfer arrow between competitor and ag1-remix */}
                    {idx === 1 && (
                      <div className="flex items-center justify-center shrink-0 w-4.5 h-4.5 rounded-full bg-black/80 text-white shadow-xs z-10">
                        <ArrowRight className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}

                    <div
                      onMouseEnter={() => {
                        setHoveredCard(item.id);
                        const v = videoRefs.current[item.id];
                        if (v && v.paused) v.play().catch(() => {});
                      }}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`relative flex-1 aspect-[9/15] rounded-[10px] sm:rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200 border bg-black ${
                        isMatch ? 'opacity-100' : 'opacity-30'
                      } ${
                        isHovered
                          ? 'scale-[1.05] z-10 border-[#0B6B4A] shadow-[0_8px_20px_rgba(11,107,74,0.18)]'
                          : 'border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                      }`}
                    >
                      {/* Video Player Background */}
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={item.videoSrc}
                        poster={item.imgSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Approved checkmark overlay */}
                      <AnimatePresence>
                        {isApproved && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs z-10"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bottom Tag Pill (Fitted without truncation) */}
                      <div className="absolute inset-x-0 bottom-1 flex justify-center px-0.5 pointer-events-none z-10">
                        <span className="font-mono text-[5.5px] sm:text-[6.5px] font-bold uppercase tracking-tight text-white bg-black/80 backdrop-blur-xs px-1 py-0.5 rounded-sm whitespace-nowrap text-center shadow-xs">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* ROW 2: Green Screen, Notes App, Routine, AI Creator, Q&A Sticker */}
            <div className="flex items-center gap-1.5 sm:gap-2 justify-between">
              {row2.map((item) => {
                const isMatch = activeFilter === 'all' || activeFilter === item.category;
                const isHovered = hoveredCard === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => {
                      setHoveredCard(item.id);
                      const v = videoRefs.current[item.id];
                      if (v && v.paused) v.play().catch(() => {});
                    }}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`relative flex-1 aspect-[9/15] rounded-[10px] sm:rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200 border bg-black ${
                      isMatch ? 'opacity-100' : 'opacity-30'
                    } ${
                      isHovered
                        ? 'scale-[1.05] z-10 border-[#0B6B4A] shadow-[0_8px_20px_rgba(11,107,74,0.18)]'
                        : 'border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {/* Video Player Background */}
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.videoSrc}
                      poster={item.imgSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Approved checkmark overlay */}
                    <AnimatePresence>
                      {isApproved && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs z-10"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Tag Pill (Fitted without truncation) */}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center px-0.5 pointer-events-none z-10">
                      <span className="font-mono text-[5.5px] sm:text-[6.5px] font-bold uppercase tracking-tight text-white bg-black/80 backdrop-blur-xs px-1 py-0.5 rounded-sm whitespace-nowrap text-center shadow-xs">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
