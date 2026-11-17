import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shuffle, RotateCcw } from 'lucide-react';
import { BLITZ_QUEUE_ITEMS } from '../data/veloxData';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './SplitTextReveal';

type AspectMode = '9:16' | '4:5' | '1:1';

export function AdCreationShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remixIndexMap, setRemixIndexMap] = useState<Record<string, number>>({});
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'skipped'>>({});
  const [aspectMode, setAspectMode] = useState<AspectMode>('4:5');

  const activeItem = BLITZ_QUEUE_ITEMS[currentIndex];
  const remixStep = remixIndexMap[activeItem.id] || 0;

  const displayedHook =
    remixStep === 0
      ? activeItem.hook
      : activeItem.remixOptions[(remixStep - 1) % activeItem.remixOptions.length].hook;

  const displayedVisual =
    remixStep === 0
      ? activeItem.visualDirection
      : activeItem.remixOptions[(remixStep - 1) % activeItem.remixOptions.length].visualDirection;

  const approvedCount = Object.values(decisions).filter((d) => d === 'approved').length;

  const handleDecision = (status: 'approved' | 'skipped') => {
    setDecisions((prev) => ({ ...prev, [activeItem.id]: status }));
    setCurrentIndex((prev) => (prev + 1) % BLITZ_QUEUE_ITEMS.length);
  };

  const handleRemix = () => {
    setRemixIndexMap((prev) => ({
      ...prev,
      [activeItem.id]: ((prev[activeItem.id] || 0) + 1) % (activeItem.remixOptions.length + 1),
    }));
  };

  const handleResetQueue = () => {
    setDecisions({});
    setRemixIndexMap({});
    setCurrentIndex(0);
  };

  const aspectClass =
    aspectMode === '9:16'
      ? 'aspect-[9/14] max-w-[300px]'
      : aspectMode === '1:1'
      ? 'aspect-square max-w-[360px]'
      : 'aspect-[4/5] max-w-[340px]';

  return (
    <section
      id="ad-showcase"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAFA] border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-tight">
              03. AI Advertisement Creation Showcase
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="Approve, remix, or skip entire ad batches in seconds."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
            />
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Every variation enters the Blitz review queue with matched hook copy, art direction, and
              placement aspect ratios. Keep only the concepts worth testing.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-neutral-600">
            <span>
              Queue {currentIndex + 1} / {BLITZ_QUEUE_ITEMS.length}
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-[#111216] font-medium">{approvedCount} Approved</span>
            {Object.keys(decisions).length > 0 && (
              <button
                type="button"
                onClick={handleResetQueue}
                className="inline-flex items-center gap-1 text-[#2563EB] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Interactive Ad Preview Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Aspect Ratio Selector */}
            <div className="mb-5 inline-flex items-center gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-lg">
              {(['9:16', '4:5', '1:1'] as AspectMode[]).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectMode(ratio)}
                  className={`px-3 py-1.5 font-mono text-xs rounded-md transition-colors cursor-pointer ${
                    aspectMode === ratio
                      ? 'bg-white text-[#111216] shadow-xs font-medium'
                      : 'text-neutral-600 hover:text-[#111216]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem.id}-${remixStep}`}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm transition-all duration-300`}
                >
                  <ResilientImage
                    src={activeItem.image}
                    alt={activeItem.alt}
                    fallbackTitle={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />

                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[11px] font-mono text-white/85">
                    <span>{activeItem.format}</span>
                    <span>{aspectMode}</span>
                  </div>

                  <div className="absolute bottom-5 inset-x-5 text-white">
                    <p className="font-display text-lg sm:text-xl font-bold leading-snug">
                      “{displayedHook}”
                    </p>
                    <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-md bg-white text-[#111216] text-xs font-semibold">
                      {activeItem.ctaLabel}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Creative Direction & Queue Controls */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <p className="text-xs text-neutral-500">{activeItem.channel}</p>
                <h3 className="font-display text-2xl font-bold text-[#111216] tracking-tight mt-0.5">
                  {activeItem.title}
                </h3>
              </div>
              {decisions[activeItem.id] && (
                <span
                  className={`text-xs font-mono font-medium ${
                    decisions[activeItem.id] === 'approved' ? 'text-emerald-700' : 'text-neutral-500'
                  }`}
                >
                  {decisions[activeItem.id] === 'approved' ? 'Approved for Export' : 'Skipped'}
                </span>
              )}
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-500">Opening Hook Script</h4>
              <p className="mt-1.5 text-base font-medium text-[#111216] leading-relaxed">
                “{displayedHook}”
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-500">Primary Ad Copy</h4>
              <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{activeItem.bodyCopy}</p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-500">Art & Camera Direction</h4>
              <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">{displayedVisual}</p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDecision('skipped')}
                className="py-3 px-4 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <X className="w-4 h-4" />
                <span>Skip</span>
              </button>

              <button
                type="button"
                onClick={handleRemix}
                className="py-3 px-4 border border-neutral-200 hover:border-[#2563EB] bg-white text-[#111216] hover:text-[#2563EB] text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Shuffle className="w-4 h-4" />
                <span>Remix Hook</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('approved')}
                className="py-3 px-4 bg-[#111216] hover:bg-[#2563EB] text-white text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </button>
            </div>

            {/* Quick Queue Index Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {BLITZ_QUEUE_ITEMS.map((item, idx) => {
                const status = decisions[item.id];
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'border-[#111216] bg-[#111216] text-white'
                        : status === 'approved'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-[#111216]'
                    }`}
                  >
                    0{idx + 1}. {item.title.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
