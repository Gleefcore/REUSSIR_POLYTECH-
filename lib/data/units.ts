export type CorrectionState = 'free' | 'protected';

export interface Subject {
  id: string;
  name: string;
  tdCount: number;
  examCount: number;
  correction: CorrectionState;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

export interface Semester {
  id: string;
  name: string;
  units: Unit[];
}

export interface LevelData {
  code: 'MSP1' | 'MSP2';
  title: string;
  tagline: string;
  semesters: Semester[];
}

export const unitResourceCount = (u: Unit): number =>
  u.subjects.reduce(
    (acc, s) => acc + s.tdCount + s.examCount + 1,
    0
  );

export const levelResourceCount = (l: LevelData): number =>
  l.semesters.reduce(
    (acc, sem) => acc + sem.units.reduce((a, u) => a + unitResourceCount(u), 0),
    0
  );

export const MSP1: LevelData = {
  code: 'MSP1',
  title: 'MSP1 — Première année de Master Spécialisé Professionnel',
  tagline:
    'Consolider les fondamentaux de l’ingénieur et maîtriser les méthodes qui font la différence.',
  semesters: [
    {
      id: 'msp1-s1',
      name: 'Semestre 1',
      units: [
        {
          id: 'msp1-u1',
          name: 'Mathématiques Appliquées',
          description:
            'Le socle quantitatif de l’ingénieur : algèbre, probabilités et calcul numérique.',
          subjects: [
            { id: 'msp1-u1-s1', name: 'Algèbre linéaire', tdCount: 4, examCount: 3, correction: 'free' },
            { id: 'msp1-u1-s2', name: 'Probabilités & Statistiques', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u1-s3', name: 'Analyse numérique', tdCount: 3, examCount: 2, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u2',
          name: 'Mécanique & Structures',
          description:
            'Dimensionner, calculer, vérifier : la mécanique appliquée au cœur de l’ingénierie.',
          subjects: [
            { id: 'msp1-u2-s1', name: 'Résistance des matériaux', tdCount: 5, examCount: 3, correction: 'free' },
            { id: 'msp1-u2-s2', name: 'Mécanique des fluides', tdCount: 4, examCount: 2, correction: 'protected' },
            { id: 'msp1-u2-s3', name: 'Géotechnique & Mécanique des sols', tdCount: 3, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u3',
          name: 'Électricité & Électronique',
          description:
            'Du circuit élémentaire à la machine électrique : maîtriser l’énergie.',
          subjects: [
            { id: 'msp1-u3-s1', name: 'Circuits électriques', tdCount: 4, examCount: 3, correction: 'free' },
            { id: 'msp1-u3-s2', name: 'Électronique analogique & numérique', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u3-s3', name: 'Machines électriques', tdCount: 4, examCount: 2, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u4',
          name: 'Informatique & Systèmes',
          description:
            'Coder, structurer, connecter : les fondations numériques de l’ingénieur.',
          subjects: [
            { id: 'msp1-u4-s1', name: 'Algorithmique & programmation', tdCount: 5, examCount: 4, correction: 'free' },
            { id: 'msp1-u4-s2', name: 'Bases de données', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u4-s3', name: 'Réseaux informatiques', tdCount: 3, examCount: 2, correction: 'free' },
          ],
        },
      ],
    },
    {
      id: 'msp1-s2',
      name: 'Semestre 2',
      units: [
        {
          id: 'msp1-u5',
          name: 'Thermique & Procédés',
          description:
            'Transformations d’énergie et conception de procédés industriels.',
          subjects: [
            { id: 'msp1-u5-s1', name: 'Thermodynamique appliquée', tdCount: 4, examCount: 2, correction: 'free' },
            { id: 'msp1-u5-s2', name: 'Phénomènes de transferts', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u5-s3', name: 'Conception de procédés', tdCount: 3, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u6',
          name: 'Gestion de Production',
          description:
            'Piloter les systèmes de production avec méthode, coût et performance.',
          subjects: [
            { id: 'msp1-u6-s1', name: 'Organisation & pilotage de la production', tdCount: 4, examCount: 2, correction: 'free' },
            { id: 'msp1-u6-s2', name: 'Économie & gestion industrielle', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u6-s3', name: 'Qualité & fiabilité', tdCount: 2, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u7',
          name: 'Signaux & Automatique',
          description:
            'Mesurer, traiter, commander : la chaîne automatique complète.',
          subjects: [
            { id: 'msp1-u7-s1', name: 'Traitement du signal', tdCount: 4, examCount: 3, correction: 'free' },
            { id: 'msp1-u7-s2', name: 'Automatique & asservissements', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp1-u7-s3', name: 'Instrumentation & métrologie', tdCount: 3, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp1-u8',
          name: 'Méthodologie Scientifique',
          description:
            'Conduire une démarche de recherche rigoureuse, documentée et reproductible.',
          subjects: [
            { id: 'msp1-u8-s1', name: 'Recherche documentaire & veille', tdCount: 3, examCount: 1, correction: 'free' },
            { id: 'msp1-u8-s2', name: 'Méthodologie de PFE', tdCount: 2, examCount: 1, correction: 'protected' },
          ],
        },
      ],
    },
  ],
};

export const MSP2: LevelData = {
  code: 'MSP2',
  title: 'MSP2 — Deuxième année de Master Spécialisé Professionnel',
  tagline:
    'Passer à l’expert : modélisation avancée, data, leadership et projet de fin d’études.',
  semesters: [
    {
      id: 'msp2-s1',
      name: 'Semestre 1',
      units: [
        {
          id: 'msp2-u9',
          name: 'Modélisation Avancée',
          description:
            'Des modèles mathématiques et numériques de niveau expert.',
          subjects: [
            { id: 'msp2-u9-s1', name: 'Optimisation avancée', tdCount: 4, examCount: 2, correction: 'free' },
            { id: 'msp2-u9-s2', name: 'Éléments finis & simulation', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp2-u9-s3', name: 'Calcul scientifique', tdCount: 3, examCount: 2, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u10',
          name: 'Électronique Embarquée',
          description:
            'Concevoir et programmer des systèmes intelligents et connectés.',
          subjects: [
            { id: 'msp2-u10-s1', name: 'Microcontrôleurs & systèmes embarqués', tdCount: 4, examCount: 3, correction: 'free' },
            { id: 'msp2-u10-s2', name: 'Automatisation industrielle', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp2-u10-s3', name: 'IoT & systèmes connectés', tdCount: 3, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u11',
          name: 'Data Science & IA',
          description:
            'Extraire la valeur des données et automatiser l’intelligence.',
          subjects: [
            { id: 'msp2-u11-s1', name: 'Machine learning', tdCount: 4, examCount: 3, correction: 'free' },
            { id: 'msp2-u11-s2', name: 'Analyse & visualisation de données', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp2-u11-s3', name: 'Deep learning', tdCount: 2, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u12',
          name: 'Entrepreneuriat & Innovation',
          description:
            'Transformer une idée d’ingénieur en projet viable et finançable.',
          subjects: [
            { id: 'msp2-u12-s1', name: 'Business plan & finance de projet', tdCount: 3, examCount: 2, correction: 'free' },
            { id: 'msp2-u12-s2', name: 'Gestion de l’innovation', tdCount: 2, examCount: 1, correction: 'protected' },
            { id: 'msp2-u12-s3', name: 'Propriété intellectuelle', tdCount: 2, examCount: 1, correction: 'free' },
          ],
        },
      ],
    },
    {
      id: 'msp2-s2',
      name: 'Semestre 2',
      units: [
        {
          id: 'msp2-u13',
          name: 'Projet de Fin d’Études',
          description:
            'Le couronnement du parcours : recherche, réalisation et soutenance.',
          subjects: [
            { id: 'msp2-u13-s1', name: 'Encadrement & suivi de PFE', tdCount: 3, examCount: 1, correction: 'free' },
            { id: 'msp2-u13-s2', name: 'Rédaction scientifique', tdCount: 4, examCount: 2, correction: 'protected' },
            { id: 'msp2-u13-s3', name: 'Préparation à la soutenance', tdCount: 3, examCount: 2, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u14',
          name: 'Pilotage Avancé de Projets',
          description:
            'Gouverner des projets complexes, multi-acteurs, multi-contraintes.',
          subjects: [
            { id: 'msp2-u14-s1', name: 'Gouvernance & gestion des risques', tdCount: 3, examCount: 2, correction: 'free' },
            { id: 'msp2-u14-s2', name: 'Lean management', tdCount: 3, examCount: 1, correction: 'protected' },
            { id: 'msp2-u14-s3', name: 'Conduite du changement', tdCount: 2, examCount: 1, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u15',
          name: 'Communication & Leadership',
          description:
            'Influencer, fédérer et présenter avec impact.',
          subjects: [
            { id: 'msp2-u15-s1', name: 'Communication technique', tdCount: 3, examCount: 2, correction: 'free' },
            { id: 'msp2-u15-s2', name: 'Négociation & management', tdCount: 2, examCount: 1, correction: 'protected' },
            { id: 'msp2-u15-s3', name: 'Prise de parole publique', tdCount: 3, examCount: 2, correction: 'free' },
          ],
        },
        {
          id: 'msp2-u16',
          name: 'Synthèse Professionnelle',
          description:
            'Bâtir son parcours et affirmer son identité professionnelle.',
          subjects: [
            { id: 'msp2-u16-s1', name: 'Portfolio & CV d’ingénieur', tdCount: 3, examCount: 1, correction: 'free' },
            { id: 'msp2-u16-s2', name: 'Préparation aux entretiens', tdCount: 3, examCount: 2, correction: 'protected' },
            { id: 'msp2-u16-s3', name: 'Réseau & marque personnelle', tdCount: 2, examCount: 1, correction: 'free' },
          ],
        },
      ],
    },
  ],
};
