import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenTrial: (plan?: string) => void;
}

export function Footer({ onNavigate, onOpenTrial }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('subscribed');
    setEmail('');
  };

  return (
    <footer className="bg-[#0A0A0C] text-[#F5F5F7] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Conversion Strip */}
        <div className="pb-14 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to ship creative diversity without studio bottlenecks?
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Start with 250 starter credits on your 7-day free trial. Cancel anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenTrial('Growth')}
            className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2 self-start lg:self-auto whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
          >
            <span>Start 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Links & Release Notes Subscription */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10">
          <div className="md:col-span-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('top');
              }}
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              Velox
            </a>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Creative intelligence and multi-format ad production built for performance marketing teams.
            </p>
          </div>

          <div className="md:col-span-2 space-y-2.5 text-sm">
            <p className="text-xs font-medium text-neutral-400 mb-3">Platform</p>
            {[
              { label: 'Creative Gallery', id: 'creative-gallery' },
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Brand Research', id: 'brand-research' },
              { label: 'Competitor Radar', id: 'competitor-research' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="block text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-2 space-y-2.5 text-sm">
            <p className="text-xs font-medium text-neutral-400 mb-3">Resources</p>
            {[
              { label: 'Blitz Showcase', id: 'ad-showcase' },
              { label: 'Case Study', id: 'case-study' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="block text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium text-neutral-400 mb-3">
              Monthly Ad Creative Benchmark Notes
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2" noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Work email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="you@brand.com"
                className="flex-1 px-3.5 py-2.5 text-sm bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium bg-white text-[#111216] hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                Subscribe
              </button>
            </form>
            {status === 'error' && (
              <p role="alert" className="mt-2 text-xs text-red-400">
                Enter a valid email address.
              </p>
            )}
            {status === 'subscribed' && (
              <p className="mt-2 text-xs text-emerald-400 inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Subscribed to monthly creative benchmarks.
              </p>
            )}
          </div>
        </div>

        {/* Quiet Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Velox Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>San Francisco · London</span>
            <span aria-hidden="true">·</span>
            <span>hello@velox.studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
