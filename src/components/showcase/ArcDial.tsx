'use client';

import React, { useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useTransform,
  MotionValue,
} from 'motion/react';
import type { SectionConfig } from '@/data/showcase';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ArcDialProps {
  sections: SectionConfig[];
  activeFloat: number; // continuous float index (e.g. 0.0 to N-1)
  activeIndex: number; // discrete rounded index
  onSelectSection: (index: number) => void;
  arcColor?: string;
  smoothProgress?: MotionValue<number>;
}

// Single radial label spoke on the wheel
function RadialWheelLabel({
  section,
  index,
  stepDeg,
  activeFloatMotion,
  activeFloatNumber,
  activeIndex,
  onSelectSection,
  shouldReduceMotion,
}: {
  section: SectionConfig;
  index: number;
  stepDeg: number;
  activeFloatMotion?: MotionValue<number>;
  activeFloatNumber: number;
  activeIndex: number;
  onSelectSection: (index: number) => void;
  shouldReduceMotion: boolean | null;
}) {
  // Delta distance from active float
  const deltaMotion = useTransform(
    activeFloatMotion ?? new MotionValue(activeFloatNumber),
    (val: number) => index - val
  );

  // Opacity: clamp(1 - |delta| * 0.5, 0, 1); hide when |delta| > 2
  const opacity = useTransform(deltaMotion, (d: number) => {
    const absD = Math.abs(d);
    if (absD > 2.05) return 0;
    return Math.max(0, Math.min(1, 1 - absD * 0.5));
  });

  // Scale: 1 - min(|delta|, 2) * 0.18
  const scale = useTransform(deltaMotion, (d: number) => {
    const absD = Math.abs(d);
    return 1 - Math.min(absD, 2) * 0.18;
  });

  // Color: white at full opacity for active, white at 65% for others
  const color = useTransform(deltaMotion, (d: number) => {
    return Math.abs(d) < 0.5 ? '#ffffff' : 'rgba(255, 255, 255, 0.65)';
  });

  // Font weight: 600 for |delta| < 0.5, otherwise 400
  const fontWeight = useTransform(deltaMotion, (d: number) => {
    return Math.abs(d) < 0.5 ? 600 : 400;
  });

  // Pointer events: active only when within visible range
  const pointerEvents = useTransform(deltaMotion, (d: number) => {
    return Math.abs(d) <= 1.8 ? 'auto' : 'none';
  });

  const isCurrent = index === activeIndex;

  // Base rotation of spoke i
  // Spoke angle in degrees: index * stepDeg
  const baseSpokeAngle = index * stepDeg;

  return (
    <div
      className="absolute left-0 top-0 pointer-events-none"
      style={{
        transform: `rotate(${baseSpokeAngle}deg)`,
        transformOrigin: '0 0',
      }}
    >
      {/* 
        Positioned along radius:
        Translated left by 0.88 * R from circle center toward the outer arc.
        Text-align left, reading inward from outer edge toward center.
      */}
      <motion.div
        style={{
          transform: `translate(calc(-0.88 * var(--radius)), -50%)`,
          opacity: shouldReduceMotion ? (isCurrent ? 1 : 0.6) : opacity,
          scale: shouldReduceMotion ? (isCurrent ? 1 : 0.84) : scale,
          pointerEvents: shouldReduceMotion
            ? 'auto'
            : (pointerEvents as unknown as React.CSSProperties['pointerEvents']),
        }}
        className="absolute left-0 top-0 flex items-center select-none"
      >
        <motion.button
          type="button"
          onClick={() => onSelectSection(index)}
          aria-current={isCurrent ? 'true' : undefined}
          style={{
            color,
            fontWeight,
            maxWidth: 'calc(0.62 * var(--radius))',
          }}
          className="cursor-pointer text-left font-sans text-[22px] tracking-tight truncate whitespace-nowrap 
                     transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B6B4A] rounded-sm py-1 px-1.5"
          aria-label={`Jump to ${section.label}`}
        >
          {section.label}
        </motion.button>
      </motion.div>
    </div>
  );
}

export function ArcDial({
  sections,
  activeFloat,
  activeIndex,
  onSelectSection,
  arcColor = '#0B6B4A',
  smoothProgress,
}: ArcDialProps) {
  const shouldReduceMotion = useReducedMotion();

  // Angular step per item (24 degrees desktop, 20 degrees tablet)
  const STEP = 24;

  const total = sections.length;
  const currentFormatted = String(activeIndex + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  // Motion value mapping smoothed progress [0, 1] to continuous float index [0, total - 1]
  const defaultFloatMotion = useMemo(() => new MotionValue(activeFloat), []);
  const activeFloatMotion = smoothProgress
    ? useTransform(smoothProgress, [0, 1], [0, Math.max(1, total - 1)])
    : defaultFloatMotion;

  // Wheel wrapper rotation: wheelAngle = -(activeFloat * STEP)
  // Positive activeFloat (scrolling down) rotates wheel angle negative,
  // which tilts and moves spokes upward along the arc.
  const wheelAngle = useTransform(activeFloatMotion, (v: number) => -v * STEP);

  // Subtle rotation for outline arcs based on scroll progress
  const outlineRot1 = shouldReduceMotion ? 0 : activeFloat * 5;
  const outlineRot2 = shouldReduceMotion ? 0 : -activeFloat * 7;

  // Ticks at every STEP angle, from -3 to +3 steps around active angle
  const tickSteps = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none pointer-events-none"
      style={
        {
          '--arc': arcColor,
          '--diameter': 'clamp(560px, 92vh, 820px)',
          '--radius': 'calc(clamp(560px, 92vh, 820px) / 2)',
        } as React.CSSProperties
      }
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
        {/* Outer Concentric Outline 2 (1.16x) - 1px, 14% opacity */}
        <motion.div
          className="absolute inset-[-8%] rounded-full border border-[rgba(11,107,74,0.14)] 
                     border-dashed pointer-events-none"
          animate={{ rotate: outlineRot2 }}
          transition={{ ease: EASE_OUT_CUBIC, duration: 0.3 }}
        />

        {/* Outer Concentric Outline 1 (1.06x) - 1px, 14% opacity */}
        <motion.div
          className="absolute inset-[-3%] rounded-full border border-[rgba(11,107,74,0.14)] pointer-events-none"
          animate={{ rotate: outlineRot1 }}
          transition={{ ease: EASE_OUT_CUBIC, duration: 0.3 }}
        />

        {/* The Solid Arc Circle with Breath & Idle Drift */}
        <motion.div
          key={`circle-${activeIndex}`}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.02, 1],
                  x: [0, -4, 0],
                }
          }
          transition={{
            scale: { duration: 0.8, ease: EASE_OUT_CUBIC },
            x: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-full h-full rounded-full shadow-[0_12px_40px_rgba(11,107,74,0.18)] 
                     overflow-hidden flex items-center justify-center transition-colors duration-700"
          style={{ backgroundColor: 'var(--arc)' }}
        >
          {/* Subtle directional color highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700"
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
          <div className="w-[62%] h-[62%] rounded-full border border-[rgba(255,255,255,0.05)] pointer-events-none" />
        </motion.div>

        {/* ============================================================= */}
        {/* ACTIVE HIGHLIGHT BAND AT 0 DEGREES (Leftmost point)           */}
        {/* 6px wide, 120px tall rounded glow, white at 10% opacity       */}
        {/* ============================================================= */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center"
          style={{
            transform: 'translate(calc(var(--radius) * (1 - 0.88) - 14px), -50%)',
          }}
        >
          <div className="w-[6px] h-[120px] rounded-full bg-white/10 blur-[2px]" />
        </div>

        {/* ============================================================= */}
        {/* ACTIVE CONNECTOR LINE & CROSSHAIR (Horizontal at Leftmost)     */}
        {/* Fixed at 0 degrees leftmost point, pointing to content         */}
        {/* ============================================================= */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center"
          style={{
            transform: 'translate(calc(var(--radius) * (1 - 0.88) - 96px), -50%)',
          }}
        >
          {/* Animated SVG 80px Dotted Connector line */}
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

        {/* ============================================================= */}
        {/* RADIAL WHEEL WRAPPER (Pivot at circle center 50% 50%)        */}
        {/* Rotates by wheelAngle = -(activeFloat * STEP)                 */}
        {/* ============================================================= */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none"
          style={{
            rotate: shouldReduceMotion ? -activeIndex * STEP : wheelAngle,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.2, ease: EASE_OUT_CUBIC }
              : undefined
          }
        >
          {/* 
            Faint tick marks at every STEP angle (-3 to +3 steps)
            1px lines, 14px long, white at 25% opacity
          */}
          {tickSteps.map((k) => (
            <div
              key={`tick-${k}`}
              className="absolute left-0 top-0 pointer-events-none"
              style={{
                transform: `rotate(${k * STEP}deg)`,
                transformOrigin: '0 0',
              }}
            >
              <div
                className="w-[14px] h-[1px] bg-white/25 rounded-full"
                style={{
                  transform: `translate(calc(-0.88 * var(--radius) - 18px), -50%)`,
                }}
              />
            </div>
          ))}

          {/* Radial Wheel Labels */}
          {sections.map((section, idx) => (
            <RadialWheelLabel
              key={section.id}
              section={section}
              index={idx}
              stepDeg={STEP}
              activeFloatMotion={activeFloatMotion}
              activeFloatNumber={activeFloat}
              activeIndex={activeIndex}
              onSelectSection={onSelectSection}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

        {/* Counter Badge ("01 / 02"): 11px mono */}
        <div
          className="absolute left-[7%] bottom-[22%] pointer-events-none flex items-center gap-2 
                     px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#9AD385] animate-ping" />
          <div className="flex items-center font-mono text-[11px] font-semibold text-white/90 tracking-[0.16em]">
            <div className="h-3.5 overflow-hidden relative inline-flex items-center justify-center min-w-[16px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={currentFormatted}
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
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
  );
}
