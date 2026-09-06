import type { Metadata } from 'next';
import DashboardPage from '@/components/dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Tableau de bord étudiant',
  description:
    'Votre espace étudiant RÉUSSIR POLYTECH : ressources disponibles, historique de téléchargements, profil et notifications.',
};

export default function TableauDeBordRoute() {
  return <DashboardPage />;
}
