'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Repeat, Eye, Volume2, VolumeX } from 'lucide-react';

interface VideoFormatShowcaseProps {
  onStartNow?: () => void;
}

export function VideoFormatShowcase({ onStartNow }: VideoFormatShowcaseProps) {
  // Synchronized caption ticker for live auto-caption simulations
  const [captionTick, setCaptionTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionTick((prev) => (prev + 1) % 4);
    }, 1900);
    return () => clearInterval(timer);
  }, []);

  const newsCaptions = [
    "Tonight's development",
    '75 ingredients',
    'one scoop of AG1',
    'every single day',
  ];

  const podcastCaptions = ['of AG1', 'annoying', 'counting', 'why it works'];

  const papermationCaptions = [
    'most of us',
    'get some of them',
    'your body needs dozens',
    'every single day',
  ];

  const carTapperCaptions = [
    'every single day',
    '3 seconds in the morning',
    'my daily non-negotiable',
    'feel the difference',
  ];

  const winner1Captions = [
    'wait why does this actually look so good??',
    'day 14 of the routine',
    'zero regret purchase',
    '10/10 recommend',
  ];

  const winner2Captions = [
    'i was so skeptical until day 3...',
    'takes literally 10 seconds',
    'replaced my entire setup',
    'honestly life changing',
  ];

  return (
    <section className="relative w-full bg-white pt-24 sm:pt-32 pb-16 overflow-hidden flex flex-col items-center">
      {/* Hero Headline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <h1
          className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] font-bold tracking-tight text-[#111114] leading-[1.04]"
          style={{ textWrap: 'balance' }}
        >
          Create infinite content,
          <br />
          based on winning formats.
        </h1>
      </div>

      {/* Marquee Showcase Container with Edge Fade Masks */}
      <div className="relative w-full marquee-pause overflow-hidden select-none">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inset-y-0 w-20 sm:w-44 z-30 bg-gradient-to-r from-white via-white/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 inset-y-0 w-20 sm:w-44 z-30 bg-gradient-to-l from-white via-white/80 to-transparent"
        />

        {/* ROW 1: Scrolling LEFT */}
        <div className="flex w-max animate-marquee-left gap-3.5 sm:gap-4 mb-3.5 sm:mb-4">
          {/* First set */}
          <Row1Cards
            captionTick={captionTick}
            newsCaptions={newsCaptions}
            podcastCaptions={podcastCaptions}
            papermationCaptions={papermationCaptions}
            carTapperCaptions={carTapperCaptions}
            onCardClick={onStartNow}
          />
          {/* Duplicate set for seamless infinite loop */}
          <Row1Cards
            captionTick={captionTick}
            newsCaptions={newsCaptions}
            podcastCaptions={podcastCaptions}
            papermationCaptions={papermationCaptions}
            carTapperCaptions={carTapperCaptions}
            onCardClick={onStartNow}
          />
        </div>

        {/* ROW 2: Scrolling RIGHT */}
        <div className="flex w-max animate-marquee-right gap-3.5 sm:gap-4">
          {/* First set */}
          <Row2Cards
            captionTick={captionTick}
            winner1Captions={winner1Captions}
            winner2Captions={winner2Captions}
            onCardClick={onStartNow}
          />
          {/* Duplicate set for seamless infinite loop */}
          <Row2Cards
            captionTick={captionTick}
            winner1Captions={winner1Captions}
            winner2Captions={winner2Captions}
            onCardClick={onStartNow}
          />
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <p className="mt-8 sm:mt-10 px-4 text-center text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
        EXAMPLE OUTPUT. FASTLANE IS NOT AFFILIATED WITH AG1 OR THE OTHER BRANDS SHOWN.
      </p>
    </section>
  );
}

// Common Card Wrapper with hover elevation & badge
interface CardFrameProps {
  tag: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function CardFrame({ tag, children, onClick }: CardFrameProps) {
  return (
    <div
      onClick={onClick}
      className="relative shrink-0 w-[170px] sm:w-[195px] md:w-[215px] h-[290px] sm:h-[335px] md:h-[365px] rounded-[22px] overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 cursor-pointer group"
    >
      {children}

      {/* Soft Bottom Gradient for Text Legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      {/* Format Tag Badge */}
      <div className="absolute bottom-3 left-3 z-20">
        <span className="px-2.5 py-1 rounded-[6px] bg-black/65 backdrop-blur-md border border-white/15 text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider text-white uppercase inline-flex items-center gap-1.5 shadow-sm">
          {tag}
        </span>
      </div>
    </div>
  );
}

// Optimized video player element with autoPlay, loop, muted
interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

// ==========================================
// ROW 1 CARDS
// ==========================================
interface Row1Props {
  captionTick: number;
  newsCaptions: string[];
  podcastCaptions: string[];
  papermationCaptions: string[];
  carTapperCaptions: string[];
  onCardClick?: () => void;
}

function Row1Cards({
  captionTick,
  newsCaptions,
  podcastCaptions,
  papermationCaptions,
  carTapperCaptions,
  onCardClick,
}: Row1Props) {
  return (
    <>
      {/* 1. CAR TAPPER (with public/video/sunglasses_1.mp4) */}
      <CardFrame tag="CAR TAPPER" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#181C1E]">
          <VideoPlayer src="/video/sunglasses_1.mp4" poster="/images/ad_creator_lifestyle_1794908396875.jpg" />
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-[9.5px] text-white/90 font-mono">
            REC ●
          </div>
          {/* Dynamic kinetic caption */}
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={carTapperCaptions[captionTick]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="inline-block px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white font-display text-[13px] sm:text-[14px] font-bold tracking-wide"
              >
                {carTapperCaptions[captionTick]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </CardFrame>

      {/* 2. BREAKING NEWS (with public/video/running_shoe.mp4) */}
      <CardFrame tag="BREAKING NEWS" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#0E1726] flex flex-col justify-between overflow-hidden">
          <VideoPlayer src="/video/running_shoe.mp4" poster="/images/ad_athletic_runner_1794908396789.jpg" />
          {/* News Studio Overlay Graphic */}
          <div className="absolute top-3.5 left-3 bg-[#E11D48] text-white font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-md z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            LIVE REPORT
          </div>
          <div className="absolute top-3.5 right-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 text-white font-display text-[10px] font-bold z-10">
            AG1
          </div>

          {/* Lower Third News Ticker with Dynamic Captions */}
          <div className="absolute inset-x-2.5 bottom-12 z-20">
            <div className="bg-[#0C1B33]/90 backdrop-blur-md border border-[#38BDF8]/40 rounded-lg p-2 shadow-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-[#E11D48] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                  UPDATE
                </span>
                <span className="text-[9.5px] text-sky-300 font-mono font-medium">
                  BREAKING HEADLINE
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={newsCaptions[captionTick]}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-white font-display font-bold text-[12px] leading-tight"
                >
                  {newsCaptions[captionTick]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardFrame>

      {/* 3. MEME */}
      <CardFrame tag="MEME" onClick={onCardClick}>
        <div className="relative w-full h-full bg-white flex flex-col p-3 justify-between text-[#111114]">
          <div className="flex-1 border-b border-neutral-200 pb-2 flex flex-col justify-between">
            <div className="flex items-start gap-2">
              <div className="w-11 h-11 shrink-0 bg-neutral-100 rounded-lg border border-neutral-300 flex items-center justify-center text-2xl">
                😭
              </div>
              <p className="text-[10px] font-bold leading-tight text-neutral-800">
                I can't take 12 vitamins, probiotics and nutrients in a single scoop
              </p>
            </div>
            <div className="flex items-center gap-1 mt-1 text-base">
              🥦 🥕 💊 🥬 🧄
            </div>
          </div>

          <div className="flex-1 pt-2 flex flex-col justify-between">
            <div className="flex items-start gap-2">
              <div className="w-11 h-11 shrink-0 bg-emerald-50 rounded-lg border border-emerald-300 flex items-center justify-center text-2xl">
                🗿
              </div>
              <div>
                <p className="text-[11px] font-black text-neutral-900 leading-tight">
                  Ever heard of AG1?
                </p>
                <span className="inline-block mt-1 text-[9px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  1 scoop · 75 nutrients
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardFrame>

      {/* 4. AI PODCAST (with public/video/coffee_brewing.mp4) */}
      <CardFrame tag="AI PODCAST" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#1A1817]">
          <VideoPlayer src="/video/coffee_brewing.mp4" poster="/images/case_study_roastery_1794908397891.jpg" />
          {/* Studio Audio Bars & Time Indicator */}
          <div className="absolute top-3.5 inset-x-3 flex items-center justify-between z-10">
            <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9.5px] font-mono text-white/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              08:42
            </span>
            <div className="flex items-center gap-0.5 h-3">
              {[8, 14, 6, 12, 10].map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} className="w-0.5 bg-white/80 rounded-full" />
              ))}
            </div>
          </div>

          <div className="absolute bottom-14 right-3 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2 py-0.5 rounded text-center z-10">
            <span className="block text-[7.5px] font-mono text-emerald-300">STUDIO GUEST</span>
            <span className="font-display text-[11px] font-extrabold text-white">AG1</span>
          </div>

          {/* Dynamic Captions highlighting words */}
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={podcastCaptions[captionTick]}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.18 }}
                className="inline-block px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-sm border border-white/20 text-white font-display text-[13.5px] font-bold"
              >
                <span className="text-emerald-400">"{podcastCaptions[captionTick]}"</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardFrame>

      {/* 5. PAPERMATION (with public/video/face_serum.mp4) */}
      <CardFrame tag="PAPERMATION" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#EFE8DD] overflow-hidden">
          <VideoPlayer src="/video/face_serum.mp4" poster="/images/ad_skincare_editorial_1794908395716.jpg" />
          <div className="absolute inset-0 bg-amber-950/15 mix-blend-multiply" />
          {/* Paper Speech Bubble */}
          <div className="absolute inset-x-3 top-1/3 text-center pointer-events-none z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={papermationCaptions[captionTick]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-block px-2.5 py-1 rounded-md bg-white border border-neutral-300 shadow-sm text-[11px] font-bold text-neutral-800"
              >
                {papermationCaptions[captionTick]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute top-3 right-3 text-lg z-10">
            ☀️
          </div>
        </div>
      </CardFrame>

      {/* 6. STATIC (with public/video/luxury_minimalist.mp4) */}
      <CardFrame tag="STATIC" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#FAF5EE] overflow-hidden">
          <VideoPlayer src="/video/luxury_minimalist.mp4" poster="/images/ad_audio_hardware_1794908395903.jpg" />
          {/* Clean minimal overlay */}
          <div className="absolute top-3.5 left-3.5 bg-black/55 backdrop-blur-xs px-2 py-1 rounded text-white z-10">
            <p className="text-[9.5px] font-bold tracking-wide">99 problems: 🥱🤧</p>
            <p className="text-[11px] font-extrabold text-emerald-400 mt-0.5">1 solution: AG1</p>
          </div>
        </div>
      </CardFrame>

      {/* 7. TROLLEY REMIX (with public/video/led_light.mp4) */}
      <CardFrame tag="TROLLEY REMIX" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#111827] overflow-hidden">
          <VideoPlayer src="/video/led_light.mp4" poster="/images/case_study_roastery_1794908397891.jpg" />
          {/* Neon Caption "Reality..." */}
          <div className="absolute top-1/3 inset-x-3 text-center z-10">
            <span className="text-white font-display text-xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Reality:
            </span>
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {['AG1', 'AG1', 'AG1', 'AG1'].map((item, idx) => (
                <span
                  key={idx}
                  className="text-[9.5px] font-mono font-bold bg-emerald-600/80 text-white px-1.5 py-0.5 rounded shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardFrame>

      {/* 8. PILLS (with public/video/neck_pillow_1.mp4) */}
      <CardFrame tag="PILLS" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#F3F4F6] overflow-hidden">
          <VideoPlayer src="/video/neck_pillow_1.mp4" poster="/images/ad_athletic_runner_1794908396789.jpg" />
          <div className="absolute top-3.5 inset-x-3 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg text-white text-center z-10">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-emerald-300">
              Daily Comfort
            </span>
            <h4 className="text-[11.5px] font-extrabold leading-tight">12 Bottles vs 1 Scoop</h4>
          </div>
        </div>
      </CardFrame>
    </>
  );
}

// ==========================================
// ROW 2 CARDS
// ==========================================
interface Row2Props {
  captionTick: number;
  winner1Captions: string[];
  winner2Captions: string[];
  onCardClick?: () => void;
}

function Row2Cards({
  captionTick,
  winner1Captions,
  winner2Captions,
  onCardClick,
}: Row2Props) {
  return (
    <>
      {/* 1. 3D ANIMATION (with public/video/smartwatch.mp4) */}
      <CardFrame tag="3D ANIMATION" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#070709] overflow-hidden">
          <VideoPlayer src="/video/smartwatch.mp4" poster="/images/ad_audio_hardware_1794908395903.jpg" />
          <span className="absolute top-3.5 left-3 text-[9px] font-mono text-neutral-300 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded z-10">
            3D RENDER · 60FPS
          </span>
        </div>
      </CardFrame>

      {/* 2. MISSING POSTER (with public/video/leather_wallet_1.mp4) */}
      <CardFrame tag="MISSING POSTER" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#E6E1D8] overflow-hidden">
          <VideoPlayer src="/video/leather_wallet_1.mp4" poster="/images/case_study_roastery_1794908397891.jpg" />
          {/* Vintage telephone pole flyer header */}
          <div className="absolute top-3 inset-x-3 border-2 border-black p-1 text-center bg-white shadow-xs z-10">
            <h3 className="font-display text-[17px] font-black tracking-tight leading-none text-black">
              MISSING:
            </h3>
            <p className="text-[9px] font-bold tracking-wider uppercase text-neutral-800">
              MY SUGAR CRAVINGS
            </p>
          </div>
          {/* Tear-off fringe at bottom */}
          <div className="absolute bottom-11 inset-x-2 grid grid-cols-4 gap-0.5 border-t border-dashed border-white/60 pt-0.5 text-center bg-black/60 backdrop-blur-xs rounded z-10">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="text-[7.5px] font-mono font-bold text-amber-300">
                28g Pro
              </span>
            ))}
          </div>
        </div>
      </CardFrame>

      {/* 3. TWEET (with public/video/headphones_unboxing.mp4) */}
      <CardFrame tag="TWEET" onClick={onCardClick}>
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-between">
          <VideoPlayer src="/video/headphones_unboxing.mp4" poster="/images/ad_audio_hardware_1794908395903.jpg" />
          {/* Tweet Header & Copy Overlay */}
          <div className="absolute top-3 inset-x-3 bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-white/10 z-10">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-[10px] font-bold text-white">
                M
              </div>
              <div className="leading-none">
                <span className="text-[11px] font-bold text-white mr-1">Mia</span>
                <span className="text-[9px] text-neutral-400">@miawrites</span>
              </div>
            </div>
            <p className="text-[10px] leading-snug text-neutral-200">
              A good device isn't just hardware. It makes focus effortless.
            </p>
          </div>

          {/* Tweet metrics */}
          <div className="absolute bottom-11 inset-x-3 bg-black/70 backdrop-blur-xs py-1 px-2 rounded-md flex items-center justify-between text-neutral-300 text-[8.5px] z-10">
            <span className="flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 text-rose-500" /> 12K
            </span>
            <span className="flex items-center gap-1">
              <Repeat className="w-2.5 h-2.5" /> 2.4K
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-2.5 h-2.5" /> 602K
            </span>
          </div>
        </div>
      </CardFrame>

      {/* 4. MS PAINT (with public/video/steamer_1.mp4) */}
      <CardFrame tag="MS PAINT" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#C0C0C0] overflow-hidden flex flex-col justify-between">
          <VideoPlayer src="/video/steamer_1.mp4" poster="/images/ad_skincare_editorial_1794908395716.jpg" />
          {/* Retro Win95 title bar */}
          <div className="absolute top-1.5 inset-x-1.5 bg-[#000080] text-white px-1.5 py-0.5 text-[8.5px] font-bold flex justify-between items-center z-10">
            <span>untitled - Paint</span>
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 bg-[#C0C0C0] text-black text-[5px] flex items-center justify-center">_</span>
              <span className="w-1.5 h-1.5 bg-[#C0C0C0] text-black text-[5px] flex items-center justify-center">x</span>
            </div>
          </div>
          {/* Paint banner */}
          <div className="absolute top-7 inset-x-1.5 bg-white/95 p-1.5 border border-neutral-600 rounded-xs shadow-md z-10">
            <p className="font-sans text-[11px] font-black text-black leading-tight">
              PLEASE BUY OUR PRODUCT
            </p>
            <p className="font-mono text-[8.5px] text-neutral-600 mt-0.5">OUR MARKETER CR...</p>
          </div>
        </div>
      </CardFrame>

      {/* 5. WINNER VARIATION (1) (with public/video/sunglasses_2.mp4) */}
      <CardFrame tag="WINNER VARIATION" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#18181B] overflow-hidden">
          <VideoPlayer src="/video/sunglasses_2.mp4" poster="/images/ad_creator_lifestyle_1794908396875.jpg" />
          <div className="absolute top-3 right-3 bg-rose-600 text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded z-10 shadow-sm">
            WINNER #1
          </div>
          {/* TikTok style auto caption */}
          <div className="absolute inset-x-3 bottom-14 text-center z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={winner1Captions[captionTick]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-block px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white font-display text-[12px] font-bold leading-tight"
              >
                {winner1Captions[captionTick]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </CardFrame>

      {/* 6. WINNER VARIATION (2) (with public/video/steamer_2.mp4) */}
      <CardFrame tag="WINNER VARIATION" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#1C1917] overflow-hidden">
          <VideoPlayer src="/video/steamer_2.mp4" poster="/images/ad_skincare_editorial_1794908395716.jpg" />
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded z-10 shadow-sm">
            WINNER #2
          </div>
          {/* TikTok style auto caption */}
          <div className="absolute inset-x-3 bottom-14 text-center z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={winner2Captions[captionTick]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-block px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white font-display text-[12px] font-bold leading-tight"
              >
                {winner2Captions[captionTick]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </CardFrame>

      {/* 7. AIRDROP (with public/video/neck_pillow_2.mp4) */}
      <CardFrame tag="AIRDROP" onClick={onCardClick}>
        <div className="relative w-full h-full bg-neutral-900 overflow-hidden flex flex-col items-center justify-center p-3">
          <VideoPlayer src="/video/neck_pillow_2.mp4" poster="/images/ad_athletic_runner_1794908396789.jpg" />
          {/* iOS AirDrop Modal */}
          <div className="relative z-10 w-full bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 text-center text-white shadow-2xl">
            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center mb-1 text-xs">
              📡
            </div>
            <h4 className="text-[11.5px] font-bold">AirDrop</h4>
            <p className="text-[9px] text-neutral-400">"David" would like to share 1 item</p>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <span className="py-0.5 rounded bg-neutral-700/80 text-[9.5px] font-semibold text-neutral-300">
                Decline
              </span>
              <span className="py-0.5 rounded bg-sky-600 text-[9.5px] font-bold text-white">
                Accept
              </span>
            </div>
          </div>
        </div>
      </CardFrame>

      {/* 8. VENDING MACHINE (with public/video/leather_wallet_2.mp4) */}
      <CardFrame tag="VENDING MACHINE" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#121215] overflow-hidden flex flex-col justify-between p-3.5 text-white">
          <VideoPlayer src="/video/leather_wallet_2.mp4" poster="/images/case_study_roastery_1794908397891.jpg" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-amber-500/40 text-[9.5px] font-mono text-amber-400 z-10">
            SLOT B28 · $3.50
          </div>
        </div>
      </CardFrame>

      {/* 9. FITNESS SUMMARY */}
      <CardFrame tag="FITNESS SUMMARY" onClick={onCardClick}>
        <div className="relative w-full h-full bg-black p-3.5 flex flex-col justify-between text-white font-sans">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold">Summary</span>
              <span className="text-[9.5px] text-neutral-400 font-mono">Today</span>
            </div>
            <div className="flex items-center gap-2.5 my-3">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-rose-500" />
                <div className="absolute inset-1 rounded-full border-4 border-emerald-400" />
                <div className="absolute inset-2.5 rounded-full border-4 border-cyan-400" />
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] font-bold text-rose-500">620 / 500 CAL</span>
                <span className="block text-[10px] font-bold text-emerald-400">45 / 30 MIN</span>
                <span className="block text-[10px] font-bold text-cyan-400">12 / 12 HRS</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2 mb-9">
            <span className="text-[8.5px] uppercase font-bold text-neutral-400 tracking-wider">
              Today's Fuel
            </span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[11px] font-extrabold text-amber-300">David Bar</span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-400">+28g Pro</span>
            </div>
          </div>
        </div>
      </CardFrame>

      {/* 10. BILLBOARD */}
      <CardFrame tag="BILLBOARD" onClick={onCardClick}>
        <div className="relative w-full h-full bg-[#1E293B]">
          <img
            src="/images/ad_athletic_runner_1794908396789.jpg"
            alt="Highway Billboard"
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-3 my-auto h-32 bg-amber-50 border-4 border-neutral-800 rounded shadow-2xl p-2 flex flex-col justify-between text-neutral-950 z-10">
            <p className="font-display text-[12px] font-black leading-tight tracking-tight uppercase">
              OUR PROTEIN BAR IS A CANDY BAR.
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-neutral-300">
              <span className="font-display font-extrabold text-[11px]">David.</span>
              <span className="text-[7.5px] font-mono text-neutral-600">EXIT 14A</span>
            </div>
          </div>
        </div>
      </CardFrame>
    </>
  );
}
