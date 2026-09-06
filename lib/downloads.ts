/**
 * Génération de documents de démonstration au format texte.
 * En production, ces boutons pointeront vers l’objet de stockage réel
 * (S3 / Cloudinary / etc.) géré depuis l’espace administrateur.
 */

export interface DownloadSpec {
  kind: 'TD' | 'Examen' | 'Correction';
  label: string;
  level: string;
  semester: string;
  unit: string;
  subject: string;
  count?: number;
}

const HEADER = [
  '══════════════════════════════════════════════════',
  '   R É U S S I R   P O L Y T E C H',
  '   « Réussir ensemble, construire l’excellence. »',
  '══════════════════════════════════════════════════',
  '',
].join('\n');

function buildContent(s: DownloadSpec): string {
  const rows: string[] = [
    `Type          : ${s.kind === 'TD' ? 'Fiches de TD' : s.kind === 'Examen' ? 'Épreuve / Examen' : 'Correction'}`,
    `Niveau        : ${s.level}`,
    `Semestre      : ${s.semester}`,
    `Unité         : ${s.unit}`,
    `Matière       : ${s.subject}`,
    s.count && s.kind !== 'Correction' ? `Documents     : ${s.count} page(s) regroupée(s)` : '',
    `Généré le     : ${new Date().toLocaleDateString('fr-FR')}`,
    '',
    '──────────────────────────────────────────────────',
    '',
    `Contenu — ${s.label}`,
    '',
  ];
  if (s.kind === 'TD') {
    const n = s.count ?? 1;
    for (let i = 1; i <= n; i++) {
      rows.push(
        `• Fiche TD n°${i} — ${s.subject}`,
        '   ▸ Objectifs de la séance',
        '   ▸ Cours synthétique (points clés, théorèmes, formules)',
        '   ▸ Exercices progressifs (facile → examen)',
        '   ▸ Astuces de révisants & pièges classiques',
        ''
      );
    }
  } else if (s.kind === 'Examen') {
    const n = s.count ?? 1;
    for (let i = 1; i <= n; i++) {
      rows.push(
        `• Épreuve n°${i} — ${s.subject}`,
        '   ▸ Sujet complet (format examen officiel)',
        '   ▸ Barème détaillé',
        '   ▸ Chrono conseillé par partie',
        ''
      );
    }
  } else {
    rows.push(
      '• Correction détaillée pas à pas',
      '  ▸ Méthode recommandée par exercice',
      '  ▸ Solutions complètes avec justifications',
      '  ▸ Erreurs fréquentes & points de vigilance',
      '  ▸ Points de chute au barème'
    );
  }
  rows.push(
    '',
    '──────────────────────────────────────────────────',
    '⚠  Document de démonstration — plateforme RÉUSSIR POLYTECH.',
    'Les versions complètes et mises à jour sont diffusées',
    'au travers du tableau de bord étudiant et des séances',
    'de travail encadrées par le collectif.',
    '',
    'Support : +237 6 72 35 64 41 (WhatsApp)',
    '© 2026 RÉUSSIR POLYTECH — École Polytechnique'
  );
  return HEADER + rows.join('\n');
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function downloadResource(spec: DownloadSpec): string {
  const fileName =
    `${slug(spec.level)}-${slug(spec.semester)}-${slug(spec.unit)}-${slug(spec.subject)}-${
      spec.kind === 'TD' ? 'fiches-TD' : spec.kind === 'Examen' ? 'epreuve' : 'correction'
    }.txt`;
  if (typeof document !== 'undefined') {
    const blob = new Blob([buildContent(spec)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  return fileName;
}
