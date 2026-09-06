import type { Metadata } from 'next';
import AdminPage from '@/components/admin/AdminPage';

export const metadata: Metadata = {
  title: 'Espace administration',
  robots: { index: false, follow: false },
  description: 'Espace administrateur de la plateforme RÉUSSIR POLYTECH : documents, TD, examens, corrections, formations VIP et utilisateurs.',
};

export default function AdminRoute() {
  return <AdminPage />;
}
