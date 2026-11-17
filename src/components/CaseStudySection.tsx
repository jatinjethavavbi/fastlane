import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GENERATED_IMAGES } from '../data/veloxData';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const CASE_STATS = [
  { target: 64, prefix: '+', suffix: '%', label: 'Blended ROAS Lift', timeframe: '90-day window' },
  { target: 180, prefix: '', suffix: '', label: 'Monthly Ad Variations', timeframe: 'Up from 12 / mo' },
  { target: 31, prefix: '-', suffix: '%', label: 'Customer Acquisition CPA', timeframe: 'Meta + TikTok blended' },
];

export function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Animated statistics counters
      const statNodes = section.querySelectorAll<HTMLElement>('.case-stat-value');
      statNodes.forEach((node) => {
        const target = Number(node.dataset.target || 0);
        const prefix = node.dataset.prefix || '';
        const suffix = node.dataset.suffix || '';
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            node.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
          },
        });
      });

      // Subtle image scale transition on scroll
      if (imageWrapRef.current) {
        const img = imageWrapRef.current.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-[#0A0A0C] text-[#F5F5F7]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Narrative + Quantified Impact */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[#60A5FA] tracking-wide">
                Featured Case Study · Solstice Roasters
              </p>
              <SplitTextReveal
                as="h2"
                mode="words"
                text="How a two-person growth team scaled to 180 monthly ad tests."
                className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-[1.1]"
              />
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">
                Solstice Roasters previously relied on quarterly studio shoots that produced 12 assets per
                month—causing acquisition efficiency to collapse every 10 days. By deploying Kestrel’s
                URL research and Blitz approval workflow, they diversified across creator demos,
                roast-date comparisons, and editorial stills without adding headcount.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/15">
              {CASE_STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="case-stat-value font-display text-3xl sm:text-4xl font-bold tabular-nums text-white"
                    data-target={stat.target}
                    data-prefix={stat.prefix}
                    data-suffix={stat.suffix}
                  >
                    {stat.prefix}
                    {stat.target}
                    {stat.suffix}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-neutral-200">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-neutral-400 font-mono">{stat.timeframe}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Editorial Photography */}
          <div className="lg:col-span-6 flex">
            <div
              ref={imageWrapRef}
              className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#131316] min-h-[340px] lg:h-full"
            >
              <ResilientImage
                src={GENERATED_IMAGES.roastery}
                alt="Solstice Roasters specialty coffee roastery and tasting bar"
                fallbackTitle="Solstice Roasters Case Study"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white">
                <p className="text-xs font-mono text-white/75">
                  Solstice Roasters · Portland, OR · 90-Day Attribution Audit
                </p>
                <p className="mt-1.5 font-display text-lg font-semibold leading-snug">
                  “We went from begging for one winning video a month to testing six distinct hooks every Tuesday.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
