import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  mode?: 'words' | 'chars';
  immediate?: boolean;
  delay?: number;
}

export function SplitTextReveal({
  text,
  as: Tag = 'h2',
  className = '',
  mode = 'words',
  immediate = false,
  delay = 0,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = el.querySelectorAll('.split-token');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          targets,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.72,
            stagger: mode === 'chars' ? 0.018 : 0.045,
            ease: 'power3.out',
            delay,
          }
        );
      } else {
        gsap.fromTo(
          targets,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.68,
            stagger: mode === 'chars' ? 0.014 : 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [text, mode, immediate, delay]);

  const words = text.split(' ');

  return (
    <Tag
      ref={containerRef as never}
      aria-label={text}
      className={className}
      style={{ textWrap: 'balance' }}
    >
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-block whitespace-nowrap">
          {mode === 'chars' ? (
            <span className="inline-flex overflow-hidden align-bottom">
              {word.split('').map((char, cIdx) => (
                <span
                  key={`${char}-${cIdx}`}
                  aria-hidden="true"
                  className="split-token inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
          ) : (
            <span className="inline-block overflow-hidden align-bottom">
              <span aria-hidden="true" className="split-token inline-block will-change-transform">
                {word}
              </span>
            </span>
          )}
          {wIdx < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
