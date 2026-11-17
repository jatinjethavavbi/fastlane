import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '../data/veloxData';
import { SplitTextReveal } from './SplitTextReveal';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section
      id="pricing"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-tight">
              Transparent Credit Plans
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="Predictable pricing scaled to your creative testing volume."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
            />
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Every plan begins with a 7-day free trial and 250 starter credits. No credit card required
              to generate your first brand dossier.
            </p>
          </div>

          {/* Billing Cycle Segmented Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-xl self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#111216] shadow-xs'
                  : 'text-neutral-600 hover:text-[#111216]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#111216] shadow-xs'
                  : 'text-neutral-600 hover:text-[#111216]'
              }`}
            >
              Annual · Save 20%
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            const isHighlighted = Boolean(tier.highlighted);

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${
                  isHighlighted
                    ? 'bg-[#111216] text-white border-[#111216]'
                    : 'bg-[#FAFAFA] text-[#111216] border-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{tier.name}</h3>
                    {isHighlighted && (
                      <span className="text-xs font-mono text-[#60A5FA]">Most Popular</span>
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isHighlighted ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {tier.tagline}
                  </p>

                  <div className="mt-6 pt-6 border-t border-current/10 flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl font-bold tabular-nums">
                      ${price}
                    </span>
                    <span
                      className={`text-sm ${
                        isHighlighted ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      / month
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-xs font-mono ${
                      isHighlighted ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {tier.creditsLabel}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm leading-snug">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isHighlighted ? 'text-[#60A5FA]' : 'text-[#2563EB]'
                          }`}
                        />
                        <span className={isHighlighted ? 'text-neutral-200' : 'text-neutral-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(tier.name)}
                  className={`mt-8 w-full py-3 px-5 rounded-xl text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                    isHighlighted
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                      : 'bg-[#111216] hover:bg-[#2563EB] text-white'
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
