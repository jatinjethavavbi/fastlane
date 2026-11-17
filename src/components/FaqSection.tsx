import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/veloxData';
import { SplitTextReveal } from './SplitTextReveal';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAFA] border-b border-neutral-200/80"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-medium text-[#2563EB] tracking-tight">
            Frequently Asked Questions
          </p>
          <SplitTextReveal
            as="h2"
            mode="words"
            text="Clear answers on credits, brand safety, and ad exports."
            className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111216] leading-[1.1]"
          />
        </div>

        <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="py-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 text-left flex items-center justify-between gap-6 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md"
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[#111216] group-hover:text-[#2563EB] transition-colors">
                    {item.q}
                  </span>
                  <span className="w-8 h-8 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
