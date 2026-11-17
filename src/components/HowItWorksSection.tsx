import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS_STAGES, GENERATED_IMAGES } from '../data/veloxData';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const STAGE_IMAGES = [
  GENERATED_IMAGES.roastery,
  GENERATED_IMAGES.audio,
  GENERATED_IMAGES.lifestyle,
];

export function HowItWorksSection() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Smooth background transition entering dark storytelling chapter
      gsap.fromTo(
        section,
        { backgroundColor: '#FAFAFA', color: '#111216' },
        {
          backgroundColor: '#0A0A0C',
          color: '#F5F5F7',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );

      // Pinned storytelling progression on desktop
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top+=48',
          end: '+=1500',
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${Math.max(0.08, progress)})`;
            }
            const nextIndex = Math.min(
              HOW_IT_WORKS_STAGES.length - 1,
              Math.floor(progress * HOW_IT_WORKS_STAGES.length)
            );
            setActiveStage(nextIndex);
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentStage = HOW_IT_WORKS_STAGES[activeStage];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-[#0A0A0C] text-[#F5F5F7] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#60A5FA] tracking-wide">
              How It Works · End-to-End Autonomous Pipeline
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="From product URL to live ad variations in three structured stages."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]"
            />
          </div>

          <div className="w-full lg:w-64">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono tabular-nums">
              <span>Stage 0{activeStage + 1} / 03</span>
              <span>{currentStage.title}</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-[#2563EB] origin-left transition-transform duration-150"
                style={{ transform: `scaleX(${(activeStage + 1) / 3})` }}
              />
            </div>
          </div>
        </div>

        {/* Split Storytelling Grid */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Interactive Step List */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {HOW_IT_WORKS_STAGES.map((stage, idx) => {
              const isSelected = idx === activeStage;
              return (
                <button
                  key={stage.index}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-white/25'
                      : 'bg-transparent border-white/10 hover:border-white/20 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                      {stage.index}. {stage.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400 shrink-0">
                      {stage.subtitle}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {stage.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#60A5FA]">{stage.deliverable}</span>
                    <span className="text-neutral-400">{stage.metricNote}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Pinned Visual Stage */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#131316] flex flex-col justify-between min-h-[380px] lg:h-full">
              <div className="relative flex-1 min-h-[260px] overflow-hidden">
                <ResilientImage
                  src={STAGE_IMAGES[activeStage]}
                  alt={currentStage.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/35 to-transparent" />
              </div>

              <div className="p-6 sm:p-8 bg-[#131316] border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>Active Stage {currentStage.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentStage.subtitle}</span>
                </div>
                <p className="mt-2 font-display text-2xl font-semibold text-white tracking-tight">
                  {currentStage.deliverable}
                </p>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {currentStage.metricNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
