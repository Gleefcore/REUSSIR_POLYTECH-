'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Pré-charge silencieusement toutes les pages du site dès que le navigateur
 * est au repos : au clic, la page s'ouvre instantanément (HTML + JS déjà en cache).
 */
const ROUTES = [
  '/',
  '/msp1',
  '/msp2',
  '/entrepreneur',
  '/vip',
  '/a-propos',
  '/connexion',
  '/confidentialite',
];

export default function RoutePrefetcher() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      for (const href of ROUTES) {
        if (href === pathname) continue;
        try {
          router.prefetch(href);
        } catch {
          /* ignore */
        }
      }
    };

    if ('requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number; cancelIdleCallback: (id: number) => void }).requestIdleCallback(run, { timeout: 2500 });
      return () => {
        cancelled = true;
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      };
    }

    const t = setTimeout(run, 1200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [router, pathname]);

  return null;
}
