'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'motion/react';
import { ArrowRight, RotateCcw, Heart, X, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartFree: () => void;
}

interface DeckCardItem {
  id: string;
  brand: string;
  format: string;
  metric: string;
  image: string;
  alt: string;
  caption: string;
  rot: number;
  yOffset: number;
}

const INITIAL_DECK: DeckCardItem[] = [
  {
    id: 'deck-1',
    brand: 'SOLSTICE ROASTERS',
    format: 'FOUNDER KITCHEN HOOK',
    metric: '4.8x ROAS · TikTok Spark',
    image: '/images/case_study_roastery_1794908397891.jpg',
    alt: 'Founder holding matte ceramic coffee carafe in morning sun',
    caption: 'The 90-second pour-over swap that replaced our morning $7 cafe spend',
    rot: 0,
    yOffset: 0,
  },
  {
    id: 'deck-2',
    brand: 'AURA BOTANICALS',
    format: 'EDITORIAL PRODUCT STILL',
    metric: '4.2x ROAS · Meta Feed',
    image: '/images/ad_skincare_editorial_1794908395716.jpg',
    alt: 'Amber skincare serum bottle on natural stone pedestal in sunlight',
    caption: 'Why vitamin C oxidizes in clear dropper bottles before it reaches your skin',
    rot: -5,
    yOffset: -8,
  },
  {
    id: 'deck-3',
    brand: 'KESTREL ACOUSTICS',
    format: '3D HARDWARE SPEC SPLIT',
    metric: '3.9x ROAS · YouTube Shorts',
    image: '/images/ad_audio_hardware_1794908395903.jpg',
    alt: 'Charcoal wireless headphones on brushed aluminum surface',
    caption: '42dB active isolation measured on commuter rail transit',
    rot: 6,
    yOffset: -12,
  },
  {
    id: 'deck-4',
    brand: 'VELOCITY ATHLETIC',
    format: 'CARBON PLATE FLEX TEST',
    metric: '5.1x ROAS · Instagram Reels',
    image: '/images/ad_athletic_runner_1794908396789.jpg',
    alt: 'Runner lacing minimalist performance running shoes at dawn',
    caption: '198 grams on wet asphalt — zero heel slip through mile 400',
    rot: -4,
    yOffset: -16,
  },
  {
    id: 'deck-5',
    brand: 'LUMINA EYEWEAR',
    format: 'UGC STREET CREATOR HOOK',
    metric: '4.4x ROAS · TikTok Feed',
    image: '/images/ad_creator_lifestyle_1794908396875.jpg',
    alt: 'Creator holding sunglasses by kitchen window',
    caption: 'I swapped my $250 designer sunglasses for these and nobody noticed',
    rot: 4,
    yOffset: -20,
  },
];

const AVATAR_IMAGES = [
  '/images/ad_creator_lifestyle_1794908396875.jpg',
  '/images/ad_skincare_editorial_1794908395716.jpg',
  '/images/ad_audio_hardware_1794908395903.jpg',
  '/images/case_study_roastery_1794908397891.jpg',
  '/images/ad_athletic_runner_1794908396789.jpg',
];

interface TarotCardProps {
  card: DeckCardItem;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (dir: 'left' | 'right') => void;
}

function TarotCard({ card, isTop, stackIndex, onSwipe }: TarotCardProps) {
  const x = useMotionValue(0);

  // Dynamic 3D rotation based on drag offset (Tarot 3D physics)
  const rotateZ = useTransform(x, [-260, 0, 260], [-18 + card.rot, card.rot, 18 + card.rot]);
  const rotateY = useTransform(x, [-260, 0, 260], [-16, 0, 16]);
  const scale = useTransform(x, [-260, 0, 260], [1.05, 1, 1.05]);

  const keepOpacity = useTransform(x, [25, 110], [0, 1]);
  const skipOpacity = useTransform(x, [-110, -25], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 85 || info.velocity.x > 380) {
      onSwipe('right');
    } else if (info.offset.x < -85 || info.velocity.x < -380) {
      onSwipe('left');
    }
  };

  if (!isTop) {
    const depthScale = Math.max(0.86, 1 - stackIndex * 0.045);
    const depthY = stackIndex * 8;

    return (
      <motion.div
        animate={{
          scale: depthScale,
          y: depthY,
          rotateZ: card.rot,
          opacity: 1 - stackIndex * 0.16,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          zIndex: 10 - stackIndex,
          transformPerspective: 1500,
          rotateX: 18,
        }}
        className="absolute inset-0 rounded-[24px] overflow-hidden bg-neutral-900 border border-black/15 shadow-xl pointer-events-none select-none"
      >
        <img
          src={card.image}
          alt={card.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        x,
        rotateZ,
        rotateY,
        scale,
        zIndex: 20,
        transformPerspective: 1500,
        rotateX: 18,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.88}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      exit={{
        x: x.get() >= 0 ? 600 : -600,
        rotateZ: x.get() >= 0 ? 30 : -30,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="absolute inset-0 rounded-[24px] overflow-hidden bg-neutral-900 border-2 border-emerald-400/30 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.45),0_0_25px_rgba(0,208,132,0.25)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
    >
      <img
        src={card.image}
        alt={card.alt}
        draggable={false}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover pointer-events-none"
      />
      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

      {/* KEEP Stamp (Right Swipe) */}
      <motion.div
        style={{ opacity: keepOpacity }}
        className="absolute top-5 left-5 px-3.5 py-1 rounded-xl border-[3px] border-emerald-400 bg-emerald-500/20 backdrop-blur-md -rotate-12 pointer-events-none z-30"
      >
        <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-emerald-400 uppercase">
          KEEP
        </span>
      </motion.div>

      {/* SKIP Stamp (Left Swipe) */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute top-5 right-5 px-3.5 py-1 rounded-xl border-[3px] border-rose-500 bg-rose-500/20 backdrop-blur-md rotate-12 pointer-events-none z-30"
      >
        <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-rose-500 uppercase">
          SKIP
        </span>
      </motion.div>

      {/* Top Format & Metric Badges (Exact 2nd Image Match) */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-md bg-[#0D3823]/90 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wider text-emerald-200 uppercase shadow-sm">
          {card.format}
        </span>
        <span className="px-2.5 py-1 rounded-md bg-[#00D084] text-[10px] font-mono font-bold text-white shadow-[0_2px_10px_rgba(0,208,132,0.4)]">
          {card.metric}
        </span>
      </div>

      {/* Centered Caption */}
      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 pointer-events-none text-center">
        <p className="caption-stroke font-display text-[15px] sm:text-[16px] font-bold leading-snug text-white">
          "{card.caption}"
        </p>
      </div>

      {/* Bottom Brand Tag */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-300">
          {card.brand}
        </span>
        <span className="text-[9px] font-mono text-emerald-400 font-semibold">
          FASTLANE AI
        </span>
      </div>
    </motion.div>
  );
}

export function HeroSection({ onStartFree }: HeroSectionProps) {
  const [cards, setCards] = useState<DeckCardItem[]>(INITIAL_DECK);
  const [swipedCount, setSwipedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.hero-reveal'),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const triggerSwipe = (dir: 'left' | 'right') => {
    if (cards.length === 0) return;
    setCards((prev) => prev.slice(1));
    setSwipedCount((prev) => prev + 1);

    if (cards.length <= 1) {
      setTimeout(() => {
        setCards(INITIAL_DECK);
        setSwipedCount(0);
      }, 600);
    }
  };

  const resetDeck = () => {
    setCards(INITIAL_DECK);
    setSwipedCount(0);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') triggerSwipe('right');
      if (e.key === 'ArrowLeft') triggerSwipe('left');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cards]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#FAFCFB] overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col items-center justify-center"
    >
      {/* ======================================================== */}
      {/* GREEN 3D ORGANIC FLUID SHAPES & GLOWS (Matching 2nd Image) */}
      {/* ======================================================== */}

      {/* Top-Right Emerald 3D Glass Composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[550px] sm:w-[780px] h-[550px] sm:h-[780px] overflow-hidden select-none"
      >
        {/* Soft emerald atmospheric radial glow */}
        <div
          className="absolute -top-24 -right-20 w-[650px] h-[650px] rounded-full blur-[90px] opacity-90"
          style={{
            background:
              'radial-gradient(circle at 68% 30%, rgba(0, 208, 132, 0.72) 0%, rgba(16, 185, 129, 0.45) 35%, rgba(5, 150, 105, 0.22) 65%, transparent 80%)',
          }}
        />

        {/* 3D Organic Fluid Glass Blob Overlays */}
        <svg
          viewBox="0 0 600 600"
          className="absolute top-0 right-0 w-[520px] sm:w-[680px] h-[520px] sm:h-[680px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base smooth fluid body */}
          <path
            d="M540 100C600 210 560 370 450 450C340 530 190 510 120 410C50 310 70 150 170 70C270 -10 480 -10 540 100Z"
            fill="url(#emerald-grad-1)"
            className="filter blur-[42px] opacity-80"
          />
          {/* Overlapping specular highlight curve */}
          <path
            d="M590 60C640 160 590 300 500 370C410 440 280 420 220 340C160 260 180 120 270 50C360 -20 540 -40 590 60Z"
            fill="url(#emerald-grad-2)"
            className="filter blur-[20px] opacity-85"
          />
          <defs>
            <linearGradient id="emerald-grad-1" x1="120" y1="40" x2="560" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D084" stopOpacity="0.85" />
              <stop offset="0.45" stopColor="#10B981" stopOpacity="0.65" />
              <stop offset="1" stopColor="#047857" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="emerald-grad-2" x1="220" y1="-20" x2="600" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6EE7B7" stopOpacity="0.9" />
              <stop offset="0.35" stopColor="#00D084" stopOpacity="0.8" />
              <stop offset="1" stopColor="#059669" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle dot-matrix pattern on the right */}
        <div className="absolute top-52 right-16 w-52 h-52 opacity-[0.24] bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      </div>

      {/* Middle/Bottom-Left Mint Translucent Organic Curve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-28 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] overflow-hidden select-none"
      >
        <div
          className="w-full h-full rounded-full blur-[85px] opacity-50"
          style={{
            background:
              'radial-gradient(circle at 35% 65%, rgba(52, 211, 153, 0.48) 0%, rgba(16, 185, 129, 0.28) 42%, transparent 75%)',
          }}
        />
        {/* Subtle dot-matrix pattern on the left */}
        <div className="absolute top-24 left-36 w-48 h-48 opacity-[0.2] bg-[radial-gradient(#10B981_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Main Hero Headline */}
        <h1
          className="hero-reveal font-display font-bold tracking-[-0.035em] text-[#0B0B0E] text-[clamp(2.5rem,6.4vw,5.1rem)] leading-[1.03]"
          style={{ textWrap: 'balance' }}
        >
          Your next winning ad
          <br />
          on autopilot
        </h1>

        {/* Primary Vibrant Emerald Green CTA (Matching 2nd Image) */}
        <div className="hero-reveal mt-8 sm:mt-9">
          <button
            type="button"
            onClick={onStartFree}
            className="inline-flex items-center justify-center gap-2.5 bg-[#00D084] hover:bg-[#00B974] active:scale-[0.98] text-white font-semibold text-[15px] sm:text-base px-8 py-3.5 rounded-xl shadow-[0_12px_28px_-6px_rgba(0,208,132,0.55),0_4px_12px_rgba(0,208,132,0.3)] transition-all duration-150 cursor-pointer min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D084] focus-visible:ring-offset-2"
          >
            <span>First 5 statics free</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </button>
        </div>

        {/* Product Hunt Awards Row */}
        <div className="hero-reveal mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <div className="bg-white/95 border border-neutral-200/90 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-left">
            <span className="w-7 h-7 rounded-full bg-[#FF6154] text-white font-bold text-sm inline-flex items-center justify-center shrink-0">
              P
            </span>
            <div className="leading-tight">
              <span className="block text-[9px] font-bold tracking-wider uppercase text-neutral-500">
                Product Hunt
              </span>
              <span className="block text-[13px] font-bold text-[#111114]">
                #3 Product of the Day
              </span>
            </div>
          </div>

          <div className="bg-white/95 border border-neutral-200/90 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-left">
            <span className="w-7 h-7 rounded-full bg-[#FF6154] text-white font-bold text-sm inline-flex items-center justify-center shrink-0">
              P
            </span>
            <div className="leading-tight">
              <span className="block text-[9px] font-bold tracking-wider uppercase text-neutral-500">
                #4 Product of the Week
              </span>
              <span className="block text-[13px] font-bold text-[#111114]">Marketing</span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Tarot / Tinder Swipe Deck */}
        <div className="hero-reveal relative mt-12 sm:mt-14 w-[280px] sm:w-[310px] md:w-[330px] h-[415px] sm:h-[460px] md:h-[480px]">
          {/* Luminous Emerald/Mint Glow Behind Deck (Matching 2nd Image) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[48px] blur-2xl opacity-75"
            style={{
              background:
                'radial-gradient(circle at 50% 55%, rgba(0, 208, 132, 0.42) 0%, rgba(52, 211, 153, 0.22) 52%, rgba(255, 255, 255, 0) 76%)',
            }}
          />

          <div className="relative w-full h-full" style={{ perspective: 1500 }}>
            <AnimatePresence mode="popLayout">
              {cards.slice(0, 3).map((card, idx) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  isTop={idx === 0}
                  stackIndex={idx}
                  onSwipe={triggerSwipe}
                />
              ))}
            </AnimatePresence>

            {/* Empty Reshuffle State */}
            {cards.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-[24px] bg-neutral-900 border border-white/10 flex flex-col items-center justify-center p-6 text-center text-white shadow-2xl"
              >
                <Sparkles className="w-8 h-8 text-[#00D084] mb-2 animate-pulse" />
                <h4 className="font-display text-lg font-bold">Batch Complete</h4>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  Reshuffling creative winning formats...
                </p>
                <button
                  type="button"
                  onClick={resetDeck}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Deck</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Swipe Hint & Action Controls */}
        <div className="hero-reveal mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => triggerSwipe('left')}
              className="text-xs font-semibold text-neutral-500 hover:text-rose-600 transition-colors px-2.5 py-1 rounded-md hover:bg-rose-50 cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Skip</span>
            </button>
            <span aria-hidden="true" className="text-neutral-300 text-xs">
              · Drag card left or right ·
            </span>
            <button
              type="button"
              onClick={() => triggerSwipe('right')}
              className="text-xs font-semibold text-neutral-500 hover:text-emerald-600 transition-colors px-2.5 py-1 rounded-md hover:bg-emerald-50 cursor-pointer flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Keep</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <div className="flex items-center">
              {AVATAR_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white ${
                    i > 0 ? '-ml-2' : ''
                  }`}
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-600">
              10,000+ businesses in the Fastlane
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
