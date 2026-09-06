'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import Icon from '@/components/ui/Icon';
import Formulas from '@/components/ui/Formulas';
import RobotBridge from '@/components/hero/RobotBridge';
import { INNOVATIONS, LEADERSHIP_PRINCIPLES, OPPORTUNITIES, PROJECT_METHODS, PROJECT_STEPS, TESTIMONIALS } from '@/lib/data/entrepreneur';
import { waLink } from '@/lib/whatsapp';

export default function EntrepreneurPage() {
  return (
    <>
      {/* Hero — startup */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gold-50 to-navy-50 dark:from-navy-950 dark:via-navy-950 dark:to-navy-900" aria-hidden />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-gold-400/20 blur-[120px] dark:bg-gold-500/10" aria-hidden />
        <div className="absolute -right-24 top-52 h-96 w-96 rounded-full bg-navy-400/20 blur-[120px] dark:bg-navy-500/20" aria-hidden />
        <Formulas className="opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="badge-gold">
              <Icon name="rocket" className="h-3.5 w-3.5" />
              Espace Ressources Entrepreneur
            </span>
            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-navy-950 sm:text-5xl md:text-6xl dark:text-white">
              L’ingénieur qui innove
              <br />
              <span className="text-gradient-gold">construit le futur.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-600 sm:text-lg dark:text-slate-300">
              Concevoir, c’est votre métier. Entreprendre, c’est votre prochain levier. Cet espace
              réunit l’inspiration, la méthode et les opportunités pour développer votre potentiel
              entrepreneurial — sans quitter le terrain de l’ingénierie.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={waLink('Bonjour RÉUSSIR POLYTECH 👋 Je souhaite rejoindre le réseau entrepreneurs.')} target="_blank" rel="noreferrer" className="btn-gold">
                <Icon name="whatsapp" className="h-4 w-4" />
                Rejoindre le réseau
              </a>
              <Link href="/vip" className="btn-outline">
                <Icon name="sparkle" className="h-4 w-4 text-gold-500" />
                Formations entrepreneur VIP
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16">
            <RobotBridge className="mx-auto w-full max-w-4xl" />
          </Reveal>
        </div>
      </section>

      {/* Innovation */}
      <section className="section-pad relative overflow-hidden bg-navy-50/60 dark:bg-navy-900/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Innovation"
            title={
              <>
                Les frontières où <span className="text-gradient-gold">votre génie s’applique</span>
              </>
            }
            sub="Six terrains où les ingénieurs de l’École Polytechnique ont déjà des réponses que le marché attend."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INNOVATIONS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full">
                  <div className="card-premium card-hover h-full p-6">
                    <span className="badge-navy">{c.tag}</span>
                    <h3 className="font-display mt-4 text-lg font-bold text-navy-900 dark:text-white">{c.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{c.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Création de projets */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Création de projets"
            title={
              <>
                De l’idée au <span className="text-gradient-gold">premier client</span>
              </>
            }
            sub="La méthode que le collectif enseigne en séances de travail : rigoureuse, itérative, mesurable."
          />
          <div className="relative">
            <span className="absolute left-[27px] top-3 h-[calc(100%-24px)] w-px bg-gradient-to-b from-gold-500/60 via-navy-300/40 to-transparent sm:left-1/2" aria-hidden />
            <div className="space-y-10">
              {PROJECT_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.06}>
                  <div className={`relative flex items-start gap-6 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12' : 'sm:ml-auto sm:flex-row-reverse sm:pl-12 sm:text-right'}`}>
                    <span className="font-display absolute left-[27px] top-1 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-2xl border border-gold-500/50 bg-white text-sm font-bold text-gold-600 shadow-gold-glow sm:static sm:translate-x-0 ${i % 2 === 0 ? 'sm:order-first' : 'sm:order-last'} dark:bg-navy-950 dark:text-gold-400">
                      {s.step}
                    </span>
                    <div className="ml-14 flex-1 sm:ml-0">
                      <div className="card-premium card-hover p-6">
                        <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{s.text}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gestion de projet */}
      <section className="section-pad relative overflow-hidden bg-navy-50/60 dark:bg-navy-900/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Gestion de projet"
            title={
              <>
                Les cadres que les <span className="text-gradient-gold">grands projets utilisent</span>
              </>
            }
            sub="Choisir le bon outil, au bon moment : c’est ça, la maturité ingénieur."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECT_METHODS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07}>
                <TiltCard className="h-full">
                  <div className="card-premium card-hover flex h-full flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">{m.name}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{m.text}</p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-600 dark:text-gold-400">{m.meta}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-pad relative overflow-hidden">
        <Formulas className="opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                Diriger, c’est une <span className="text-gradient-gold">compétence d’ingénieur</span>
              </>
            }
            sub="Quatre principes enseignés aux membres du collectif pour passer de l’exécution à l’influence."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {LEADERSHIP_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <TiltCard className="h-full">
                  <div className="card-premium card-hover flex h-full gap-5 p-7">
                    <span className="font-display text-4xl font-bold text-gold-500/40">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{p.text}</p>
                      <p className="font-display mt-4 text-[13px] font-semibold italic text-gold-700 dark:text-gold-400">{p.quote}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Témoignages"
            title={
              <>
                Ils sont passés <span className="text-gradient-gold">par le collectif</span>
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.09}>
                <TiltCard className="h-full">
                  <figure className="card-premium card-hover flex h-full flex-col p-7">
                    <span className="font-display text-5xl leading-none text-gold-500/50">“</span>
                    <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-navy-700 dark:text-slate-300">{t.text}</blockquote>
                    <figcaption className="mt-6 border-t border-navy-900/10 pt-4 dark:border-white/10">
                      <p className="font-display text-sm font-bold text-navy-900 dark:text-white">{t.name}</p>
                      <p className="mt-0.5 text-xs text-navy-500 dark:text-slate-400">{t.role}</p>
                    </figcaption>
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunités */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="badge-gold !border-gold-400/50 !bg-gold-500/15">
              <Icon name="zap" className="h-3.5 w-3.5" />
              Opportunités
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ce qui s’ouvre <span className="text-gradient-gold">cette année</span>
            </h2>
          </Reveal>

          <div className="space-y-3">
            {OPPORTUNITIES.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-colors hover:border-gold-500/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{o.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{o.org}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-300">{o.deadline}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider ${
                        o.status === 'Inscriptions ouvertes' || o.status === 'Ouvert'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-gold-500/15 text-gold-400'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <a
                href={waLink('Bonjour RÉUSSIR POLYTECH 👋 Je souhaite être notifié(e) des prochaines opportunités entrepreneuriales.')}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                <Icon name="bell" className="h-4 w-4" />
                Être alerté des prochaines opportunités
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
