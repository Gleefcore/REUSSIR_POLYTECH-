export type CorrectionState = 'free' | 'protected';

export interface Unit {
  id: string;
  name: string;
  description: string;
  tdCount: number;
  examCount: number;
  correction: CorrectionState;
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

export const unitResourceCount = (u: Unit): number => u.tdCount + u.examCount + 1;

export const levelResourceCount = (l: LevelData): number =>
  l.semesters.reduce(
    (acc, sem) => acc + sem.units.reduce((a, u) => a + unitResourceCount(u), 0),
    0
  );

export const levelUnitCount = (l: LevelData): number =>
  l.semesters.reduce((acc, sem) => acc + sem.units.length, 0);

export const MSP1: LevelData = {
  code: 'MSP1',
  title: 'MSP1 — Niveau 1',
  tagline:
    'Le socle de l’ingénieur : analyse, algèbre, physique, informatique et dessin technique, semestre après semestre.',
  semesters: [
    {
      id: 'msp1-s1',
      name: 'Semestre 1',
      units: [
        {
          id: 'msp1-s1-01',
          name: 'Analyse réelle 1',
          description: 'Fonctions, suites, séries : bâtir la rigueur de l’analyse mathématique.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp1-s1-02',
          name: 'Algèbre Générale',
          description: 'Groupes, anneaux, corps : les structures abstraites au cœur des mathématiques.',
          tdCount: 4,
          examCount: 3,
          correction: 'protected',
        },
        {
          id: 'msp1-s1-03',
          name: 'Électromagnétisme 1',
          description: 'Électrostatique et magnétostatique : champs, forces et lois fondamentales.',
          tdCount: 3,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s1-04',
          name: 'Mécanique du point',
          description: 'Lois de Newton, travail et énergie : le mouvement de la masse ponctuelle.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s1-05',
          name: 'TP Physique',
          description: 'Pratique au laboratoire : mesures, incertitudes et démarche expérimentale.',
          tdCount: 3,
          examCount: 1,
          correction: 'free',
        },
        {
          id: 'msp1-s1-06',
          name: 'Informatique 1',
          description: 'Fondamentaux de la programmation : logique, algorithmique, premiers programmes.',
          tdCount: 5,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp1-s1-07',
          name: 'Éléments de Chimie',
          description: 'La matière et ses transformations : le socle scientifique de l’ingénieur.',
          tdCount: 3,
          examCount: 2,
          correction: 'protected',
        },
        {
          id: 'msp1-s1-08',
          name: 'Langue (Anglais/Français)',
          description: 'Communication technique en français et en anglais : les langues du travail d’ingénieur.',
          tdCount: 2,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s1-09',
          name: 'Dessin technique',
          description: 'Lire et produire des plans : le langage graphique de l’ingénieur.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s1-10',
          name: 'Comportement et Sport',
          description: 'Discipline personnelle et condition physique : les fondations de la performance.',
          tdCount: 2,
          examCount: 1,
          correction: 'free',
        },
      ],
    },
    {
      id: 'msp1-s2',
      name: 'Semestre 2',
      units: [
        {
          id: 'msp1-s2-01',
          name: 'Analyse réelle 2',
          description: 'Continuité, dérivabilité, intégration : l’analyse au sommet de sa maturité.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp1-s2-02',
          name: 'Géométrie euclidienne et affine',
          description: 'Structures de l’espace : vecteurs, transformations, objets géométriques.',
          tdCount: 3,
          examCount: 2,
          correction: 'protected',
        },
        {
          id: 'msp1-s2-03',
          name: 'Algèbre linéaire',
          description: 'Matrices, systèmes, espaces vectoriels : l’outil indispensable de l’ingénieur.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp1-s2-04',
          name: 'Électromagnétisme 2',
          description: 'Induction et ondes électromagnétiques : de Faraday à Maxwell.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s2-05',
          name: 'Technologie et sciences des matériaux',
          description: 'Propriétés mécaniques, électriques et optiques des matériaux et leur choix.',
          tdCount: 3,
          examCount: 1,
          correction: 'free',
        },
        {
          id: 'msp1-s2-06',
          name: 'Informatique 2',
          description: 'Programmation orientée objet et structures de données.',
          tdCount: 4,
          examCount: 3,
          correction: 'protected',
        },
        {
          id: 'msp1-s2-07',
          name: 'Langue (Anglais/Français)',
          description: 'Rédaction technique et expression orale dans les deux langues du travail.',
          tdCount: 2,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s2-08',
          name: 'Dessin technique',
          description: 'Dessin approfondi : projections, coupes, tolérances et normalisation.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp1-s2-09',
          name: 'Comportement et Sport',
          description: 'Esprit d’équipe et condition physique : le complément du travail académique.',
          tdCount: 2,
          examCount: 1,
          correction: 'free',
        },
      ],
    },
  ],
};

export const MSP2: LevelData = {
  code: 'MSP2',
  title: 'MSP2 — Niveau 2',
  tagline:
    'La montée en profondeur : algèbre avancée, probabilités, mécanique des solides, électricité et informatique appliquée.',
  semesters: [
    {
      id: 'msp2-s1',
      name: 'Semestre 1',
      units: [
        {
          id: 'msp2-s1-01',
          name: 'Algèbre multilinéaire',
          description: 'Tenseurs, formes, dualité : l’algèbre linéaire vue sous un angle avancé.',
          tdCount: 3,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp2-s1-02',
          name: 'Séries intégrales',
          description: 'Intégrales impropres, paramétriques : convergence et estimations.',
          tdCount: 4,
          examCount: 3,
          correction: 'protected',
        },
        {
          id: 'msp2-s1-03',
          name: 'Probabilités et statistiques',
          description: 'Variables aléatoires, lois, estimation : quantifier l’aléatoire.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp2-s1-04',
          name: 'Mécanique des solides',
          description: 'Solides rigides et déformables : équilibre, effort, déformation.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp2-s1-05',
          name: 'Électrocinétique',
          description: 'Circuits en régime permanent, courant alternatif, énergie et puissance.',
          tdCount: 3,
          examCount: 2,
          correction: 'protected',
        },
        {
          id: 'msp2-s1-06',
          name: 'TP Physique',
          description: 'Expériences avancées : instruments, protocoles et rapports de laboratoire.',
          tdCount: 3,
          examCount: 1,
          correction: 'free',
        },
        {
          id: 'msp2-s1-07',
          name: 'Informatique 3',
          description: 'Programmation structurée avancée et premiers projets de taille réelle.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp2-s1-08',
          name: 'Langue (Anglais/Français)',
          description: 'Textes scientifiques, résumés et présentations techniques bilingues.',
          tdCount: 2,
          examCount: 2,
          correction: 'free',
        },
      ],
    },
    {
      id: 'msp2-s2',
      name: 'Semestre 2',
      units: [
        {
          id: 'msp2-s2-01',
          name: 'Analyse dans les espaces vectoriels de dimensions finies',
          description: 'Normes, topologie et théorèmes avancés de l’analyse en dimension finie.',
          tdCount: 3,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp2-s2-02',
          name: 'Analyse numérique',
          description: 'Méthodes numériques : racines, interpolation, intégration et équations différentielles.',
          tdCount: 4,
          examCount: 3,
          correction: 'protected',
        },
        {
          id: 'msp2-s2-03',
          name: 'Circuits électriques et électroniques',
          description: 'Circuits analogiques et numériques : conception, dimensionnement et analyse.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp2-s2-04',
          name: 'Optique géométrique et ondulatoire',
          description: 'Systèmes optiques, interférence, diffraction : la double nature de la lumière.',
          tdCount: 3,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp2-s2-05',
          name: 'Thermodynamique',
          description: 'Énergie, chaleur, transformations : les lois qui gouvernent les systèmes physiques.',
          tdCount: 4,
          examCount: 2,
          correction: 'free',
        },
        {
          id: 'msp2-s2-06',
          name: 'Statique',
          description: 'Forces, équilibres et réactions : comprendre avant de calculer les structures.',
          tdCount: 3,
          examCount: 2,
          correction: 'protected',
        },
        {
          id: 'msp2-s2-07',
          name: 'Informatique 4',
          description: 'Projets avancés : architecture, qualité du code et documentation technique.',
          tdCount: 4,
          examCount: 3,
          correction: 'free',
        },
        {
          id: 'msp2-s2-08',
          name: 'Langue (Anglais/Français)',
          description: 'Expression professionnelle : rapports, soutenances et réseau scientifique.',
          tdCount: 2,
          examCount: 2,
          correction: 'free',
        },
      ],
    },
  ],
};
