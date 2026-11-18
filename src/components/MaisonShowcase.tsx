'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'motion/react';
import {
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  SlidersHorizontal,
  Shirt,
  Footprints,
  Layers,
  ShoppingBag,
  Sparkles,
  Play,
} from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Video playlists for the 3 phones (infinite auto-cycling onEnded)
const LEFT_VIDEOS = [
  {
    id: 'left-1',
    src: '/videos/sunglasses_2.mp4',
    title: 'Heritage Canvas Cap',
    sub: 'UV400 Polarized Edition',
    price: 65,
  },
  {
    id: 'left-2',
    src: '/videos/steamer_1.mp4',
    title: 'Olive Club Polo',
    sub: 'Luxury Linen Garment Care',
    price: 145,
  },
  {
    id: 'left-3',
    src: '/videos/leather_wallet_1.mp4',
    title: 'Hardware Wide Shorts',
    sub: 'Heritage Handcrafted Utility',
    price: 180,
  },
];

const CENTER_VIDEOS = [
  {
    id: 'center-1',
    src: '/videos/coffee_brewing.mp4',
    title: 'Quarter-Zip Polo',
    price: '$185',
    category: 'Tops',
  },
  {
    id: 'center-2',
    src: '/videos/luxury_minimalist.mp4',
    title: 'Jacquard Knit Camp Shirt',
    price: '$240',
    category: 'Tops',
  },
  {
    id: 'center-3',
    src: '/videos/running_shoe.mp4',
    title: 'Chunky Ribbed Crewneck',
    price: '$190',
    category: 'Tops',
  },
];

const RIGHT_VIDEOS = [
  {
    id: 'right-1',
    src: '/videos/sunglasses_1.mp4',
    title: 'Striped Olive Open-Collar Polo',
    subtitle: 'Men · Knitwear',
    brand: 'RECHFELLER',
    price: 185,
    thumb: '/products/thumb_1.svg',
  },
  {
    id: 'right-2',
    src: '/videos/face_serum.mp4',
    title: 'Radiance Botanical Treatment',
    subtitle: 'Skin · Essential Care',
    brand: 'RECHFELLER LAB',
    price: 210,
    thumb: '/products/thumb_2.svg',
  },
  {
    id: 'right-3',
    src: '/videos/smartwatch.mp4',
    title: 'Minimalist Titanium Timepiece',
    subtitle: 'Hardware · Precision',
    brand: 'RECHFELLER CHRONO',
    price: 195,
    thumb: '/products/thumb_3.svg',
  },
  {
    id: 'right-4',
    src: '/videos/headphones_unboxing.mp4',
    title: 'Studio Acoustic 42dB Monitor',
    subtitle: 'Audio · Hardware Spec',
    brand: 'RECHFELLER SOUND',
    price: 240,
    thumb: '/products/thumb_4.svg',
  },
];

const CATEGORIES = [
  { name: 'Tops', icon: Shirt },
  { name: 'Footwear', icon: Footprints },
  { name: 'Trousers', icon: Layers },
  { name: 'Bags', icon: ShoppingBag },
  { name: 'Outerwear', icon: Sparkles },
] as const;

const SIZES = ['S', 'M', 'L', 'XL'] as const;

// Magnetic Button with smooth spring cursor tracking
function MagneticButton({
  children,
  className = '',
  onClick,
  ariaLabel,
  disabled = false,
  maxDistance = 6,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  maxDistance?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16 });
  const springY = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, distanceX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, distanceY));
    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Rolling Mechanical Number Counter
function AnimatedPrice({ value, prefix = '+ $' }: { value: number | string; prefix?: string }) {
  const str = String(value);
  return (
    <span className="inline-flex items-center justify-center font-mono text-[12px] font-semibold tracking-wider tabular-nums">
      <span>{prefix}</span>
      <span className="inline-flex overflow-hidden h-[18px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_CUBIC }}
            className="inline-block"
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function MaisonShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Responsive touch check
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(!window.matchMedia('(hover: hover)').matches);
    }
  }, []);

  // Video State Management with Infinite Sequence on Completion
  const [leftVideoIdx, setLeftVideoIdx] = useState(0);
  const [centerVideoIdx, setCenterVideoIdx] = useState(0);
  const [rightVideoIdx, setRightVideoIdx] = useState(0);

  // Center Category & Size selection
  const [activeCategory, setActiveCategory] = useState<string>('Tops');
  const [selectedSize, setSelectedSize] = useState<string>('L');

  // Video Ended Handlers (Plays infinite next video once current finishes)
  const handleLeftVideoEnded = () => {
    setLeftVideoIdx((prev) => (prev + 1) % LEFT_VIDEOS.length);
  };

  const handleCenterVideoEnded = () => {
    setCenterVideoIdx((prev) => (prev + 1) % CENTER_VIDEOS.length);
  };

  const handleRightVideoEnded = () => {
    setRightVideoIdx((prev) => (prev + 1) % RIGHT_VIDEOS.length);
  };

  // --------------------------------------------------------------------------
  // Scroll-Driven Framer Motion useScroll
  // --------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const headingScrollY = useTransform(smoothScroll, [0, 0.45], [40, 0]);
  const headingScrollOpacity = useTransform(smoothScroll, [0, 0.35], [0, 1]);

  const leftFanX = useTransform(smoothScroll, [0.05, 0.85], [100, 0]);
  const rightFanX = useTransform(smoothScroll, [0.05, 0.85], [-100, 0]);
  const scrollRiseY = useTransform(smoothScroll, [0.05, 0.85], [120, 0]);
  const centerScrollScale = useTransform(smoothScroll, [0.2, 0.75, 1], [0.96, 1.03, 1.0]);

  // --------------------------------------------------------------------------
  // Mouse-Based Parallax Tilt Physics (Desktop only)
  // --------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const tiltRotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const tiltRotateX = useTransform(smoothMouseY, [-1, 1], [6, -6]);

  const centerMoveX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const centerMoveY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  const sidesMoveX = useTransform(smoothMouseX, [-1, 1], [-7.2, 7.2]);
  const sidesMoveY = useTransform(smoothMouseY, [-1, 1], [-4.8, 4.8]);

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMoveSection = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(normX);
    mouseY.set(normY);

    setCursorPos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  const handleMouseLeaveSection = () => {
    mouseX.set(0);
    mouseY.set(0);
    setCursorPos({ x: 50, y: 50 });
  };

  const currentRightItem = RIGHT_VIDEOS[rightVideoIdx];
  const currentLeftItem = LEFT_VIDEOS[leftVideoIdx];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-full min-h-screen bg-[#FAFCFB] py-20 px-4 flex flex-col items-center justify-center overflow-hidden select-none border-t border-[#00D084]/15"
    >
      {/* 1. Website Theme: Soft Mint-to-White Radial Background Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[1400px] h-[720px] blur-3xl opacity-80 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 25%, rgba(220, 252, 231, 0.75) 0%, rgba(240, 253, 244, 0.5) 45%, rgba(250, 252, 251, 0) 80%)',
        }}
      />

      {/* 2. Website Theme: Ambient Blurred Green Glow Orb behind Mobile Display */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] rounded-full blur-[115px] opacity-40 z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(52, 211, 153, 0.32) 0%, rgba(10, 127, 90, 0.18) 50%, transparent 80%)',
        }}
      />

      {/* 3. Website Theme: Subtle Film-Grain Noise Overlay (3.5% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ======================================================== */}
      {/* SECTION HEADER: Matches Fastlane Website Theme */}
      {/* ======================================================== */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : headingScrollY,
          opacity: shouldReduceMotion ? 1 : headingScrollOpacity,
        }}
        className="mb-10 text-center z-10 flex flex-col items-center"
      >
        {/* Brand Theme Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
          <span>AI Creative Suite · Mobile Ad Showcase</span>
        </div>

        {/* Heading Mask Slide-Up */}
        <div className="overflow-hidden">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_OUT_CUBIC, delay: 0.2 }}
            className="font-display text-2xl md:text-4xl font-bold tracking-tight text-[#0b0f0d] uppercase"
          >
            Maison Archive
          </motion.h2>
        </div>

        <p className="mt-2 text-xs sm:text-sm text-[#5b6b64] font-mono tracking-normal max-w-md">
          Live infinite video creatives stream inside interactive responsive mockups.
        </p>
      </motion.div>

      {/* ======================================================== */}
      {/* 3 PHONES DISPLAY ROW WITH 3D PERSPECTIVE */}
      {/* ======================================================== */}
      <div className="w-full flex justify-center items-center z-10 [perspective:1400px]">
        <div className="flex md:flex-row flex-row items-center justify-center gap-10 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-0 py-8 w-full max-w-6xl no-scrollbar md:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300">
          
          {/* ======================================================== */}
          {/* LEFT PHONE: Stacked Carousel with Infinite Video Player */}
          {/* ======================================================== */}
          <div className="flex-shrink-0 snap-center relative">
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : leftFanX,
                y: shouldReduceMotion ? 0 : scrollRiseY,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 120, rotateX: 8 }
              }
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0, ease: EASE_OUT_CUBIC }}
            >
              <motion.div
                style={
                  isTouchDevice || shouldReduceMotion
                    ? {}
                    : {
                        rotateX: tiltRotateX,
                        rotateY: tiltRotateY,
                        x: sidesMoveX,
                        y: sidesMoveY,
                      }
                }
              >
                {/* Floating Idle (0s offset) */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [-6, 6, -6],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0,
                  }}
                  className="relative"
                >
                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-[#FBFAF7] border-[7.5px] border-[#22211F] shadow-[0_28px_60px_-12px_rgba(10,40,25,0.18),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between select-none">
                    
                    {/* Bezel Light Sweep */}
                    <div className="absolute inset-0 pointer-events-none rounded-[46px] overflow-hidden z-30">
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                x: ['-200%', '260%'],
                              }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatDelay: 5.8,
                          ease: EASE_OUT_CUBIC,
                          delay: 0,
                        }}
                        className="absolute top-0 bottom-0 w-[60%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </div>

                    {/* Cursor Radial Highlight */}
                    {!isTouchDevice && (
                      <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-40 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar & Dynamic Island */}
                    <div className="relative w-full pt-2.5 pb-2 px-5 flex items-center justify-between text-[#1A1917] z-20">
                      <span className="font-mono text-[10px] font-semibold tracking-tight">9:41</span>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2">
                        <div className="w-2 h-2 rounded-full bg-[#151515] border border-[#2d2d2d]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px]">
                        <div className="flex items-end gap-[1.5px] h-2">
                          <span className="w-[2px] h-[3px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[5px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[7px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[8px] bg-[#1A1917] rounded-sm" />
                        </div>
                        <Wifi className="w-2.5 h-2.5 stroke-[2.2]" />
                        <Battery className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Header Controls */}
                    <div className="px-4 py-1.5 flex items-center justify-between z-10">
                      <MagneticButton
                        ariaLabel="Back"
                        className="w-7 h-7 rounded-full bg-[#EFEDE8] hover:bg-[#E4E0D7] flex items-center justify-center text-[#1A1917] shadow-sm border border-[#1A1917]/5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </MagneticButton>
                      <div className="flex items-center gap-1.5">
                        <MagneticButton
                          ariaLabel="Wishlist"
                          className="w-7 h-7 rounded-full bg-[#EFEDE8] hover:bg-[#E4E0D7] flex items-center justify-center text-[#1A1917] shadow-sm border border-[#1A1917]/5"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </MagneticButton>
                        <MagneticButton
                          ariaLabel="Share"
                          className="w-7 h-7 rounded-full bg-[#EFEDE8] hover:bg-[#E4E0D7] flex items-center justify-center text-[#1A1917] shadow-sm border border-[#1A1917]/5"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </MagneticButton>
                      </div>
                    </div>

                    {/* 3 Stacked Items with Active Live Video & Infinite Auto-Advance */}
                    <div className="flex-1 px-4 flex flex-col justify-around py-1">
                      {LEFT_VIDEOS.map((item, idx) => {
                        const isActive = leftVideoIdx === idx;
                        return (
                          <div
                            key={item.id}
                            className={`flex flex-col items-center transition-all duration-300 p-1.5 rounded-xl border ${
                              isActive
                                ? 'bg-white border-[#00D084]/40 shadow-[0_4px_16px_rgba(0,208,132,0.12)]'
                                : 'border-transparent opacity-80'
                            }`}
                          >
                            <div className="relative w-full flex items-center justify-between">
                              <button
                                type="button"
                                aria-label="Previous video"
                                onClick={() =>
                                  setLeftVideoIdx(
                                    (prev) => (prev - 1 + LEFT_VIDEOS.length) % LEFT_VIDEOS.length
                                  )
                                }
                                className="w-5 h-5 rounded-full bg-[#EFEDE8]/80 hover:bg-[#EFEDE8] text-[#8A857A] flex items-center justify-center active:scale-90"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>

                              {/* Media Player Area: Live video playing in all cards (no gray or black boxes) */}
                              <div
                                onClick={() => setLeftVideoIdx(idx)}
                                className={`relative w-[130px] h-[82px] rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center border transition-all cursor-pointer ${
                                  isActive
                                    ? 'border-[#00D084] ring-2 ring-[#00D084]/40 shadow-sm'
                                    : 'border-[#1A1917]/10 opacity-90 hover:opacity-100'
                                }`}
                              >
                                <video
                                  src={item.src}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="auto"
                                  className="w-full h-full object-cover"
                                  onEnded={isActive ? handleLeftVideoEnded : undefined}
                                />

                                {isActive && (
                                  <div className="absolute bottom-1 right-1 flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[7px] font-mono text-[#34d399] tracking-wider uppercase font-bold z-10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                                    <span>LIVE</span>
                                  </div>
                                )}
                              </div>

                              <button
                                type="button"
                                aria-label="Next video"
                                onClick={() =>
                                  setLeftVideoIdx((prev) => (prev + 1) % LEFT_VIDEOS.length)
                                }
                                className="w-5 h-5 rounded-full bg-[#EFEDE8]/80 hover:bg-[#EFEDE8] text-[#8A857A] flex items-center justify-center active:scale-90"
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-center mt-1">
                              <p className="font-mono text-[10.5px] font-semibold text-[#1A1917] uppercase tracking-tight">
                                {item.title}
                              </p>
                              <p className="font-mono text-[9.5px] text-[#059669] font-medium">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Bar: near-black with animated price */}
                    <div className="w-full bg-[#1A1917] py-3.5 text-center text-white cursor-pointer active:bg-black transition-colors">
                      <AnimatedPrice value={390} prefix="+ $" />
                    </div>

                  </div>
                </motion.div>

                {/* Soft Contact Shadow */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [0.9, 1.05, 0.9],
                          opacity: [0.18, 0.32, 0.18],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0,
                  }}
                  className="w-[210px] h-[22px] mx-auto -mt-2 bg-[#0a3822]/25 rounded-[100%] blur-[14px] pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </div>


          {/* ======================================================== */}
          {/* CENTER PHONE: Home Catalog with Infinite Video Feature */}
          {/* ======================================================== */}
          <div className="flex-shrink-0 snap-center relative">
            <motion.div
              style={{
                y: shouldReduceMotion ? 0 : scrollRiseY,
                scale: shouldReduceMotion ? 1 : centerScrollScale,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 120, rotateX: 8, scale: 1.03 }
              }
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.18, ease: EASE_OUT_CUBIC }}
            >
              <motion.div
                style={
                  isTouchDevice || shouldReduceMotion
                    ? {}
                    : {
                        rotateX: tiltRotateX,
                        rotateY: tiltRotateY,
                        x: centerMoveX,
                        y: centerMoveY,
                      }
                }
              >
                {/* Floating Idle (1.2s offset) */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [-6, 6, -6],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                  className="relative"
                >
                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-[#FBFAF7] border-[7.5px] border-[#22211F] shadow-[0_32px_68px_-12px_rgba(10,40,25,0.22),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between select-none">
                    
                    {/* Bezel Light Sweep */}
                    <div className="absolute inset-0 pointer-events-none rounded-[46px] overflow-hidden z-30">
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                x: ['-200%', '260%'],
                              }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatDelay: 5.8,
                          ease: EASE_OUT_CUBIC,
                          delay: 1.2,
                        }}
                        className="absolute top-0 bottom-0 w-[60%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </div>

                    {!isTouchDevice && (
                      <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-40 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar (White on dark header) */}
                    <div className="relative w-full pt-2.5 pb-2 px-5 flex items-center justify-between text-white bg-[#1A1917] z-20">
                      <span className="font-mono text-[10px] font-semibold tracking-tight text-white/90">9:41</span>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px] text-white/90">
                        <div className="flex items-end gap-[1.5px] h-2">
                          <span className="w-[2px] h-[3px] bg-white rounded-sm" />
                          <span className="w-[2px] h-[5px] bg-white rounded-sm" />
                          <span className="w-[2px] h-[7px] bg-white rounded-sm" />
                          <span className="w-[2px] h-[8px] bg-white rounded-sm" />
                        </div>
                        <Wifi className="w-2.5 h-2.5 stroke-[2.2]" />
                        <Battery className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Dark Header */}
                    <div className="bg-[#1A1917] px-4 pb-3 pt-0.5 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-white flex items-center justify-center">
                          <span className="font-mono text-[9px] font-black text-[#1A1917] leading-none">M</span>
                        </div>
                        <span className="font-mono text-[10.5px] font-bold tracking-[0.2em] text-white uppercase">
                          MAISON ARCHIVE
                        </span>
                      </div>
                      <MagneticButton
                        ariaLabel="Filter"
                        className="p-1 rounded text-white/70 hover:text-white"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </div>

                    {/* Scrollable Content Body */}
                    <div className="flex-1 flex flex-col justify-between py-2 overflow-hidden">
                      
                      {/* Horizontal Category Row with Sliding Black Pill */}
                      <div className="px-3">
                        <div className="flex items-center justify-between pb-1">
                          {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.name;
                            return (
                              <button
                                key={cat.name}
                                type="button"
                                onClick={() => setActiveCategory(cat.name)}
                                className="relative flex flex-col items-center gap-1 group"
                              >
                                <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
                                  {isActive ? (
                                    <motion.div
                                      layoutId="activeCategoryPill"
                                      className="absolute inset-0 bg-[#1A1917] rounded-full shadow-sm"
                                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                    />
                                  ) : (
                                    <div className="absolute inset-0 bg-[#EFEDE8] rounded-full group-hover:bg-[#E4E0D7] transition-colors" />
                                  )}
                                  <Icon className={`relative z-10 w-3.5 h-3.5 transition-colors ${isActive ? 'text-white' : 'text-[#8A857A]'}`} />
                                </div>
                                <span className={`font-mono text-[7.5px] uppercase tracking-wider transition-colors ${isActive ? 'text-[#1A1917] font-bold' : 'text-[#8A857A]'}`}>
                                  {cat.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Section Title */}
                      <div className="px-3.5 flex items-center justify-between pt-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1A1917]">
                            {activeCategory}
                          </span>
                          <span className="font-mono text-[10px] text-[#059669] font-semibold">
                            56
                          </span>
                        </div>
                        <MagneticButton
                          ariaLabel="View all"
                          className="flex items-center text-[#8A857A] hover:text-[#1A1917]"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </MagneticButton>
                      </div>

                      {/* Product Video Grid (Scrollable Row) */}
                      <div className="px-3 flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                        {CENTER_VIDEOS.map((item, idx) => {
                          const isFeatured = centerVideoIdx === idx;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setCenterVideoIdx(idx)}
                              className={`w-[100px] flex-shrink-0 flex flex-col cursor-pointer transition-all ${
                                isFeatured ? 'scale-[1.02]' : 'opacity-85'
                              }`}
                            >
                              <div
                                className={`w-full h-[100px] rounded-lg overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] border ${
                                  isFeatured
                                    ? 'border-[#00D084] ring-1 ring-[#00D084]/40'
                                    : 'border-[#1A1917]/10 bg-[#EFEDE8]'
                                }`}
                              >
                                <video
                                  src={item.src}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                                {isFeatured && (
                                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                                )}
                              </div>
                              <p className="font-mono text-[9px] font-medium text-[#1A1917] uppercase tracking-tight mt-1 truncate">
                                {item.title}
                              </p>
                              <p className="font-mono text-[8.5px] text-[#059669] font-medium">
                                {item.price}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Editorial Video Banner (Plays active center video with infinite change) */}
                      <div className="px-3 pt-0.5">
                        <div className="relative w-full h-[90px] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center shadow-md border border-[#1A1917]/10 bg-[#111]">
                          <video
                            key={CENTER_VIDEOS[centerVideoIdx].src}
                            src={CENTER_VIDEOS[centerVideoIdx].src}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleCenterVideoEnded}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end pb-2 px-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white drop-shadow-sm">
                              RESORT COLLECTION
                            </span>
                            <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#34d399] font-semibold mt-0.5">
                              SPRING / SUMMER EDIT · LIVE
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Nav Indicator */}
                    <div className="w-full py-1.5 flex justify-center bg-[#FBFAF7]">
                      <div className="w-24 h-1 bg-[#1A1917]/25 rounded-full" />
                    </div>

                  </div>
                </motion.div>

                {/* Soft Contact Shadow */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [0.9, 1.05, 0.9],
                          opacity: [0.22, 0.38, 0.22],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                  className="w-[210px] h-[22px] mx-auto -mt-2 bg-[#0a3822]/30 rounded-[100%] blur-[14px] pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </div>


          {/* ======================================================== */}
          {/* RIGHT PHONE: Product Detail with Full Infinite Video Hero */}
          {/* ======================================================== */}
          <div className="flex-shrink-0 snap-center relative">
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : rightFanX,
                y: shouldReduceMotion ? 0 : scrollRiseY,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 120, rotateX: 8 }
              }
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.36, ease: EASE_OUT_CUBIC }}
            >
              <motion.div
                style={
                  isTouchDevice || shouldReduceMotion
                    ? {}
                    : {
                        rotateX: tiltRotateX,
                        rotateY: tiltRotateY,
                        x: sidesMoveX,
                        y: sidesMoveY,
                      }
                }
              >
                {/* Floating Idle (2.4s offset) */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [-6, 6, -6],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2.4,
                  }}
                  className="relative"
                >
                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-[#FBFAF7] border-[7.5px] border-[#22211F] shadow-[0_28px_60px_-12px_rgba(10,40,25,0.18),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between select-none">
                    
                    {/* Bezel Light Sweep */}
                    <div className="absolute inset-0 pointer-events-none rounded-[46px] overflow-hidden z-30">
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                x: ['-200%', '260%'],
                              }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatDelay: 5.8,
                          ease: EASE_OUT_CUBIC,
                          delay: 2.4,
                        }}
                        className="absolute top-0 bottom-0 w-[60%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </div>

                    {!isTouchDevice && (
                      <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-40 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar */}
                    <div className="relative w-full pt-2.5 pb-2 px-5 flex items-center justify-between text-[#1A1917] z-20">
                      <span className="font-mono text-[10px] font-semibold tracking-tight">9:41</span>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2">
                        <div className="w-2 h-2 rounded-full bg-[#151515] border border-[#2d2d2d]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px]">
                        <div className="flex items-end gap-[1.5px] h-2">
                          <span className="w-[2px] h-[3px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[5px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[7px] bg-[#1A1917] rounded-sm" />
                          <span className="w-[2px] h-[8px] bg-[#1A1917] rounded-sm" />
                        </div>
                        <Wifi className="w-2.5 h-2.5 stroke-[2.2]" />
                        <Battery className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Product Video Hero (Plays video, onEnded advances to next video infinitely) */}
                    <div className="relative px-3 pt-0.5">
                      <div className="relative w-full h-[185px] rounded-xl bg-black overflow-hidden flex items-center justify-center shadow-inner border border-[#1A1917]/10">
                        
                        {/* Video Element with Auto-Advance on Complete */}
                        <video
                          key={currentRightItem.src}
                          src={currentRightItem.src}
                          autoPlay
                          muted
                          playsInline
                          onEnded={handleRightVideoEnded}
                          className="w-full h-full object-cover"
                        />

                        {/* Floating Buttons */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <MagneticButton
                            ariaLabel="Close"
                            className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-[#1A1917] shadow-sm flex items-center justify-center transition border border-[#1A1917]/5"
                          >
                            <X className="w-3 h-3" />
                          </MagneticButton>
                        </div>

                        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                          <MagneticButton
                            ariaLabel="Save"
                            className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-[#1A1917] shadow-sm flex items-center justify-center transition border border-[#1A1917]/5"
                          >
                            <Heart className="w-3.5 h-3.5" />
                          </MagneticButton>
                          <MagneticButton
                            ariaLabel="Share"
                            className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-[#1A1917] shadow-sm flex items-center justify-center transition border border-[#1A1917]/5"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </MagneticButton>
                        </div>

                        {/* Video Live Badge */}
                        <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" />
                          <span className="font-mono text-[7.5px] uppercase tracking-wider text-white font-semibold">
                            AD CREATIVE {rightVideoIdx + 1}/4
                          </span>
                        </div>

                        {/* Carousel Dots */}
                        <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1">
                          {RIGHT_VIDEOS.map((_, dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`rounded-full transition-all duration-300 ${
                                rightVideoIdx === dotIdx
                                  ? 'w-3.5 h-1 bg-white'
                                  : 'w-1 h-1 bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detail Content Body */}
                    <div className="flex-1 px-4 py-2 flex flex-col justify-between">
                      
                      {/* Thumbnail strip (Clicking any thumbnail changes video immediately) */}
                      <div className="flex items-center gap-2 pt-1">
                        {RIGHT_VIDEOS.map((item, idx) => {
                          const isSelected = rightVideoIdx === idx;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setRightVideoIdx(idx)}
                              className={`relative w-[34px] h-[34px] rounded bg-[#EFEDE8] p-1 transition-all overflow-hidden ${
                                isSelected
                                  ? 'ring-2 ring-[#00D084] ring-offset-1 border-b-2 border-b-[#00D084]'
                                  : 'opacity-70 hover:opacity-100'
                              }`}
                            >
                              <video
                                src={item.src}
                                muted
                                playsInline
                                className="w-full h-full object-cover rounded"
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* Brand Row */}
                      <div className="flex items-center gap-1.5 pt-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#1A1917] flex items-center justify-center">
                          <span className="font-mono text-[7px] font-bold text-white leading-none">R</span>
                        </div>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#059669]">
                          {currentRightItem.brand}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="pt-0.5">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentRightItem.title}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                          >
                            <h3 className="font-mono text-[11px] font-bold uppercase tracking-tight text-[#1A1917] leading-snug truncate">
                              {currentRightItem.title}
                            </h3>
                            <p className="font-mono text-[9px] text-[#8A857A] mt-0.5">
                              {currentRightItem.subtitle}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Size Selector with Sliding Fill */}
                      <div className="pt-0.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#8A857A]">
                            Select Size
                          </span>
                          <span className="font-mono text-[7.5px] text-[#059669] underline cursor-pointer">
                            Size Guide
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {SIZES.map((size) => {
                            const isSelected = selectedSize === size;
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className="relative w-8 h-7 rounded-none font-mono text-[9.5px] font-bold flex items-center justify-center border border-[#EFEDE8] overflow-hidden"
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId="activeSizeFill"
                                    className="absolute inset-0 bg-[#1A1917]"
                                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                  />
                                )}
                                <span className={`relative z-10 transition-colors ${isSelected ? 'text-white' : 'text-[#1A1917]'}`}>
                                  {size}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Bar with Dynamic Mechanical Price Roll */}
                    <div className="w-full bg-[#1A1917] py-3.5 text-center text-white cursor-pointer active:bg-black transition-colors">
                      <AnimatedPrice value={currentRightItem.price} prefix="+ $" />
                    </div>

                  </div>
                </motion.div>

                {/* Soft Contact Shadow */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [0.9, 1.05, 0.9],
                          opacity: [0.18, 0.32, 0.18],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2.4,
                  }}
                  className="w-[210px] h-[22px] mx-auto -mt-2 bg-[#0a3822]/25 rounded-[100%] blur-[14px] pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
