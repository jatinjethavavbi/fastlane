'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from 'motion/react';
import { Wifi, Battery, Sparkles, Layers } from 'lucide-react';
import { feeds, AdCreative } from '@/data/ads';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Video Card with Active Playback & Progress Bar (Runs smoothly on hover from start to end)
function AdCardVideo({
  item,
  isLive = false,
  isPhoneHovered = false,
}: {
  item: AdCreative;
  isLive?: boolean;
  isPhoneHovered?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Guarantee video plays when mounted or when phone/card is hovered
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isPhoneHovered]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCardClick = () => {
    if (videoRef.current) {
      // Allow user to click to restart video from start to check full video
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onClick={handleCardClick}
      className="relative w-full aspect-[9/16] rounded-[12px] overflow-hidden bg-neutral-900 shrink-0 border border-white/10 shadow-sm select-none cursor-pointer group"
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      {/* Progress Bar: Tracks playback smoothly from start (0%) to end (100%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/20 z-20 overflow-hidden">
        <div
          className="h-full bg-[#00D084] transition-all duration-100 ease-linear shadow-[0_0_8px_#00D084]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Label Pill: Gently slides in when card crosses into center view */}
      <motion.div
        initial={{ x: -16, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
        className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-sm"
      >
        <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-none">
          {item.label}
        </span>
      </motion.div>

      {/* Brand Category Tag (Top-Right) */}
      <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 text-white/80 font-mono text-[7.5px] uppercase tracking-wider">
        {item.category}
      </div>

      {/* Pulsing "LIVE" Green Dot Badge */}
      {isLive && (
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#00D084]/40 text-[#00D084] font-mono text-[8px] font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
          <span>LIVE</span>
        </div>
      )}
    </div>
  );
}

// Phone Infinite Marquee Screen with Edge-Fade Mask & In-Phone Parallax
function PhoneScreenFeed({
  items,
  direction = 'up',
  duration = 22,
  isHovered = false,
  startDelay = 0.4,
  feedParallaxX,
  feedParallaxY,
}: {
  items: AdCreative[];
  direction?: 'up' | 'down';
  duration?: number;
  isHovered?: boolean;
  startDelay?: number;
  feedParallaxX?: MotionValue<number>;
  feedParallaxY?: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const currentDuration = isHovered ? duration * 4 : duration;
  const doubleItems = [...items, ...items];

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-black rounded-[40px]"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      {/* Subtle in-phone parallax moving opposite to mouse */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : feedParallaxX,
          y: shouldReduceMotion ? 0 : feedParallaxY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: startDelay, duration: 0.6, ease: EASE_OUT_CUBIC }}
        className="w-full h-full"
      >
        {/* Scrolling Track (CSS Transform 60fps) */}
        <div
          className={`w-full flex flex-col gap-[6px] p-[6px] ${
            direction === 'up' ? 'animate-feed-up' : 'animate-feed-down'
          }`}
          style={
            {
              '--feed-duration': `${currentDuration}s`,
              animationPlayState: shouldReduceMotion ? 'paused' : 'running',
            } as React.CSSProperties
          }
        >
          {doubleItems.map((item, idx) => {
            const isLive = idx % 4 === 1;
            return (
              <AdCardVideo
                key={`${item.id}-${idx}`}
                item={item}
                isLive={isLive}
                isPhoneHovered={isHovered}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// Format Strip Card for the Horizontal Marquee (Plays video smoothly with progress bar)
function FormatStripCard({ item }: { item: AdCreative }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={handleRestart}
      className="w-[145px] sm:w-[170px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 shadow-md relative group/card cursor-pointer hover:scale-[1.03] transition-transform duration-300"
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/20 z-20 overflow-hidden">
        <div
          className="h-full bg-[#00D084] transition-all duration-100 ease-linear shadow-[0_0_8px_#00D084]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

      {/* Format Label Pill */}
      <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-sm">
        <span className="font-mono text-[9px] uppercase font-bold tracking-wider leading-none">
          {item.label}
        </span>
      </div>

      {/* Brand Category Tag */}
      <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 text-white/80 font-mono text-[8px] uppercase tracking-wider">
        {item.category}
      </div>
    </div>
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

  // Per-phone hover state for 25% speed slow down & lift
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

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

  const leftFanX = useTransform(smoothScroll, [0.05, 0.85], [90, 0]);
  const rightFanX = useTransform(smoothScroll, [0.05, 0.85], [-90, 0]);
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

  // In-phone feeds move 8px opposite to cursor movement
  const feedParallaxX = useTransform(smoothMouseX, [-1, 1], [8, -8]);
  const feedParallaxY = useTransform(smoothMouseY, [-1, 1], [8, -8]);

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

  // Horizontal Formats Marquee Data (2 rows)
  const formatRow1 = [...feeds.left, ...feeds.center.slice(0, 4)];
  const formatRow2 = [...feeds.center.slice(4), ...feeds.right];
  const doubleRow1 = [...formatRow1, ...formatRow1];
  const doubleRow2 = [...formatRow2, ...formatRow2];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-full min-h-screen bg-[#FAFCFB] pt-20 pb-28 px-4 flex flex-col items-center justify-center overflow-hidden select-none border-t border-[#00D084]/15"
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

      {/* 2. Website Theme: Ambient Blurred Green Glow Orb */}
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
      {/* SECTION HEADER: Preserved Website Theme */}
      {/* ======================================================== */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : headingScrollY,
          opacity: shouldReduceMotion ? 1 : headingScrollOpacity,
        }}
        className="mb-10 text-center z-10 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
          <span>AI Creative Suite · Full-Bleed Ad Feed</span>
        </div>

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
          Full-bleed edge-to-edge ad feeds scrolling infinitely in opposing directions.
        </p>
      </motion.div>

      {/* ======================================================== */}
      {/* 3 PHONES DISPLAY ROW WITH FULL-BLEED SCREENS */}
      {/* ======================================================== */}
      <div className="w-full flex justify-center items-center z-10 [perspective:1400px]">
        <div className="flex items-center justify-center gap-10 py-8 w-full max-w-6xl md:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300">
          
          {/* ======================================================== */}
          {/* LEFT PHONE: Scrolls UP (22s) - Hidden on Mobile */}
          {/* ======================================================== */}
          <div className="hidden md:block flex-shrink-0 relative">
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
                {/* Floating Idle with Lift on Hover */}
                <motion.div
                  onMouseEnter={() => setHoveredLeft(true)}
                  onMouseLeave={() => setHoveredLeft(false)}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: hoveredLeft ? -8 : [-6, 6, -6],
                          scale: hoveredLeft ? 1.015 : 1,
                        }
                  }
                  transition={
                    hoveredLeft
                      ? { duration: 0.3, ease: 'easeOut' }
                      : {
                          duration: 7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0,
                        }
                  }
                  className="relative cursor-pointer"
                >
                  {/* Soft Green Glow Behind Phone (Pulses slowly over 8s) */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [0.94, 1.08, 0.94],
                            opacity: [0.18, 0.38, 0.18],
                          }
                    }
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0,
                    }}
                    className="absolute -inset-4 rounded-[60px] bg-gradient-to-tr from-[#00D084]/20 via-[#34d399]/30 to-[#0a7f5a]/15 blur-2xl pointer-events-none -z-10"
                  />

                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-black border-[7.5px] border-[#22211F] shadow-[0_28px_60px_-12px_rgba(10,40,25,0.22),0_0_0_1px_rgba(255,255,255,0.12)_inset] overflow-hidden flex flex-col justify-between select-none">
                    
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

                    {!isTouchDevice && (
                      <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-35 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar & Dynamic Island on Top (White with Subtle Shadow) */}
                    <div className="absolute top-0 left-0 right-0 pt-2.5 pb-2 px-5 flex items-center justify-between text-white z-30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      <span className="font-mono text-[10px] font-semibold tracking-tight">9:41</span>
                      
                      {/* Dynamic Island */}
                      <div className="w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2 border border-white/15 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#151515] border border-[#2d2d2d]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px]">
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

                    {/* Full-Bleed Infinite Scrolling Feed (UP, 22s) with In-Phone Parallax */}
                    <PhoneScreenFeed
                      items={feeds.left}
                      direction="up"
                      duration={22}
                      isHovered={hoveredLeft}
                      startDelay={0.4}
                      feedParallaxX={feedParallaxX}
                      feedParallaxY={feedParallaxY}
                    />

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
          {/* CENTER PHONE: Scrolls DOWN (30s) - Scaled to fit on Mobile */}
          {/* ======================================================== */}
          <div className="flex-shrink-0 relative">
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
                {/* Floating Idle with Lift on Hover */}
                <motion.div
                  onMouseEnter={() => setHoveredCenter(true)}
                  onMouseLeave={() => setHoveredCenter(false)}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: hoveredCenter ? -8 : [-6, 6, -6],
                          scale: hoveredCenter ? 1.015 : 1,
                        }
                  }
                  transition={
                    hoveredCenter
                      ? { duration: 0.3, ease: 'easeOut' }
                      : {
                          duration: 7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1.2,
                        }
                  }
                  className="relative cursor-pointer"
                >
                  {/* Soft Green Glow Behind Phone (Pulses slowly over 8s) */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [0.94, 1.08, 0.94],
                            opacity: [0.2, 0.42, 0.2],
                          }
                    }
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.6,
                    }}
                    className="absolute -inset-4 rounded-[60px] bg-gradient-to-tr from-[#00D084]/25 via-[#34d399]/35 to-[#0a7f5a]/20 blur-2xl pointer-events-none -z-10"
                  />

                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-black border-[7.5px] border-[#22211F] shadow-[0_32px_68px_-12px_rgba(10,40,25,0.26),0_0_0_1px_rgba(255,255,255,0.14)_inset] overflow-hidden flex flex-col justify-between select-none">
                    
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
                        className="absolute inset-0 pointer-events-none z-20 opacity-35 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar & Dynamic Island on Top */}
                    <div className="absolute top-0 left-0 right-0 pt-2.5 pb-2 px-5 flex items-center justify-between text-white z-30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      <span className="font-mono text-[10px] font-semibold tracking-tight">9:41</span>
                      
                      <div className="w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2 border border-white/15 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#151515] border border-[#2d2d2d]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px]">
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

                    {/* Full-Bleed Infinite Scrolling Feed (DOWN, 30s) with In-Phone Parallax */}
                    <PhoneScreenFeed
                      items={feeds.center}
                      direction="down"
                      duration={30}
                      isHovered={hoveredCenter}
                      startDelay={0.58}
                      feedParallaxX={feedParallaxX}
                      feedParallaxY={feedParallaxY}
                    />

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
          {/* RIGHT PHONE: Scrolls UP (26s) - Hidden on Mobile */}
          {/* ======================================================== */}
          <div className="hidden md:block flex-shrink-0 relative">
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
                {/* Floating Idle with Lift on Hover */}
                <motion.div
                  onMouseEnter={() => setHoveredRight(true)}
                  onMouseLeave={() => setHoveredRight(false)}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: hoveredRight ? -8 : [-6, 6, -6],
                          scale: hoveredRight ? 1.015 : 1,
                        }
                  }
                  transition={
                    hoveredRight
                      ? { duration: 0.3, ease: 'easeOut' }
                      : {
                          duration: 7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 2.4,
                        }
                  }
                  className="relative cursor-pointer"
                >
                  {/* Soft Green Glow Behind Phone (Pulses slowly over 8s) */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [0.94, 1.08, 0.94],
                            opacity: [0.18, 0.38, 0.18],
                          }
                    }
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 3.2,
                    }}
                    className="absolute -inset-4 rounded-[60px] bg-gradient-to-tr from-[#00D084]/20 via-[#34d399]/30 to-[#0a7f5a]/15 blur-2xl pointer-events-none -z-10"
                  />

                  {/* Phone Bezel */}
                  <div className="relative w-[260px] h-[560px] rounded-[48px] bg-black border-[7.5px] border-[#22211F] shadow-[0_28px_60px_-12px_rgba(10,40,25,0.22),0_0_0_1px_rgba(255,255,255,0.12)_inset] overflow-hidden flex flex-col justify-between select-none">
                    
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
                        className="absolute inset-0 pointer-events-none z-20 opacity-35 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Status Bar & Dynamic Island on Top */}
                    <div className="absolute top-0 left-0 right-0 pt-2.5 pb-2 px-5 flex items-center justify-between text-white z-30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      <span className="font-mono text-[10px] font-semibold tracking-tight">9:41</span>
                      
                      <div className="w-[72px] h-[19px] bg-black rounded-full flex items-center justify-end pr-2 border border-white/15 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#151515] border border-[#2d2d2d]" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px]">
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

                    {/* Full-Bleed Infinite Scrolling Feed (UP, 26s) with In-Phone Parallax */}
                    <PhoneScreenFeed
                      items={feeds.right}
                      direction="up"
                      duration={26}
                      isHovered={hoveredRight}
                      startDelay={0.76}
                      feedParallaxX={feedParallaxX}
                      feedParallaxY={feedParallaxY}
                    />

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
