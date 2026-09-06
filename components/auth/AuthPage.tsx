'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import Formulas from '@/components/ui/Formulas';
import Logo from '@/components/layout/Logo';
import { getSession, login, registerUser, type User } from '@/lib/auth';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState<'MSP1' | 'MSP2' | 'Cadet'>('MSP1');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s) {
      // si déjà connecté → tableau de bord
    }
  }, []);

  const finish = (u: User) => {
    router.push('/tableau-de-bord');
    void u;
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    setTimeout(() => {
      const res = login(identifier, password);
      setBusy(false);
      if (res.ok && res.user) finish(res.user);
      else setError(res.error ?? 'Erreur inattendue.');
    }, 350);
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim() || password.length < 6) {
      setError('Tous les champs sont requis (mot de passe : 6 caractères minimum).');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      const res = registerUser({ name, email, phone, level, password });
      setBusy(false);
      if (res.ok && res.user) finish(res.user);
      else setError(res.error ?? 'Erreur inattendue.');
    }, 350);
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-16 pt-32">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="bg-radial-glow absolute inset-0" aria-hidden />
      <Formulas className="opacity-40" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-navy-900/10 shadow-navy-deep lg:grid-cols-[1fr_1.1fr] dark:border-white/10">
        {/* Panneau gauche — marque */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 p-10 lg:flex">
          <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/15 blur-[100px]" aria-hidden />
          <div className="relative">
            <Logo />
          </div>
          <div className="relative">
            <p className="font-display text-2xl font-bold leading-snug text-white">
              « L’excellence n’est pas un sprint.
              <br />
              C’est un <span className="text-gradient-gold">collectif</span>. »
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                'Ressources MSP1 & MSP2 centralisées',
                'Historique de téléchargements personnel',
                'Demandes de corrections tracées',
                'Notifications de nouvelles ressources',
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500/15 text-gold-400">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Plateforme réservée aux étudiants de l’École Polytechnique
          </p>
        </div>

        {/* Panneau droit — formulaires */}
        <div className="bg-white/95 p-7 backdrop-blur sm:p-10 dark:bg-navy-900/95">
          <div className="mb-8 flex rounded-xl border border-navy-900/10 p-1 dark:border-white/10">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={`relative flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  mode === m ? 'text-navy-950 dark:text-white' : 'text-navy-400 dark:text-slate-500'
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{m === 'login' ? 'Connexion' : 'Inscription'}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login"
                onSubmit={submitLogin}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white">Bon retour parmi nous</h2>
                  <p className="mt-1.5 text-sm text-navy-500 dark:text-slate-400">
                    Connectez-vous avec votre email ou votre téléphone.
                  </p>
                </div>
                <div>
                  <label htmlFor="auth-id" className="field-label">Email ou téléphone</label>
                  <input
                    id="auth-id"
                    className="input-premium"
                    placeholder="vous@polytechnique.cm · 6XX XX XX XX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label htmlFor="auth-pass" className="field-label">Mot de passe</label>
                  <input
                    id="auth-pass"
                    type="password"
                    className="input-premium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
                <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-60">
                  {busy ? 'Connexion…' : 'Se connecter'}
                  {!busy && <Icon name="arrow-right" className="h-4 w-4" />}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={submitRegister}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white">Créer votre espace</h2>
                  <p className="mt-1.5 text-sm text-navy-500 dark:text-slate-400">
                    Quelques informations pour personnaliser votre parcours.
                  </p>
                </div>
                <div>
                  <label htmlFor="reg-name" className="field-label">Nom complet</label>
                  <input id="reg-name" className="input-premium" placeholder="Prénom et nom" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-email" className="field-label">Email</label>
                    <input id="reg-email" type="email" className="input-premium" placeholder="vous@polytechnique.cm" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="reg-phone" className="field-label">Téléphone</label>
                    <input id="reg-phone" className="input-premium" placeholder="6XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                  </div>
                </div>
                <div>
                  <label htmlFor="reg-level" className="field-label">Niveau</label>
                  <select id="reg-level" className="input-premium" value={level} onChange={(e) => setLevel(e.target.value as typeof level)}>
                    <option value="MSP1">MSP1</option>
                    <option value="MSP2">MSP2</option>
                    <option value="Cadet">Cadet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reg-pass" className="field-label">Mot de passe</label>
                  <input id="reg-pass" type="password" className="input-premium" placeholder="6 caractères minimum" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                </div>
                {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
                <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-60">
                  {busy ? 'Création…' : 'Créer mon espace étudiant'}
                  {!busy && <Icon name="sparkle" className="h-4 w-4" />}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-navy-400 dark:text-slate-500">
                  En vous inscrivant, vous acceptez notre politique de confidentialité.
                  Vos données servent uniquement à personnaliser votre expérience.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
