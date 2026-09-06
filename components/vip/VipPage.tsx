'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import Icon from '@/components/ui/Icon';
import Formulas from '@/components/ui/Formulas';
import HeroScene from '@/components/hero/HeroScene';
import { VIP_FORMATIONS, type VipFormation } from '@/lib/data/vip';
import { addRequest, getSession } from '@/lib/auth';
import { vipAccessMessage, waLink, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

const ACCENT: Record<VipFormation['accent'], string> = {
  gold: 'from-gold-400 to-gold-600',
  navy: 'from-navy-500 to-navy-700',
  cyan: 'from-sky-500 to-navy-600',
  violet: 'from-indigo-500 to-navy-600',
};

function VipCard({ f, onAccess }: { f: VipFormation; onAccess: (f: VipFormation) => void }) {
  return (
    <TiltCard className="h-full">
      <div className="card-premium card-hover group relative flex h-full flex-col overflow-hidden">
        <div className={`h-1 w-full bg-gradient-to-r ${ACCENT[f.accent]}`} />
        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">{f.name}</h3>
              <p className="mt-1 text-sm font-medium text-gold-600 dark:text-gold-400">{f.tagline}</p>
            </div>
            <span className="shrink-0 rounded-full border border-navy-900/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-navy-500 dark:border-white/10 dark:text-slate-400">
              {f.level}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-navy-600 dark:text-slate-400">{f.description}</p>

          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400 dark:text-slate-500">
              Aperçu du programme
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {f.preview.map((m) => (
                <li key={m} className="flex items-start gap-2 text-[13px] text-navy-700 dark:text-slate-300">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <span className="text-xs font-semibold text-navy-400 dark:text-slate-500">⏱ {f.duration}</span>
            <button
              onClick={() => onAccess(f)}
              className="inline-flex items-center gap-2 rounded-xl border border-gold-500/50 bg-gold-500/10 px-4 py-2.5 text-[13px] font-bold text-gold-700 transition-all hover:bg-gold-500 hover:text-navy-950 hover:shadow-gold-glow dark:text-gold-300 dark:hover:text-navy-950"
            >
              <Icon name="sparkle" className="h-4 w-4" />
              Demander l’accès
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function VipPage() {
  const [selected, setSelected] = useState<VipFormation | null>(null);
  const session = getSession();

  const confirmAccess = (f: VipFormation) => {
    addRequest({
      name: session?.name ?? '—',
      email: session?.email ?? '—',
      phone: session?.phone ?? '—',
      subject: `Formation VIP : ${f.name}`,
      context: f.level,
      message: `Durée : ${f.duration}`,
      source: 'vip',
    });
    const text = vipAccessMessage({ formation: f.name, name: session?.name, email: session?.email, phone: session?.phone });
    window.open(waLink(text), '_blank', 'noopener');
    setSelected(null);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[78svh] items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
        <HeroScene variant="compact" />
        <Formulas className="opacity-50" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="badge-gold !border-gold-400/50 !bg-gold-500/15"
            >
              <Icon name="star" className="h-3.5 w-3.5" />
              Accès prioritaire
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              RÉUSSIR POLYTECH <span className="text-gradient-gold">VIP</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              Une section exclusive de formations professionnelles pour transformer votre profil
              d’ingénieur en profil de leader : IA, programmation, design, communication,
              management.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-9 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10"
            >
              {[
                { v: '8', l: 'Formations' },
                { v: '100%', l: 'Pratique' },
                { v: '1 à 1', l: 'Suivi WhatsApp' },
              ].map((s) => (
                <div key={s.l} className="bg-navy-950/70 px-4 py-4 text-center">
                  <div className="font-display text-xl font-bold text-gold-400">{s.v}</div>
                  <div className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="section-pad relative overflow-hidden">
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Formations professionnelles"
            title={
              <>
                Huit compétences, <span className="text-gradient-gold">un profil leader</span>
              </>
            }
            sub="Chaque formation est encadrée par l’équipe, découpée en modules courts et orientée cas réels. L’accès est accordé sur demande, puis activé manuellement par l’équipe."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {VIP_FORMATIONS.map((f, i) => (
              <Reveal key={f.id} delay={(i % 4) * 0.07}>
                <VipCard f={f} onAccess={setSelected} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
            <span className="badge-gold !border-gold-400/50 !bg-gold-500/15">Processus d’accès</span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Comment obtenir <span className="text-gradient-gold">votre accès</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'Cliquez sur « Demander l’accès »',
                d: `Le site vous invite à contacter notre équipe WhatsApp ${WHATSAPP_DISPLAY}. Votre demande est tracée et priorisée par le niveau.`,
              },
              {
                n: '02',
                t: 'Paiement Orange Money',
                d: 'Vous réglez directement auprès de l’équipe, par Orange Money. Aucun paiement automatique n’est effectué par la plateforme.',
              },
              {
                n: '03',
                t: 'Ressources envoyées',
                d: 'Après confirmation, l’accès complet — supports, sessions et suivi — vous est envoyé directement sur WhatsApp.',
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
                  <span className="font-display text-5xl font-bold text-gold-500/25">{s.n}</span>
                  <h3 className="font-display mt-4 text-lg font-bold text-white">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.d}</p>
                  {i < 2 && (
                    <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-gold-500 md:block">
                      <Icon name="arrow-right" className="h-6 w-6" />
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-sm text-slate-300">
                <strong className="text-white">Important :</strong> la plateforme ne réalise aucun
                paiement automatique. Le règlement s’effectue par Orange Money auprès de l’équipe,
                puis les ressources vous sont envoyées directement.
              </p>
              <a
                href={waLink(vipAccessMessage({ formation: 'plus d’informations sur les formations VIP' }))}
                target="_blank"
                rel="noreferrer"
                className="btn-gold shrink-0"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Contacter l’équipe
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/75 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="card-premium relative w-full max-w-lg !bg-white p-8 text-center dark:!bg-navy-900"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg text-navy-400 transition hover:bg-navy-900/5 hover:text-navy-700 dark:text-slate-500 dark:hover:bg-white/5"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow">
                <Icon name="star" className="h-8 w-8" />
              </span>
              <h3 className="font-display mt-5 text-2xl font-bold text-navy-900 dark:text-white">{selected.name}</h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-navy-600 dark:text-slate-400">
                <strong className="text-navy-900 dark:text-white">
                  Contactez notre équipe WhatsApp pour obtenir votre accès.
                </strong>
                <br />
                Après paiement Orange Money auprès de l’équipe, les ressources vous sont envoyées
                directement.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <button
                  onClick={() => confirmAccess(selected)}
                  className="btn-gold w-full !bg-gradient-to-r !from-emerald-500 !to-emerald-600 !text-white"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Obtenir l’accès via WhatsApp
                </button>
                <p className="text-[11px] text-navy-400 dark:text-slate-500">
                  Aucune paiement automatique — règlement Orange Money auprès de l’équipe ({WHATSAPP_DISPLAY}).
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
