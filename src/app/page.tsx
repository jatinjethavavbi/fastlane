'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { VideoFormatShowcase } from '@/components/VideoFormatShowcase';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { StartModal } from '@/components/StartModal';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Fixed: wrap ScrollTrigger.update in a function so Lenis scroll event object is not passed directly
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const handleTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0E]">
      <Navbar onStartNow={() => setModalOpen(true)} />
      <main>
        <HeroSection onStartFree={() => setModalOpen(true)} />
        <VideoFormatShowcase onStartNow={() => setModalOpen(true)} />
        <HowItWorksSection onStartNow={() => setModalOpen(true)} />
      </main>
      <StartModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
