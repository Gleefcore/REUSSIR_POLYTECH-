import type { Metadata } from 'next';
import AuthPage from '@/components/auth/AuthPage';

export const metadata: Metadata = {
  title: 'Connexion étudiant',
  description:
    'Connectez-vous ou inscrivez-vous à votre espace étudiant RÉUSSIR POLYTECH pour accéder aux ressources, à votre historique et à vos notifications.',
};

export default function ConnexionRoute() {
  return <AuthPage />;
}
