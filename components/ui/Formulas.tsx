const FORMULAS = [
  { t: '∮ E · dA = Q / ε₀', x: '6%', y: '14%', s: 13, d: 0 },
  { t: 'e^iπ + 1 = 0', x: '82%', y: '10%', s: 15, d: 1.2 },
  { t: '∂u/∂t = α ∇²u', x: '12%', y: '62%', s: 14, d: 2.1 },
  { t: 'ΔG = ΔH − TΔS', x: '78%', y: '58%', s: 13, d: 0.6 },
  { t: 'F = m·a', x: '46%', y: '8%', s: 12, d: 1.8 },
  { t: 'ζ(s) = Σ 1/nˢ', x: '8%', y: '84%', s: 13, d: 2.6 },
  { t: 'v = √(2·g·h)', x: '88%', y: '80%', s: 13, d: 0.9 },
  { t: '∫ e^(−x²) dx = √π', x: '60%', y: '88%', s: 12, d: 3.2 },
];

export default function Formulas({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {FORMULAS.map((f) => (
        <span
          key={f.t}
          className="font-display absolute select-none font-medium text-navy-600/[0.14] dark:text-gold-300/[0.13]"
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.s,
            animation: `float-slow ${9 + f.d}s ease-in-out ${f.d}s infinite`,
          }}
        >
          {f.t}
        </span>
      ))}
    </div>
  );
}
