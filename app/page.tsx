'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroScene from '@/components/hero/HeroScene';
import RobotBridge from '@/components/hero/RobotBridge';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import Counter from '@/components/ui/Counter';
import Formulas from '@/components/ui/Formulas';
import CircuitBackground from '@/components/ui/CircuitBackground';
import Icon from '@/components/ui/Icon';
import { levelResourceCount, levelUnitCount, MSP1, MSP2 } from '@/lib/data/units';

const VALUES = [
  {
    icon: 'handshake' as const,
    title: 'Solidarité',
    text: 'Personne ne réussit seul. Chaque progrès individuel devient un progrès collectif.',
  },
  {
    icon: 'target' as const,
    title: 'Rigueur',
    text: 'Des ressources vérifiées, des méthodes éprouvées, des standards que l’on peut mesurer.',
  },
  {
    icon: 'heart' as const,
    title: 'Bienveillance',
    text: 'Un environnement où oser poser une question et où l’erreur est un pas vers l’excellence.',
  },
  {
    icon: 'eye' as const,
    title: 'Transparence',
    text: 'Des processus clairs, des accès justes, une gouvernance ouverte aux membres.',
  },
];

const WHY = [
  {
    icon: 'book' as const,
    title: 'Ressources académiques',
    text: `${levelResourceCount(MSP1) + levelResourceCount(MSP2)}+ fiches de TD, épreuves et corrections structurées matière par matière, semestre par semestre.`,
  },
  {
    icon: 'award' as const,
    title: 'Préparation aux examens',
    text: 'Séances de révision encadrées, annales commentées et simulations de conditions réelles pour arriver serein le jour J.',
  },
  {
    icon: 'users' as const,
    title: 'Travail collectif',
    text: 'Groupes de travail, entraide par les pairs et entraînement aux projets d’équipe — le quotidien d’un vrai bureau d’études.',
  },
  {
    icon: 'rocket' as const,
    title: 'Développement personnel',
    text: 'Leadership, communication, entrepreneuriat : les soft skills qui transforment un bon ingénieur en leader.',
  },
];

export default function HomePage() {
  const totalResources = levelResourceCount(MSP1) + levelResourceCount(MSP2);
  const totalUnits = levelUnitCount(MSP1) + levelUnitCount(MSP2);
  const totalTD = [MSP1, MSP2].reduce(
    (acc, l) => acc + l.semesters.reduce((b, s) => b + s.units.reduce((c, u) => c + u.tdCount, 0), 0),
    0
  );

  return (
    <>
      {/* ═══════════════ HERO — CONSOLE D'INGÉNIEUR ═══════════════ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-50 via-white to-white dark:from-navy-950 dark:via-navy-950 dark:to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,black,transparent)]" aria-hidden />
        <HeroScene />
        <Formulas />

        {/* Recadrage technique (style vue CAD) */}
        <div className="pointer-events-none absolute inset-x-5 bottom-[56px] top-[88px] z-10 hidden lg:block" aria-hidden>
          <span className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold-500/60" />
          <span className="absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-gold-500/60" />
          <span className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-gold-500/60" />
          <span className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold-500/60" />
          <span className="font-mono absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-3 text-[10px] font-bold tracking-[0.35em] text-navy-400 dark:bg-navy-950 dark:text-slate-500">
            FIG. 01 — HOLOGRAMME STRUCTUREL
          </span>
          <span className="font-mono absolute left-0 top-1/2 origin-top-left -translate-y-1/2 -rotate-90 whitespace-nowrap pl-2 text-[10px] font-bold tracking-[0.3em] text-navy-400/80 dark:text-slate-500/80">
            GRID 46 PX // SECTEUR RP-01
          </span>
          <span className="font-mono absolute right-0 top-1/2 origin-top-right -translate-y-1/2 rotate-90 whitespace-nowrap pr-2 text-[10px] font-bold tracking-[0.3em] text-navy-400/80 dark:text-slate-500/80">
            σ = F/A · ΔG = ΔH − TΔS
          </span>
          <span className="font-mono absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-white px-3 text-[10px] font-bold tracking-[0.35em] text-navy-400 dark:bg-navy-950 dark:text-slate-500">
            RÉV 2.6 — BUREAU D'ÉTUDES RP
          </span>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-32 pt-10 text-center">
          {/* Badge : fait par des ingénieurs */}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass mb-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-gold-500/40 px-5 py-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-navy-800 dark:text-slate-200">
              Conçu &amp; développé par des ingénieurs
            </span>
            <span className="hidden h-3.5 w-px bg-navy-300/60 dark:bg-white/20 sm:block" aria-hidden />
            <span className="font-mono hidden text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 sm:inline">
              École Polytechnique
            </span>
          </motion.span>

          {/* Surtitre technique */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono mb-5 text-[11px] font-bold uppercase tracking-[0.45em] text-navy-500 dark:text-slate-400"
          >
            Collectif académique // MSP1 — MSP2
          </motion.p>

          {/* Logo hologramme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="holo-word animate-float"
          >
            <h1 className="font-sans text-[clamp(3.8rem,13vw,9.5rem)] font-black leading-[0.88] tracking-[-0.05em]">
              <span className="block text-navy-950 text-3d-navy dark:text-white">RÉUSSIR</span>
              <span className="text-gradient-gold block">POLYTECH</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-3xl text-xl font-bold leading-snug text-navy-900 sm:text-2xl dark:text-white"
          >
            « Réussir ensemble, <span className="text-gradient-gold">construire l’excellence</span>. »
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-navy-600 dark:text-slate-400"
          >
            Un collectif d’étudiants ingénieurs de l’École Polytechnique qui transforme
            l’apprentissage individuel en réussite collective — ressources, entraide,
            rigueur et ambition partagée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/msp1" className="btn-gold !px-8 !py-4 !text-[15px]">
              Explorer les ressources
              <Icon name="arrow-right" className="h-4.5 w-4.5" />
            </Link>
            <Link href="/vip" className="btn-outline !px-8 !py-4 !text-[15px]">
              <Icon name="sparkle" className="h-4.5 w-4.5 text-gold-500" />
              Découvrir l’espace VIP
            </Link>
          </motion.div>

          {/* Fiche de spécifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-16 w-full max-w-3xl"
          >
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold-500/50" aria-hidden />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-navy-400 dark:text-slate-500">
                Spécifications // v2.6.0
              </span>
              <span className="h-px w-12 bg-gold-500/50" aria-hidden />
            </div>
            <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-4 dark:border-white/10 dark:bg-white/10">
              {[
                { value: totalResources, suffix: '+', label: 'Ressources partagées' },
                { value: totalTD, suffix: '', label: 'Fiches de TD' },
                { value: totalUnits, suffix: '', label: 'Unités d’enseignement' },
                { value: 100, suffix: '%', label: 'Esprit d’entraide' },
              ].map((s, i) => (
                <div key={s.label} className="bg-white/85 px-4 py-5 backdrop-blur dark:bg-navy-950/85">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
                    RE-0{i + 1}
                  </p>
                  <div className="mt-1 text-3xl font-black tracking-tight text-navy-950 dark:text-white">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-500 dark:text-slate-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Console de statut (écran large) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[64px] left-8 z-10 hidden w-[300px] 2xl:left-14"
        >
          <div className="card-premium overflow-hidden !rounded-xl text-left">
            <div className="flex items-center gap-1.5 border-b border-navy-900/10 px-4 py-2.5 dark:border-white/10">
              <span className="h-2 w-2 rounded-full bg-red-400/70" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-gold-400/90" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden />
              <span className="font-mono ml-2 text-[10px] font-bold text-navy-400 dark:text-slate-500">
                rp@polytech:~$
              </span>
            </div>
            <div className="font-mono space-y-1 px-4 py-3.5 text-[11px] leading-relaxed">
              <p className="text-navy-700 dark:text-slate-300">$ rp --status</p>
              <p className="text-emerald-600 dark:text-emerald-400">✓ {totalResources}+ ressources synchronisées</p>
              <p className="text-emerald-600 dark:text-emerald-400">✓ {totalUnits} corrections vérifiées</p>
              <p className="text-emerald-600 dark:text-emerald-400">✓ 13 ingénieurs actifs</p>
              <p className="text-navy-700 dark:text-slate-300">
                $ <span className="animate-pulse text-gold-500">▊</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Barre de statut */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-navy-900/10 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-navy-950/75">
          <div className="font-mono mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-navy-400 sm:px-8 dark:text-slate-500">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Système opérationnel
            </span>
            <span className="hidden md:inline">Uptime 100 % · Entraide permanente</span>
            <span className="hidden sm:inline">Latence 12 ms · Build v2.6.0</span>
          </div>
        </div>

        <motion.div
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[56px] left-1/2 z-10 -translate-x-1/2 text-navy-400 dark:text-slate-500"
        >
          <Icon name="chevron-down" className="h-6 w-6" />
        </motion.div>
      </section>

      <Marquee />

      {/* ═══════════════ PRÉSENTATION ═══════════════ */}
      <section className="section-pad relative overflow-hidden">
        <CircuitBackground className="-left-24 top-10 w-[420px] opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-[0.3em] text-navy-400 dark:text-slate-500">/01</span>
                <span className="badge-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  Qui sommes-nous
                </span>
              </div>
              <h2 className="font-display text-3xl leading-[1.12] tracking-tight text-navy-900 sm:text-4xl md:text-[2.6rem] dark:text-white">
                De l’apprentissage individuel à la{' '}
                <span className="text-gradient-gold">réussite collective</span>.
              </h2>
              <p className="mt-6 text-[15px] font-medium leading-relaxed text-navy-600 dark:text-slate-400">
                <strong className="font-bold text-navy-900 dark:text-white">RÉUSSIR POLYTECH</strong> est un
                collectif académique d’étudiants ingénieurs de l’École Polytechnique qui transforme
                l’apprentissage individuel en réussite collective. Nous mutualisons fiches, épreuves,
                corrections et méthodes, et nous nous entraînons les uns les autres, avec la même
                exigence qu’un bureau d’études.
              </p>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-navy-600 dark:text-slate-400">
                Notre conviction : l’excellence ne se mérite pas seul. Elle se construit à plusieurs,
                dans la rigueur, la solidarité et l’ambition partagée.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Excellence académique', 'Innovation technologique', 'Esprit ingénieur', 'Collaboration', 'Ambition'].map((t) => (
                  <span key={t} className="badge-navy">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: 'target' as const,
                  code: 'MOD-01',
                  title: 'Vision',
                  text: 'Devenir le collectif de référence des ingénieurs de l’École Polytechnique — celui où chaque étudiant entre plus fort qu’il n’est sorti.',
                },
                {
                  icon: 'zap' as const,
                  code: 'MOD-02',
                  title: 'Mission',
                  text: 'Accompagner chaque étudiant vers la réussite académique grâce à l’entraide, la rigueur, la solidarité et le partage des connaissances.',
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={0.1 + i * 0.12}>
                  <TiltCard className="h-full">
                    <div className="card-premium card-hover flex h-full flex-col p-7">
                      <span className="font-mono mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400">
                        {c.code}
                      </span>
                      <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow">
                        <Icon name={c.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-xl text-navy-900 dark:text-white">{c.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-navy-600 dark:text-slate-400">{c.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
              <Reveal delay={0.25} className="sm:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-transparent to-navy-500/10 p-7">
                  <div className="shimmer-line absolute inset-x-0 top-0 h-px" />
                  <p className="font-display text-lg leading-relaxed text-navy-800 dark:text-slate-100">
                    « Un ingénieur se mesure à ce qu’il construit.
                    <span className="text-gold-600 dark:text-gold-400"> Un collectif, à ce qu’il élève.</span> »
                  </p>
                  <p className="font-mono mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-navy-400 dark:text-slate-500">
                    — Charte du collectif
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VALEURS ═══════════════ */}
      <section className="section-pad relative overflow-hidden bg-navy-50/60 dark:bg-navy-900/30">
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            index="02"
            eyebrow="Nos valeurs"
            title={
              <>
                Quatre piliers, <span className="text-gradient-gold">une culture</span>
              </>
            }
            sub="Elles guident chacune de nos ressources, de nos séances de travail et de nos décisions."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className="card-premium card-hover flex h-full flex-col items-start p-7">
                    <span className="font-mono mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400">
                      VAL-{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-600 dark:text-gold-400">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-lg text-navy-900 dark:text-white">{v.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-navy-600 dark:text-slate-400">{v.text}</p>
                    <span className="mt-auto pt-5 text-4xl font-black tracking-tight text-navy-100 dark:text-white/5">
                      0{i + 1}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ POURQUOI REJOINDRE ═══════════════ */}
      <section className="section-pad relative overflow-hidden">
        <Formulas className="opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            index="03"
            eyebrow="Votre avenir commence ici"
            title={
              <>
                Pourquoi rejoindre <span className="text-gradient-gold">RÉUSSIR POLYTECH</span> ?
              </>
            }
            sub="Une plateforme pensée pour les étudiants ingénieurs : des ressources, une communauté, une méthode."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className="card-premium card-hover group relative flex h-full gap-5 overflow-hidden p-7">
                    <span className="font-mono absolute right-6 top-5 text-[10px] font-bold tracking-[0.3em] text-navy-300 dark:text-slate-600">
                      RP-WHY-0{i + 1}
                    </span>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-400 shadow-navy-deep dark:from-navy-600 dark:to-navy-800">
                      <Icon name={w.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-navy-900 dark:text-white">{w.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-navy-600 dark:text-slate-400">{w.text}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Robot bridge */}
          <Reveal delay={0.1}>
            <div className="card-premium relative mt-16 overflow-hidden p-4 sm:p-8">
              <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
              <RobotBridge className="relative mx-auto w-full max-w-4xl" />
              <div className="relative mt-4 flex flex-col items-center justify-between gap-3 border-t border-navy-900/10 pt-5 sm:flex-row dark:border-white/10">
                <p className="text-center text-sm font-medium text-navy-600 sm:text-left dark:text-slate-400">
                  <strong className="font-bold text-navy-900 dark:text-white">Travail collectif</strong> —
                  comme sur une ligne d’assemblage, chaque compétence s’ajoute à la structure du collectif.
                </p>
                <Link href="/a-propos" className="btn-ghost shrink-0 !text-gold-600 dark:!text-gold-400">
                  Rencontrer l’équipe
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <CircuitBackground flip className="-right-20 top-0 w-[420px] opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-mono mb-5 text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
              Transmission 04 // Rejoindre
            </p>
            <h2 className="font-display text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              Prêt à construire l’excellence <span className="text-gradient-gold">avec nous</span> ?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-slate-300">
              Créez votre espace étudiant, accédez aux ressources MSP1 et MSP2 et rejoignez une
              communauté qui ne lâche rien.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/connexion" className="btn-gold !px-8 !py-4 !text-[15px]">
                <Icon name="user" className="h-5 w-5" />
                Créer mon espace étudiant
              </Link>
              <Link
                href="/msp2"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-[15px] font-bold text-white transition hover:border-gold-400/60 hover:text-gold-300"
              >
                Voir le programme MSP2
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
