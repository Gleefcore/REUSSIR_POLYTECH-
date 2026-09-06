import type { Metadata } from 'next';
import MspLevelPage from '@/components/msp/MspLevelPage';
import { MSP1, MSP2 } from '@/lib/data/units';

export const metadata: Metadata = {
  title: 'Ressources MSP1',
  description:
    'Fiches de TD, épreuves et corrections du niveau MSP1, organisées par semestre et unité d’enseignement — par le collectif RÉUSSIR POLYTECH.',
};

export default function Msp1Page() {
  return <MspLevelPage data={MSP1} otherHref="/msp2" otherLabel="MSP2" />;
}
