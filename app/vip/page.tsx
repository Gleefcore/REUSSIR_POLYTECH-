import type { Metadata } from 'next';
import VipPage from '@/components/vip/VipPage';

export const metadata: Metadata = {
  title: 'RÉUSSIR POLYTECH VIP',
  description:
    'Formations professionnelles exclusives : intelligence artificielle, programmation, informatique, bureautique, design intelligent, leadership, communication et gestion de projet.',
};

export default function VipRoute() {
  return <VipPage />;
}
