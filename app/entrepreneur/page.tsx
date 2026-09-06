import type { Metadata } from 'next';
import EntrepreneurPage from '@/components/entrepreneur/EntrepreneurPage';

export const metadata: Metadata = {
  title: 'Ressources entrepreneur',
  description:
    'Inspiration, méthode et opportunités pour les étudiants ingénieurs entrepreneurs : innovation, création de projets, gestion de projet, leadership.',
};

export default function EntrepreneurRoute() {
  return <EntrepreneurPage />;
}
