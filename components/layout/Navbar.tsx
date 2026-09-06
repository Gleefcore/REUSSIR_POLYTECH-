'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import { useTheme } from '@/lib/theme';
import { getSession, logout } from '@/lib/auth';

const LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/msp1', label: 'MSP1' },
  { href: '/msp2', label: 'MSP2' },
  { href: '/entrepreneur', label: 'Ressources entrepreneur' },
  { href: '/vip', label: 'VIP' },
  { href: '/a-propos', label: 'À propos' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; level: string } | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 24));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const s = getSession();
    setUser(s ? { name: s.name.split(' ')[0], level: s.level } : null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-navy-900/10 shadow-[0_8px_30px_rgba(3,8,24,0.08)] dark:border-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="RÉUSSIR POLYTECH — Accueil" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                isActive(l.href)
                  ? 'text-navy-950 dark:text-gold-300'
                  : 'text-navy-600 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2 -bottom-[3px] h-[2px] rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-navy-900/10 text-navy-700 transition hover:border-gold-500/50 hover:text-gold-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-gold-300"
          >
            <Icon name={isDark ? 'sun' : 'moon'} className="h-[18px] w-[18px]" />
          </button>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/tableau-de-bord"
                className="btn-outline !px-4 !py-2.5 !text-[13px]"
              >
                <Icon name="user" className="h-4 w-4" />
                Bonjour, {user.name}
                <span className="badge-gold !px-2 !py-0.5 !text-[10px]">{user.level}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                aria-label="Se déconnecter"
                className="grid h-10 w-10 place-items-center rounded-xl border border-navy-900/10 text-navy-500 transition hover:border-red-400/50 hover:text-red-500 dark:border-white/10 dark:text-slate-400"
              >
                <Icon name="logout" className="h-[18px] w-[18px]" />
              </button>
            </div>
          ) : (
            <Link href="/connexion" className="btn-gold hidden !px-4 !py-2.5 !text-[13px] sm:inline-flex">
              <Icon name="user" className="h-4 w-4" />
              Connexion étudiant
            </Link>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-navy-900/10 text-navy-800 lg:hidden dark:border-white/10 dark:text-slate-200"
          >
            <Icon name={open ? 'x' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden border-b border-navy-900/10 lg:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive(l.href)
                        ? 'bg-gold-500/10 text-gold-700 dark:text-gold-300'
                        : 'text-navy-700 dark:text-slate-300'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <Link href="/tableau-de-bord" onClick={() => setOpen(false)} className="btn-gold mt-2">
                  Tableau de bord — {user.name}
                </Link>
              ) : (
                <Link href="/connexion" onClick={() => setOpen(false)} className="btn-gold mt-2">
                  Connexion étudiant
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
