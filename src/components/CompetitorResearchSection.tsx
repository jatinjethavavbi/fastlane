import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, ArrowUpRight } from 'lucide-react';
import { COMPETITOR_RADAR } from '../data/veloxData';
import { SplitTextReveal } from './SplitTextReveal';

export function CompetitorResearchSection() {
  const [selectedId, setSelectedId] = useState(COMPETITOR_RADAR[0].id);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({
    [COMPETITOR_RADAR[0].id]: true,
  });

  const activeComp =
    COMPETITOR_RADAR.find((c) => c.id === selectedId) || COMPETITOR_RADAR[0];

  const isCounterRevealed = Boolean(revealedIds[activeComp.id]);

  const handleSynthesize = () => {
    setRevealedIds((prev) => ({ ...prev, [activeComp.id]: true }));
  };

  return (
    <section
      id="competitor-research"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-tight">
              02. Competitor Research Demonstration
            </p>
            <SplitTextReveal
              as="h2"
              mode="words"
              text="Spot category creative saturation before you buy impressions."
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
            />
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Inspect active competitor ad libraries, isolate overused hooks driving up CPMs, and
              synthesize uncontested angles tailored to your product.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Competitor Selector Table / List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {COMPETITOR_RADAR.map((comp) => {
              const isActive = comp.id === activeComp.id;
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedId(comp.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#111216] text-white border-[#111216]'
                      : 'bg-[#FAFAFA] text-[#111216] border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-lg font-semibold tracking-tight">
                      {comp.name}
                    </span>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {comp.activeAdsCount} Active Ads
                    </span>
                  </div>
                  <div
                    className={`mt-2 flex items-center gap-2 text-xs ${
                      isActive ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    <span>{comp.dominantFormat}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        comp.saturationScore === 'High Saturation'
                          ? isActive
                            ? 'text-amber-300'
                            : 'text-amber-700'
                          : isActive
                          ? 'text-blue-300'
                          : 'text-[#2563EB]'
                      }
                    >
                      {comp.saturationScore}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Radar Breakdown & Counter-Angle Panel */}
          <div className="lg:col-span-7 bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComp.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-200">
                  <div>
                    <p className="text-xs text-neutral-500">Monitored Competitor Library</p>
                    <h3 className="font-display text-2xl font-bold text-[#111216] tracking-tight mt-0.5">
                      {activeComp.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Observed Format Distribution</p>
                    <p className="font-mono text-xs tabular-nums text-[#111216] mt-1">
                      Video {activeComp.creativeMix.creatorVideo}% · Static{' '}
                      {activeComp.creativeMix.staticEditorial}% · Split{' '}
                      {activeComp.creativeMix.comparison}%
                    </p>
                  </div>
                </div>

                {/* Format Mix Bar */}
                <div>
                  <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-neutral-200">
                    <div
                      style={{ width: `${activeComp.creativeMix.creatorVideo}%` }}
                      className="bg-[#111216] transition-all duration-500"
                      title="Creator Video"
                    />
                    <div
                      style={{ width: `${activeComp.creativeMix.staticEditorial}%` }}
                      className="bg-[#2563EB] transition-all duration-500"
                      title="Static Editorial"
                    />
                    <div
                      style={{ width: `${activeComp.creativeMix.comparison}%` }}
                      className="bg-neutral-400 transition-all duration-500"
                      title="Comparison"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-5 text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#111216]" /> Creator Video
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" /> Static Editorial
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-neutral-400" /> Comparison Split
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200">
                  <p className="text-xs font-medium text-neutral-500">Most Overused Category Hook</p>
                  <p className="mt-1.5 text-sm sm:text-base font-medium text-[#111216]">
                    {activeComp.overusedHook}
                  </p>
                </div>

                {/* Counter-Angle Synthesis */}
                <div className="pt-2">
                  {!isCounterRevealed ? (
                    <button
                      type="button"
                      onClick={handleSynthesize}
                      className="w-full py-3.5 px-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Synthesize Uncontested Counter-Angle</span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="p-5 rounded-xl bg-white border border-[#2563EB]/30"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#2563EB]">
                          Kestrel Counter-Angle Recommendation
                        </span>
                        <span className="font-mono text-xs text-emerald-700 inline-flex items-center gap-1">
                          {activeComp.expectedLift}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-lg font-semibold text-[#111216]">
                        {activeComp.counterAngleTitle}
                      </h4>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                        {activeComp.counterAngleScript}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
