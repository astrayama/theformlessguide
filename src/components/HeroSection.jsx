import { motion } from 'framer-motion';
import HeroSVG from '../assets/HeroSVG';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Hero SVG background */}
      <HeroSVG />

      {/* Tall gradient fade — the artwork dissolves into the opal field, no hard seam */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,14,26,0.2) 0%, rgba(10,14,26,0.45) 55%, rgba(10,14,26,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="font-cinzel font-medium text-cream text-glow-white mb-6 leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(0,245,212,0.4), 0 0 80px rgba(0,245,212,0.15)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          The Formless Guide
        </motion.h1>

        <motion.p
          className="font-sans font-light text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        >
          Where myth meets mindfulness and presence becomes practice. Reclaim your truth,
          bridge the unknown, and awaken the superconscious.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          <a
            href="https://www.youtube.com/playlist?list=PLg1ZRqch8VjPS8d6HN9F3Ugbw7fr2pWKH"
            target="_blank"
            rel="noopener noreferrer"
            className="micro-label px-8 py-3.5 rounded transition-all duration-300"
            style={{
              color: '#00f5d4',
              border: '1.5px solid #00f5d4',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,245,212,0.08)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,212,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            BEGIN THE JOURNEY
          </a>

          <a
            href="https://open.spotify.com/show/2oPHFNP3WpLH0Kg8jQsl3I"
            target="_blank"
            rel="noopener noreferrer"
            className="micro-label px-8 py-3.5 rounded transition-all duration-300"
            style={{
              color: '#f2ecdf',
              border: '1.5px solid rgba(232,224,208,0.3)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(232,224,208,0.05)';
              e.currentTarget.style.borderColor = 'rgba(232,224,208,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(232,224,208,0.3)';
            }}
          >
            LISTEN ON SPOTIFY
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="micro-label" style={{ color: '#8a96b8', fontSize: '11px' }}>SCROLL</span>
        <div className="animate-bounce-chevron">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="#00f5d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
