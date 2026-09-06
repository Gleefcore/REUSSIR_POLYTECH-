export const WHATSAPP_NUMBER = '672356441';
export const WHATSAPP_INTL = '237672356441';
export const WHATSAPP_DISPLAY = '+237 6 72 35 64 41';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
}

export function accessRequestMessage(opts: {
  subject: string;
  level: string;
  semester?: string;
  unit?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const ctx = [opts.level, opts.semester, opts.unit].filter(Boolean).join(' — ');
  return [
    'Bonjour RÉUSSIR POLYTECH 👋',
    `Je souhaite accéder à la correction : ${opts.subject}.`,
    ctx ? `Niveau : ${ctx}.` : '',
    '',
    `Nom : ${opts.name}`,
    `Email : ${opts.email}`,
    `Téléphone : ${opts.phone}`,
    `Message : ${opts.message || '—'}`,
    '',
    'Merci de me faire parvenir la correction. 🙏',
  ]
    .filter((l) => l !== '')
    .join('\n');
}

export function vipAccessMessage(opts: {
  formation: string;
  name?: string;
  email?: string;
  phone?: string;
}): string {
  return [
    'Bonjour RÉUSSIR POLYTECH VIP 👋',
    `Je souhaite obtenir l’accès à la formation : ${opts.formation}.`,
    '',
    opts.name ? `Nom : ${opts.name}` : '',
    opts.email ? `Email : ${opts.email}` : '',
    opts.phone ? `Téléphone : ${opts.phone}` : '',
    '',
    `Je suis prêt à effectuer le paiement Orange Money auprès de l’équipe.`,
  ]
    .filter((l) => l !== '')
    .join('\n');
}
