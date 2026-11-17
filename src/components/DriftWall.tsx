'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import './DriftWall.css';

export interface DriftWallItem {
  id?: string;
  image?: string;
  videoSrc?: string;
  poster?: string;
  title: string;
  format?: string;
  metric?: string;
  caption?: string;
  brand?: string;
  href?: string;
}

export interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onTileClick?: (item: DriftWallItem) => void;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

// Dedicated Autoplaying Video Component with Guaranteed DOM Muting
function DriftVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property assignment required by Chrome & Edge autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // Retry on first user gesture anywhere on window
          const handleGesture = () => {
            video.play().catch(() => {});
            window.removeEventListener('pointerdown', handleGesture);
            window.removeEventListener('scroll', handleGesture);
            window.removeEventListener('touchstart', handleGesture);
          };
          window.addEventListener('pointerdown', handleGesture, { once: true });
          window.addEventListener('scroll', handleGesture, { once: true });
          window.addEventListener('touchstart', handleGesture, { once: true });
        });
      }
    };

    playVideo();

    const onVisibilityChange = () => {
      if (!document.hidden) playVideo();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
    />
  );
}

export default function DriftWall({
  items,
  columns = 6,
  tileWidth = 295,
  tileHeight = 525,
  gap = 26,
  radius = 26,
  tilt = 14,
  turn = -12,
  roll = 0,
  perspective = 1400,
  depth = 130,
  speed = 68,
  direction = 'up',
  variance = 0.45,
  parallax = 0.65,
  pauseOnHover = false,
  lift = 88,
  fade = 0.55,
  dim = 0.88,
  grayscale = false,
  overlayColor = 'transparent',
  className = '',
  style,
  onTileClick,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState<number>(950);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const releaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => {
      cols[i % columns].push(item);
    });
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      // Exactly 2 copies is optimal for looping without overwhelming browser hardware decoders
      const copies = 2;
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 950);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => (meta.copyHeight * (c * 0.33)) % meta.copyHeight);
    velocitiesRef.current = columnItems.map((_, c) => baseVelocities[c] || speed);
  }, [columnMeta, columnItems, baseVelocities, speed]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.15) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTsRef.current) / 1000));
      lastTsRef.current = ts;

      // Smooth mouse parallax
      const maxTilt = parallax * 7;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.14);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      // Continuous, fluid slider drift across all columns
      if (!reduced) {
        for (let c = 0; c < columnItems.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;

          const isPaused = wallHoveredRef.current && pauseOnHover;
          const target = isPaused ? 0 : baseVelocities[c];

          const ease = 1 - Math.exp(-dt / 0.28);
          velocitiesRef.current[c] = (velocitiesRef.current[c] ?? baseVelocities[c]) + (target - (velocitiesRef.current[c] ?? baseVelocities[c])) * ease;

          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) {
            el.style.transform = `translate3d(0, ${-next}px, 0)`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, columnItems, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string) => {
    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
    if (activeIdRef.current !== id) {
      activeIdRef.current = id;
      setActiveId(id);
    }
  }, []);

  const release = useCallback(() => {
    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current);
    }
    releaseTimerRef.current = setTimeout(() => {
      activeIdRef.current = null;
      setActiveId(null);
      releaseTimerRef.current = null;
    }, 90);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () =>
      ({
        '--dw-tile-w': `${tileWidth}px`,
        '--dw-tile-h': `${tileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-perspective': `${perspective}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
        ...style,
      } as React.CSSProperties),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const isActive = activeId === id;
    const mediaSrc = item.videoSrc;

    const inner = (
      <span className="drift-wall__inner">
        <span className="drift-wall__media-wrap">
          {mediaSrc ? (
            <DriftVideo
              src={mediaSrc}
              poster={item.poster || item.image}
              className="drift-wall__media"
            />
          ) : (
            <img
              src={item.image || item.poster}
              alt={item.title ?? ''}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="drift-wall__media"
            />
          )}

          {/* Top Glass Badge Row: Scaled up for crystal readability */}
          <span className="pointer-events-none absolute top-4 inset-x-4 flex items-center justify-between z-10">
            {item.format && (
              <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white shadow-md border border-white/20">
                {item.format}
              </span>
            )}
            {item.metric && (
              <span className="px-2.5 py-1 rounded-full bg-[#00D084] backdrop-blur-md text-[10px] font-black text-neutral-950 flex items-center gap-1 shadow-md">
                <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                {item.metric}
              </span>
            )}
          </span>

          {/* Dynamic TikTok-style Caption Bubble at Bottom */}
          {item.caption && (
            <span className="pointer-events-none absolute bottom-4 inset-x-4 z-10 flex flex-col gap-2">
              <span className="inline-block bg-black/80 backdrop-blur-md text-white text-[13px] font-medium leading-snug rounded-2xl px-3.5 py-2.5 shadow-xl border border-white/15 line-clamp-2">
                &ldquo;{item.caption}&rdquo;
              </span>
              {item.brand && (
                <span className="text-[11px] font-bold text-white/95 drop-shadow-md flex items-center gap-1.5 pl-1">
                  <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084]" />
                  {item.brand}
                </span>
              )}
            </span>
          )}

          <span className="drift-wall__overlay" aria-hidden="true" />
        </span>
      </span>
    );

    const commonProps = {
      className: `drift-wall__tile${isActive ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onPointerEnter: () => activate(id),
      onPointerLeave: () => release(),
      onFocus: () => activate(id),
      onBlur: () => release(),
      onClick: () => onTileClick?.(item),
    };

    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }

    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="3D Drifting video format wall"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c)
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
