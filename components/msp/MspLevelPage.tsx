'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import Icon from '@/components/ui/Icon';
import Formulas from '@/components/ui/Formulas';
import AccessModal from '@/components/msp/AccessModal';
import { levelResourceCount, unitResourceCount, type LevelData, type Unit } from '@/lib/data/units';
import { downloadResource } from '@/lib/downloads';
import { addHistory, getSession } from '@/lib/auth';

function useDownload() {
  return (opts: {
    kind: 'TD' | 'Examen' | 'Correction';
    label: string;
    level: string;
    semester: string;
    unit: string;
    subject: string;
    count?: number;
  }) => {
    const file = downloadResource(opts);
    const s = getSession();
    if (s) {
      addHistory(s.email, {
        title: `${opts.label} — ${opts.subject}`,
        type: opts.kind === 'TD' ? 'TD' : opts.kind === 'Examen' ? 'Examen' : 'Correction',
      });
    }
    return file;
  };
}

function UnitCard({
  u,
  index,
  levelCode,
  semesterName,
  onNeedAccess,
}: {
  u: Unit;
  index: number;
  levelCode: string;
  semesterName: string;
  onNeedAccess: (u: Unit) => void;
}) {
  const download = useDownload();
  const [flash, setFlash] = useState<string | null>(null);
  const count = unitResourceCount(u);

  const handleDownload = (kind: 'TD' | 'Examen', label: string, count?: number) => {
    download({ kind, label, level: levelCode, semester: semesterName, unit: u.name, subject: u.name, count });
    setFlash(kind);
    setTimeout(() => setFlash(null), 1400);
  };

  const downloadCorrection = () => {
    download({ kind: 'Correction', label: 'Correction', level: levelCode, semester: semesterName, unit: u.name, subject: u.name });
  };

  return (
    <TiltCard max={2.5} className="h-full">
      <div className="card-premium card-hover relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
        <span className="pointer-events-none absolute -right-3 -top-5 select-none text-[110px] font-black leading-none tracking-tight text-navy-900/[0.045] dark:text-white/[0.04]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400">
              Unité {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display mt-1.5 text-xl leading-snug text-navy-900 dark:text-white">{u.name}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[11px] font-bold text-gold-700 dark:text-gold-300">
            {count} ressources
          </span>
        </div>

        <p className="relative mt-3 text-sm font-medium leading-relaxed text-navy-600 dark:text-slate-400">{u.description}</p>

        <div className="relative mt-5 grid flex-1 content-end gap-2.5 sm:grid-cols-3">
          {/* 1. Fiches de TD */}
          <div className="flex items-center justify-between gap-2 rounded-lg border border-navy-900/10 bg-navy-50/70 px-3 py-2.5 dark:border-white/[0.06] dark:bg-navy-900/40">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-navy-500 dark:text-slate-400">Fiches de TD</p>
              <p className="text-xs text-navy-400 dark:text-slate-500">{u.tdCount} document(s)</p>
            </div>
            <button
              onClick={() => handleDownload('TD', `Fiches de TD (${u.tdCount})`, u.tdCount)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-[11.5px] font-bold text-white transition hover:bg-gold-500 hover:text-navy-950 dark:bg-navy-700 dark:hover:bg-gold-500"
            >
              {flash === 'TD' ? <Icon name="check" className="h-3.5 w-3.5" /> : <Icon name="download" className="h-3.5 w-3.5" />}
              {flash === 'TD' ? 'OK' : 'Télécharger'}
            </button>
          </div>

          {/* 2. Épreuves / Examens */}
          <div className="flex items-center justify-between gap-2 rounded-lg border border-navy-900/10 bg-navy-50/70 px-3 py-2.5 dark:border-white/[0.06] dark:bg-navy-900/40">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-navy-500 dark:text-slate-400">Épreuves / Examens</p>
              <p className="text-xs text-navy-400 dark:text-slate-500">{u.examCount} document(s)</p>
            </div>
            <button
              onClick={() => handleDownload('Examen', `Épreuve(s) (${u.examCount})`, u.examCount)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-[11.5px] font-bold text-white transition hover:bg-gold-500 hover:text-navy-950 dark:bg-navy-700 dark:hover:bg-gold-500"
            >
              {flash === 'Examen' ? <Icon name="check" className="h-3.5 w-3.5" /> : <Icon name="download" className="h-3.5 w-3.5" />}
              {flash === 'Examen' ? 'OK' : 'Télécharger'}
            </button>
          </div>

          {/* 3. Corrections */}
          {u.correction === 'free' ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2.5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Corrections</p>
                <p className="text-xs text-navy-400 dark:text-slate-500">Accès libre</p>
              </div>
              <button
                onClick={downloadCorrection}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11.5px] font-bold text-white transition hover:bg-emerald-500"
              >
                <Icon name="unlock" className="h-3.5 w-3.5" />
                Accéder à la correction
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-gold-500/35 bg-gold-500/5 px-3 py-2.5">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                  <Icon name="lock" className="h-3 w-3" />
                  Corrections
                </p>
                <p className="text-xs text-navy-400 dark:text-slate-500">Protégée</p>
              </div>
              <button
                onClick={() => onNeedAccess(u)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 px-3 py-1.5 text-[11.5px] font-bold text-navy-950 shadow-sm transition hover:brightness-105"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" />
                Demander l’accès
              </button>
            </div>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export default function MspLevelPage({
  data,
  otherHref,
  otherLabel,
}: {
  data: LevelData;
  otherHref: string;
  otherLabel: string;
}) {
  const [tab, setTab] = useState<string>(data.semesters[0].id);
  const [needAccess, setNeedAccess] = useState<Unit | null>(null);
  const active = data.semesters.find((s) => s.id === tab) ?? data.semesters[0];
  const total = useMemo(() => levelResourceCount(data), [data]);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-10 pt-36">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <Formulas className="opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                Bibliothèque {data.code}
              </span>
              <span className="badge-navy">{total}+ ressources vérifiées</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-navy-400 dark:text-slate-500">
                {data.semesters.reduce((a, s) => a + s.units.length, 0)} unités d’enseignement
              </span>
            </div>
            <h1 className="font-display max-w-3xl text-4xl leading-[1.1] tracking-tight text-navy-900 sm:text-5xl dark:text-white">
              {data.code} <span className="text-gradient-gold">au sommet</span>
            </h1>
            <p className="max-w-2xl text-[15px] font-medium leading-relaxed text-navy-600 dark:text-slate-400">{data.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* Semestre tabs */}
      <div className="sticky top-[72px] z-40 border-y border-navy-900/10 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex gap-1">
            {data.semesters.map((sem) => (
              <button
                key={sem.id}
                onClick={() => setTab(sem.id)}
                className={`relative px-4 py-4 text-sm font-bold transition-colors sm:px-6 ${
                  tab === sem.id ? 'text-navy-950 dark:text-gold-300' : 'text-navy-500 hover:text-navy-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {sem.name}
                <span className="font-mono ml-2 hidden text-[10px] font-bold tracking-[0.2em] text-navy-300 sm:inline dark:text-slate-600">
                  {String(sem.units.length).padStart(2, '0')} UE
                </span>
                {tab === sem.id && (
                  <motion.span
                    layoutId={`msp-${data.code}-tab`}
                    className="absolute inset-x-3 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                  />
                )}
              </button>
            ))}
          </div>
          <Link href={otherHref} className="btn-ghost hidden !py-2 text-[13px] sm:inline-flex">
            Voir {otherLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Units */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-7 xl:grid-cols-2"
            >
              {active.units.map((u, i) => (
                <Reveal key={u.id} delay={Math.min(i * 0.04, 0.3)}>
                  <UnitCard u={u} index={i} levelCode={data.code} semesterName={active.name} onNeedAccess={setNeedAccess} />
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-navy-900/10 bg-navy-50/70 p-6 sm:flex-row dark:border-white/10 dark:bg-navy-900/40">
              <p className="text-sm font-medium text-navy-600 dark:text-slate-400">
                Une ressource manque ? Une erreur à signaler ? L’équipe met tout à jour en continu.
              </p>
              <Link href="/entrepreneur" className="btn-outline shrink-0 !py-2.5 text-[13px]">
                Explorer les ressources entrepreneur
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <AccessModal
        open={needAccess !== null}
        onClose={() => setNeedAccess(null)}
        subject={needAccess?.name ?? ''}
        level={data.code}
        semester={active.name}
        unit={needAccess?.name ?? ''}
      />
    </>
  );
}
