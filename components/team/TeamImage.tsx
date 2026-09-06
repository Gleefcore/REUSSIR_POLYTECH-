'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Photo de membre avec repli élégant : si le portrait n'est pas encore
 * disponible, un monogramme premium prend sa place automatiquement.
 */
export default function TeamImage({
  src,
  name,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw',
  priority = false,
}: {
  src: string;
  name: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (failed) {
    return (
      <div className="relative h-full w-full bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <span className="font-display absolute inset-0 grid place-items-center text-5xl font-bold text-gold-500/70">
          {initials}
        </span>
        <span className="absolute bottom-3 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Portrait de ${name}`}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
    />
  );
}
