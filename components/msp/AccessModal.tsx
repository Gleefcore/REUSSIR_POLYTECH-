'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { addRequest, getSession } from '@/lib/auth';
import { accessRequestMessage, waLink } from '@/lib/whatsapp';

export default function AccessModal({
  open,
  onClose,
  subject,
  level,
  semester,
  unit,
}: {
  open: boolean;
  onClose: () => void;
  subject: string;
  level: string;
  semester: string;
  unit: string;
}) {
  const session = getSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open && session) {
      setName((v) => v || session.name);
      setEmail((v) => v || session.email);
      setPhone((v) => v || session.phone);
    }
  }, [open, session]);

  useEffect(() => {
    if (!open) {
      setSent(false);
    }
  }, [open]);

  const submit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    addRequest({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject,
      context: `${level} · ${semester} · ${unit}`,
      message: message.trim(),
      source: 'correction',
    });
    const text = accessRequestMessage({ subject, level, semester, unit, name, email, phone, message });
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
    setTimeout(onClose, 1600);
  };

  const valid = name.trim() && email.trim() && phone.trim();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card-premium relative w-full max-w-lg !bg-white p-7 dark:!bg-navy-900"
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg text-navy-400 transition hover:bg-navy-900/5 hover:text-navy-700 dark:text-slate-500 dark:hover:bg-white/5"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                  <Icon name="check" className="h-8 w-8" />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold text-navy-900 dark:text-white">Demande envoyée !</h3>
                <p className="mt-2 max-w-xs text-sm text-navy-600 dark:text-slate-400">
                  Votre demande a été transmise sur WhatsApp. L’équipe vous répondra rapidement.
                </p>
              </div>
            ) : (
              <>
                <span className="badge-gold">
                  <Icon name="lock" className="h-3.5 w-3.5" />
                  Correction protégée
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold text-navy-900 dark:text-white">
                  Demander l’accès à la correction
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-slate-400">
                  <strong className="text-navy-800 dark:text-slate-200">{subject}</strong> — {level} · {semester} · {unit}
                  <br />
                  Renseignez vos informations puis envoyez la demande directement sur le WhatsApp de l’équipe.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="am-name" className="field-label">Nom</label>
                    <input id="am-name" className="input-premium" placeholder="Votre nom complet" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="am-email" className="field-label">Email</label>
                      <input id="am-email" type="email" className="input-premium" placeholder="vous@polytechnique.cm" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="am-phone" className="field-label">Téléphone</label>
                      <input id="am-phone" className="input-premium" placeholder="6XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="am-msg" className="field-label">Message</label>
                    <textarea id="am-msg" rows={3} className="input-premium resize-none" placeholder="Votre message (facultatif)" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                </div>

                <button
                  onClick={submit}
                  disabled={!valid}
                  className="btn-gold mt-6 w-full !bg-gradient-to-r !from-emerald-500 !to-emerald-600 !text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Envoyer sur WhatsApp
                </button>
                <p className="mt-3 text-center text-[11px] text-navy-400 dark:text-slate-500">
                  Redirection vers WhatsApp · +237 6 72 35 64 41 — la demande est aussi tracée dans votre historique.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
