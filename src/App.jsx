import { useState, useEffect } from 'react';
import PaperField from './assets/PaperField';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GuidesSection from './components/GuidesSection';
import TeachingsSection from './components/TeachingsSection';
import AboutSection from './components/AboutSection';
import StillnessSection from './components/StillnessSection';
import CatalogSection from './components/CatalogSection';
import ShopSection from './components/ShopSection';
import Footer from './components/Footer';
import MusicFAB from './components/MusicFAB';
import { SECTIONS } from './library';
import { Analytics } from "@vercel/analytics/react"

// Which section sits across the middle of the screen. The header dots and the
// paper's watercolor tint both follow it.
function useActiveSection() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export default function App() {
  const activeSection = useActiveSection();

  return (
    <div className="relative min-h-screen">
      {/* Fixed paper, grain and watercolor washes */}
      <PaperField activeSection={activeSection} />

      {/* Logo, section links and the chakra ladder */}
      <Header activeSection={activeSection} />

      {/* Sections run root to crown */}
      <main className="relative">
        <HeroSection />

        {/* The Guides keep their own night sky, set into the paper as a dark chamber */}
        <div className="void">
          <div className="void-glow" aria-hidden="true" />
          <GuidesSection />
        </div>

        <TeachingsSection />
        <AboutSection />
        <StillnessSection />
        <CatalogSection />
        <ShopSection />
        <Footer />
      </main>

      {/* Floating music player */}
      <MusicFAB />

      <Analytics />
    </div>
  );
}
