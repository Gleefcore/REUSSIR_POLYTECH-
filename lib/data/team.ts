export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  tier: 'founding' | 'executive' | 'operations' | 'ambassador' | 'cadet';
}

export const TEAM: TeamMember[] = [
  {
    id: 'eugene-gwet',
    name: 'Eugène Samuel GWET',
    role: 'Cofondateur · PCA',
    description:
      'Fondateur de G-INNOVA, designer graphique freelance et leader certifié Coursera. Il pilote la vision stratégique et l’identité d’excellence du collectif.',
    image: '/images/team/eugene-gwet.jpg',
    tier: 'founding',
  },
  {
    id: 'stevia-matho-re',
    name: 'Stevia Matho Re',
    role: 'Cofondatrice · PDG',
    description:
      'Au cœur de la gouvernance, elle orchestre la stratégie de RÉUSSIR POLYTECH et veille à ce que chaque initiative porte ses ambitions.',
    image: '/images/team/stevia-matho-re.jpg',
    tier: 'founding',
  },
  {
    id: 'alex-ngoua-edou',
    name: 'Alex Ngoua Edou',
    role: 'Secrétaire Général',
    description:
      'Proche collaborateur du PCA, il assure la coordination administrative, les partenariats et le bon fonctionnement quotidien du collectif.',
    image: '/images/team/alex-ngoua-edou.jpg',
    tier: 'executive',
  },
  {
    id: 'khouya-christian',
    name: 'Khouya Christian',
    role: 'Cofondateur · Trésorier',
    description:
      'Gardien de la rigueur financière, il sécurise les ressources et le développement durable du collectif.',
    image: '/images/team/khouya-christian.jpg',
    tier: 'founding',
  },
  {
    id: 'sarah-ondoual-ella',
    name: 'Sarah Ondoual Ella',
    role: 'Cofondatrice',
    description:
      'Moteur de la dynamique de groupe, elle incarne la solidarité et la bienveillance qui font la force de la communauté.',
    image: '/images/team/sarah-ondoual-ella.jpg',
    tier: 'founding',
  },
  {
    id: 'bikey-yannick',
    name: 'Bikey Yannick',
    role: 'Directeur Informatique & Opérationnel',
    description:
      'Architecte de la plateforme, il conçoit les outils numériques et pilote les opérations technologiques du collectif.',
    image: '/images/team/bikey-yannick.jpg',
    tier: 'executive',
  },
  {
    id: 'loice-tadontsa',
    name: 'Loïce Tadontsa',
    role: 'Coordinatrice des Activités & Séances de Travail',
    description:
      'Elle orchestre les sessions de révision, les ateliers et les séances de travail pour un apprentissage au sommet.',
    image: '/images/team/loice-tadontsa.jpg',
    tier: 'operations',
  },
  {
    id: 'rose-mbog',
    name: 'Rose Mbog',
    role: 'Directrice Informatique Adjointe · Responsable Matériel Technique',
    description:
      'Elle garantit l’infrastructure, le matériel et la disponibilité permanente de l’ensemble des outils du collectif.',
    image: '/images/team/rose-mbog.jpg',
    tier: 'operations',
  },
  {
    id: 'emmanuella-amour',
    name: 'Emmanuella Amour',
    role: 'Ambassadrice n°1',
    description:
      'Visage du collectif, elle porte la voix de RÉUSSIR POLYTECH et fédère la communauté étudiante.',
    image: '/images/team/emmanuella-amour.jpg',
    tier: 'ambassador',
  },
  {
    id: 'atyame-yolande',
    name: 'Atyame Yolande',
    role: 'Ambassadrice n°2',
    description:
      'Aux côtés de l’ambassadrice, elle développe le rayonnement du collectif et la mobilisation des étudiants.',
    image: '/images/team/atyame-yolande.jpg',
    tier: 'ambassador',
  },
  {
    id: 'franck',
    name: 'Franck',
    role: 'Communication · Assistant SG',
    description:
      'Il façonne la communication du collectif et soutient la direction générale au quotidien.',
    image: '/images/team/franck.jpg',
    tier: 'operations',
  },
  {
    id: 'pacha',
    name: 'Pacha',
    role: 'Leader des Cadets Généralistes',
    description:
      'Il accompagne les cadets généralistes dans leur montée en compétence et leur intégration au collectif.',
    image: '/images/team/pacha.jpg',
    tier: 'cadet',
  },
  {
    id: 'bicrouge',
    name: 'Bicrouge',
    role: 'Leader des Cadets Techniciens',
    description:
      'Il encadre les cadets techniciens et transmet l’esprit ingénieur de la première ligne.',
    image: '/images/team/bicrouge.jpg',
    tier: 'cadet',
  },
];
