import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe } from 'lucide-react';
import { HERO_CREATIVE_CARDS } from '../data/veloxData';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onAnalyzeUrl: (url: string) => void;
  onOpenTrial: (plan?: string, url?: string) => void;
}

export function HeroSection({ onAnalyzeUrl, onOpenTrial }: HeroSectionProps) {
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!section || !cardsWrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = cardsWrapper.querySelectorAll<HTMLElement>('.hero-float-card');

      // Entrance stagger for floating creative cards
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.25,
        }
      );

      // Gentle ambient float per card (transform only, compositor-safe)
      cards.forEach((card, idx) => {
        const yDrift = idx === 1 ? -10 : -7;
        gsap.to(card, {
          y: yDrift,
          duration: 2.8 + idx * 0.45,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.3,
        });
      });

      // Parallax depth & subtle rotation spread on scroll
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.to(cards[0], {
          y: -36,
          rotation: -9,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(cards[1], {
          y: -58,
          scale: 1.03,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(cards[2], {
          y: -32,
          rotation: 9,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = urlInput.trim();
    if (!cleaned || cleaned.length < 4 || !cleaned.includes('.')) {
      setUrlError('Enter a valid store or product domain (e.g., solsticeroasters.com).');
      return;
    }
    setUrlError('');
    onAnalyzeUrl(cleaned);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 border-b border-neutral-200/80 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-medium text-neutral-500 tracking-tight">
            Autonomous Ad Research · Multi-Format Creative Engine · Direct Campaign Export
          </p>

          <SplitTextReveal
            as="h1"
            mode="words"
            immediate
            text="Turn any product URL into winning creative diversity."
            className="mt-4 font-display text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.04] tracking-tight text-[#111216]"
          />

          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Velox analyzes your landing page, maps live competitor ad libraries, and produces ready-to-launch
            creator videos, editorial stills, and comparison hooks built to outpace creative fatigue.
          </p>

          {/* Interactive Brand URL Input + Single Primary CTA */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-xl mx-auto"
            noValidate
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-2 bg-white border border-neutral-200 rounded-xl shadow-xs focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-transparent transition-shadow">
              <div className="flex items-center gap-2.5 flex-1 px-2.5">
                <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
                <label htmlFor="hero-url-input" className="sr-only">
                  Product or website URL
                </label>
                <input
                  id="hero-url-input"
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  placeholder="Paste your store URL (e.g. solsticeroasters.com)"
                  className="w-full py-2 text-sm text-[#111216] placeholder:text-neutral-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#111216] hover:bg-[#2563EB] text-white text-sm font-medium rounded-lg transition-colors duration-150 inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
              >
                <span>Analyze Brand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {urlError && (
              <p role="alert" className="mt-2 text-xs font-medium text-red-600 text-left px-1">
                {urlError}
              </p>
            )}
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-neutral-500">
            <span>Sample domains:</span>
            {['solsticeroasters.com', 'aurorabotanicals.co', 'kestrelacoustics.io'].map((sample, idx) => (
              <span key={sample} className="inline-flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput(sample);
                    setUrlError('');
                    onAnalyzeUrl(sample);
                  }}
                  className="font-mono text-neutral-700 hover:text-[#2563EB] underline underline-offset-4 decoration-neutral-300 hover:decoration-[#2563EB] transition-colors cursor-pointer"
                >
                  {sample}
                </button>
                {idx < 2 && <span aria-hidden="true" className="text-neutral-300">·</span>}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => onOpenTrial('Growth', urlInput)}
              className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Or start a 7-day free trial with 250 starter credits
            </button>
          </div>
        </div>

        {/* Floating & Rotating Creative Diversity Showcase Arc */}
        <div
          ref={cardsWrapperRef}
          className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {HERO_CREATIVE_CARDS.map((card, index) => (
            <article
              key={card.id}
              style={{
                transform: `rotate(${card.tiltDeg}deg)`,
              }}
              className={`hero-float-card group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md will-change-transform ${
                index === 1 ? 'md:-mt-4' : 'md:mt-3'
              }`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <ResilientImage
                  src={card.image}
                  alt={card.alt}
                  priority
                  fallbackTitle={card.brand}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span>{card.formatLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{card.channel}</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight">
                    “{card.hookText}”
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 flex items-center justify-between gap-4 border-t border-neutral-100 bg-white text-xs">
                <span className="font-medium text-[#111216] truncate">{card.brand}</span>
                <span className="font-mono tabular-nums text-neutral-600 shrink-0">{card.outcomeMetric}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
