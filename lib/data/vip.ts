export interface VipFormation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  level: string;
  duration: string;
  preview: string[];
  accent: 'gold' | 'navy' | 'cyan' | 'violet';
}

export const VIP_FORMATIONS: VipFormation[] = [
  {
    id: 'vip-ia',
    name: 'Intelligence Artificielle',
    tagline: 'Déployer l’IA dans des cas réels',
    description:
      'De la régression aux LLM : comprendre, entraîner et intégrer des modèles d’intelligence artificielle dans des projets concrets d’entreprise.',
    level: 'Intermédiaire → Avancé',
    duration: '10 semaines',
    preview: [
      'Fondamentaux du machine learning',
      'IA générative & grands modèles de langage',
      'Mise en production & cas d’usage métier',
      'Projet final : un assistant IA fonctionnel',
    ],
    accent: 'gold',
  },
  {
    id: 'vip-prog',
    name: 'Programmation',
    tagline: 'De zéro à la production',
    description:
      'Python et JavaScript, architecture logicielle, bonnes pratiques et développement d’applications robustes, du premier script au déploiement.',
    level: 'Débutant',
    duration: '8 semaines',
    preview: [
      'Fondamentaux : Python & JavaScript',
      'Programmation orientée objet',
      'API, frameworks & bases de données',
      'Mini-projets encadrés chaque semaine',
    ],
    accent: 'navy',
  },
  {
    id: 'vip-info',
    name: 'Informatique',
    tagline: 'Les fondations solides du numérique',
    description:
      'Systèmes, réseaux, bases de données et cybersécurité : maîtriser l’infrastructure qui porte toutes les applications modernes.',
    level: 'Débutant → Intermédiaire',
    duration: '8 semaines',
    preview: [
      'Systèmes & architectures',
      'Réseaux & protocoles essentiels',
      'Sécurité des systèmes d’information',
      'Labs pratiques sur machine virtuelle',
    ],
    accent: 'cyan',
  },
  {
    id: 'vip-bureau',
    name: 'Bureautique Professionnelle',
    tagline: 'Excellence du quotidien',
    description:
      'Excel avancé, tableaux de bord Power BI, présentations de niveau exécutif : la productivité qui change la perception de votre travail.',
    level: 'Débutant',
    duration: '4 semaines',
    preview: [
      'Excel avancé : tableaux croisés, macros',
      'Power BI : tableaux de bord décisionnels',
      'Prise de notes & rédaction pro',
      'PowerPoint de niveau direction générale',
    ],
    accent: 'violet',
  },
  {
    id: 'vip-design',
    name: 'Design Intelligent',
    tagline: 'Penser et dessiner des produits digitaux',
    description:
      'UI/UX, Figma, design systems et prototypes : créer des interfaces élégantes qui servent la stratégie, pas seulement l’esthétique.',
    level: 'Intermédiaire',
    duration: '6 semaines',
    preview: [
      'Fondamentaux de l’UX & recherche utilisateur',
      'Maîtrise de Figma & design system',
      'Prototypage & tests utilisateurs',
      'Cas pratique : refonte d’une app réelle',
    ],
    accent: 'gold',
  },
  {
    id: 'vip-leader',
    name: 'Leadership',
    tagline: 'Conduire, décider, fédérer',
    description:
      'Posture de leader, prise de décision sous contrainte, management d’équipes projet : développer l’influence d’un ingénieur qui dirige.',
    level: 'Tous niveaux',
    duration: '6 semaines',
    preview: [
      'Fondations du leadership ingénieur',
      'Prise de décision & résolution de conflits',
      'Conduite d’équipes & déléguer efficacement',
      'Ateliers de mise en situation réels',
    ],
    accent: 'navy',
  },
  {
    id: 'vip-com',
    name: 'Communication',
    tagline: 'Parler, écrire, convaincre',
    description:
      'Prise de parole, argumentation, écriture professionnelle et présence en ligne : la compétence n°1 des ingénieurs qui montent.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    preview: [
      'Prise de parole & structure d’un discours',
      'Argumentation & persuasion',
      'Écriture professionnelle & e-mails qui comptent',
      'LinkedIn & personal branding',
    ],
    accent: 'cyan',
  },
  {
    id: 'vip-projet',
    name: 'Gestion de Projet',
    tagline: 'Mener des projets de A à Z',
    description:
      'Agile, Scrum, budgétisation, risques et parties prenantes : livrer des projets à temps, en qualité, même en contexte incertain.',
    level: 'Intermédiaire',
    duration: '8 semaines',
    preview: [
      'Cadres : Agile, Scrum, Kanban',
      'Planning, budget & jalons',
      'Gestion des risques & des parties prenantes',
      'Certification simulée + cas réel',
    ],
    accent: 'violet',
  },
];
