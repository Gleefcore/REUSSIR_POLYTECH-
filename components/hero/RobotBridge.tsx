'use client';

import { motion } from 'framer-motion';

/**
 * Illustration animée : deux bras robotiques assemblent un pont en modules.
 * Style « plan technique lumineux », ambre sur bleu nuit.
 */
export default function RobotBridge({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 760 300" fill="none" className={className} aria-hidden>
      {/* grille technique */}
      <g stroke="currentColor" strokeWidth="0.6" className="text-navy-400/20 dark:text-navy-300/15">
        {[40, 90, 140, 190, 240].map((y) => (
          <line key={y} x1="0" y1={y} x2="760" y2={y} />
        ))}
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="300" />
        ))}
      </g>

      {/* socle */}
      <rect x="60" y="196" width="640" height="8" rx="2" className="fill-navy-700/40 dark:fill-navy-400/25" />

      {/* tour gauche */}
      <g className="fill-navy-700/30 text-navy-600/50 dark:fill-navy-300/20 dark:text-navy-200/40" stroke="currentColor" strokeWidth="1.2">
        <rect x="70" y="120" width="54" height="76" rx="3" />
        <line x1="70" y1="145" x2="124" y2="145" />
        <line x1="70" y1="170" x2="124" y2="170" />
      </g>
      <circle cx="97" cy="108" r="7" className="fill-gold-500/80" />
      <circle cx="97" cy="108" r="11" stroke="#F5A524" strokeWidth="1" opacity="0.4" className="animate-pulse-glow" />

      {/* tour droite */}
      <g className="fill-navy-700/30 text-navy-600/50 dark:fill-navy-300/20 dark:text-navy-200/40" stroke="currentColor" strokeWidth="1.2">
        <rect x="636" y="120" width="54" height="76" rx="3" />
        <line x1="636" y1="145" x2="690" y2="145" />
        <line x1="636" y1="170" x2="690" y2="170" />
      </g>
      <circle cx="663" cy="108" r="7" className="fill-gold-500/80" />
      <circle cx="663" cy="108" r="11" stroke="#F5A524" strokeWidth="1" opacity="0.4" className="animate-pulse-glow" />

      {/* pont : modules posés */}
      <g stroke="#F5A524" strokeWidth="1.4">
        <rect x="180" y="182" width="110" height="14" rx="2" className="fill-gold-500/25" />
        <rect x="470" y="182" width="110" height="14" rx="2" className="fill-gold-500/25" />
      </g>

      {/* chemin d'assemblage */}
      <line
        x1="150"
        y1="176"
        x2="610"
        y2="176"
        stroke="#F5A524"
        strokeWidth="1"
        strokeDasharray="5 9"
        opacity="0.55"
        className="animate-[circuit-flow_2.4s_linear_infinite]"
      />

      {/* module mobile gauche */}
      <motion.g
        animate={{ x: [0, 105, 0, 0], y: [0, -16, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
      >
        <rect x="150" y="182" width="58" height="14" rx="2" className="fill-gold-500/60" stroke="#FFD285" strokeWidth="1.2" />
      </motion.g>

      {/* module mobile droite */}
      <motion.g
        animate={{ x: [0, -105, 0, 0], y: [0, -16, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
      >
        <rect x="552" y="182" width="58" height="14" rx="2" className="fill-gold-500/60" stroke="#FFD285" strokeWidth="1.2" />
      </motion.g>

      {/* bras robotique gauche */}
      <g className="text-navy-700 dark:text-navy-200/60">
        <rect x="238" y="216" width="44" height="26" rx="4" className="fill-navy-700/40 dark:fill-navy-400/25" stroke="currentColor" strokeWidth="1.2" />
        <motion.g
          animate={{ rotate: [0, -7, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
          style={{ originX: '260px', originY: '216px' }}
        >
          <line x1="260" y1="216" x2="238" y2="140" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="238" cy="140" r="6.5" className="fill-navy-800 dark:fill-navy-900" stroke="#F5A524" strokeWidth="1.4" />
          <motion.line
            x1="238"
            y1="140"
            x2="222"
            y2="176"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ y2: [176, 160, 160, 176] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
          />
          <circle cx="222" cy="182" r="3.4" className="fill-gold-500 animate-pulse-glow" />
        </motion.g>
      </g>

      {/* bras robotique droit */}
      <g className="text-navy-700 dark:text-navy-200/60">
        <rect x="478" y="216" width="44" height="26" rx="4" className="fill-navy-700/40 dark:fill-navy-400/25" stroke="currentColor" strokeWidth="1.2" />
        <motion.g
          animate={{ rotate: [0, 7, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
          style={{ originX: '500px', originY: '216px' }}
        >
          <line x1="500" y1="216" x2="522" y2="140" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="522" cy="140" r="6.5" className="fill-navy-800 dark:fill-navy-900" stroke="#F5A524" strokeWidth="1.4" />
          <motion.line
            x1="522"
            y1="140"
            x2="538"
            y2="176"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ y2: [176, 160, 160, 176] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
          />
          <circle cx="538" cy="182" r="3.4" className="fill-gold-500 animate-pulse-glow" />
        </motion.g>
      </g>

      {/* étincelles d'assemblage */}
      <motion.g
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeOut', times: [0, 0.35, 0.6], delay: 2.4 }}
        style={{ originX: '380px', originY: '170px' }}
      >
        <circle cx="380" cy="170" r="10" stroke="#FFD285" strokeWidth="1.4" opacity="0.9" />
        <circle cx="380" cy="170" r="18" stroke="#FFD285" strokeWidth="1" opacity="0.45" />
      </motion.g>

      {/* annotations */}
      <g className="font-mono">
        <text x="70" y="28" className="fill-gold-600/70 dark:fill-gold-400/60" fontSize="11" letterSpacing="2">
          MODULE D’ASSEMBLAGE — SECTEUR 07
        </text>
        <text x="596" y="28" className="fill-navy-500/60 dark:fill-slate-400/50" fontSize="10" letterSpacing="1">
          RP-ASSEMBLY v2.6
        </text>
      </g>
    </svg>
  );
}
