import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  priority = false,
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 text-neutral-500 p-6 text-center ${className}`}
      >
        <ImageIcon className="w-7 h-7 mb-2 text-neutral-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-neutral-600 max-w-[18ch] leading-snug">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
