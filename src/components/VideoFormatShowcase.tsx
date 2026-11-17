'use client';

import React from 'react';
import DriftWall, { DriftWallItem } from './DriftWall';
import { Sparkles, ArrowRight } from 'lucide-react';

interface VideoFormatShowcaseProps {
  onStartNow?: () => void;
}

const DRIFT_ITEMS: DriftWallItem[] = [
  {
    id: 'drift-1',
    title: 'Founder Kitchen Hook',
    format: 'FOUNDER HOOK',
    metric: '4.8x ROAS',
    brand: 'Solstice Roasters',
    videoSrc: '/videos/coffee_brewing.mp4',
    poster: '/images/case_study_roastery_1794908397891.jpg',
    caption: 'The 90-second pour-over swap that replaced our morning cafe spend',
  },
  {
    id: 'drift-2',
    title: 'Editorial Product Still',
    format: 'EDITORIAL STILL',
    metric: '4.2x ROAS',
    brand: 'Aura Botanicals',
    videoSrc: '/videos/face_serum.mp4',
    poster: '/images/ad_skincare_editorial_1794908395716.jpg',
    caption: 'Why vitamin C oxidizes in clear dropper bottles before it reaches your skin',
  },
  {
    id: 'drift-3',
    title: '3D Hardware Spec Split',
    format: 'HARDWARE SPEC',
    metric: '3.9x ROAS',
    brand: 'Kestrel Acoustics',
    videoSrc: '/videos/headphones_unboxing.mp4',
    poster: '/images/ad_audio_hardware_1794908395903.jpg',
    caption: '42dB active isolation measured on commuter rail transit',
  },
  {
    id: 'drift-4',
    title: 'Carbon Plate Flex Test',
    format: 'PERFORMANCE LAB',
    metric: '5.1x ROAS',
    brand: 'Velocity Athletic',
    videoSrc: '/videos/running_shoe.mp4',
    poster: '/images/ad_athletic_runner_1794908396789.jpg',
    caption: '198 grams on wet asphalt — zero heel slip through mile 400',
  },
  {
    id: 'drift-5',
    title: 'UGC Street Creator Hook',
    format: 'STREET UGC',
    metric: '4.4x ROAS',
    brand: 'Lumina Eyewear',
    videoSrc: '/videos/sunglasses_1.mp4',
    poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
    caption: 'I swapped my $250 designer sunglasses for these and nobody noticed',
  },
  {
    id: 'drift-6',
    title: 'Problem / Solution Split',
    format: 'PROBLEM SOLVER',
    metric: '5.2x ROAS',
    brand: 'Steamer Pro',
    videoSrc: '/videos/steamer_1.mp4',
    poster: '/images/ad_skincare_editorial_1794908395716.jpg',
    caption: 'Watch 3-day suitcase wrinkles vanish in one smooth pass',
  },
  {
    id: 'drift-7',
    title: 'Tactical EDC Teardown',
    format: 'EDC DROP',
    metric: '4.6x ROAS',
    brand: 'Ridge Heritage',
    videoSrc: '/videos/leather_wallet_1.mp4',
    poster: '/images/ad_audio_hardware_1794908395903.jpg',
    caption: 'Holds 12 cards, RFID-shielded, and thinner than your smartphone',
  },
  {
    id: 'drift-8',
    title: 'Economy Travel Hack',
    format: 'TRAVEL HACK',
    metric: '4.9x ROAS',
    brand: 'Aerofloat Sleep',
    videoSrc: '/videos/neck_pillow_1.mp4',
    poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
    caption: 'How I slept 9 hours straight on a middle seat economy flight',
  },
  {
    id: 'drift-9',
    title: 'Smart Ambient Lighting',
    format: 'STUDIO DEMO',
    metric: '4.3x ROAS',
    brand: 'GlowSync Optics',
    videoSrc: '/videos/led_light.mp4',
    poster: '/images/case_study_roastery_1794908397891.jpg',
    caption: 'Instant studio ambiance with smart magnetic light sticks',
  },
  {
    id: 'drift-10',
    title: 'Battery Teardown Lab',
    format: 'FEATURE TEST',
    metric: '4.7x ROAS',
    brand: 'Chronos Lab',
    videoSrc: '/videos/smartwatch.mp4',
    poster: '/images/ad_audio_hardware_1794908395903.jpg',
    caption: 'Battery lasts 14 days and tracks recovery like a $600 lab monitor',
  },
  {
    id: 'drift-11',
    title: 'Aesthetic Silent Ad',
    format: 'SCANDI SILENT',
    metric: '4.1x ROAS',
    brand: 'Monolith Objects',
    videoSrc: '/videos/luxury_minimalist.mp4',
    poster: '/images/ad_skincare_editorial_1794908395716.jpg',
    caption: 'Designed in Copenhagen. Cast in solid sandblasted aluminum.',
  },
  {
    id: 'drift-12',
    title: 'Polarized Glare Test',
    format: 'CREATOR REACTION',
    metric: '4.5x ROAS',
    brand: 'Lumina Eyewear',
    videoSrc: '/videos/sunglasses_2.mp4',
    poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
    caption: 'Polarized glare test against California midday sun reflection',
  },
  {
    id: 'drift-13',
    title: 'Wrinkle Eraser Quick Pass',
    format: 'BEFORE & AFTER',
    metric: '5.4x ROAS',
    brand: 'Steamer Pro',
    videoSrc: '/videos/steamer_2.mp4',
    poster: '/images/ad_skincare_editorial_1794908395716.jpg',
    caption: 'No ironing board needed: 15 seconds before leaving the hotel room',
  },
  {
    id: 'drift-14',
    title: '180-Day Patina Review',
    format: 'PATINA TEST',
    metric: '4.7x ROAS',
    brand: 'Ridge Heritage',
    videoSrc: '/videos/leather_wallet_2.mp4',
    poster: '/images/ad_audio_hardware_1794908395903.jpg',
    caption: 'Full-grain vegetable-tanned leather patina after 180 days of carry',
  },
];

export function VideoFormatShowcase({ onStartNow }: VideoFormatShowcaseProps) {
  return (
    <section className="relative w-full bg-[#FAFCFB] pt-20 sm:pt-28 pb-24 overflow-hidden flex flex-col items-center">
      {/* Header text container */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
          <span>Proven Creative Architecture · 10,000+ Formats</span>
        </div>

        {/* Main Headline */}
        <h2
          className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] font-bold tracking-tight text-[#111114] leading-[1.04]"
          style={{ textWrap: 'balance' }}
        >
          Create infinite content,
          <br />
          based on winning formats.
        </h2>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
          Hover over any format to inspect live video creatives, real-time performance ROAS, and
          AI-generated script angles.
        </p>
      </div>

      {/* 3D DriftWall Experience Container with White Gradient Falloff */}
      <div className="relative w-full h-[680px] sm:h-[780px] lg:h-[840px] select-none">
        {/* White Gradient Fade Overlays */}
        {/* Top Vignette Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#FAFCFB] via-[#FAFCFB]/80 to-transparent z-20"
        />

        {/* Bottom Vignette Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#FAFCFB] via-[#FAFCFB]/90 to-transparent z-20"
        />

        {/* Left Vignette Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-56 lg:w-72 bg-gradient-to-r from-[#FAFCFB] via-[#FAFCFB]/80 to-transparent z-20"
        />

        {/* Right Vignette Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-56 lg:w-72 bg-gradient-to-l from-[#FAFCFB] via-[#FAFCFB]/80 to-transparent z-20"
        />

        {/* DriftWall 3D Perspective Grid */}
        <DriftWall
          items={DRIFT_ITEMS}
          columns={7}
          tileWidth={230}
          tileHeight={408}
          gap={20}
          radius={20}
          tilt={16}
          turn={-14}
          roll={0}
          perspective={1200}
          depth={120}
          speed={36}
          direction="up"
          variance={0.45}
          parallax={0.65}
          lift={72}
          fade={0.55}
          dim={0.88}
          overlayColor="transparent"
          pauseOnHover={false}
          grayscale={false}
          onTileClick={onStartNow}
        />
      </div>

      {/* Bottom CTA Action Button */}
      <div className="relative z-30 mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={onStartNow}
          className="group px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/10"
        >
          <span>Explore all winning video formats</span>
          <ArrowRight className="w-4 h-4 text-[#00D084] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
