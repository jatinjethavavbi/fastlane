'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onStartNow?: () => void;
}

export function PricingSection({ onStartNow }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$49' : '$39',
      cadence: '/ month',
      description: 'Ideal for early-stage brands looking to test high-converting video angles.',
      popular: false,
      badge: 'BOOTSTRAP',
      features: [
        '15 AI video ads per month',
        'Full HD 1080p vertical & square renders',
        '5 proven DR format architectures',
        'Shopify product catalog sync',
        'Standard GPU rendering queue',
        'Commercial usage rights',
      ],
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? '$149' : '$119',
      cadence: '/ month',
      description: 'Scale ad velocity with unlimited hooks and automated format generation.',
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        '60 AI video ads per month',
        'Crisp 4K HDR vertical rendering',
        'All 20+ viral format blueprints',
        'Automated competitor teardown scan',
        'Dynamic hook iteration engine',
        'Priority GPU cluster execution',
        'Dedicated Slack growth support',
      ],
    },
    {
      name: 'Scale & Enterprise',
      price: billingCycle === 'monthly' ? '$399' : '$319',
      cadence: '/ month',
      description: 'Full-funnel creative automation with bespoke AI models trained on your brand.',
      popular: false,
      badge: 'UNLIMITED POWER',
      features: [
        'Unlimited AI ad rendering',
        'Custom Brand LoRA model training',
        'Multi-account team collaboration',
        'Meta & TikTok Ads Manager direct sync',
        'Real-time ROAS feedback loop',
        'Dedicated Creative Strategist',
        'Custom enterprise SLA & webhooks',
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#FAFCFB] pt-24 pb-28 px-4 sm:px-6 lg:px-8 border-t border-[#00D084]/15 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[130px] opacity-35 z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, rgba(10, 127, 90, 0.12) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/25 text-[#059669] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
            <span>TRANSPARENT VALUE · ZERO RETAINER</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0b0f0d]">
            Predictable pricing for exponential creative output.
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-sans">
            Scale your ad testing velocity without agency retainers or studio production bottlenecks.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-200">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#151413] text-white shadow-[0_24px_50px_-12px_rgba(10,127,90,0.35)] border-2 border-[#34d399]'
                  : 'bg-white text-neutral-900 shadow-sm hover:shadow-md border border-neutral-200/80'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0a7f5a] to-[#34d399] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      plan.popular ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    {plan.name}
                  </span>
                  {!plan.popular && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      plan.popular ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {plan.cadence}
                  </span>
                </div>

                <p
                  className={`text-xs mb-6 ${
                    plan.popular ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {plan.description}
                </p>

                <div
                  className={`pt-6 border-t ${
                    plan.popular ? 'border-white/10' : 'border-neutral-100'
                  } space-y-3 mb-8`}
                >
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <div
                        className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                          plan.popular ? 'bg-emerald-500/20 text-[#34d399]' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={plan.popular ? 'text-neutral-200' : 'text-neutral-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onStartNow}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-[#00D084] hover:bg-[#00BF79] text-neutral-950 shadow-[0_0_20px_rgba(0,208,132,0.4)]'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

