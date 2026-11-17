import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CreativeGallerySection } from './components/CreativeGallerySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BrandResearchSection } from './components/BrandResearchSection';
import { CompetitorResearchSection } from './components/CompetitorResearchSection';
import { AdCreationShowcaseSection } from './components/AdCreationShowcaseSection';
import { ProductDemoSection } from './components/ProductDemoSection';
import { CaseStudySection } from './components/CaseStudySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<string>('Growth');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (id === 'top') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleAnalyzeUrl = useCallback(
    (url: string) => {
      setAnalyzedUrl(url);
      scrollToSection('brand-research');
    },
    [scrollToSection]
  );

  const handleOpenTrial = useCallback((plan = 'Growth', url?: string) => {
    if (url) setAnalyzedUrl(url);
    setModalPlan(plan);
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111216]">
      <Navbar onNavigate={scrollToSection} onOpenTrial={handleOpenTrial} />

      <main>
        <HeroSection onAnalyzeUrl={handleAnalyzeUrl} onOpenTrial={handleOpenTrial} />
        <CreativeGallerySection />
        <HowItWorksSection />
        <BrandResearchSection externalUrl={analyzedUrl} />
        <CompetitorResearchSection />
        <AdCreationShowcaseSection />
        <ProductDemoSection />
        <CaseStudySection />
        <TestimonialsSection />
        <PricingSection onSelectPlan={(plan) => handleOpenTrial(plan)} />
        <FaqSection />
      </main>

      <Footer onNavigate={scrollToSection} onOpenTrial={handleOpenTrial} />

      <TrialModal
        isOpen={modalOpen}
        initialPlan={modalPlan}
        initialUrl={analyzedUrl}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
