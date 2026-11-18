'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
  useReducedMotion,
  MotionValue,
} from 'motion/react';
import type { SectionConfig } from '@/data/showcase';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ArcDialProps {
  sections: SectionConfig[];
  activeFloat: MotionValue<number>;
  activeIndex: number;
  onSelectSection: (index: number) => void;
  arcColor?: string;
}

// Single radial label component inside the circle's coordinate space (origin at R, R)
function DialLabel({
  section,
  index,
  activeFloat,
  activeIndex,
  R,
  r,
  STEP,
  onSelectSection,
  shouldReduceMotion,
}: {
  section: SectionConfig;
  index: number;
  activeFloat: MotionValue<number>;
  activeIndex: number;
  R: number;
  r: number;
  STEP: number;
  onSelectSection: (index: number) => void;
  shouldReduceMotion: boolean | null;
}) {
  const delta = useTransform(activeFloat, (a: number) => index - a);
  const phi = useTransform(delta, (d: number) => d * STEP); // degrees: + means below
  const x = useTransform(
    phi,
    (p: number) => R - r * Math.cos((p * Math.PI) / 180)
  );
  const y = useTransform(
    phi,
    (p: number) => R + r * Math.sin((p * Math.PI) / 180)
  );
  const rotate = useTransform(phi, (p: number) => -p);
  const opacity = useTransform(delta, (d: number) => {
    const absD = Math.abs(d);
    if (absD > 2.05) return 0;
    return Math.max(0, 1 - absD * 0.55);
  });
  const scale = useTransform(
    delta,
    (d: number) => 1 - Math.min(Math.abs(d), 2) * 0.16
  );
  const color = useTransform(delta, (d: number) =>
    Math.abs(d) < 0.5 ? '#ffffff' : 'rgba(255, 255, 255, 0.70)'
  );
  const fontWeight = useTransform(delta, (d: number) =>
    Math.abs(d) < 0.5 ? 600 : 400
  );
  const pointerEvents = useTransform(delta, (d: number) =>
    Math.abs(d) <= 1.8 ? 'auto' : 'none'
  );

  const transform = useMotionTemplate`translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;

  const isCurrent = index === activeIndex;

  return (
    <motion.button
      type="button"
      onClick={() => onSelectSection(index)}
      aria-current={isCurrent ? 'true' : undefined}
      style={{
        transform: shouldReduceMotion
          ? `translate(${R - r}px, ${R}px) scale(1)`
          : transform,
        opacity: shouldReduceMotion ? (isCurrent ? 1 : 0) : opacity,
        color,
        fontWeight,
        pointerEvents: shouldReduceMotion
          ? isCurrent
            ? 'auto'
            : 'none'
          : (pointerEvents as unknown as React.CSSProperties['pointerEvents']),
        transformOrigin: '0% 50%',
        maxWidth: Math.min(300, R * 0.62),
      }}
      className="absolute left-0 top-0 h-[28px] -mt-[14px] leading-[28px] whitespace-nowrap z-[2] cursor-pointer text-left font-sans text-[22px] tracking-tight truncate transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B6B4A] rounded-sm px-1.5"
      aria-label={`Jump to ${section.label}`}
    >
      {section.label}
    </motion.button>
  );
}

// Single radial tick mark rotating with wheel
function DialTick({
  k,
  activeFloat,
  R,
  rTick,
  STEP,
}: {
  k: number;
  activeFloat: MotionValue<number>;
  R: number;
  rTick: number;
  STEP: number;
}) {
  const tickAngle = useTransform(
    activeFloat,
    (a: number) => k * 12 - a * STEP
  );
  const x = useTransform(
    tickAngle,
    (p: number) => R - rTick * Math.cos((p * Math.PI) / 180)
  );
  const y = useTransform(
    tickAngle,
    (p: number) => R + rTick * Math.sin((p * Math.PI) / 180)
  );
  const rotate = useTransform(tickAngle, (p: number) => -p);

  const transform = useMotionTemplate`translate(${x}px, ${y}px) rotate(${rotate}deg)`;

  return (
    <motion.div
      style={{
        transform,
        transformOrigin: '0% 50%',
      }}
      className="absolute left-0 top-0 w-[14px] h-[1px] bg-white/25 -mt-[0.5px] rounded-full pointer-events-none z-[1]"
    />
  );
}

export function ArcDial({
  sections,
  activeFloat,
  activeIndex,
  onSelectSection,
  arcColor = '#0B6B4A',
}: ArcDialProps) {
  const shouldReduceMotion = useReducedMotion();
  const circleRef = useRef<HTMLDivElement>(null);
  const [R, setR] = useState(410);

  // Measure exact circle radius R in pixels dynamically
  useEffect(() => {
    const updateRadius = () => {
      if (circleRef.current) {
        setR(circleRef.current.offsetWidth / 2);
      }
    };
    updateRadius();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && circleRef.current) {
      ro = new ResizeObserver(updateRadius);
      ro.observe(circleRef.current);
    }
    window.addEventListener('resize', updateRadius);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  // Geometry constants
  const STEP = 24; // degrees between section headings
  const PAD = 36; // distance from circle edge to text start point
  const r = R - PAD; // label orbit radius
  const rTick = r + 18; // tick mark orbit radius

  const total = sections.length;
  const currentFormatted = String(activeIndex + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  // Outline arc rotation based on scroll progress
  const outlineRot1 = useTransform(activeFloat, (a: number) =>
    shouldReduceMotion ? 0 : a * 5
  );
  const outlineRot2 = useTransform(activeFloat, (a: number) =>
    shouldReduceMotion ? 0 : -a * 7
  );

  const tickIndices = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none pointer-events-none"
      style={{ '--arc': arcColor } as React.CSSProperties}
    >
      {/* 
        DIAL WRAPPER
        Diameter: clamp(560px, 92vh, 820px), vertically centered.
        Visible portion: ~26vw of viewport on desktop (about 375px at 1440),
        and ~18vw below 1024px.
        Position: right: calc(26vw - var(--diameter))
      */}
      <div
        className="absolute top-1/2 -translate-y-1/2 
                   w-[clamp(560px,92vh,820px)] aspect-square rounded-full flex items-center justify-center
                   right-[calc(18vw-clamp(560px,92vh,820px))] lg:right-[calc(26vw-clamp(560px,92vh,820px))]"
      >
        {/* Outer Concentric Outline 2 (1.16x) */}
        <motion.div
          className="absolute inset-[-8%] rounded-full border border-[rgba(11,107,74,0.14)] 
                     border-dashed pointer-events-none"
          style={{ rotate: outlineRot2 }}
        />

        {/* Outer Concentric Outline 1 (1.06x) */}
        <motion.div
          className="absolute inset-[-3%] rounded-full border border-[rgba(11,107,74,0.14)] pointer-events-none"
          style={{ rotate: outlineRot1 }}
        />

        {/* 
          CIRCLE ELEMENT (Labels' Coordinate Space: origin = top-left, center = (R, R))
          NO overflow: hidden, so text and connectors never clip.
        */}
        <div
          ref={circleRef}
          className="relative w-full h-full rounded-full shadow-[0_12px_40px_rgba(11,107,74,0.18)]"
          style={{ backgroundColor: 'var(--arc)' }}
        >
          {/* Subtle directional color highlight inside circle */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden transition-all duration-700"
            style={{
              background:
                activeIndex === 0
                  ? 'radial-gradient(circle at 18% 50%, rgba(52,211,153,0.2) 0%, transparent 55%)'
                  : 'radial-gradient(circle at 18% 50%, rgba(14,122,85,0.3) 0%, transparent 55%)',
            }}
          />

          {/* Hairline inner border */}
          <div className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.12)] pointer-events-none" />

          {/* Center concentric accent ring */}
          <div className="absolute inset-[19%] rounded-full border border-[rgba(255,255,255,0.05)] pointer-events-none" />

          {/* =========================================================== */}
          {/* SOFT HIGHLIGHT BAND AT phi = 0 (Leftmost point: x = PAD)   */}
          {/* 6px wide, 120px tall rounded glow, white at 10% opacity    */}
          {/* =========================================================== */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${PAD - 3}px`,
              top: `${R}px`,
              transform: 'translateY(-50%)',
            }}
          >
            <div className="w-[6px] h-[120px] rounded-full bg-white/10 blur-[2px]" />
          </div>

          {/* =========================================================== */}
          {/* ACTIVE CONNECTOR LINE & CROSSHAIR                           */}
          {/* Stays at active label start point (x = R - r = PAD, y = R)  */}
          {/* =========================================================== */}
          <div
            className="absolute pointer-events-none select-none flex items-center z-[3]"
            style={{
              left: `${PAD}px`,
              top: `${R}px`,
              transform: 'translate(-100%, -50%)',
            }}
          >
            {/* Animated SVG 80px Dotted Connector Line pointing left */}
            <div className="w-[80px] h-[2px] relative flex items-center">
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                className="w-[80px] h-[2px] overflow-visible"
              >
                <motion.line
                  key={`line-${activeIndex}`}
                  x1="80"
                  y1="1"
                  x2="0"
                  y2="1"
                  stroke="#B79B5E"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
                />
              </svg>
            </div>

            {/* Diamond Crosshair target mark */}
            <div className="relative w-3.5 h-3.5 mx-1 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#B79B5E] rotate-45 rounded-[1px]" />
              <div className="absolute w-3 h-[1px] bg-[#B79B5E]/60" />
              <div className="absolute h-3 w-[1px] bg-[#B79B5E]/60" />
            </div>
          </div>

          {/* =========================================================== */}
          {/* TICK MARKS (on radius r + 18 at every 12 deg)               */}
          {/* =========================================================== */}
          {tickIndices.map((k) => (
            <DialTick
              key={`tick-${k}`}
              k={k}
              activeFloat={activeFloat}
              R={R}
              rTick={rTick}
              STEP={STEP}
            />
          ))}

          {/* =========================================================== */}
          {/* RADIAL WHEEL LABELS (Each calculated independently)         */}
          {/* =========================================================== */}
          {sections.map((section, idx) => (
            <DialLabel
              key={section.id}
              section={section}
              index={idx}
              activeFloat={activeFloat}
              activeIndex={activeIndex}
              R={R}
              r={r}
              STEP={STEP}
              onSelectSection={onSelectSection}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}

          {/* Counter Badge ("01 / 02"): 11px mono */}
          <div
            className="absolute pointer-events-none flex items-center gap-2 
                       px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 z-[2]"
            style={{
              left: `${R * 0.18}px`,
              bottom: `${R * 0.32}px`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#9AD385] animate-ping" />
            <div className="flex items-center font-mono text-[11px] font-semibold text-white/90 tracking-[0.16em]">
              <div className="h-3.5 overflow-hidden relative inline-flex items-center justify-center min-w-[16px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={currentFormatted}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { y: 12, opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { y: -12, opacity: 0 }
                    }
                    transition={{ duration: 0.35, ease: EASE_OUT_CUBIC }}
                    className="block"
                  >
                    {currentFormatted}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mx-1 text-white/50">/</span>
              <span>{totalFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
