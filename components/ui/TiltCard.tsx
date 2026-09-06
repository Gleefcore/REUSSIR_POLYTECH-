'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

export default function TiltCard({
  children,
  className = '',
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(950px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`,
    });
    setGlow({ x: (px + 0.5) * 100, y: (py + 0.5) * 100, o: 1 });
  };

  const onLeave = () => {
    setStyle({ transform: 'perspective(950px) rotateX(0deg) rotateY(0deg)' });
    setGlow((g) => ({ ...g, o: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ ...style, transition: 'transform 0.18s ease-out', willChange: 'transform' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(245,165,36,0.14), transparent 65%)`,
          opacity: glow.o,
          transition: 'opacity 0.35s ease',
        }}
      />
      {children}
    </div>
  );
}
