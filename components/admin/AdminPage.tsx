'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/layout/Logo';
import Formulas from '@/components/ui/Formulas';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  getSession,
  getUsers,
  login,
  logout,
  seedAdmin,
  type AccessRequest,
  type User,
} from '@/lib/auth';
import { getRequests } from '@/lib/auth';
import { MSP1, MSP2, type CorrectionState } from '@/lib/data/units';
import { VIP_FORMATIONS } from '@/lib/data/vip';

/* ── Overrides localStorage ─────────────────────────── */

type DocsOverrides = Record<string, { state?: CorrectionState; deleted?: boolean }>;
type AddedDoc = {
  id: string;
  level: string;
  semester: string;
  unit: string;
  subject: string;
  type: 'TD' | 'Examen' | 'Correction';
  state: CorrectionState;
};
type UsersOverrides = Record<string, { role?: 'student' | 'admin'; active?: boolean }>;
type VipOverrides = Record<string, { active: boolean }>;
type RequestsOverrides = Record<string, { status: 'new' | 'done' }>;

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

const K = {
  docs: 'rp_admin_docs_overrides',
  added: 'rp_admin_docs_added',
  users: 'rp_admin_users_overrides',
  vip: 'rp_admin_vip_overrides',
  reqs: 'rp_admin_requests_overrides',
};

/* ── Données de base des documents ──────────────────── */

interface BaseDoc {
  id: string;
  level: string;
  semester: string;
  unit: string;
  subject: string;
  type: 'TD' | 'Examen' | 'Correction';
  state: CorrectionState;
  count?: number;
}

function baseDocs(): BaseDoc[] {
  const out: BaseDoc[] = [];
  for (const lvl of [MSP1, MSP2]) {
    for (const sem of lvl.semesters) {
      for (const u of sem.units) {
        out.push({ id: `${u.id}:td`, level: lvl.code, semester: sem.name, unit: u.name, subject: u.name, type: 'TD', state: 'free', count: u.tdCount });
        out.push({ id: `${u.id}:exam`, level: lvl.code, semester: sem.name, unit: u.name, subject: u.name, type: 'Examen', state: 'free', count: u.examCount });
        out.push({ id: `${u.id}:corr`, level: lvl.code, semester: sem.name, unit: u.name, subject: u.name, type: 'Correction', state: u.correction });
      }
    }
  }
  return out;
}

type Tab = 'apercu' | 'documents' | 'vip' | 'utilisateurs' | 'demandes';

const TABS: { id: Tab; label: string; icon: 'target' | 'file-text' | 'sparkle' | 'users' | 'chat' }[] = [
  { id: 'apercu', label: 'Vue d’ensemble', icon: 'target' },
  { id: 'documents', label: 'Documents · TD · Examens · Corrections', icon: 'file-text' },
  { id: 'vip', label: 'Formations VIP', icon: 'sparkle' },
  { id: 'utilisateurs', label: 'Utilisateurs', icon: 'users' },
  { id: 'demandes', label: 'Demandes d’accès', icon: 'chat' },
];

function dateFr(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

/* ── Porte d'accès admin ────────────────────────────── */

function AdminGate({ onEnter }: { onEnter: (u: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setTimeout(() => {
      const res = login(email, password);
      setBusy(false);
      if (res.ok && res.user && res.user.role === 'admin') onEnter(res.user);
      else if (res.ok) setError('Ce compte ne dispose pas des droits administrateur.');
      else setError(res.error ?? 'Erreur inattendue.');
    }, 300);
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-[72px]">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <Formulas className="opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card-premium relative w-full max-w-md !bg-white p-9 dark:!bg-navy-900"
      >
        <div className="mb-7 flex flex-col items-center gap-4 text-center">
          <Logo compact />
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900 dark:text-white">Espace administration</h1>
            <p className="mt-1.5 text-sm text-navy-500 dark:text-slate-400">Réservé à l’équipe de RÉUSSIR POLYTECH.</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="field-label" htmlFor="ad-email">Email administrateur</label>
            <input id="ad-email" className="input-premium" placeholder="admin@…" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <label className="field-label" htmlFor="ad-pass">Mot de passe</label>
            <input id="ad-pass" type="password" className="input-premium" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-60">
            <Icon name="shield" className="h-4 w-4" />
            {busy ? 'Vérification…' : 'Accéder au back-office'}
          </button>
          <p className="rounded-xl bg-navy-500/5 px-4 py-3 text-center text-[11.5px] leading-relaxed text-navy-500 dark:bg-white/5 dark:text-slate-400">
            Démo — compte administrateur :<br />
            <strong className="text-navy-800 dark:text-slate-200">{ADMIN_EMAIL}</strong> ·{' '}
            <strong className="text-navy-800 dark:text-slate-200">{ADMIN_PASSWORD}</strong>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Page admin ─────────────────────────────────────── */

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>('apercu');
  const [toast, setToast] = useState<string | null>(null);

  const [docsOver, setDocsOver] = useState<DocsOverrides>({});
  const [added, setAdded] = useState<AddedDoc[]>([]);
  const [usersOver, setUsersOver] = useState<UsersOverrides>({});
  const [vipOver, setVipOver] = useState<VipOverrides>({});
  const [reqsOver, setReqsOver] = useState<RequestsOverrides>({});
  const [refresh, setRefresh] = useState(0);

  // Filtres documents
  const [q, setQ] = useState('');
  const [fLevel, setFLevel] = useState('Tous');
  const [fType, setFType] = useState('Tous');

  // Formulaire document
  const [nLevel, setNLevel] = useState('MSP1');
  const [nSem, setNSem] = useState('Semestre 1');
  const [nUnit, setNUnit] = useState('');
  const [nSubject, setNSubject] = useState('');
  const [nType, setNType] = useState<'TD' | 'Examen' | 'Correction'>('TD');
  const [nState, setNState] = useState<CorrectionState>('free');

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => {
    seedAdmin();
    setUser(getSession());
    setReady(true);
  }, []);

  useEffect(() => {
    setDocsOver(readLS<DocsOverrides>(K.docs, {}));
    setAdded(readLS<AddedDoc[]>(K.added, []));
    setUsersOver(readLS<UsersOverrides>(K.users, {}));
    setVipOver(readLS<VipOverrides>(K.vip, {}));
    setReqsOver(readLS<RequestsOverrides>(K.reqs, {}));
  }, [refresh]);

  const docs = useMemo(() => {
    const base: BaseDoc[] = baseDocs();
    const all = [...base, ...added.map((a) => ({ ...a } as BaseDoc))];
    return all
      .map((d) => {
        const o = docsOver[d.id] ?? {};
        return { ...d, state: o.state ?? d.state, deleted: o.deleted ?? false };
      })
      .filter((d) => !d.deleted);
  }, [added, docsOver, refresh]);

  const requests = useMemo<AccessRequest[]>(() => {
    const list = getRequests();
    return list.map((r) => ({ ...r, status: (reqsOver[r.id]?.status as 'new' | 'done') ?? r.status }));
  }, [reqsOver, refresh]);

  const users = useMemo(() => {
    const list = getUsers();
    return list.map((u) => {
      const o = usersOver[u.email] ?? {};
      return { ...u, role: o.role ?? u.role, active: o.active ?? u.active };
    });
  }, [usersOver, refresh]);

  if (!ready) {
    return (
      <div className="grid min-h-[100svh] place-items-center pt-[72px]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <AdminGate onEnter={setUser} />;
  }

  const protectedCount = docs.filter((d) => d.state === 'protected').length;
  const newRequests = requests.filter((r) => r.status === 'new').length;
  const activeVip = VIP_FORMATIONS.filter((f) => (vipOver[f.id]?.active ?? true)).length;

  const toggleDocState = (d: BaseDoc & { deleted?: boolean }) => {
    const nextState: CorrectionState = d.state === 'free' ? 'protected' : 'free';
    const next: DocsOverrides = { ...docsOver, [d.id]: { ...docsOver[d.id], state: nextState } };
    setDocsOver(next);
    writeLS(K.docs, next);
    notify(d.state === 'free' ? 'Document protégé 🔒' : 'Document déprotégé 🔓');
  };

  const deleteDoc = (d: BaseDoc & { deleted?: boolean }) => {
    const next = { ...docsOver, [d.id]: { ...docsOver[d.id], deleted: true } };
    setDocsOver(next);
    writeLS(K.docs, next);
    notify('Document supprimé');
  };

  const addDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nUnit.trim() || !nSubject.trim()) {
      notify('Unité et matière requises');
      return;
    }
    const doc: AddedDoc = {
      id: `add-${Date.now()}`,
      level: nLevel,
      semester: nSem,
      unit: nUnit.trim(),
      subject: nSubject.trim(),
      type: nType,
      state: nState,
    };
    const next = [...added, doc];
    setAdded(next);
    writeLS(K.added, next);
    setNUnit('');
    setNSubject('');
    notify('Document ajouté ✔');
  };

  const toggleUser = (u: User) => {
    const cur = usersOver[u.email] ?? {};
    const next = { ...usersOver, [u.email]: { ...cur, active: !(cur.active ?? u.active) } };
    setUsersOver(next);
    writeLS(K.users, next);
    notify(cur.active ?? u.active ? 'Compte désactivé' : 'Compte réactivé');
  };

  const toggleUserRole = (u: User) => {
    const cur = usersOver[u.email] ?? {};
    const nextRole: 'student' | 'admin' = (cur.role ?? u.role) === 'admin' ? 'student' : 'admin';
    const next: UsersOverrides = { ...usersOver, [u.email]: { ...cur, role: nextRole } };
    setUsersOver(next);
    writeLS(K.users, next);
    notify(nextRole === 'admin' ? 'Droits admin accordés' : 'Droits admin retirés');
  };

  const toggleVip = (id: string) => {
    const cur = vipOver[id]?.active ?? true;
    const next = { ...vipOver, [id]: { active: !cur } };
    setVipOver(next);
    writeLS(K.vip, next);
    notify(cur ? 'Formation mise en pause' : 'Formation activée');
  };

  const toggleReq = (r: AccessRequest) => {
    const nextStatus: 'new' | 'done' = r.status === 'new' ? 'done' : 'new';
    const next: RequestsOverrides = { ...reqsOver, [r.id]: { status: nextStatus } };
    setReqsOver(next);
    writeLS(K.reqs, next);
  };

  const filtered = docs.filter((d) => {
    const text = `${d.level} ${d.semester} ${d.unit} ${d.subject} ${d.type}`.toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    if (fLevel !== 'Tous' && d.level !== fLevel) return false;
    if (fType !== 'Tous' && d.type !== fType) return false;
    return true;
  });

  const TYPE_CLS: Record<string, string> = {
    TD: 'bg-navy-500/10 text-navy-600 dark:text-navy-200',
    Examen: 'bg-gold-500/10 text-gold-700 dark:text-gold-300',
    Correction: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div className="min-h-[100svh] pt-[72px]">
      {/* Bandeau */}
      <section className="relative overflow-hidden border-b border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 pb-12 pt-10 dark:border-white/10">
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">Back-office</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-white">
              Administration <span className="text-gradient-gold">RÉUSSIR POLYTECH</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">Connecté en tant que {user.name}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/')} className="btn-outline !border-white/25 !bg-white/5 !py-2.5 !text-[13px] !text-white">
              <Icon name="eye" className="h-4 w-4" />
              Voir le site
            </button>
            <button
              onClick={() => {
                logout();
                router.replace('/admin');
              }}
              className="btn-outline !border-white/25 !bg-white/5 !py-2.5 !text-[13px] !text-white"
            >
              <Icon name="logout" className="h-4 w-4" />
              Quitter
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Documents publiés', value: docs.length, icon: 'file-text' as const, sub: `${protectedCount} protégés` },
            { label: 'Utilisateurs', value: users.length, icon: 'users' as const, sub: `${users.filter((u) => u.active).length} actifs` },
            { label: 'Demandes d’accès', value: requests.length, icon: 'chat' as const, sub: `${newRequests} nouvelle(s)` },
            { label: 'Formations VIP actives', value: activeVip, icon: 'sparkle' as const, sub: `${VIP_FORMATIONS.length} au total` },
          ].map((s) => (
            <div key={s.label} className="card-premium flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-2xl font-bold text-navy-900 dark:text-white">{s.value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-500 dark:text-slate-400">{s.label}</div>
                <div className="text-[11px] text-gold-600 dark:text-gold-400">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto border-b border-navy-900/10 pb-px dark:border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex shrink-0 items-center gap-2.5 rounded-t-xl px-4 py-3.5 text-[13px] font-semibold transition-colors ${
                tab === t.id ? 'text-navy-950 dark:text-gold-300' : 'text-navy-500 hover:text-navy-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab === t.id && (
                <motion.span layoutId="adm-tab" className="absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
              )}
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
              {t.id === 'demandes' && newRequests > 0 && (
                <span className="rounded-full bg-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-navy-950">{newRequests}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="py-8"
          >
            {/* ═ Vue d'ensemble ═ */}
            {tab === 'apercu' && (
              <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                <div className="card-premium p-7">
                  <h2 className="font-display text-lg font-bold text-navy-900 dark:text-white">Dernières demandes d’accès</h2>
                  {requests.length === 0 ? (
                    <p className="mt-4 text-sm text-navy-500 dark:text-slate-400">
                      Aucune demande pour le moment. Les demandes d’accès aux corrections protégées et aux formations VIP apparaîtront ici.
                    </p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {requests.slice(0, 5).map((r) => (
                        <div key={r.id} className="flex items-center justify-between gap-4 rounded-xl border border-navy-900/10 p-4 dark:border-white/10">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-navy-900 dark:text-white">{r.subject}</p>
                            <p className="mt-0.5 text-xs text-navy-500 dark:text-slate-400">
                              {r.name} · {r.context} · {dateFr(r.at)}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-[10.5px] font-bold uppercase ${
                              r.status === 'new' ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            {r.status === 'new' ? 'Nouvelle' : 'Traitée'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="card-premium p-7">
                    <h2 className="font-display text-lg font-bold text-navy-900 dark:text-white">Répartition des documents</h2>
                    <div className="mt-5 space-y-4">
                      {(['TD', 'Examen', 'Correction'] as const).map((t) => {
                        const n = docs.filter((d) => d.type === t).length;
                        const pct = docs.length ? Math.round((n / docs.length) * 100) : 0;
                        return (
                          <div key={t}>
                            <div className="mb-1.5 flex justify-between text-xs font-semibold text-navy-600 dark:text-slate-300">
                              <span>{t === 'TD' ? 'Fiches de TD' : t === 'Examen' ? 'Épreuves / Examens' : 'Corrections'}</span>
                              <span>{n} · {pct}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-navy-900/10 dark:bg-white/10">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-full rounded-full ${t === 'TD' ? 'bg-navy-500 dark:bg-navy-400' : t === 'Examen' ? 'bg-gold-500' : 'bg-emerald-500'}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="card-premium border-dashed p-7">
                    <h2 className="font-display text-base font-bold text-navy-900 dark:text-white">Évolution prévue</h2>
                    <ul className="mt-4 space-y-2.5">
                      {['Assistant IA étudiant (rédaction & révision assistée)', 'Recherche intelligente dans les ressources', 'Chatbot pédagogique 24/7'].map((x) => (
                        <li key={x} className="flex items-center gap-2.5 text-sm text-navy-600 dark:text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ═ Documents ═ */}
            {tab === 'documents' && (
              <div className="space-y-6">
                <form onSubmit={addDoc} className="card-premium grid gap-4 p-6 md:grid-cols-[110px_130px_1fr_1fr_130px_130px_auto] md:items-end">
                  <div>
                    <label className="field-label">Niveau</label>
                    <select className="input-premium !py-2.5 text-[13px]" value={nLevel} onChange={(e) => setNLevel(e.target.value)}>
                      <option>MSP1</option>
                      <option>MSP2</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Semestre</label>
                    <select className="input-premium !py-2.5 text-[13px]" value={nSem} onChange={(e) => setNSem(e.target.value)}>
                      <option>Semestre 1</option>
                      <option>Semestre 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Unité d’enseignement</label>
                    <input className="input-premium !py-2.5 text-[13px]" placeholder="Ex. Mathématiques Appliquées" value={nUnit} onChange={(e) => setNUnit(e.target.value)} />
                  </div>
                  <div>
                    <label className="field-label">Matière</label>
                    <input className="input-premium !py-2.5 text-[13px]" placeholder="Ex. Algèbre linéaire" value={nSubject} onChange={(e) => setNSubject(e.target.value)} />
                  </div>
                  <div>
                    <label className="field-label">Type</label>
                    <select className="input-premium !py-2.5 text-[13px]" value={nType} onChange={(e) => setNType(e.target.value as typeof nType)}>
                      <option value="TD">Fiches de TD</option>
                      <option value="Examen">Examen</option>
                      <option value="Correction">Correction</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Accès</label>
                    <select className="input-premium !py-2.5 text-[13px]" value={nState} onChange={(e) => setNState(e.target.value as CorrectionState)}>
                      <option value="free">Libre</option>
                      <option value="protected">Protégé</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-gold !py-2.5 text-[13px]">
                    <Icon name="plus" className="h-4 w-4" />
                    Ajouter
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[220px]">
                    <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400 dark:text-slate-500" />
                    <input className="input-premium !py-2.5 pl-10 text-[13px]" placeholder="Rechercher une matière, une unité, un niveau…" value={q} onChange={(e) => setQ(e.target.value)} />
                  </div>
                  <select className="input-premium w-auto !py-2.5 text-[13px]" value={fLevel} onChange={(e) => setFLevel(e.target.value)}>
                    <option>Tous</option>
                    <option>MSP1</option>
                    <option>MSP2</option>
                  </select>
                  <select className="input-premium w-auto !py-2.5 text-[13px]" value={fType} onChange={(e) => setFType(e.target.value)}>
                    <option>Tous</option>
                    <option value="TD">Fiches de TD</option>
                    <option value="Examen">Examens</option>
                    <option value="Correction">Corrections</option>
                  </select>
                  <span className="text-xs font-semibold text-navy-400 dark:text-slate-500">{filtered.length} résultat(s)</span>
                </div>

                <div className="card-premium overflow-x-auto !rounded-2xl">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-navy-900/10 text-[11px] uppercase tracking-[0.14em] text-navy-400 dark:border-white/10 dark:text-slate-500">
                        <th className="px-5 py-4 font-bold">Document</th>
                        <th className="px-4 py-4 font-bold">Niveau</th>
                        <th className="px-4 py-4 font-bold">Semestre</th>
                        <th className="px-4 py-4 font-bold">Type</th>
                        <th className="px-4 py-4 font-bold">Accès</th>
                        <th className="px-5 py-4 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-900/[0.06] dark:divide-white/[0.06]">
                      {filtered.slice(0, 60).map((d) => (
                        <tr key={d.id} className="transition-colors hover:bg-navy-500/[0.04] dark:hover:bg-white/[0.03]">
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-navy-900 dark:text-white">{d.subject}</p>
                            <p className="text-xs text-navy-400 dark:text-slate-500">{d.unit}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="badge-navy !px-2.5 !py-1 !text-[10px]">{d.level}</span>
                          </td>
                          <td className="px-4 py-3.5 text-navy-600 dark:text-slate-400">{d.semester}</td>
                          <td className="px-4 py-3.5">
                            <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${TYPE_CLS[d.type]}`}>
                              {d.type === 'TD' ? 'Fiches TD' : d.type === 'Examen' ? 'Examen' : 'Correction'}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <button
                              onClick={() => toggleDocState(d)}
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                                d.state === 'free'
                                  ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400'
                                  : 'bg-gold-500/10 text-gold-700 hover:bg-gold-500/20 dark:text-gold-300'
                              }`}
                            >
                              <Icon name={d.state === 'free' ? 'unlock' : 'lock'} className="h-3.5 w-3.5" />
                              {d.state === 'free' ? 'Libre' : 'Protégé'}
                            </button>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => deleteDoc(d)}
                              aria-label="Supprimer"
                              className="grid h-8 w-8 place-items-center rounded-lg text-navy-400 transition hover:bg-red-500/10 hover:text-red-500 dark:text-slate-500"
                            >
                              <Icon name="trash" className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length > 60 && (
                    <p className="border-t border-navy-900/10 px-5 py-4 text-center text-xs text-navy-400 dark:border-white/10 dark:text-slate-500">
                      Affichage des 60 premiers résultats sur {filtered.length} — affinez la recherche.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ═ VIP ═ */}
            {tab === 'vip' && (
              <div className="grid gap-4 md:grid-cols-2">
                {VIP_FORMATIONS.map((f) => {
                  const active = vipOver[f.id]?.active ?? true;
                  return (
                    <div key={f.id} className={`card-premium flex items-center justify-between gap-4 p-6 transition-opacity ${active ? '' : 'opacity-60'}`}>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-base font-bold text-navy-900 dark:text-white">{f.name}</h3>
                          <span className="badge-navy !text-[10px]">{f.level}</span>
                        </div>
                        <p className="mt-1.5 text-[13px] text-navy-500 dark:text-slate-400">{f.tagline} · {f.duration}</p>
                      </div>
                      <button
                        onClick={() => toggleVip(f.id)}
                        role="switch"
                        aria-checked={active}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${active ? 'bg-gold-500' : 'bg-navy-900/20 dark:bg-white/15'}`}
                      >
                        <motion.span
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${active ? 'left-6' : 'left-1'}`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ═ Utilisateurs ═ */}
            {tab === 'utilisateurs' && (
              <div className="card-premium overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-900/10 text-[11px] uppercase tracking-[0.14em] text-navy-400 dark:border-white/10 dark:text-slate-500">
                      <th className="px-5 py-4 font-bold">Utilisateur</th>
                      <th className="px-4 py-4 font-bold">Téléphone</th>
                      <th className="px-4 py-4 font-bold">Niveau</th>
                      <th className="px-4 py-4 font-bold">Rôle</th>
                      <th className="px-4 py-4 font-bold">Statut</th>
                      <th className="px-5 py-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-900/[0.06] dark:divide-white/[0.06]">
                    {users.map((u) => (
                      <tr key={u.id} className="transition-colors hover:bg-navy-500/[0.04] dark:hover:bg-white/[0.03]">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-navy-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-navy-400 dark:text-slate-500">{u.email}</p>
                        </td>
                        <td className="px-4 py-3.5 text-navy-600 dark:text-slate-400">{u.phone || '—'}</td>
                        <td className="px-4 py-3.5">
                          <span className="badge-navy !px-2.5 !py-1 !text-[10px]">{u.level}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => toggleUserRole(u)}
                            disabled={u.id === 'admin'}
                            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                              u.role === 'admin'
                                ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300'
                                : 'bg-navy-500/10 text-navy-500 hover:bg-navy-500/20 dark:text-slate-400'
                            } disabled:cursor-not-allowed disabled:opacity-50`}
                          >
                            {u.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                          </button>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`rounded-full px-3 py-1 text-[10.5px] font-bold uppercase ${u.active ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/15 text-red-500'}`}>
                            {u.active ? 'Actif' : 'Suspendu'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => toggleUser(u)}
                            disabled={u.id === 'admin'}
                            className="text-xs font-semibold text-navy-500 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400"
                          >
                            {u.active ? 'Désactiver' : 'Réactiver'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ═ Demandes ═ */}
            {tab === 'demandes' && (
              <div className="space-y-4">
                {requests.length === 0 ? (
                  <div className="card-premium flex flex-col items-center gap-3 p-12 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-500/10 text-navy-400 dark:text-slate-500">
                      <Icon name="chat" className="h-7 w-7" />
                    </span>
                    <p className="max-w-sm text-sm text-navy-500 dark:text-slate-400">
                      Aucune demande d’accès enregistrée. Les demandes envoyées depuis les pages MSP et VIP apparaîtront ici automatiquement.
                    </p>
                  </div>
                ) : (
                  requests.map((r) => (
                    <div key={r.id} className="card-premium flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-[15px] font-bold text-navy-900 dark:text-white">{r.subject}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${r.source === 'vip' ? 'bg-violet-500/10 text-violet-600 dark:text-violet-300' : 'bg-gold-500/10 text-gold-700 dark:text-gold-300'}`}>
                            {r.source === 'vip' ? 'VIP' : 'Correction'}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] text-navy-600 dark:text-slate-400">
                          {r.name} · {r.email} · {r.phone} — <span className="text-navy-400 dark:text-slate-500">{r.context}</span>
                        </p>
                        {r.message && <p className="mt-1 text-xs italic text-navy-400 dark:text-slate-500">« {r.message} »</p>}
                        <p className="mt-1 text-[11px] text-navy-400 dark:text-slate-500">Reçue le {dateFr(r.at)}</p>
                      </div>
                      <button
                        onClick={() => toggleReq(r)}
                        className={`shrink-0 rounded-xl px-4 py-2.5 text-[12.5px] font-bold transition ${
                          r.status === 'new'
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:brightness-105'
                            : 'border border-navy-900/15 text-navy-500 hover:border-gold-500/50 dark:border-white/15 dark:text-slate-400'
                        }`}
                      >
                        {r.status === 'new' ? 'Marquer comme traitée' : 'Rouvrir la demande'}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

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
