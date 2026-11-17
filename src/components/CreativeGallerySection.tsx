import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_CREATIVES, type GalleryFormat } from '../data/veloxData';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const FORMAT_FILTERS: { id: GalleryFormat; label: string }[] = [
  { id: 'all', label: 'All Formats' },
  { id: 'creator', label: 'Creator Video' },
  { id: 'editorial', label: 'Static Editorial' },
  { id: 'comparison', label: 'Comparison' },
];

export function CreativeGallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryFormat>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleCards = useMemo(() => {
    if (activeFilter === 'all') return GALLERY_CREATIVES;
    return GALLERY_CREATIVES.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const section = sectionRef.current;
    const trackWrapper = trackWrapperRef.current;
    const track = trackRef.current;
    if (!section || !trackWrapper || !track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Stagger entrance of cards whenever filter changes
      gsap.fromTo(
        track.querySelectorAll('.gallery-card'),
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );

      // Pinned horizontal scroll only on desktop when showing the full gallery
      if (activeFilter === 'all') {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const getScrollDistance = () => Math.max(0, track.scrollWidth - trackWrapper.clientWidth);

          if (getScrollDistance() > 40) {
            gsap.to(track, {
              x: () => -getScrollDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 0.85,
                start: 'top top+=40',
                end: () => `+=${getScrollDistance()}`,
                invalidateOnRefresh: true,
              },
            });
          }
        });
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [activeFilter]);

  return (
    <section
      id="creative-gallery"
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAFA] border-b border-neutral-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-tight">
              Creative Diversity Gallery · Multi-Channel Output
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="One brand brief, six distinct native formats."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
            />
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Modern ad auctions penalize repetitive creative. Velox distributes every angle across creator
              POV clips, studio product stills, and spec comparisons simultaneously.
            </p>
          </div>

          {/* Interactive Format Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter gallery by ad format"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-xl self-start lg:self-auto"
          >
            {FORMAT_FILTERS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    isActive
                      ? 'bg-white text-[#111216] shadow-xs'
                      : 'text-neutral-600 hover:text-[#111216]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scroll Track on Desktop (All) / Responsive Grid or Touch Track */}
        <div ref={trackWrapperRef} className="mt-10 sm:mt-12 overflow-x-auto lg:overflow-visible no-scrollbar">
          <div
            ref={trackRef}
            className={`flex gap-6 ${
              activeFilter === 'all'
                ? 'w-max lg:w-max pb-2'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full'
            }`}
          >
            {visibleCards.map((card) => (
              <article
                key={card.id}
                className={`gallery-card group bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col shrink-0 transition-colors duration-200 hover:border-neutral-300 ${
                  activeFilter === 'all' ? 'w-[290px] sm:w-[330px] lg:w-[360px]' : 'w-full'
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <ResilientImage
                    src={card.image}
                    alt={card.alt}
                    fallbackTitle={card.brand}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span>{card.channel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{card.aspectLabel}</span>
                    </div>
                    <p className="mt-1.5 font-display text-lg font-semibold leading-snug">
                      “{card.hookText}”
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 flex items-center justify-between gap-3 bg-white border-t border-neutral-100">
                  <div>
                    <p className="text-sm font-semibold text-[#111216]">{card.brand}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{card.formatLabel}</p>
                  </div>
                  <span className="font-mono text-xs tabular-nums font-medium text-[#2563EB] shrink-0">
                    {card.outcomeMetric}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
