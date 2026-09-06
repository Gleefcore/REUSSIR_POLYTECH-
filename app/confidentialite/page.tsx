import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Icon from '@/components/ui/Icon';
import { WHATSAPP_DISPLAY, waLink } from '@/lib/whatsapp';

const SECTIONS = [
  {
    icon: 'shield' as const,
    title: '1. Protection des données des étudiants',
    items: [
      'Seules les informations strictement nécessaires au fonctionnement de votre espace étudiant sont collectées : nom complet, email, téléphone et niveau (MSP1 / MSP2).',
      'Les données ne sont jamais vendues, cédées ou partagées à des tiers commerciaux.',
      'Les documents et corrections protégés ne sont transmis qu’aux personnes qui en ont fait la demande, après vérification par l’équipe.',
      'Vous pouvez demander à tout moment la suppression complète de votre compte et de vos données.',
    ],
  },
  {
    icon: 'file-text' as const,
    title: '2. Utilisation des informations collectées',
    items: [
      'Personnalisation de votre tableau de bord : ressources proposées selon votre niveau, historique de téléchargements, notifications ciblées.',
      'Vérification des demandes d’accès aux corrections protégées et aux formations VIP via WhatsApp.',
      'Amélioration continue de la plateforme : statistiques d’usage anonymisées pour identifier les ressources les plus utiles.',
      'Communication officielle du collectif : annonces de séances de travail, mises à jour des ressources et événements.',
    ],
  },
  {
    icon: 'lock' as const,
    title: '3. Sécurité des comptes',
    items: [
      'Votre mot de passe est le seul élément qui vous donne accès à votre espace. Ne le partagez jamais.',
      'Les sessions sont gérées localement sur votre appareil ; nous vous recommandons de vous déconnecter sur un appareil partagé.',
      'L’accès aux ressources protégées est tracé : chaque demande est horodatée et associée à votre identité d’étudiant.',
      'Toute activité suspecte peut conduire à la suspension temporaire d’un compte, après vérification par l’équipe administrative.',
    ],
  },
  {
    icon: 'eye' as const,
    title: '4. Respect de la confidentialité',
    items: [
      'Les échanges entre étudiants lors des séances de travail restent strictement internes au collectif.',
      'Les informations transmises via WhatsApp dans le cadre d’une demande d’accès ne sont utilisées que pour traiter cette demande.',
      'Les témoignages et participations sont publiés uniquement avec l’accord de leur auteur.',
      'La gouvernance du collectif applique un principe de précaution : en cas de doute, la confidentialité l’emporte.',
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-36">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="badge-gold">
              <Icon name="shield" className="h-3.5 w-3.5" />
              Politique de confidentialité
            </span>
            <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl dark:text-white">
              Vos données, <span className="text-gradient-gold">notre responsabilité</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-600 dark:text-slate-300">
              RÉUSSIR POLYTECH traite les informations de ses membres avec la même rigueur que ses
              corrigés : clairement, de manière traçable, et uniquement pour ce pour quoi elles ont
              été demandées. Ce document décrit, en langage simple, ce que nous collectons, pourquoi,
              et comment vous conservez le contrôle.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-navy-400 dark:text-slate-500">
              Dernière mise à jour : septembre 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="card-premium p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-600 dark:text-gold-400">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-lg font-bold text-navy-900 dark:text-white">{s.title}</h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm leading-relaxed text-navy-600 dark:text-slate-400">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold-500/30 bg-gold-500/[0.06] p-7 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900 dark:text-white">Une question sur vos données ?</h2>
                <p className="mt-1.5 text-sm text-navy-600 dark:text-slate-400">
                  L’équipe administrative répond à toute demande d’accès, de rectification ou de
                  suppression — par WhatsApp {WHATSAPP_DISPLAY}.
                </p>
              </div>
              <a
                href={waLink('Bonjour, j’ai une question concernant la politique de confidentialité et mes données sur la plateforme RÉUSSIR POLYTECH.')}
                target="_blank"
                rel="noreferrer"
                className="btn-gold shrink-0"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Écrire à l’équipe
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Protection des données étudiants, utilisation des informations collectées, sécurité des comptes et respect de la confidentialité sur la plateforme RÉUSSIR POLYTECH.',
};
