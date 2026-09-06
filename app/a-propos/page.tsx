'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import TeamImage from '@/components/team/TeamImage';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import Icon from '@/components/ui/Icon';
import Formulas from '@/components/ui/Formulas';
import Counter from '@/components/ui/Counter';
import { TEAM, type TeamMember } from '@/lib/data/team';

const TIER_META: Record<TeamMember['tier'], { label: string; cls: string }> = {
  founding: { label: 'Fondateurs', cls: 'border-gold-500/50 bg-gold-500/10 text-gold-700 dark:text-gold-300' },
  executive: { label: 'Direction', cls: 'border-navy-400/40 bg-navy-500/10 text-navy-600 dark:text-navy-200' },
  operations: { label: 'Opérations', cls: 'border-sky-400/40 bg-sky-500/10 text-sky-600 dark:text-sky-300' },
  ambassador: { label: 'Ambassadeurs', cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' },
  cadet: { label: 'Cadets', cls: 'border-violet-400/40 bg-violet-500/10 text-violet-600 dark:text-violet-300' },
};

function AboutHero() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-900/10 shadow-navy-deep dark:border-white/10">
      {failed ? (
        <div className="relative flex aspect-[12/7] flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
          <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
          <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-gold-500/40 bg-gold-500/10 text-gold-400">
            <Icon name="users" className="h-10 w-10" />
          </span>
          <p className="font-display relative px-6 text-center text-lg font-bold text-white">
            Le laboratoire où l’excellence s’assemble.
          </p>
        </div>
      ) : (
        <>
          <Image
            src="/images/team/about-hero.jpg"
            alt="Le collectif RÉUSSIR POLYTECH en session de travail dans un laboratoire technologique"
            width={1200}
            height={700}
            priority
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
          <p className="font-display absolute bottom-5 left-5 right-5 text-sm font-semibold text-white">
            « Le laboratoire où l’excellence s’assemble, pièce par pièce. »
          </p>
        </>
      )}
    </div>
  );
}

function TeamCard({ m, i }: { m: TeamMember; i: number }) {
  const meta = TIER_META[m.tier];
  return (
    <Reveal delay={(i % 4) * 0.07}>
      <TiltCard max={4} className="h-full">
        <div className="card-premium card-hover group relative h-full overflow-hidden">
          <div className="relative aspect-[4/4.4] overflow-hidden">
            <TeamImage src={m.image} name={m.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur ${meta.cls}`}>
              {meta.label}
            </span>
            {m.tier === 'founding' && (
              <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow">
                <Icon name="star" className="h-4 w-4" />
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-lg font-bold leading-tight text-white">{m.name}</h3>
              <p className="mt-1 text-[12.5px] font-semibold text-gold-300">{m.role}</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-[13px] leading-relaxed text-navy-600 dark:text-slate-400">{m.description}</p>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <Formulas className="opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <span className="badge-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                À propos de nous
              </span>
              <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl dark:text-white">
                L’équipe derrière <span className="text-gradient-gold">RÉUSSIR POLYTECH</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-600 dark:text-slate-300">
                Des étudiants ingénieurs qui croient que l’excellence se transmet. Derrière chaque
                fiche, chaque séance de travail et chaque ressource, il y a des visages, des
                responsabilités et une même exigence.
              </p>
              <div className="mt-9 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 dark:border-white/10 dark:bg-white/10">
                {[
                  { v: 13, s: '', l: 'Membres actifs' },
                  { v: 4, s: '', l: 'Cofondateurs' },
                  { v: 2, s: '', l: 'Niveaux couverts' },
                ].map((x) => (
                  <div key={x.l} className="bg-white/85 px-3 py-4 text-center dark:bg-navy-950/85">
                    <div className="font-display text-xl font-bold text-navy-900 dark:text-gold-400">
                      <Counter to={x.v} suffix={x.s} />
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-500 dark:text-slate-400">{x.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <AboutHero />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section-pad relative overflow-hidden">
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="13 membres, une seule trajectoire"
            title={
              <>
                Connaître <span className="text-gradient-gold">les visages du collectif</span>
              </>
            }
            sub="De la fondation aux cadets : chaque rôle compte pour bâtir une plateforme digne des leaders de demain."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM.map((m, i) => (
              <TeamCard key={m.id} m={m} i={i} />
            ))}

            {/* Carte recrutement */}
            <Reveal delay={0.2}>
              <div className="card-premium card-hover relative flex h-full flex-col items-center justify-center gap-4 border-dashed p-8 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-600 dark:text-gold-400">
                  <Icon name="plus" className="h-7 w-7" />
                </span>
                <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">Le prochain, c’est peut-être vous</h3>
                <p className="text-sm leading-relaxed text-navy-600 dark:text-slate-400">
                  Cadet, animateur, administrateur : rejoignez la structure qui forme les leaders
                  technologiques de demain.
                </p>
                <Link href="/connexion" className="btn-gold mt-2 !py-2.5 text-[13px]">
                  Créer mon compte
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Notre promesse <span className="text-gradient-gold">à chaque membre</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
              Une ressource de qualité, une correction fiable, un accompagnement sincère.
              Nous ne vendons pas l’excellence — nous la pratiquons, la partageons et nous
              nous en rendons responsables, ensemble.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/msp1" className="btn-gold">
                Explorer MSP1
              </Link>
              <Link href="/vip" className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gold-400/60 hover:text-gold-300">
                Espace VIP
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
