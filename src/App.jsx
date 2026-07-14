import { useState, useEffect, useRef } from 'react';
import OpalField from './assets/OpalField';
import ParallaxBG from './assets/ParallaxBG';
import LeftSidebar from './components/LeftSidebar';
import ChakraNav from './components/ChakraNav';
import HeroSection from './components/HeroSection';
import GuidesSection from './components/GuidesSection';
import MomentsSection from './components/MomentsSection';
import AboutSection from './components/AboutSection';
import StillnessSection from './components/StillnessSection';
import CatalogSection from './components/CatalogSection';
import ShopSection from './components/ShopSection';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

const SECTIONS = ['hero', 'guides', 'catalog', 'moments', 'about', 'stillness', 'shop'];

function useActiveSection() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        {
          root: null,
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
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
      {/* Fixed opalescent field — tint follows the active section's chakra */}
      <OpalField activeSection={activeSection} />

      {/* Fixed parallax texture (stars + sacred geometry) over the field */}
      <ParallaxBG />

      {/* Mobile chakra top bar — sticky */}
      <div className="md:hidden sticky top-0 z-50">
        <ChakraNav activeSection={activeSection} />
      </div>

      {/* Fixed sidebars (desktop) */}
      <LeftSidebar />
      <div className="hidden md:block">
        <ChakraNav activeSection={activeSection} />
      </div>

      {/* Main content — padded to avoid sidebars on desktop */}
      <main className="relative z-10 md:px-16">
        <HeroSection />
        <GuidesSection />
        <CatalogSection />
        <MomentsSection />
        <AboutSection />
        <StillnessSection />
        <ShopSection />
        <Footer />
        
      </main>
      <Analytics />
    </div>
  );
}
