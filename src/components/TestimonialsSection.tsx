import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/veloxData';
import { SplitTextReveal } from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.testimonial-card');
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAFA] border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#2563EB] tracking-tight">
            Performance Team Proof
          </p>
          <SplitTextReveal
            as="h2"
            mode="words"
            text="Measured outcomes from operators shipping weekly creative."
            className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="testimonial-card bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                  {item.metric}
                </p>
                <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                  “{item.beforeChangeOutcome}”
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-100">
                <p className="font-display text-base font-semibold text-[#111216]">{item.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.role} · {item.organization}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
