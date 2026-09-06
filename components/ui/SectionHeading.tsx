import Reveal from './Reveal';
import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: 'center' | 'left';
  index?: string;
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <Reveal className={`mb-14 flex flex-col gap-4 ${alignCls}`}>
      <div className="flex items-center gap-3">
        {index && (
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-navy-400 dark:text-slate-500">
            /{index}
          </span>
        )}
        <span className="badge-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl leading-[1.12] tracking-tight text-navy-900 text-balance sm:text-4xl md:text-[2.75rem] dark:text-white">
        {title}
      </h2>
      {sub ? (
        <p className={`max-w-2xl text-[15px] font-medium leading-relaxed text-navy-600 dark:text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
