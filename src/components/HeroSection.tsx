'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HEADLINE_WORDS = ['Your', 'next', 'winning', 'ad'];

interface HeroSectionProps {
  onStartFree: () => void;
}

interface AdArcCard {
  id: string;
  video: string;
  alt: string;
  caption: string;
}

const ARC_CARDS: AdArcCard[] = [
  {
    id: 'card-1',
    video: '/videos/face_serum.mp4',
    alt: 'Customer applying face serum',
    caption: 'Why vitamin C oxidizes before it ever reaches your skin.',
  },
  {
    id: 'card-2',
    video: '/videos/steamer_1.mp4',
    alt: 'Steamer smoothing wrinkled linen',
    caption: 'No ironing board needed: ready in 15 seconds before leaving the room.',
  },
  {
    id: 'card-3',
    video: '/videos/sunglasses_1.mp4',
    alt: 'Model putting on luxury sunglasses',
    caption: 'Polarized glare test against California midday sun reflection.',
  },
  {
    id: 'card-4',
    video: '/videos/smartwatch.mp4',
    alt: 'Minimalist smartwatch commercial',
    caption: 'Battery lasts 14 days and tracks recovery like a $600 lab monitor.',
  },
  {
    id: 'card-5',
    video: '/videos/coffee_brewing.mp4',
    alt: 'Artisan roasted specialty coffee brewing',
    caption: 'Roasted to order in 48 hours so every morning cup hits like day one.',
  },
  {
    id: 'card-6',
    video: '/videos/running_shoe.mp4',
    alt: 'Running shoe promotional video ad',
    caption: '198 grams on wet asphalt — zero heel slip through mile 400.',
  },
  {
    id: 'card-7',
    video: '/videos/headphones_unboxing.mp4',
    alt: 'Unboxing wireless noise-canceling studio headphones',
    caption: '42dB active isolation measured live on the morning commute.',
  },
  {
    id: 'card-8',
    video: '/videos/leather_wallet_1.mp4',
    alt: 'Luxury minimalist leather wallet commercial',
    caption: 'Full-grain vegetable-tanned leather patina after 180 days of carry.',
  },
  {
    id: 'card-9',
    video: '/videos/led_light.mp4',
    alt: 'Social media ad for smart LED lights',
    caption: 'Instant studio ambiance with smart magnetic light sticks.',
  },
  {
    id: 'card-10',
    video: '/videos/luxury_minimalist.mp4',
    alt: 'Luxury minimalist product commercial',
    caption: 'Designed in Copenhagen. Cast in solid sandblasted aluminum.',
  },
];

const AVATAR_IMAGES = [
  '/images/ad_creator_lifestyle_1794908396875.jpg',
  '/images/ad_athletic_runner_1794908396789.jpg',
  '/images/ad_skincare_editorial_1794908395716.jpg',
  '/images/ad_audio_hardware_1794908395903.jpg',
  '/images/case_study_roastery_1794908397891.jpg',
];

const X_FACTORS = [0, 1.25, 2.38, 3.32, 4.05];

function sampleXFactor(absD: number): number {
  if (absD <= 0) return 0;
  if (absD >= 4) return X_FACTORS[4];
  const i = Math.floor(absD);
  const t = absD - i;
  // Smoothstep blend for seamless 3D arc acceleration
  const s = t * t * (3 - 2 * t);
  return X_FACTORS[i] + (X_FACTORS[i + 1] - X_FACTORS[i]) * s;
}

function wrapOffset(index: number, pos: number, total: number): number {
  const half = total / 2;
  return ((((index - pos) % total) + total + half) % total) - half;
}

function computeCardStyle(
  index: number,
  pos: number,
  total: number,
  cardWidth: number,
  cardGap: number,
  depthScale: number
) {
  const d = wrapOffset(index, pos, total);
  const absD = Math.abs(d);
  const sign = d === 0 ? 0 : d > 0 ? 1 : -1;

  const unitStep = cardWidth + cardGap;
  const x = sign * unitStep * sampleXFactor(absD);
  const z = (-85 - Math.pow(absD, 1.55) * 52) * depthScale;
  const rotateY = -sign * Math.min(46, absD * 15.2);

  let opacity = 1;
  if (absD > 3.0) {
    opacity = Math.max(0, 1 - (absD - 3.0) / 0.65);
  }

  return {
    transform: `translate3d(calc(-50% + ${x.toFixed(2)}px), 0px, ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg)`,
    opacity: Number(opacity.toFixed(3)),
    zIndex: Math.round(100 - absD * 20),
    isCenterFocus: absD < 0.45,
  };
}

const INITIAL_CARD_STYLES: React.CSSProperties[] = ARC_CARDS.map((_, idx) => {
  const computed = computeCardStyle(idx, 3, ARC_CARDS.length, 220, 42, 1.0);
  return {
    width: '220px',
    transform: computed.transform,
    opacity: computed.opacity,
    zIndex: computed.zIndex,
    transformStyle: 'preserve-3d',
    willChange: 'transform, opacity',
  };
});

export function HeroSection({ onStartFree }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [decisionBadge, setDecisionBadge] = useState<'POST' | 'SKIP' | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Continuous physics state stored in refs for 120fps mouse + button sliding
  const currentPosRef = useRef<number>(3);
  const targetPosRef = useRef<number>(3);
  const draggingRef = useRef<boolean>(false);
  const movedDuringDragRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(3);
  const dragVelocityRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const activePointerIdRef = useRef<number | null>(null);

  // Mouse camera parallax tilt state
  const tiltTargetRef = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const tiltCurrentRef = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.hero-reveal'),
        { y: 20, opacity: 0 },
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

  const stepArc = useCallback((delta: number, badge?: 'POST' | 'SKIP') => {
    if (badge) setDecisionBadge(badge);
    targetPosRef.current = Math.round(targetPosRef.current + delta);
  }, []);

  const goToIndex = useCallback((idx: number) => {
    const total = ARC_CARDS.length;
    const currentRounded = Math.round(targetPosRef.current);
    const wrapped = wrapOffset(idx, currentRounded, total);
    targetPosRef.current = currentRounded + wrapped;
  }, []);

  useEffect(() => {
    if (!decisionBadge) return;
    const t = window.setTimeout(() => setDecisionBadge(null), 900);
    return () => window.clearTimeout(t);
  }, [decisionBadge]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepArc(1, 'POST');
      if (e.key === 'ArrowLeft') stepArc(-1, 'SKIP');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stepArc]);

  // Main 3D Cylinder Render & Continuous Slow Infinite Drift Physics Loop
  useEffect(() => {
    let rafId = 0;
    const total = ARC_CARDS.length;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderFrame = () => {
      const stage = stageRef.current;
      const ring = ringRef.current;

      // Continuous slow cinematic infinite auto-drift when not interacting or hovered
      if (!draggingRef.current && !isHovered && !prefersReduced) {
        targetPosRef.current += 0.0035;
      }

      // Interpolate slider position (instant while dragging, spring-smoothed on release/button click)
      const diff = targetPosRef.current - currentPosRef.current;
      if (draggingRef.current) {
        currentPosRef.current += diff * 0.48;
      } else if (isHovered) {
        currentPosRef.current += diff * 0.15;
      } else {
        currentPosRef.current += diff * 0.08;
      }

      if (Math.abs(diff) < 0.0005 && !draggingRef.current) {
        currentPosRef.current = targetPosRef.current;
      }

      // Sync lightweight activeIndex state only when rounded center card changes
      const nearest = ((Math.round(currentPosRef.current) % total) + total) % total;
      setActiveIndex((prev) => (prev === nearest ? prev : nearest));

      // Smooth 3D camera parallax tilt from mouse hover
      tiltCurrentRef.current.rx += (tiltTargetRef.current.rx - tiltCurrentRef.current.rx) * 0.1;
      tiltCurrentRef.current.ry += (tiltTargetRef.current.ry - tiltCurrentRef.current.ry) * 0.1;

      if (ring && !prefersReduced) {
        ring.style.transform = `rotateX(${tiltCurrentRef.current.rx.toFixed(2)}deg) rotateY(${tiltCurrentRef.current.ry.toFixed(2)}deg)`;
      }

      const stageWidth = stage?.clientWidth || 1280;
      const isMobile = stageWidth < 640;
      const isTablet = stageWidth >= 640 && stageWidth < 1024;
      const cardWidth = isMobile ? 160 : isTablet ? 195 : 225;
      const cardGap = isMobile ? 22 : isTablet ? 32 : 44;
      const depthScale = isMobile ? 0.72 : isTablet ? 0.88 : 1.0;

      if (stage) {
        stage.style.perspective = isMobile ? '580px' : isTablet ? '680px' : '740px';
      }

      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const computed = computeCardStyle(
          i,
          currentPosRef.current,
          total,
          cardWidth,
          cardGap,
          depthScale
        );

        el.style.width = `${cardWidth}px`;
        el.style.transform = computed.transform;
        el.style.opacity = String(computed.opacity);
        el.style.zIndex = String(computed.zIndex);
        el.style.pointerEvents = computed.opacity < 0.08 ? 'none' : 'auto';
        el.dataset.focused = computed.isCenterFocus ? 'true' : 'false';
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Do not intercept clicks on overlaid arrow navigation buttons
    if ((e.target as HTMLElement).closest('[data-slider-control="true"]')) return;

    draggingRef.current = true;
    movedDuringDragRef.current = false;
    activePointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = targetPosRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (stage) {
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to +1
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to +1
      tiltTargetRef.current = {
        rx: -ny * 3.2,
        ry: nx * 3.6,
      };
    }

    if (!draggingRef.current) return;

    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6 && !movedDuringDragRef.current) {
      movedDuringDragRef.current = true;
      if (activePointerIdRef.current !== null) {
        try {
          stageRef.current?.setPointerCapture(activePointerIdRef.current);
        } catch {
          // Ignore if pointer capture is unavailable
        }
      }
    }

    if (movedDuringDragRef.current) {
      const sensitivity = (stage?.clientWidth || 1200) < 640 ? 155 : 210;
      targetPosRef.current = dragStartPosRef.current - dx / sensitivity;

      const now = performance.now();
      const dt = Math.max(8, now - lastPointerTimeRef.current);
      const instantVel = (e.clientX - lastPointerXRef.current) / dt; // px per ms
      dragVelocityRef.current = dragVelocityRef.current * 0.4 + instantVel * 0.6;
      lastPointerXRef.current = e.clientX;
      lastPointerTimeRef.current = now;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    if (activePointerIdRef.current !== null) {
      try {
        if (stageRef.current?.hasPointerCapture(activePointerIdRef.current)) {
          stageRef.current.releasePointerCapture(activePointerIdRef.current);
        }
      } catch {
        // Ignore
      }
      activePointerIdRef.current = null;
    }

    if (movedDuringDragRef.current) {
      // Apply flick inertia and snap cleanly to nearest integer card
      const momentumCards = Math.max(-2.2, Math.min(2.2, -dragVelocityRef.current * 1.45));
      targetPosRef.current = Math.round(targetPosRef.current + momentumCards);
      window.setTimeout(() => {
        movedDuringDragRef.current = false;
      }, 60);
    }
    void e;
  };

  const handleStageMouseLeave = () => {
    setIsHovered(false);
    tiltTargetRef.current = { rx: 0, ry: 0 };
  };

  // Non-passive horizontal wheel / trackpad swipe support without blocking normal vertical scroll
  const wheelCooldownRef = useRef<number>(0);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;

      e.preventDefault();
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const now = performance.now();
      if (now - wheelCooldownRef.current < 190) return;

      if (Math.abs(delta) > 14) {
        wheelCooldownRef.current = now;
        stepArc(delta > 0 ? 1 : -1);
      }
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [stepArc]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white overflow-hidden pt-[110px] sm:pt-[120px] pb-10 sm:pb-14 flex flex-col items-center justify-between"
    >
      {/* 1. Soft Mint-to-White Radial Background Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1600px] h-[550px] sm:h-[640px] blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse 68% 60% at 50% 14%, rgba(220, 252, 231, 0.68) 0%, rgba(240, 253, 244, 0.42) 36%, rgba(255, 255, 255, 0) 75%)',
        }}
      />

      {/* 2. Faint Blurred Green Orb Behind the Headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 sm:top-24 -translate-x-1/2 w-[520px] sm:w-[620px] h-[280px] sm:h-[320px] rounded-full blur-[100px] opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.28) 0%, rgba(10, 127, 90, 0.14) 50%, rgba(255, 255, 255, 0) 80%)',
        }}
      />

      {/* 3. Subtle Film-Grain Noise Overlay (4% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heroGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heroGrain)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Centered Editorial Headline & Primary CTA */}
      <div className="relative z-20 max-w-4xl mx-auto px-5 sm:px-8 w-full flex flex-col items-center text-center">
        {/* HEADLINE: Centered, 2 lines with staggered Framer Motion word reveal */}
        <h1
          className="leading-[1.02] text-center"
          style={{ textWrap: 'balance' }}
        >
          {/* Line 1: Geist, font-weight 400, tracking -0.03em, color #0b0f0d */}
          {/* Words reveal one by one, sliding up 24px with a blur from 8px to 0, opacity 0 to 1, staggered by 0.08s */}
          <span className="block font-['Geist',sans-serif] font-normal tracking-[-0.03em] text-[#0b0f0d] text-[clamp(2.75rem,7vw,6rem)] leading-[1.02]">
            {HEADLINE_WORDS.map((word, idx) => (
              <span key={word} className="inline-block overflow-visible mr-[0.24em] last:mr-0">
                <motion.span
                  className="inline-block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.65,
                    delay: shouldReduceMotion ? 0 : idx * 0.08,
                    ease: EASE_OUT_CUBIC,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>

          {/* Line 2: Instrument Serif ITALIC, ~1.15x larger, smooth green gradient (#0a7f5a to #34d399) with subtle luxury shimmer */}
          <span className="block relative leading-[1.02] pb-1.5 mt-0.5">
            <motion.span
              className="relative inline-block font-['Instrument_Serif',serif] italic font-normal tracking-[-0.02em] bg-clip-text text-transparent text-[clamp(3.15rem,8.05vw,6.9rem)] leading-[1.02] animate-luxury-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(110deg, #0a7f5a 0%, #10b981 32%, rgba(255, 255, 255, 0.4) 45%, #10b981 58%, #34d399 100%)',
                backgroundSize: '250% 100%',
              }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.75,
                delay: shouldReduceMotion ? 0 : 0.36,
                ease: EASE_OUT_CUBIC,
              }}
            >
              on autopilot

              {/* Thin gradient underline drawing from left to right beneath "on autopilot" (0.8s) */}
              <motion.span
                className="absolute left-0 bottom-0.5 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[#0a7f5a] via-[#10b981] to-[#34d399] origin-left pointer-events-none"
                initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: shouldReduceMotion ? 0 : 0.48,
                  ease: EASE_OUT_CUBIC,
                }}
              />
            </motion.span>
          </span>
        </h1>

        {/* SUBTEXT: Fades up after headline finishes (mt-[32px], 12-13px, uppercase tracking 0.18em with 40px lines) */}
        <motion.div
          className="mt-[32px] flex items-center justify-center gap-3 sm:gap-3.5"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 0.95,
            ease: EASE_OUT_CUBIC,
          }}
        >
          <span className="w-[40px] h-[1px] bg-[#5b6b64]/30 shrink-0" aria-hidden="true" />
          <span className="font-['Geist',sans-serif] text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.18em] text-[#5b6b64] whitespace-nowrap">
            TRUSTED BY 10,000+ BRANDS
          </span>
          <span className="w-[40px] h-[1px] bg-[#5b6b64]/30 shrink-0" aria-hidden="true" />
        </motion.div>

        {/* CTA BUTTON & TRUST ROW: Fades up after headline */}
        <motion.div
          className="mt-[40px] flex flex-col items-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 1.08,
            ease: EASE_OUT_CUBIC,
          }}
        >
          <button
            type="button"
            onClick={onStartFree}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-b from-[#0a7f5a] via-[#087352] to-[#046144] hover:from-[#0b8a62] hover:via-[#097b57] hover:to-[#056d4c] active:scale-[0.98] text-white font-semibold text-sm sm:text-[15px] pl-6 sm:pl-7 pr-2 py-2 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_rgba(10,127,90,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_16px_34px_rgba(10,127,90,0.45)] transition-all duration-200 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]"
          >
            <span className="tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              First 5 statics free
            </span>
            <span className="w-8 h-8 rounded-full bg-white/15 border border-white/20 inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.4} />
            </span>
          </button>
          
          {/* Tiny note below button */}
          <span className="mt-2 text-[11px] sm:text-xs text-[#5b6b64] font-medium tracking-normal select-none">
            No credit card required
          </span>

          {/* Small Trust Row below CTA: 5 overlapping circular avatars (2px white borders), 5 gold stars, and text */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {/* 5 overlapping circular avatars with 2px white borders */}
            <div className="flex -space-x-2 shrink-0">
              {AVATAR_IMAGES.slice(0, 5).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Marketer avatar"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-black/5"
                />
              ))}
            </div>

            {/* Five Gold Star Icons */}
            <div className="flex items-center gap-0.5 shrink-0" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>

            {/* Text: 13px, muted gray */}
            <span className="text-[13px] text-[#5b6b64] font-medium tracking-normal whitespace-nowrap">
              Loved by 10,000+ marketers
            </span>
          </div>
        </motion.div>
      </div>

      {/* Deep 3D Concave Cylinder Slider (Mouse Drag + Hover Parallax + Button Controls) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleStageMouseLeave}
        className="hero-reveal relative z-10 w-full mt-4 sm:mt-6 select-none"
      >
        {/* Soft Emerald Ambient Depth Glow Behind Center Stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[300px] rounded-full blur-3xl opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(16, 185, 129, 0.34) 0%, rgba(167, 243, 208, 0.14) 55%, rgba(255, 255, 255, 0) 78%)',
          }}
        />

        {/* Interactive 3D Viewport Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-roledescription="carousel"
          aria-label="3D Fastlane ad creatives showcase"
          className={`relative w-full h-[340px] sm:h-[395px] lg:h-[435px] flex items-center justify-center overflow-visible touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            perspective: '740px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Floating Left / Right 3D Navigation Arrow Buttons */}
          <button
            type="button"
            data-slider-control="true"
            onClick={() => stepArc(-1, 'SKIP')}
            aria-label="Slide 3D carousel left"
            className="hidden sm:inline-flex items-center justify-center absolute left-4 lg:left-7 top-1/2 -translate-y-1/2 z-[140] w-11 h-11 rounded-full bg-white/85 backdrop-blur-md border border-black/10 text-[#111114] shadow-[0_10px_28px_-6px_rgba(0,0,0,0.22)] hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            data-slider-control="true"
            onClick={() => stepArc(1, 'POST')}
            aria-label="Slide 3D carousel right"
            className="hidden sm:inline-flex items-center justify-center absolute right-4 lg:right-7 top-1/2 -translate-y-1/2 z-[140] w-11 h-11 rounded-full bg-white/85 backdrop-blur-md border border-black/10 text-[#111114] shadow-[0_10px_28px_-6px_rgba(0,0,0,0.22)] hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.2} />
          </button>

          {/* 3D Rotating Ring Container */}
          <div
            ref={ringRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {ARC_CARDS.map((card, idx) => {
              const isFocused = activeIndex === idx;

              return (
                <button
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => {
                    if (movedDuringDragRef.current) return;
                    if (isFocused) {
                      stepArc(1, 'POST');
                    } else {
                      goToIndex(idx);
                    }
                  }}
                  aria-label={`${card.caption} — click to focus`}
                  aria-current={isFocused ? 'true' : undefined}
                  style={INITIAL_CARD_STYLES[idx]}
                  className={`group absolute left-1/2 aspect-[3/4] rounded-[20px] overflow-hidden bg-neutral-900 border transition-[border-color,box-shadow] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
                    isFocused
                      ? 'border-emerald-500/55 shadow-[0_26px_54px_-14px_rgba(11,11,14,0.36)]'
                      : 'border-black/12 shadow-[0_18px_36px_-12px_rgba(11,11,14,0.24)] hover:border-white/40'
                  }`}
                >
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Cinematic Edge Vignette + Bottom Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-[20px] pointer-events-none" />

                  {isFocused && (
                    <AnimatePresence>
                      {decisionBadge && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-md border-2 text-xs font-extrabold tracking-wider ${
                            decisionBadge === 'POST'
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 -rotate-6'
                              : 'border-rose-400 bg-rose-500/20 text-rose-300 rotate-6'
                          }`}
                        >
                          {decisionBadge}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <div className="absolute inset-x-3.5 bottom-4 pointer-events-none text-center">
                    <p className="caption-stroke font-display text-[12px] sm:text-[13px] font-bold leading-snug text-white line-clamp-3">
                      {card.caption}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Button Bar + Interactive Slide Indicators */}
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 px-4">
          <button
            type="button"
            onClick={() => stepArc(-1, 'SKIP')}
            aria-label="Skip to previous ad creative"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white/95 hover:border-rose-300 hover:text-rose-600 active:scale-95 text-xs font-semibold text-neutral-700 shadow-xs transition-all cursor-pointer min-h-[38px]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Select slide">
            {ARC_CARDS.map((card, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goToIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'w-6 bg-[#059669]'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => stepArc(1, 'POST')}
            aria-label="Post and advance to next ad creative"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white/95 hover:border-emerald-400 hover:text-emerald-700 active:scale-95 text-xs font-semibold text-neutral-700 shadow-xs transition-all cursor-pointer min-h-[38px]"
          >
            <span>Post</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom 3-Column Recognition & Social Proof Strip */}
      <div className="hero-reveal relative z-20 max-w-5xl mx-auto px-5 sm:px-8 w-full mt-7 sm:mt-9">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/90 items-center text-center">
          <div className="py-4 md:py-2 md:px-6 flex items-center justify-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#FF6154] text-white font-bold text-sm inline-flex items-center justify-center shrink-0">
              P
            </span>
            <div className="text-left leading-tight">
              <span className="block text-[9px] font-bold tracking-wider uppercase text-neutral-500">
                Product Hunt
              </span>
              <span className="block text-[13px] font-bold text-[#111114]">
                #3 Product of the Day
              </span>
            </div>
          </div>

          <div className="py-4 md:py-2 md:px-6 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center">
              {AVATAR_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className={`w-7 h-7 rounded-full object-cover ring-2 ring-white ${
                    i > 0 ? '-ml-2' : ''
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-neutral-700">
              10,000+ businesses in the Fastlane
            </p>
          </div>

          <div className="py-4 md:py-2 md:px-6 flex items-center justify-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#FF6154] text-white font-bold text-sm inline-flex items-center justify-center shrink-0">
              P
            </span>
            <div className="text-left leading-tight">
              <span className="block text-[9px] font-bold tracking-wider uppercase text-neutral-500">
                #4 Product of the Week
              </span>
              <span className="block text-[13px] font-bold text-[#111114]">Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
