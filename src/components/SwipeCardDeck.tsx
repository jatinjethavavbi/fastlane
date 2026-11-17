'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { Heart, X, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

export interface DeckCardData {
  id: string;
  brand: string;
  format: string;
  hook: string;
  metric: string;
  image: string;
  badgeColor: string;
  rotOffset: number;
}

const DECK_CARDS: DeckCardData[] = [
  {
    id: 'deck-1',
    brand: 'AURA BOTANICALS',
    format: 'EDITORIAL MACRO STILL',
    hook: 'Why vitamin C oxidizes in clear dropper bottles before it reaches skin',
    metric: '4.2x ROAS · Meta Feed',
    image: '/images/ad_skincare_editorial_1794908395716.jpg',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rotOffset: -5,
  },
  {
    id: 'deck-2',
    brand: 'KESTREL ACOUSTICS',
    format: '3D HARDWARE SPEC SPLIT',
    hook: '42dB active isolation measured on commuter rail transit',
    metric: '3.9x ROAS · YouTube Shorts',
    image: '/images/ad_audio_hardware_1794908395903.jpg',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    rotOffset: 6,
  },
  {
    id: 'deck-3',
    brand: 'SOLSTICE ROASTERS',
    format: 'FOUNDER KITCHEN HOOK',
    hook: 'The 90-second pour-over swap that cut our morning $7 cafe spend',
    metric: '4.8x ROAS · TikTok Spark',
    image: '/images/case_study_roastery_1794908397891.jpg',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rotOffset: -3,
  },
  {
    id: 'deck-4',
    brand: 'VELOCITY ATHLETIC',
    format: 'CARBON PLATE FLEX TEST',
    hook: '198 grams on wet asphalt — zero heel slip through mile 400',
    metric: '5.1x ROAS · Instagram Reels',
    image: '/images/ad_athletic_runner_1794908396789.jpg',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    rotOffset: 4,
  },
  {
    id: 'deck-5',
    brand: 'LUMINA EYEWEAR',
    format: 'UGC STREET CREATOR HOOK',
    hook: 'I swapped my $250 designer sunglasses for these and nobody noticed',
    metric: '4.4x ROAS · TikTok Feed',
    image: '/images/ad_creator_lifestyle_1794908396875.jpg',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    rotOffset: -7,
  },
  {
    id: 'deck-6',
    brand: 'DAVID PROTEIN',
    format: 'GUERRILLA POSTER HOOK',
    hook: 'MISSING: MY SUGAR CRAVINGS — 28g Protein, 0g Sugar candy bar',
    metric: '4.6x ROAS · Meta Reels',
    image: '/images/case_study_roastery_1794908397891.jpg',
    badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
    rotOffset: 3,
  },
];

interface SwipeCardProps {
  card: DeckCardData;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (dir: 'left' | 'right') => void;
}

function SwipeCard({ card, isTop, stackIndex, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, card.rotOffset, 18]);
  const keepOpacity = useTransform(x, [20, 110], [0, 1]);
  const skipOpacity = useTransform(x, [-110, -20], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 90 || info.velocity.x > 450) {
      onSwipe('right');
    } else if (info.offset.x < -90 || info.velocity.x < -450) {
      onSwipe('left');
    }
  };

  if (!isTop) {
    // Underneath cards in 3D deck stack
    const scale = Math.max(0.85, 1 - stackIndex * 0.05);
    const yOffset = stackIndex * 10;

    return (
      <motion.div
        animate={{
          scale,
          y: yOffset,
          rotateZ: card.rotOffset,
          opacity: 1 - stackIndex * 0.18,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          zIndex: 10 - stackIndex,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 rounded-3xl overflow-hidden bg-[#10121C] border border-white/10 shadow-2xl pointer-events-none select-none"
      >
        <img
          src={card.image}
          alt={card.brand}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
    );
  }

  // Active top card
  return (
    <motion.div
      style={{
        x,
        rotateZ: rotate,
        zIndex: 20,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03 }}
      exit={{
        x: x.get() >= 0 ? 600 : -600,
        rotateZ: x.get() >= 0 ? 25 : -25,
        opacity: 0,
        transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
      }}
      className="absolute inset-0 rounded-3xl overflow-hidden bg-[#10121C] border-2 border-white/20 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
    >
      {/* Background Creative Image */}
      <img
        src={card.image}
        alt={card.brand}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none brightness-90"
      />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

      {/* KEEP Stamp (Right Swipe) */}
      <motion.div
        style={{ opacity: keepOpacity }}
        className="absolute top-5 left-5 px-3.5 py-1 rounded-xl border-[3px] border-emerald-400 bg-emerald-500/20 backdrop-blur-md -rotate-12 pointer-events-none z-30"
      >
        <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-emerald-400 uppercase">
          KEEP
        </span>
      </motion.div>

      {/* SKIP Stamp (Left Swipe) */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute top-5 right-5 px-3.5 py-1 rounded-xl border-[3px] border-rose-500 bg-rose-500/20 backdrop-blur-md rotate-12 pointer-events-none z-30"
      >
        <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-rose-500 uppercase">
          SKIP
        </span>
      </motion.div>

      {/* Top Card Meta */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${card.badgeColor}`}>
          {card.format}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
          {card.metric}
        </span>
      </div>

      {/* Bottom Ad Hook Text & Brand */}
      <div className="absolute bottom-5 inset-x-5 pointer-events-none z-10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
          {card.brand}
        </span>
        <p className="font-display text-base sm:text-lg font-bold text-white leading-snug drop-shadow-md">
          "{card.hook}"
        </p>
      </div>
    </motion.div>
  );
}

export function SwipeCardDeck({ onSelectAd }: { onSelectAd?: (card: DeckCardData) => void }) {
  const [deck, setDeck] = useState<DeckCardData[]>(DECK_CARDS);
  const [swipedCount, setSwipedCount] = useState(0);

  const triggerSwipe = (dir: 'left' | 'right') => {
    if (deck.length === 0) return;
    const topCard = deck[0];
    if (dir === 'right' && onSelectAd) {
      onSelectAd(topCard);
    }
    setDeck((prev) => prev.slice(1));
    setSwipedCount((prev) => prev + 1);

    // Auto-reset when all cards are swiped
    if (deck.length <= 1) {
      setTimeout(() => {
        setDeck(DECK_CARDS);
        setSwipedCount(0);
      }, 500);
    }
  };

  const resetDeck = () => {
    setDeck(DECK_CARDS);
    setSwipedCount(0);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Perspective Deck Container */}
      <div
        className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[410px] sm:h-[460px] md:h-[480px]"
        style={{ perspective: 1500 }}
      >
        {/* Luminous Glow Behind Deck */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[48px] blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.4) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 70%)',
          }}
        />

        {/* Stack of Cards */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="popLayout">
            {deck.slice(0, 3).map((card, i) => (
              <SwipeCard
                key={card.id}
                card={card}
                isTop={i === 0}
                stackIndex={i}
                onSwipe={triggerSwipe}
              />
            ))}
          </AnimatePresence>

          {/* Empty / Reset State */}
          {deck.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-3xl bg-[#0F111A] border border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-2xl"
            >
              <Sparkles className="w-8 h-8 text-sky-400 mb-3 animate-pulse" />
              <h4 className="font-display text-lg font-bold text-white">Batch Reviewed</h4>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                Reshuffling fresh winning formats...
              </p>
              <button
                type="button"
                onClick={resetDeck}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Deck</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Swipe Controls & Interactive Hints */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => triggerSwipe('left')}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-xs font-semibold text-neutral-400 hover:text-rose-400 transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>

          <span className="text-[11px] font-mono text-neutral-500">
            · Drag card or flick left / right ·
          </span>

          <button
            type="button"
            onClick={() => triggerSwipe('right')}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Keep</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-neutral-500">
          Showing format {swipedCount + 1} of {DECK_CARDS.length}
        </span>
      </div>
    </div>
  );
}

