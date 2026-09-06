const WORDS = [
  'ENTRAIDE',
  'RIGUEUR',
  'EXCELLENCE',
  'INNOVATION',
  'SOLIDARITÉ',
  'AMBITION',
  'BIENVEILLANCE',
  'TRANSPARENCE',
];

export default function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={`${key}-${w}`} className="flex items-center">
          <span className="font-display px-6 text-sm tracking-[0.35em] text-navy-500/70 dark:text-navy-200/50">
            {w}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-500/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-navy-900/10 bg-white/60 py-4 backdrop-blur dark:border-white/10 dark:bg-navy-900/40">
      <div className="flex w-max animate-marquee">
        {row('a')}
        {row('b')}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-navy-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-navy-950" />
    </div>
  );
}
