import Link from 'next/link';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import { waLink, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-navy-900/10 bg-navy-50/50 dark:border-white/10 dark:bg-navy-900/40">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-600 dark:text-slate-400">
              Un collectif d’étudiants ingénieurs de l’École Polytechnique qui transforme
              l’apprentissage individuel en réussite collective — par l’entraide, la rigueur,
              la solidarité et le partage des connaissances.
            </p>
            <p className="font-display mt-6 text-xs tracking-[0.3em] text-gold-600 dark:text-gold-400">
              RÉUSSIR ENSEMBLE, CONSTRUIRE L’EXCELLENCE.
            </p>
          </div>

          <div>
            <h4 className="font-display mb-4 text-xs font-bold uppercase tracking-[0.25em] text-navy-500 dark:text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Accueil', '/'],
                ['MSP1', '/msp1'],
                ['MSP2', '/msp2'],
                ['Ressources entrepreneur', '/entrepreneur'],
                ['RÉUSSIR POLYTECH VIP', '/vip'],
                ['À propos', '/a-propos'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-navy-700 transition-colors hover:text-gold-600 dark:text-slate-300 dark:hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-4 text-xs font-bold uppercase tracking-[0.25em] text-navy-500 dark:text-slate-400">
              Plateforme
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/connexion" className="text-navy-700 transition-colors hover:text-gold-600 dark:text-slate-300 dark:hover:text-gold-300">
                  Connexion étudiant
                </Link>
              </li>
              <li>
                <Link href="/tableau-de-bord" className="text-navy-700 transition-colors hover:text-gold-600 dark:text-slate-300 dark:hover:text-gold-300">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-navy-700 transition-colors hover:text-gold-600 dark:text-slate-300 dark:hover:text-gold-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-navy-500 transition-colors hover:text-gold-600 dark:text-slate-500 dark:hover:text-gold-300">
                  Espace administration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-4 text-xs font-bold uppercase tracking-[0.25em] text-navy-500 dark:text-slate-400">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-navy-700 dark:text-slate-300">
              <li>
                <a
                  href={waLink('Bonjour RÉUSSIR POLYTECH 👋')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-600 dark:hover:text-gold-300"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-600 dark:text-gold-400">
                    <Icon name="whatsapp" className="h-4 w-4" />
                  </span>
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-navy-900/10 text-navy-600 dark:border-white/10 dark:text-slate-300">
                  <Icon name="mail" className="h-4 w-4" />
                </span>
                contact@reussir-polytech.com
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-navy-900/10 text-navy-600 dark:border-white/10 dark:text-slate-300">
                  <Icon name="map-pin" className="h-4 w-4" />
                </span>
                École Polytechnique — Campus
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-navy-900/10 pt-6 text-xs text-navy-500 sm:flex-row dark:border-white/10 dark:text-slate-500">
          <p>
            © {year} RÉUSSIR POLYTECH · Collectif étudiant — École Polytechnique · Numéro WhatsApp :{' '}
            <span className="font-semibold text-gold-600 dark:text-gold-400">{WHATSAPP_NUMBER}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Icon name="zap" className="h-3.5 w-3.5 text-gold-500" />
            Conçu par des ingénieurs, pour des ingénieurs.
          </p>
        </div>
      </div>
    </footer>
  );
}
