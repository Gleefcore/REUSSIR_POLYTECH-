import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import PageTransition from '@/components/layout/PageTransition';
import ScrollProgress from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  title: {
    default: 'RÉUSSIR POLYTECH — Réussir ensemble, construire l’excellence',
    template: '%s — RÉUSSIR POLYTECH',
  },
  description:
    'RÉUSSIR POLYTECH est un collectif d’étudiants ingénieurs de l’École Polytechnique qui transforme l’apprentissage individuel en réussite collective : ressources, entraide, rigueur, solidarité et ambition.',
  keywords: [
    'RÉUSSIR POLYTECH',
    'École Polytechnique',
    'ingénieurs',
    'MSP1',
    'MSP2',
    'entraide',
    'excellence académique',
  ],
  openGraph: {
    title: 'RÉUSSIR POLYTECH — Réussir ensemble, construire l’excellence',
    description:
      'La communauté d’ingénieurs qui prépare les leaders technologiques de demain.',
    locale: 'fr_FR',
    type: 'website',
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('rp-theme');var d=t?t==='dark':true;var c=document.documentElement;if(d){c.classList.add('dark');}else{c.classList.remove('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
