export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="group flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-[0_0_10px_rgba(245,165,36,0.35)] transition-transform duration-500 group-hover:rotate-[8deg]">
          <polygon
            points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
            fill="none"
            stroke="#F5A524"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M17 32 V16 h7 a5 5 0 0 1 0 10 h-7 M24 26 l7 6"
            fill="none"
            stroke="currentColor"
            className="text-navy-800 dark:text-white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="33" cy="20" r="1.8" fill="#F5A524" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-[0.22em] text-navy-900 dark:text-white">
            RÉUSSIR
          </span>
          <span className="text-gradient-gold text-[15px] font-bold tracking-[0.22em]">
            POLYTECH
          </span>
        </span>
      )}
    </span>
  );
}
