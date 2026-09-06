import Reveal from './Reveal';
import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: 'center' | 'left';
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <Reveal className={`mb-14 flex flex-col gap-4 ${alignCls}`}>
      <span className="badge-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl leading-[1.12] tracking-tight text-navy-900 text-balance sm:text-4xl md:text-[2.75rem] dark:text-white">
        {title}
      </h2>
      {sub ? (
        <p className={`max-w-2xl text-base leading-relaxed text-navy-600 dark:text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
