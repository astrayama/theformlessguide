import { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';

// drifting embers around the enso — fixed layout so renders are stable
const EMBERS = [
  { left: '16%', top: '70%', size: 3, delay: 0, dur: 12, color: 'rgba(0,245,212,0.55)' },
  { left: '24%', top: '62%', size: 2, delay: 3.2, dur: 14, color: 'rgba(242,236,223,0.45)' },
  { left: '31%', top: '74%', size: 2.5, delay: 6.5, dur: 11, color: 'rgba(0,245,212,0.4)' },
  { left: '42%', top: '68%', size: 2, delay: 1.6, dur: 13, color: 'rgba(255,215,0,0.4)' },
  { left: '50%', top: '78%', size: 3, delay: 8.4, dur: 15, color: 'rgba(242,236,223,0.5)' },
  { left: '58%', top: '66%', size: 2, delay: 4.8, dur: 12, color: 'rgba(0,245,212,0.5)' },
  { left: '66%', top: '73%', size: 2.5, delay: 10.2, dur: 13, color: 'rgba(123,47,255,0.45)' },
  { left: '73%', top: '64%', size: 2, delay: 2.4, dur: 14, color: 'rgba(242,236,223,0.4)' },
  { left: '81%', top: '71%', size: 3, delay: 7.3, dur: 12, color: 'rgba(0,245,212,0.45)' },
  { left: '37%', top: '58%', size: 1.5, delay: 5.6, dur: 16, color: 'rgba(242,236,223,0.35)' },
  { left: '62%', top: '57%', size: 1.5, delay: 9.1, dur: 15, color: 'rgba(255,215,0,0.35)' },
  { left: '20%', top: '55%', size: 2, delay: 11.5, dur: 13, color: 'rgba(123,47,255,0.35)' },
  { left: '87%', top: '60%', size: 2, delay: 1.1, dur: 14, color: 'rgba(0,245,212,0.35)' },
  { left: '48%', top: '52%', size: 1.5, delay: 12.8, dur: 17, color: 'rgba(242,236,223,0.3)' },
];

const TITLE_WORDS = ['The', 'Formless', 'Guide'];

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
};
const titleWord = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

export default function HeroSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  // pointer parallax — the enso and its glow drift gently opposite the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 16 });
  const sy = useSpring(my, { stiffness: 40, damping: 16 });
  const ensoX = useTransform(sx, v => v * -12);
  const ensoY = useTransform(sy, v => v * -12);
  const glowX = useTransform(sx, v => v * -24);
  const glowY = useTransform(sy, v => v * -24);

  const onPointerMove = useCallback(
    e => {
      if (reduced || e.pointerType === 'touch') return;
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [reduced, mx, my]
  );

  // scroll push-through — leaving the hero, the ring swells toward the
  // viewer and dissolves while the words sink away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const ensoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.22]);
  const ensoFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const contentFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
      onPointerMove={onPointerMove}
    >
      {/* Glow bloom behind the enso */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: glowX, y: glowY, opacity: ensoFade, zIndex: 0 }}
      >
        <div className="hero-glow" style={{ width: 'min(72vmin, 580px)', height: 'min(72vmin, 580px)' }} />
      </motion.div>

      {/* Enso artwork — breathing, its smoke core slowly revolving */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: ensoX, y: ensoY, scale: ensoScale, opacity: ensoFade, zIndex: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        >
          <div className="enso-breathe relative" style={{ width: 'min(88vmin, 720px)', aspectRatio: '1 / 1' }}>
            <img
              src="/enso-1024.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.55, filter: 'drop-shadow(0 0 60px rgba(0,245,212,0.12))' }}
            />
            <img
              src="/enso-1024.png"
              alt=""
              aria-hidden="true"
              className="enso-smoke-layer absolute inset-0 w-full h-full"
              style={{ opacity: 0.45 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Embers drifting up around the ring */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: e.left,
              top: e.top,
              width: `${e.size}px`,
              height: `${e.size}px`,
              background: e.color,
              boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
              '--delay': `${e.delay}s`,
              '--dur': `${e.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Legibility gradient + cinematic vignette; dissolves into the field below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,14,26,0) 45%, rgba(6,9,18,0.5) 100%), linear-gradient(to bottom, rgba(10,14,26,0.2) 0%, rgba(10,14,26,0.45) 55%, rgba(10,14,26,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentFade }}
      >
        <motion.h1
          className="font-cinzel font-medium text-cream text-glow-white mb-6 leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(0,245,212,0.4), 0 0 80px rgba(0,245,212,0.15)',
          }}
          variants={titleContainer}
          initial="hidden"
          animate="show"
        >
          {TITLE_WORDS.map(word => (
            <motion.span key={word} variants={titleWord} className="inline-block" style={{ marginRight: '0.28em' }}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="font-sans font-light text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
        >
          Where myth meets mindfulness and presence becomes practice. Reclaim your truth,
          bridge the unknown, and awaken the superconscious.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
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
