import type { Metadata } from 'next';
import MspLevelPage from '@/components/msp/MspLevelPage';
import { MSP1, MSP2 } from '@/lib/data/units';

export const metadata: Metadata = {
  title: 'Ressources MSP2',
  description:
    'Fiches de TD, épreuves et corrections du niveau MSP2, organisées par semestre et unité d’enseignement — par le collectif RÉUSSIR POLYTECH.',
};

export default function Msp2Page() {
  return <MspLevelPage data={MSP2} otherHref="/msp1" otherLabel="MSP1" />;
}
