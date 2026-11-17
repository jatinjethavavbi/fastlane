import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SplitTextReveal } from './SplitTextReveal';

type ChannelId = 'meta' | 'tiktok' | 'youtube';

interface ChannelCampaign {
  id: ChannelId;
  label: string;
  placement: string;
  activeVariations: number;
  hookRate: string;
  blendedRoas: string;
  cpa: string;
  fatigueStatus: string;
  campaigns: {
    name: string;
    format: string;
    spend: string;
    roas: string;
    state: string;
  }[];
}

const CHANNEL_DATA: Record<ChannelId, ChannelCampaign> = {
  meta: {
    id: 'meta',
    label: 'Meta Ads Manager',
    placement: 'Feed, Reels & Stories (Advantage+ Shopping)',
    activeVariations: 24,
    hookRate: '38.4%',
    blendedRoas: '3.2x',
    cpa: '$24.80',
    fatigueStatus: '2 angles rotating out Friday · 6 fresh replacements staged',
    campaigns: [
      {
        name: 'Roast-Date Contrast · Batch 14',
        format: '9:16 Creator Video',
        spend: '$4,280',
        roas: '3.6x',
        state: 'Scaling',
      },
      {
        name: 'Amber Glass Stability · Batch 12',
        format: '4:5 Editorial Still',
        spend: '$2,910',
        roas: '3.1x',
        state: 'Stable',
      },
      {
        name: 'Cost-Per-Cup Split · Batch 14',
        format: '1:1 Carousel',
        spend: '$1,640',
        roas: '2.7x',
        state: 'Testing',
      },
    ],
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok Spark',
    placement: 'For You Native In-Feed',
    activeVariations: 18,
    hookRate: '43.1%',
    blendedRoas: '2.9x',
    cpa: '$21.40',
    fatigueStatus: 'Zero creative fatigue detected across top 5 hooks',
    campaigns: [
      {
        name: 'Morning Kitchen Pour-Over Swap',
        format: '9:16 Native POV',
        spend: '$3,150',
        roas: '3.4x',
        state: 'Scaling',
      },
      {
        name: 'Grinder vs. Fresh Bean Comparison',
        format: '9:16 Split Screen',
        spend: '$1,890',
        roas: '2.6x',
        state: 'Stable',
      },
      {
        name: '3-Step Extraction Timing',
        format: '9:16 Tutorial',
        spend: '$1,120',
        roas: '2.4x',
        state: 'Testing',
      },
    ],
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube Shorts',
    placement: 'Shorts Feed & Demand Gen',
    activeVariations: 12,
    hookRate: '35.9%',
    blendedRoas: '2.8x',
    cpa: '$28.90',
    fatigueStatus: '1 comparison script queued for mid-week refresh',
    campaigns: [
      {
        name: '42dB Commuter Rail Isolation',
        format: '9:16 Spec Demo',
        spend: '$2,740',
        roas: '3.1x',
        state: 'Scaling',
      },
      {
        name: 'Milled Aluminum Hinge Teardown',
        format: '9:16 Hardware Proof',
        spend: '$1,920',
        roas: '2.8x',
        state: 'Stable',
      },
      {
        name: '24-Bit USB-C Studio Mode',
        format: '9:16 Desk Setup',
        spend: '$980',
        roas: '2.3x',
        state: 'Testing',
      },
    ],
  },
};

export function ProductDemoSection() {
  const [activeChannel, setActiveChannel] = useState<ChannelId>('meta');
  const [batchQueued, setBatchQueued] = useState<Record<ChannelId, boolean>>({
    meta: false,
    tiktok: false,
    youtube: false,
  });

  const channel = CHANNEL_DATA[activeChannel];
  const isQueued = batchQueued[activeChannel];

  return (
    <section
      id="product-demo"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-tight">
              04. Product Demonstration
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="Closed-loop publishing and creative fatigue monitoring."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
            />
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Push approved variations directly into paused ad sets, monitor thumbstop decay by
              placement, and queue replacement concepts automatically.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select ad distribution channel"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-xl self-start lg:self-auto"
          >
            {(Object.keys(CHANNEL_DATA) as ChannelId[]).map((key) => {
              const item = CHANNEL_DATA[key];
              const isSelected = activeChannel === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveChannel(key)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    isSelected
                      ? 'bg-white text-[#111216] shadow-xs'
                      : 'text-neutral-600 hover:text-[#111216]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Workspace Container */}
        <div className="mt-10 bg-[#FAFAFA] border border-neutral-200 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Summary Metrics Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-neutral-200 bg-white border-b border-neutral-200">
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-neutral-500">Active Variations</p>
                  <p className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#111216]">
                    {channel.activeVariations}
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-neutral-500">3s Thumbstop Rate</p>
                  <p className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#111216]">
                    {channel.hookRate}
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-neutral-500">Blended ROAS</p>
                  <p className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#2563EB]">
                    {channel.blendedRoas}
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-neutral-500">Weighted CPA</p>
                  <p className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#111216]">
                    {channel.cpa}
                  </p>
                </div>
              </div>

              {/* Campaign Table */}
              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#111216]">
                      {channel.label} · {channel.placement}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-0.5">{channel.fatigueStatus}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setBatchQueued((prev) => ({ ...prev, [activeChannel]: !prev[activeChannel] }))
                    }
                    className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer min-h-[40px] ${
                      isQueued
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-[#111216] hover:bg-[#2563EB] text-white'
                    }`}
                  >
                    {isQueued ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Draft Batch Queued to {channel.label}</span>
                      </>
                    ) : (
                      <>
                        <span>Push Next 6 Drafts to {channel.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto bg-white border border-neutral-200 rounded-xl">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="border-b border-neutral-200 text-xs text-neutral-500">
                        <th className="py-3.5 px-4 font-medium">Creative Batch</th>
                        <th className="py-3.5 px-4 font-medium">Format</th>
                        <th className="py-3.5 px-4 font-medium text-right">30d Spend</th>
                        <th className="py-3.5 px-4 font-medium text-right">ROAS</th>
                        <th className="py-3.5 px-4 font-medium text-right">Lifecycle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm">
                      {channel.campaigns.map((row) => (
                        <tr key={row.name} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-[#111216]">{row.name}</td>
                          <td className="py-3.5 px-4 text-neutral-600 font-mono text-xs">
                            {row.format}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-700">
                            {row.spend}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[#111216]">
                            {row.roas}
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs font-medium text-[#2563EB]">
                            {row.state}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
