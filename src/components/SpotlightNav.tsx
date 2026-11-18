'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Home,
  Layers,
  PlusCircle,
  CreditCard,
  User,
  Bell,
  LucideIcon,
} from 'lucide-react';

const EASE_OUT_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SpotlightNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  hasNotification?: boolean;
}

export interface SpotlightNavProps {
  items?: SpotlightNavItem[];
  activeId?: string;
  variant?: 'dark' | 'light';
  onChange?: (id: string, item: SpotlightNavItem) => void;
  className?: string;
}

// 5 Mobile Bottom Dock items: Home, Showcase, Create, Account, Alerts
export const DEFAULT_NAV_ITEMS: SpotlightNavItem[] = [
  { id: 'home', label: 'HOME', icon: Home, href: '#home' },
  { id: 'showcase', label: 'SHOWCASE', icon: Layers, href: '#showcase' },
  { id: 'create', label: 'CREATE', icon: PlusCircle, href: '#create' },
  { id: 'account', label: 'ACCOUNT', icon: User, href: '#pricing' },
  { id: 'alerts', label: 'ALERTS', icon: Bell, href: '#contact', hasNotification: true },
];

export function SpotlightNav({
  items = DEFAULT_NAV_ITEMS,
  activeId: controlledActiveId,
  variant = 'light',
  onChange,
  className = '',
}: SpotlightNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  // Internal active state fallback
  const [internalActiveId, setInternalActiveId] = useState<string>(() => {
    if (controlledActiveId) return controlledActiveId;
    const match = items.find((it) => it.href === pathname);
    return match ? match.id : items[0]?.id || 'home';
  });

  const activeId = controlledActiveId ?? internalActiveId;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Magnetic hover offset per button: { x: number, y: number }
  const [magneticOffset, setMagneticOffset] = useState<{ [key: string]: { x: number; y: number } }>({});

  // Haptic-style tactile click bounce keyframe trigger
  const [clickedId, setClickedId] = useState<string | null>(null);

  // Auto-hide on scroll down, reappear on scroll up (slide 80px down with opacity)
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Flag to temporarily mute IntersectionObserver during programmatic smooth scrolling
  const isManualScrollingRef = useRef(false);

  // Keyboard navigation ref list
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isLight = variant === 'light';

  // --------------------------------------------------------------------------
  // 1. INTERSECTION OBSERVER: Automatically track sections in view
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Collect all section element IDs from items
    const sectionIds = items
      .map((it) => (it.href.startsWith('#') ? it.href.slice(1) : null))
      .filter((id): id is string => Boolean(id));

    if (sectionIds.length === 0) return;

    // Map section elements
    const elements: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    });

    if (elements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScrollingRef.current) return;

      // Find visible elements with intersection
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the entry closest to top/center or largest intersection ratio
        const bestEntry = visibleEntries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        const targetId = bestEntry.target.id;
        const matchedItem = items.find((it) => it.href === `#${targetId}`);
        if (matchedItem && matchedItem.id !== activeId) {
          if (controlledActiveId === undefined) {
            setInternalActiveId(matchedItem.id);
          }
          onChange?.(matchedItem.id, matchedItem);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: [0.15, 0.4, 0.7],
    });

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [items, activeId, controlledActiveId, onChange]);

  // --------------------------------------------------------------------------
  // 2. SCROLL DETECTION: Hide on scroll down, reappear on scroll up
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDiff = currentScrollY - lastScrollY;

      // Always show near the very top of the page
      if (currentScrollY < 60) {
        setIsNavVisible(true);
      } else if (scrollDiff > 8 && currentScrollY > 100) {
        // Scrolling down -> hide (slide 80px down)
        setIsNavVisible(false);
      } else if (scrollDiff < -6) {
        // Scrolling up -> reappear
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --------------------------------------------------------------------------
  // 3. ITEM SELECTION & SMOOTH SCROLL WITH OFFSET
  // --------------------------------------------------------------------------
  const handleSelect = useCallback(
    (item: SpotlightNavItem) => {
      // Trigger subtle haptic bounce
      setClickedId(item.id);
      setTimeout(() => setClickedId(null), 360);

      if (controlledActiveId === undefined) {
        setInternalActiveId(item.id);
      }
      onChange?.(item.id, item);

      // Handle smooth scrolling if anchor
      if (item.href.startsWith('#')) {
        isManualScrollingRef.current = true;
        const targetId = item.href.slice(1);
        const targetElement = document.getElementById(targetId) || document.querySelector(item.href);

        if (targetElement) {
          const topOffset = 84; // Clearance for top navigation
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - topOffset);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // Re-enable observer after smooth scroll completes
        setTimeout(() => {
          isManualScrollingRef.current = false;
        }, 850);
      }
    },
    [controlledActiveId, onChange]
  );

  // --------------------------------------------------------------------------
  // 4. MAGNETIC HOVER HANDLERS (Follow cursor up to 4px)
  // --------------------------------------------------------------------------
  const handleMagneticMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemId: string
  ) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);

    const maxOffset = 4; // up to 4px
    setMagneticOffset((prev) => ({
      ...prev,
      [itemId]: {
        x: Math.max(-maxOffset, Math.min(maxOffset, relX * maxOffset)),
        y: Math.max(-maxOffset, Math.min(maxOffset, relY * maxOffset)),
      },
    }));
  };

  const handleMagneticMouseLeave = (itemId: string) => {
    setHoveredId(null);
    setMagneticOffset((prev) => ({
      ...prev,
      [itemId]: { x: 0, y: 0 },
    }));
  };

  // Keyboard Arrow navigation (ArrowLeft / ArrowRight / Home / End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== index) {
      const target = items[nextIndex];
      handleSelect(target);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <nav
      aria-label="Primary"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[360px] pb-[env(safe-area-inset-bottom,0px)] pointer-events-auto select-none md:hidden ${className}`}
    >
      {/* Outer Floating Bar Container with Entrance & Hide/Show Slide-Down Animation */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={
          shouldReduceMotion
            ? { opacity: isNavVisible ? 1 : 0 }
            : {
                opacity: isNavVisible ? 1 : 0,
                y: isNavVisible ? 0 : 80,
              }
        }
        transition={{ duration: 0.35, ease: EASE_OUT_CUBIC }}
        onMouseLeave={() => setHoveredId(null)}
        className={`relative w-full h-[64px] rounded-[28px] px-2.5 flex items-center justify-between transition-colors duration-300 ${
          isLight
            ? 'bg-white/70 backdrop-blur-[16px] border border-[rgba(10,127,90,0.12)] shadow-[0_18px_40px_rgba(10,127,90,0.12),0_6px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]'
            : 'bg-gradient-to-b from-[#222120] to-[#151413] border border-white/[0.06] shadow-[0_18px_40px_rgba(10,127,90,0.18),0_6px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md'
        }`}
      >
        {/* 1. FAINT FILM-GRAIN OVERLAY (3% Opacity) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[28px] opacity-[0.03] z-0 overflow-hidden ${
            isLight ? 'mix-blend-multiply' : 'mix-blend-overlay'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isClicked = clickedId === item.id;
          const Icon = item.icon;
          const itemMagnetic = magneticOffset[item.id] || { x: 0, y: 0 };

          // Show notification dot on Bell icon or if explicitly configured
          const hasBellNotification =
            item.hasNotification ??
            (item.icon === Bell || item.id === 'contact' || item.id === 'alerts');

          return (
            <div
              key={item.id}
              className="relative flex-1 flex items-center justify-center h-full z-10"
            >
              {/* Tooltip Label Pill on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: EASE_OUT_CUBIC }}
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-40 whitespace-nowrap px-2.5 py-1 rounded-full border shadow-sm ${
                      isLight
                        ? 'bg-white/95 border-[rgba(10,127,90,0.18)] shadow-[0_4px_16px_rgba(10,127,90,0.12)] text-[#0a7f5a]'
                        : 'bg-[#151413] border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-[#FAFCFB]'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase leading-none">
                      {item.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVE SPOTLIGHT EFFECT: Shared layoutId Element */}
              {isActive && (
                <motion.div
                  layoutId="spotlight"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex flex-col items-center justify-start z-10"
                >
                  {/* Top Emerald Gradient Bar (28px wide, 3px tall, rounded bottom corners) */}
                  <div
                    className={`w-[28px] h-[3px] rounded-b-[3px] bg-gradient-to-r from-[#0a7f5a] to-[#34d399] ${
                      isLight
                        ? 'shadow-[0_1px_8px_rgba(10,127,90,0.45)]'
                        : 'shadow-[0_1px_8px_rgba(52,211,153,0.85)]'
                    }`}
                  />

                  {/* Light Cone Trapezoid with Breathing Pulse */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            opacity: isLight ? [0.85, 1, 0.85] : [0.85, 1, 0.85],
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)',
                      background: isLight
                        ? 'linear-gradient(to bottom, rgba(10, 127, 90, 0.35) 0%, rgba(52, 211, 153, 0.12) 60%, transparent 100%)'
                        : 'linear-gradient(to bottom, rgba(52, 211, 153, 0.45) 0%, rgba(52, 211, 153, 0.12) 60%, transparent 100%)',
                      mixBlendMode: isLight ? 'normal' : 'screen',
                    }}
                    className="w-[56px] h-[52px] -mt-[1px] blur-[3px]"
                  />

                  {/* Soft Radial Glow behind the active icon */}
                  <div
                    style={{
                      background: isLight
                        ? 'radial-gradient(circle, rgba(10, 127, 90, 0.22) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(52, 211, 153, 0.28) 0%, transparent 70%)',
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full blur-[4px] pointer-events-none"
                  />
                </motion.div>
              )}

              {/* FAINT HOVER PREVIEW CONE when hovering an inactive item */}
              {isHovered && !isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLight ? 0.25 : 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex flex-col items-center justify-start z-10"
                >
                  <div className="w-[24px] h-[2px] rounded-b-[2px] bg-gradient-to-r from-[#0a7f5a] to-[#34d399]" />
                  <div
                    style={{
                      clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)',
                      background: isLight
                        ? 'linear-gradient(to bottom, rgba(10, 127, 90, 0.25) 0%, transparent 100%)'
                        : 'linear-gradient(to bottom, rgba(52, 211, 153, 0.35) 0%, transparent 100%)',
                      mixBlendMode: isLight ? 'normal' : 'screen',
                    }}
                    className="w-[48px] h-[48px] blur-[2px]"
                  />
                </motion.div>
              )}

              {/* Navigation Link / Button */}
              <Link
                href={item.href}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                role="button"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    handleSelect(item);
                  } else {
                    handleSelect(item);
                  }
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseMove={(e) => handleMagneticMouseMove(e, item.id)}
                onMouseLeave={() => handleMagneticMouseLeave(item.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative z-20 min-w-[44px] min-h-[44px] w-full h-full flex items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] focus-visible:ring-offset-2 transition-all ${
                  isLight ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-[#1A1917]'
                }`}
              >
                {/* Icon Container with Magnetic Cursor Follow (up to 4px) & Haptic Bounce */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8 }
                  }
                  animate={{
                    opacity: 1,
                    // Magnetic offset combined with active 2px lift
                    x: shouldReduceMotion ? 0 : itemMagnetic.x,
                    y: shouldReduceMotion
                      ? 0
                      : (isActive || isHovered ? -2 : 0) + itemMagnetic.y,
                    // Haptic-style tactile "click" bounce keyframe on selection
                    scale: isClicked
                      ? [1, 0.88, 1.15, 0.97, 1]
                      : isActive
                      ? 1.08
                      : isHovered
                      ? 1.04
                      : 1,
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{
                    opacity: {
                      delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.05,
                      duration: 0.4,
                      ease: EASE_OUT_CUBIC,
                    },
                    x: { type: 'spring', stiffness: 350, damping: 20 },
                    y: { type: 'spring', stiffness: 350, damping: 20 },
                    scale: isClicked
                      ? { duration: 0.34, ease: EASE_OUT_CUBIC }
                      : { duration: 0.25, ease: EASE_OUT_CUBIC },
                  }}
                  className="relative flex items-center justify-center transition-colors duration-250"
                  style={{
                    color: isActive
                      ? isLight
                        ? '#0a7f5a'
                        : '#34d399'
                      : isHovered
                      ? isLight
                        ? '#111815'
                        : '#D8D5CC'
                      : isLight
                      ? '#5b6b64'
                      : '#8A857A',
                    filter: isActive
                      ? isLight
                        ? 'drop-shadow(0 0 8px rgba(10,127,90,0.45))'
                        : 'drop-shadow(0 0 8px rgba(52,211,153,0.7))'
                      : 'none',
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.6} />

                  {/* NOTIFICATION DOT ON BELL ICON (Emerald with Ping Animation) */}
                  {hasBellNotification && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 pointer-events-none">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981] border ${
                          isLight ? 'border-white' : 'border-[#1A1917]'
                        }`}
                      />
                    </span>
                  )}
                </motion.div>
              </Link>
            </div>
          );
        })}
      </motion.div>
    </nav>
  );
}
