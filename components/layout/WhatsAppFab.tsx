'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { waLink } from '@/lib/whatsapp';

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink('Bonjour RÉUSSIR POLYTECH 👋 Je visite votre plateforme et j’aimerais des informations.')}
          target="_blank"
          rel="noreferrer"
          aria-label="Contacter l’équipe sur WhatsApp"
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-6 right-6 z-[60] flex items-center gap-0 overflow-hidden rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 p-4 text-navy-950 shadow-[0_10px_40px_rgba(245,165,36,0.45)] transition-all duration-300 hover:gap-2 hover:px-5 hover:shadow-[0_12px_48px_rgba(245,165,36,0.6)]"
        >
          <span className="absolute inset-0 rounded-full ring-2 ring-gold-400/50 animate-ping [animation-duration:2.2s]" aria-hidden />
          <Icon name="whatsapp" className="relative h-5 w-5" />
          <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[110px] group-hover:pl-1">
            WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
