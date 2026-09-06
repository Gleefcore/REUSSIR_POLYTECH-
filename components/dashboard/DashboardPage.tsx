'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { addHistory, getHistory, getSession, logout, updateUserProfile, type HistoryEntry, type User } from '@/lib/auth';
import { MSP1, MSP2, levelResourceCount, unitResourceCount } from '@/lib/data/units';
import { downloadResource } from '@/lib/downloads';
import { waLink } from '@/lib/whatsapp';

type Tab = 'ressources' | 'historique' | 'profil' | 'notifications';

const TABS: { id: Tab; label: string; icon: 'book' | 'file-text' | 'user' | 'bell' }[] = [
  { id: 'ressources', label: 'Ressources disponibles', icon: 'book' },
  { id: 'historique', label: 'Historique', icon: 'file-text' },
  { id: 'profil', label: 'Profil', icon: 'user' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
];

function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setUser(getSession());
    setReady(true);
  }, []);
  return { user, ready, setUser };
}

function dateFr(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, ready, setUser } = useSession();
  const [tab, setTab] = useState<Tab>('ressources');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Profil state
  const [pName, setPName] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pLevel, setPLevel] = useState<'MSP1' | 'MSP2' | 'Cadet' | 'Admin'>('MSP1');
  const [profileSaved, setProfileSaved] = useState(false);

  // Notifications (démonstration + demandes)
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    setHistory(getHistory(user.email));
    setPName(user.name);
    setPPhone(user.phone);
    setPLevel(user.level);
  }, [user]);

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/connexion');
  }, [ready, user, router]);

  const notifications = useMemo(() => {
    if (!user) return [];
    return [
      {
        id: `n1-${user.email}`,
        title: 'Nouveau : 6 fiches de TD Algorithmique & programmation (MSP1 S1)',
        body: 'Téléchargez-les depuis la bibliothèque MSP1, unité Informatique & Systèmes.',
        at: new Date(Date.now() - 3600e3).toISOString(),
        kind: 'resource' as const,
      },
      {
        id: `n2-${user.email}`,
        title: 'Séance de révision — Automatique & asservissements',
        body: 'Cette semaine, séance encadrée par le collectif. Inscription via WhatsApp avant vendredi.',
        at: new Date(Date.now() - 26 * 3600e3).toISOString(),
        kind: 'session' as const,
      },
      {
        id: `n3-${user.email}`,
        title: 'Formations VIP : les places de la cohorte d’octobre sont ouvertes',
        body: 'IA, programmation et leadership — accès sur demande via WhatsApp.',
        at: new Date(Date.now() - 3 * 24 * 3600e3).toISOString(),
        kind: 'vip' as const,
      },
    ];
  }, [user]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-[100svh] place-items-center pt-[72px]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500" />
          <p className="mt-4 text-sm text-navy-500 dark:text-slate-400">Chargement de votre espace…</p>
        </div>
      </div>
    );
  }

  const levelData = user.level === 'MSP2' ? MSP2 : MSP1;
  const quickDownload = (label: string, kind: 'TD' | 'Examen' | 'Correction', semesterName: string, unit: string, subject: string, count?: number) => {
    downloadResource({ kind, label, level: levelData.code, semester: semesterName, unit, subject, count });
    addHistory(user.email, { title: `${label} — ${subject}`, type: kind === 'TD' ? 'TD' : kind === 'Examen' ? 'Examen' : 'Correction' });
    setHistory(getHistory(user.email));
    setToast('Téléchargement lancé ✔');
    setTimeout(() => setToast(null), 2000);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(user.email, { name: pName.trim(), phone: pPhone.trim(), level: pLevel });
    const s = getSession();
    if (s) setUser(s);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2200);
  };

  const allRead = notifications.every((n) => readIds.has(n.id));

  return (
    <div className="min-h-[100svh] pt-[72px]">
      {/* Bandeau */}
      <section className="relative overflow-hidden border-b border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 pb-14 pt-12 dark:border-white/10">
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">Espace étudiant</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
              Bonjour, <span className="text-gradient-gold">{user.name.split(' ')[0]}</span> 👋
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Membre <span className="font-semibold text-slate-200">{user.level}</span> · inscrit(e) le {dateFr(user.createdAt)}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={levelData.code === 'MSP1' ? '/msp1' : '/msp2'} className="btn-gold !py-3 text-[13px]">
              <Icon name="book" className="h-4 w-4" />
              Ouvrir la bibliothèque {levelData.code}
            </Link>
            <button
              onClick={() => {
                logout();
                router.replace('/');
              }}
              className="btn-outline !border-white/25 !bg-white/5 !py-3 !text-white"
            >
              <Icon name="logout" className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Onglets */}
          <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? 'text-navy-950 dark:text-white'
                    : 'text-navy-500 hover:bg-navy-900/5 hover:text-navy-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="dash-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-gold-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon name={t.icon} className="relative h-[18px] w-[18px]" />
                <span className="relative whitespace-nowrap">{t.label}</span>
                {t.id === 'notifications' && !allRead && (
                  <span className="relative ml-auto h-2 w-2 rounded-full bg-gold-500" />
                )}
              </button>
            ))}

            <div className="mt-6 hidden rounded-2xl border border-navy-900/10 bg-navy-50/60 p-5 lg:block dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400 dark:text-slate-500">Astuce du jour</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-navy-600 dark:text-slate-400">
                Révisez les <strong className="text-navy-900 dark:text-white">corrections avant les fiches</strong> :
                lire la solution puis refaire l’exercice améliore la rétention de 30&nbsp;% en moyenne.
              </p>
            </div>
          </nav>

          {/* Contenu */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'ressources' && (
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white">
                      Ressources — {levelData.code}
                    </h2>
                    <span className="badge-gold">{levelResourceCount(levelData)}+ ressources disponibles</span>
                  </div>
                  <div className="space-y-8">
                    {levelData.semesters.map((sem) => (
                      <div key={sem.id}>
                        <h3 className="font-display mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-navy-500 dark:text-slate-400">
                          <span className="h-px w-8 bg-gold-500/60" />
                          {sem.name}
                        </h3>
                        <div className="grid gap-4 xl:grid-cols-2">
                          {sem.units.map((u) => (
                            <div key={u.id} className="card-premium p-5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h4 className="font-display text-base font-bold text-navy-900 dark:text-white">{u.name}</h4>
                                  <p className="mt-1 text-xs text-navy-500 dark:text-slate-400">{u.description}</p>
                                </div>
                                <span className="shrink-0 rounded-full border border-gold-500/40 bg-gold-500/10 px-2.5 py-1 text-[10.5px] font-bold text-gold-700 dark:text-gold-300">
                                  {unitResourceCount(u)}
                                </span>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {u.subjects.slice(0, 2).map((s) => (
                                  <button
                                    key={s.id}
                                    onClick={() => quickDownload(`Fiches de TD (${s.tdCount})`, 'TD', sem.name, u.name, s.name, s.tdCount)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-navy-900/10 px-3 py-1.5 text-[11.5px] font-semibold text-navy-700 transition hover:border-gold-500/50 hover:text-gold-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-gold-300"
                                  >
                                    <Icon name="download" className="h-3.5 w-3.5" />
                                    TD · {s.name}
                                  </button>
                                ))}
                                <Link
                                  href={levelData.code === 'MSP1' ? '/msp1' : '/msp2'}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-gold-500 hover:text-navy-950 dark:bg-navy-700 dark:hover:bg-gold-500"
                                >
                                  Toute l’unité
                                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'historique' && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-navy-900 dark:text-white">Historique</h2>
                  {history.length === 0 ? (
                    <div className="card-premium flex flex-col items-center gap-4 p-12 text-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-500/10 text-navy-400 dark:text-slate-500">
                        <Icon name="file-text" className="h-7 w-7" />
                      </span>
                      <p className="text-sm text-navy-500 dark:text-slate-400">
                        Aucun téléchargement pour le moment.<br />Vos fiches, épreuves et corrections apparaîtront ici.
                      </p>
                      <Link href={levelData.code === 'MSP1' ? '/msp1' : '/msp2'} className="btn-gold !py-2.5 text-[13px]">
                        Explorer les ressources
                      </Link>
                    </div>
                  ) : (
                    <div className="card-premium divide-y divide-navy-900/10 dark:divide-white/10">
                      {history.slice(0, 30).map((h) => (
                        <div key={h.id} className="flex items-center justify-between gap-4 px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                                h.type === 'TD'
                                  ? 'bg-navy-500/10 text-navy-500 dark:text-navy-200'
                                  : h.type === 'Examen'
                                    ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400'
                                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              }`}
                            >
                              <Icon name={h.type === 'Correction' ? 'unlock' : h.type === 'Accès demandé' ? 'lock' : 'file-text'} className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-navy-900 dark:text-white">{h.title}</p>
                              <p className="text-xs text-navy-400 dark:text-slate-500">{dateFr(h.at)}</p>
                            </div>
                          </div>
                          <span className="badge-navy shrink-0">{h.type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'profil' && (
                <div className="max-w-xl">
                  <h2 className="font-display mb-6 text-2xl font-bold text-navy-900 dark:text-white">Profil</h2>
                  <form onSubmit={saveProfile} className="card-premium space-y-5 p-7">
                    <div className="flex items-center gap-4">
                      <span className="font-display grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-2xl font-bold text-navy-950 shadow-gold-glow">
                        {pName
                          .split(' ')
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </span>
                      <div>
                        <p className="font-display text-lg font-bold text-navy-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-navy-500 dark:text-slate-400">{user.email}</p>
                        <span className="badge-gold mt-2">{user.level}</span>
                      </div>
                    </div>
                    <div>
                      <label className="field-label" htmlFor="pf-name">Nom complet</label>
                      <input id="pf-name" className="input-premium" value={pName} onChange={(e) => setPName(e.target.value)} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="field-label" htmlFor="pf-phone">Téléphone</label>
                        <input id="pf-phone" className="input-premium" value={pPhone} onChange={(e) => setPPhone(e.target.value)} />
                      </div>
                      <div>
                        <label className="field-label" htmlFor="pf-level">Niveau</label>
                        <select id="pf-level" className="input-premium" value={pLevel} onChange={(e) => setPLevel(e.target.value as typeof pLevel)}>
                          <option value="MSP1">MSP1</option>
                          <option value="MSP2">MSP2</option>
                          <option value="Cadet">Cadet</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button type="submit" className="btn-gold">Enregistrer</button>
                      {profileSaved && (
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          <Icon name="check" className="h-4 w-4" /> Profils mis à jour
                        </span>
                      )}
                    </div>
                    <p className="border-t border-navy-900/10 pt-4 text-xs leading-relaxed text-navy-400 dark:border-white/10 dark:text-slate-500">
                      Votre adresse email ({user.email}) sert d’identifiant et ne peut pas être modifiée.
                      Pour toute demande de suppression de compte, contactez l’équipe sur WhatsApp.
                    </p>
                  </form>
                </div>
              )}

              {tab === 'notifications' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white">Notifications</h2>
                    <button
                      onClick={() => setReadIds(new Set(notifications.map((n) => n.id)))}
                      className="btn-ghost !py-2 text-[13px]"
                    >
                      <Icon name="check" className="h-4 w-4" />
                      Tout marquer comme lu
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((n) => {
                      const unread = !readIds.has(n.id);
                      return (
                        <motion.button
                          key={n.id}
                          onClick={() => setReadIds((s) => new Set(s).add(n.id))}
                          whileHover={{ x: 4 }}
                          className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
                            unread
                              ? 'border-gold-500/40 bg-gold-500/[0.06]'
                              : 'border-navy-900/10 bg-white/60 opacity-70 dark:border-white/10 dark:bg-white/[0.02]'
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                              n.kind === 'resource'
                                ? 'bg-navy-500/10 text-navy-500 dark:text-navy-200'
                                : n.kind === 'session'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-gold-500/10 text-gold-600 dark:text-gold-400'
                            }`}
                          >
                            <Icon name={n.kind === 'resource' ? 'book' : n.kind === 'session' ? 'zap' : 'sparkle'} className="h-5 w-5" />
                          </span>
                          <span className="flex-1">
                            <span className="flex items-start justify-between gap-4">
                              <span className={`text-sm font-semibold ${unread ? 'text-navy-900 dark:text-white' : 'text-navy-600 dark:text-slate-400'}`}>
                                {n.title}
                              </span>
                              <span className="shrink-0 text-[11px] text-navy-400 dark:text-slate-500">{dateFr(n.at)}</span>
                            </span>
                            <span className="mt-1 block text-[13px] leading-relaxed text-navy-500 dark:text-slate-400">{n.body}</span>
                          </span>
                          {unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                  <a
                    href={waLink('Bonjour, j’aimerais être informé(e) des prochaines séances de travail.')}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-gold-500/40 py-4 text-sm font-semibold text-gold-700 transition hover:bg-gold-500/10 dark:text-gold-300"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Recevoir les invitations aux séances via WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-8 left-1/2 z-[75] -translate-x-1/2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-navy-deep dark:bg-gold-500 dark:text-navy-950"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
