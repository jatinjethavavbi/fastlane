'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Search,
  Wand2,
  Video,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Layers,
  ShieldCheck,
  BarChart3,
  Play,
  Zap,
  Globe,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface HowItWorksSectionProps {
  onStartNow?: () => void;
}

interface StepItem {
  id: string;
  stepNum: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string }[];
  preview: {
    title: string;
    status: string;
    details: string[];
    highlight: string;
  };
}

const STEPS: StepItem[] = [
  {
    id: 'step-1',
    stepNum: '01',
    title: 'Brand DNA & Market Intelligence',
    tagline: 'Instant 360° product & competitor teardown',
    badge: 'AUTOMATIC EXTRACTION',
    description:
      'Enter your website or Shopify store URL. Fastlane’s vision models analyze your color palette, product catalog, customer reviews, and top 20 competitors to extract high-leverage marketing angles.',
    metrics: [
      { label: 'Setup Time', value: '< 60 sec' },
      { label: 'Competitor Angles', value: '45+ Scanned' },
      { label: 'Brand Voice Match', value: '99.4%' },
    ],
    preview: {
      title: 'Brand Intelligence Ingestion',
      status: 'Active Analysis',
      details: [
        'Shopify catalog indexed (48 SKUs analyzed)',
        'Extracted 1,200+ 5-star customer review hooks',
        'Competitor ad fatigue detected on 3 Meta angles',
        'Identified high-converting hook: "The 90-sec morning swap"',
      ],
      highlight: 'Target ROAS: 4.5x - 5.5x predicted',
    },
  },
  {
    id: 'step-2',
    stepNum: '02',
    title: 'Winning Format Synthesis',
    tagline: 'Match your product with top 1% viral ad formats',
    badge: 'CREATIVE BLUEPRINT',
    description:
      'The AI creative director matches your product with battle-tested formats (Founder Kitchen Hook, Editorial Stills, Problem/Solution, UGC Teardowns) proven across $1B+ in ad spend.',
    metrics: [
      { label: 'Proven Formats', value: '10,000+' },
      { label: 'Hook Variations', value: '15 per SKU' },
      { label: 'Predicted Retention', value: '88%+' },
    ],
    preview: {
      title: 'Format Architecture Match',
      status: 'Ready to Render',
      details: [
        'Format Selected: Founder Kitchen Hook (TikTok Spark)',
        'Format Selected: UGC Street Creator Test (Reels)',
        '3-second visual scroll-stopper generated',
        'Direct-response psychological script locked',
      ],
      highlight: 'Pacing: 1.8s cut frequency for high retention',
    },
  },
  {
    id: 'step-3',
    stepNum: '03',
    title: 'Autonomous Video & UGC Creation',
    tagline: 'High-converting video ads rendered in seconds',
    badge: 'STUDIO GENERATION',
    description:
      'Generate studio-grade 9:16 vertical video ads, dynamic kinetic captions, native creator voiceovers, and visual punch-ins without filming crews or lengthy agency turnaround times.',
    metrics: [
      { label: 'Render Speed', value: '45 Seconds' },
      { label: 'Aspect Ratio', value: '9:16 & 1:1' },
      { label: 'Voiceover Quality', value: 'Studio Natural' },
    ],
    preview: {
      title: 'Live Video Rendering Pipeline',
      status: 'Exporting 4K Batches',
      details: [
        'Auto-caption sync: Word-by-word kinetic TikTok styling',
        'Dynamic B-roll punch-in at 0:02 mark',
        'Soundtrack: High-converting lo-fi trending audio',
        '5 hook variations rendered simultaneously',
      ],
      highlight: 'Batch complete: 5 video creatives ready for Meta & TikTok',
    },
  },
  {
    id: 'step-4',
    stepNum: '04',
    title: 'One-Click Launch & Auto-Scaling',
    tagline: 'Live campaign publishing with autonomous budget optimization',
    badge: 'MULTI-CHANNEL SCALING',
    description:
      'Deploy campaigns directly to Meta Ads, TikTok Spark Ads, and YouTube Shorts. Fastlane continuously monitors CPA, automatically kills fatigued angles, and doubles down on top performers.',
    metrics: [
      { label: 'Ad Platforms', value: 'Meta · TikTok · YT' },
      { label: 'Average ROAS Lift', value: '+68%' },
      { label: 'Budget Efficiency', value: 'Zero Ad Waste' },
    ],
    preview: {
      title: 'Autonomous Campaign Manager',
      status: 'Live & Scaling',
      details: [
        'Creative #3 (Founder Hook): 4.8x ROAS (Scaling +35% budget)',
        'Creative #1 (Problem Solver): 5.2x ROAS (Top Performer)',
        'Creative #4: CPA reached threshold -> Auto-paused',
        'Next batch queue: 3 new variations scheduled',
      ],
      highlight: 'Real-time optimization: 4.8x Blended ROAS',
    },
  },
];

const PLATFORMS = [
  { name: 'Meta Ads', tag: 'Official API' },
  { name: 'TikTok Spark', tag: 'Certified' },
  { name: 'YouTube Shorts', tag: 'Direct Sync' },
  { name: 'Google Ads', tag: 'Performance Max' },
  { name: 'Shopify Plus', tag: '1-Click Catalog' },
];

export function HowItWorksSection({ onStartNow }: HowItWorksSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section className="relative w-full bg-[#FAFCFB] pt-20 sm:pt-28 pb-28 overflow-hidden">
      {/* Background Subtle Mint/Emerald Organic Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[110px] opacity-40 select-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0, 208, 132, 0.35) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ======================================================== */}
        {/* PART 1: MARKETER CREDIBILITY BANNER ($1B+ IN AD SPEND) */}
        {/* ======================================================== */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-white border border-black/[0.06] shadow-xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden mb-24 sm:mb-32">
          {/* Subtle Corner Ambient Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-400/20 blur-3xl"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
            <span>Battle-Tested Performance Architecture</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111114] max-w-4xl mx-auto leading-[1.08]">
            Created by marketers that have run{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00D084] via-[#10B981] to-[#047857] bg-clip-text text-transparent">
                $1B+ in ad spend
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-1 bg-[#00D084]/35 rounded-full"
              />
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Fastlane isn’t an experimental prompt toy. It’s engineered from the playbook of top 1% direct response marketers who scaled nine-figure brands across Meta, TikTok, and YouTube.
          </p>

          {/* Primary CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartNow}
              className="group relative px-8 py-4 rounded-full bg-[#00D084] hover:bg-[#00BF79] text-neutral-950 font-bold text-base shadow-[0_12px_30px_-8px_rgba(0,208,132,0.6)] hover:shadow-[0_16px_36px_-6px_rgba(0,208,132,0.8)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Start now</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs sm:text-sm text-neutral-500 font-medium">
              First 5 statics & video scripts free · No credit card required
            </span>
          </div>

          {/* Credibility Metric Counters */}
          <div className="mt-12 pt-10 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#111114]">
                $1.2B+
              </span>
              <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Managed Ad Spend
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#00D084]">
                4.8x
              </span>
              <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Average ROAS Lift
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#111114]">
                10M+
              </span>
              <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Ad Creatives Tested
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#00D084]">
                60 sec
              </span>
              <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Launch to Live Ad
              </span>
            </div>
          </div>

          {/* Integrated Platforms Pill Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {PLATFORMS.map((plat) => (
              <span
                key={plat.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" />
                <span>{plat.name}</span>
                <span className="text-[10px] text-neutral-400 font-normal">({plat.tag})</span>
              </span>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* PART 2: HOW IT WORKS (AUTONOMOUS AI MARKETING PIPELINE) */}
        {/* ======================================================== */}
        <div id="how-it-works" className="relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#00D084]" />
              <span>Step-by-Step Autonomous Workflow</span>
            </div>
            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111114]">
              How it works
            </h3>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              From raw product catalog to high-performing video ads in under 3 minutes.
              Zero prompt engineering or agency retainer required.
            </p>
          </div>

          {/* Interactive Steps Grid + Live Product Preview Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Step Navigation Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {STEPS.map((step, index) => {
                const isActive = activeStepIndex === index;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepIndex(index)}
                    className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-white border-[#00D084] shadow-lg shadow-emerald-500/10 ring-1 ring-[#00D084]'
                        : 'bg-white/70 hover:bg-white border-black/[0.06] hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${
                            isActive
                              ? 'bg-[#00D084] text-neutral-950'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {step.stepNum}
                        </span>
                        <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
                          {step.badge}
                        </span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                      )}
                    </div>

                    <h4
                      className={`text-base sm:text-lg font-bold font-display ${
                        isActive ? 'text-[#111114]' : 'text-neutral-700'
                      }`}
                    >
                      {step.title}
                    </h4>

                    <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {step.tagline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Interactive Mockup Console */}
            <div className="lg:col-span-7 sticky top-28">
              <div className="rounded-[28px] bg-neutral-950 border border-neutral-800 shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                {/* Luminous Glow in Console */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#00D084]/20 blur-3xl"
                />

                {/* Console Top Window Bar */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-neutral-400">
                      fastlane.engine / {activeStep.id}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {activeStep.preview.status}
                  </span>
                </div>

                {/* Animated Step Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className="mt-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs font-mono uppercase text-[#00D084] font-semibold tracking-wider">
                          Phase {activeStep.stepNum}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold font-display mt-0.5 text-white">
                          {activeStep.preview.title}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
                        AI Autopilot
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {activeStep.description}
                    </p>

                    {/* Live Processing Feed */}
                    <div className="rounded-xl bg-black/60 border border-white/10 p-4.5 space-y-2.5">
                      <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                        Execution Pipeline Log:
                      </span>
                      {activeStep.preview.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Highlight Pill */}
                    <div className="mt-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00D084]" />
                        <span>{activeStep.preview.highlight}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200">
                        Optimized
                      </span>
                    </div>

                    {/* Step Metrics Bar */}
                    <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-4">
                      {activeStep.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-[11px] text-neutral-400 font-mono">{m.label}</span>
                          <span className="text-base sm:text-lg font-bold text-white mt-0.5">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    Step {activeStepIndex + 1} of {STEPS.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))
                      }
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#00D084] hover:bg-[#00BF79] text-xs text-neutral-950 font-bold transition-colors cursor-pointer"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

