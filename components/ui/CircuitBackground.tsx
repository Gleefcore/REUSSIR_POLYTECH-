export default function CircuitBackground({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 520 360"
      fill="none"
      className={`circuit pointer-events-none absolute text-navy-500/25 dark:text-gold-400/20 ${
        flip ? '-scale-x-100' : ''
      } ${className}`}
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M0 60 H120 L160 100 H270 L310 60 H420 L460 100 H520" />
        <path d="M0 180 H70 L110 140 H240 L280 180 H390 L430 220 H520" />
        <path d="M0 300 H140 L180 260 H330 L370 300 H520" />
        <path d="M160 100 V220 L200 260" />
        <path d="M280 180 V100" />
        <path d="M370 300 V220" />
      </g>
      <g fill="currentColor">
        <circle className="circuit-node" cx="120" cy="60" r="3.5" />
        <circle className="circuit-node" cx="270" cy="100" r="3.5" style={{ animationDelay: '0.5s' }} />
        <circle className="circuit-node" cx="70" cy="180" r="3.5" style={{ animationDelay: '1s' }} />
        <circle className="circuit-node" cx="240" cy="140" r="3.5" style={{ animationDelay: '1.5s' }} />
        <circle className="circuit-node" cx="140" cy="300" r="3.5" style={{ animationDelay: '0.8s' }} />
        <circle className="circuit-node" cx="330" cy="260" r="3.5" style={{ animationDelay: '2s' }} />
        <circle className="circuit-node" cx="460" cy="100" r="3.5" style={{ animationDelay: '1.2s' }} />
        <circle className="circuit-node" cx="390" cy="220" r="3.5" style={{ animationDelay: '0.3s' }} />
      </g>
    </svg>
  );
}
