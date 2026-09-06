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
import { levelResourceCount, MSP1, MSP2 } from '@/lib/data/units';

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

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-50 via-white to-white dark:from-navy-950 dark:via-navy-950 dark:to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden />
        <HeroScene />
        <Formulas />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-700 dark:text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            Collectif d’ingénieurs · École Polytechnique
          </motion.span>

          {/* Logo hologramme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="holo-word animate-float"
          >
            <h1 className="font-display text-[clamp(3.2rem,11vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block text-navy-950 text-3d-navy dark:text-white">RÉUSSIR</span>
              <span className="text-gradient-gold block">POLYTECH</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-navy-700 md:text-xl dark:text-slate-300"
          >
            « Réussir ensemble, <span className="text-gold-600 dark:text-gold-400">construire l’excellence</span>. »
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-4 dark:border-white/10 dark:bg-white/10"
          >
            {[
              { value: totalResources, suffix: '+', label: 'Ressources partagées' },
              { value: 8, suffix: '', label: 'Unités d’enseignement' },
              { value: 2, suffix: '', label: 'Niveaux accompagnés' },
              { value: 100, suffix: '%', label: 'Esprit d’entraide' },
            ].map((s) => (
              <div key={s.label} className="bg-white/80 px-4 py-5 backdrop-blur dark:bg-navy-950/80">
                <div className="font-display text-2xl font-bold text-navy-900 dark:text-white">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-500 dark:text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-navy-400 dark:text-slate-500"
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
              <span className="badge-gold mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                Qui sommes-nous
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl md:text-[2.6rem] dark:text-white">
                De l’apprentissage individuel à la{' '}
                <span className="text-gradient-gold">réussite collective</span>.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-navy-600 dark:text-slate-400">
                <strong className="text-navy-900 dark:text-white">RÉUSSIR POLYTECH</strong> est un
                collectif académique d’étudiants ingénieurs de l’École Polytechnique qui transforme
                l’apprentissage individuel en réussite collective. Nous mutualisons fiches, épreuves,
                corrections et méthodes, et nous nous entraînons les uns les autres, avec la même
                exigence qu’un bureau d’études.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-600 dark:text-slate-400">
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
                  title: 'Vision',
                  text: 'Devenir le collectif de référence des ingénieurs de l’École Polytechnique — celui où chaque étudiant entre plus fort qu’il n’est sorti.',
                },
                {
                  icon: 'zap' as const,
                  title: 'Mission',
                  text: 'Accompagner chaque étudiant vers la réussite académique grâce à l’entraide, la rigueur, la solidarité et le partage des connaissances.',
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={0.1 + i * 0.12}>
                  <TiltCard className="h-full">
                    <div className="card-premium card-hover flex h-full flex-col p-7">
                      <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow">
                        <Icon name={c.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">{c.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{c.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
              <Reveal delay={0.25} className="sm:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-transparent to-navy-500/10 p-7">
                  <div className="shimmer-line absolute inset-x-0 top-0 h-px" />
                  <p className="font-display text-lg font-semibold leading-relaxed text-navy-800 dark:text-slate-100">
                    « Un ingénieur se mesure à ce qu’il construit.
                    <span className="text-gold-600 dark:text-gold-400"> Un collectif, à ce qu’il élève.</span> »
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
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-600 dark:text-gold-400">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{v.text}</p>
                    <span className="font-display mt-auto pt-5 text-4xl font-bold text-navy-100 dark:text-white/5">
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
                    <span className="absolute right-6 top-6 font-display text-5xl font-bold text-navy-100 transition-colors group-hover:text-gold-500/30 dark:text-white/5 dark:group-hover:text-gold-500/20">
                      0{i + 1}
                    </span>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-400 shadow-navy-deep dark:from-navy-600 dark:to-navy-800">
                      <Icon name={w.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">{w.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{w.text}</p>
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
                <p className="text-center text-sm text-navy-600 sm:text-left dark:text-slate-400">
                  <span className="font-semibold text-navy-900 dark:text-white">Travail collectif</span> —
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
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Prêt à construire l’excellence <span className="text-gradient-gold">avec nous</span> ?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
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
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-[15px] font-semibold text-white transition hover:border-gold-400/60 hover:text-gold-300"
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
