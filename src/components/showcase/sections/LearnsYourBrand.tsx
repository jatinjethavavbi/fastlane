'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SectionProps {
  isActive?: boolean;
}

export function LearnsYourBrand({ isActive = true }: SectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Typing animation for "drinkag1.com"
  const fullText = 'drinkag1.com';
  const [typedText, setTypedText] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBand, setHoveredBand] = useState<number | null>(null);

  // Animated stat counter values
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setTypedText('');
      setCount(0);
      return;
    }

    // Typewriter effect
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= fullText.length) {
        setTypedText(fullText.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
      }
    }, 85);

    // Count up 0 -> 1032
    let startTimestamp: number | null = null;
    const duration = 1200;
    const targetCount = 1032;

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
      clearInterval(typeInterval);
      window.cancelAnimationFrame(reqId);
    };
  }, [isActive]);

  const products = [
    { title: 'AG1 POUCH', src: '/brand/ag1-pouch.svg', baseRot: -4 },
    { title: 'AG1 TRAVEL', src: '/brand/ag1-travel-pack.svg', baseRot: -1.5 },
    { title: 'AG1 SCOOP', src: '/brand/ag1-scoop.svg', baseRot: 1.5 },
    { title: 'AG1 BOTTLE', src: '/brand/ag1-bottle.svg', baseRot: 4 },
  ];

  const palette = [
    { hex: '#47B868', name: 'Emerald Mint' },
    { hex: '#0F925D', name: 'Fresh Green' },
    { hex: '#0C5438', name: 'Deep Forest' },
    { hex: '#9AD385', name: 'Sage Leaf' },
    { hex: '#DCF1E6', name: 'Porcelain Tint' },
    { hex: '#7B9488', name: 'Slate Moss' },
  ];

  const toneWords = ['Science-backed', 'Simple', 'Warm', 'Never hypey'];

  return (
    <div className="w-full text-[#0b0f0d] select-none py-1">
      {/* ================================================================= */}
      {/* TWO-COLUMN GRID: Column A & Column B (gap 32-40px)                */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* =============================================================== */}
        {/* COLUMN A: Header, Description, URL Scan Bar, Tone Vectors        */}
        {/* =============================================================== */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {/* 01 Label + Gold hairline */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="flex items-center gap-2.5"
          >
            <span className="font-mono text-[11px] uppercase font-bold tracking-[0.2em] text-[#0B6B4A]">
              01
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
            Learns <em className="italic font-normal text-[#0B6B4A]">your brand</em>
          </motion.h2>

          {/* Description: 15px, line-height 1.5, max-width 420px, muted */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT_CUBIC }}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.5] text-[#44544d] max-w-[420px]"
          >
            Give Senna a URL. It pulls your product, palette and tone of voice, then
            scans every ad you have ever run and tells you what is actually working.
          </motion.p>

          {/* URL Scanner Bar: Height 40px, Text 13px */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT_CUBIC }}
            className="relative w-full max-w-[400px] h-[40px] rounded-full bg-white border border-[rgba(11,107,74,0.14)] shadow-[0_4px_16px_rgba(11,107,74,0.05)] px-3 flex items-center justify-between overflow-hidden"
          >
            {/* Left Badge: SENNA */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#0b0f0d] text-white font-mono text-[9px] font-bold tracking-widest uppercase">
                SENNA
              </span>
              <div className="flex items-center font-mono text-[12px] sm:text-[13px] text-[#0b0f0d] font-medium tracking-wide">
                <span>{typedText}</span>
                <span className="inline-block w-[1.5px] h-3.5 bg-[#0B6B4A] ml-0.5 animate-pulse" />
              </div>
            </div>

            {/* Right Status: LIVE */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/50">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[8px] font-bold text-emerald-800 tracking-wider uppercase">
                LIVE
              </span>
            </div>

            {/* Sweep Scanline */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent pointer-events-none"
                animate={{ x: [-80, 420] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
              />
            )}
          </motion.div>

          {/* Tone Words: Instrument Serif 20-22px in ONE row */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT_CUBIC }}
            className="pt-1"
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#44544d] font-bold mb-1">
              TONE OF VOICE VECTORS
            </span>
            <div className="flex items-center flex-wrap gap-1.5 text-[#0b0f0d]">
              {toneWords.map((word, i) => (
                <React.Fragment key={word}>
                  <span className="font-instrument text-[19px] sm:text-[21px] font-normal tracking-tight">
                    {word}
                  </span>
                  {i < toneWords.length - 1 && (
                    <span className="text-[#B79B5E] text-xs select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =============================================================== */}
        {/* COLUMN B: Product Fan, Palette Ribbon, Stats Row                */}
        {/* =============================================================== */}
        <div className="flex flex-col gap-2.5 sm:gap-3 justify-between">
          {/* Catalog Extracted Fan: Widened cards 100px x 124px */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT_CUBIC }}
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#44544d] font-bold mb-1">
              CATALOG EXTRACTED
            </span>
            {/* 4 Cards: widened to 100px x 124px, no label clipping */}
            <div className="relative flex items-center h-[130px] pl-1">
              {products.map((item, idx) => {
                const isHovered = hoveredCard === idx;
                const offsetSpread = hoveredCard !== null ? idx * 86 : idx * 74;
                const rotation = isHovered ? 0 : item.baseRot;

                return (
                  <motion.div
                    key={item.title}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    animate={{
                      rotate: rotation,
                      x: offsetSpread,
                      y: isHovered ? -5 : 0,
                      scale: isHovered ? 1.04 : 1,
                      zIndex: isHovered ? 20 : idx + 1,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="absolute top-0 w-[100px] h-[124px] rounded-[16px] bg-white border border-[rgba(11,107,74,0.12)] shadow-[0_6px_18px_rgba(0,0,0,0.05)] p-1.5 flex flex-col items-center justify-between cursor-pointer"
                  >
                    <div className="relative w-full h-[80px] rounded-[10px] bg-[#F7FAF8] flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={64}
                        height={70}
                        className="object-contain"
                      />
                    </div>
                    {/* Ellipsis + 100% max-width + 9px font: guaranteed NO clipping */}
                    <span className="font-mono text-[9px] uppercase tracking-normal text-[#0b0f0d] font-semibold text-center truncate max-w-full px-1 w-full">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Palette Ribbon: Height 34px, hex shown on hover only */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT_CUBIC }}
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#44544d] font-bold mb-1">
              BRAND PALETTE RIBBON
            </span>
            <div className="relative w-full max-w-[340px] h-[34px] rounded-[12px] overflow-hidden flex border border-[rgba(11,107,74,0.1)] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              {palette.map((swatch, idx) => {
                const isHovered = hoveredBand === idx;
                return (
                  <div
                    key={swatch.hex}
                    onMouseEnter={() => setHoveredBand(idx)}
                    onMouseLeave={() => setHoveredBand(null)}
                    style={{ backgroundColor: swatch.hex }}
                    className="relative flex-1 h-full cursor-pointer transition-all duration-200 flex items-center justify-center group"
                  >
                    {isHovered && (
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold text-white bg-black/60 backdrop-blur-xs px-1 tracking-wider uppercase">
                        {swatch.hex}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats: Big stat + hairline dividers (compact height) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT_CUBIC }}
            className="pt-0.5"
          >
            {/* Big Stat */}
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-instrument text-[42px] sm:text-[46px] font-normal tracking-tight text-[#0B6B4A] tabular-nums leading-none">
                {count.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#44544d] font-bold">
                ADS SCANNED
              </span>
            </div>

            {/* Hairline dividers metrics row (no boxes) */}
            <div className="grid grid-cols-4 gap-2 pt-1.5 border-t border-[rgba(11,107,74,0.12)]">
              <div className="flex flex-col">
                <span className="font-instrument text-[19px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  528
                </span>
                <span className="font-sans text-[10px] text-[#44544d] mt-0.5">
                  days, top ad
                </span>
              </div>

              <div className="flex flex-col border-l border-[rgba(11,107,74,0.12)] pl-2">
                <span className="font-instrument text-[19px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  48%
                </span>
                <span className="font-sans text-[10px] text-[#44544d] mt-0.5">
                  discount-led
                </span>
              </div>

              <div className="flex flex-col border-l border-[rgba(11,107,74,0.12)] pl-2">
                <span className="font-instrument text-[19px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  40%
                </span>
                <span className="font-sans text-[10px] text-[#44544d] mt-0.5">
                  no captions
                </span>
              </div>

              <div className="flex flex-col border-l border-[rgba(11,107,74,0.12)] pl-2">
                <span className="font-instrument text-[19px] text-[#0b0f0d] font-normal tabular-nums leading-none">
                  2/wk
                </span>
                <span className="font-sans text-[10px] text-[#44544d] mt-0.5">
                  organic posts
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
