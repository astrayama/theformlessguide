import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { Arrow } from './Icons';
import { PRACTICES } from '../library';

const BLUE = '#1a5fb4';

export default function StillnessSection() {
  const [burden, setBurden] = useState('');
  const [releasing, setReleasing] = useState(null); // text being released
  const [released, setReleased] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const reduced = useReducedMotion();

  const handleRelease = useCallback(() => {
    if (!burden.trim()) return;
    setReleasing(burden.trim());
    setBurden('');
    setTimeout(() => {
      setReleasing(null);
      setReleased(true);
    }, 2400);
  }, [burden]);

  const handleReset = useCallback(() => {
    setReleased(false);
    setReleasing(null);
    setBurden('');
  }, []);

  const scrollToGuides = () => {
    document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="stillness" className="relative py-28 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <SectionHeading
          section="stillness"
          align="center"
          title={<>A moment of <em>stillness</em></>}
          sub="Type a burden you wish to release below. Watch it fade into the void."
        />

        {/* The ritual */}
        <div className="sheet relative max-w-2xl mx-auto overflow-hidden px-6 sm:px-12 py-14 text-center">
          {/* Ink rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {[420, 300, 190, 90].map((d, i) => (
              <div key={d} className="absolute rounded-full"
                style={{ width: d, height: d, border: `1px solid rgba(26,95,180,${0.1 + i * 0.05})` }} />
            ))}
          </div>

          <div className="relative min-h-[190px] flex flex-col items-center justify-center">
            {/* The burden, written in ink, then dissolving */}
            <AnimatePresence>
              {releasing && (
                <motion.p
                  className="display absolute pointer-events-none text-ink"
                  style={{ fontSize: '1.6rem', fontStyle: 'italic', maxWidth: '90%' }}
                  initial={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  animate={{ opacity: 0, y: reduced ? 0 : -90, scale: reduced ? 1 : 1.25, filter: 'blur(14px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, ease: 'easeOut' }}
                >
                  "{releasing}"
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {!released ? (
                <motion.div
                  key="input"
                  className="w-full flex flex-col items-center gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: releasing ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="text"
                    value={burden}
                    onChange={(e) => setBurden(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRelease()}
                    placeholder="What weighs on you today?"
                    aria-label="A burden you wish to release"
                    disabled={!!releasing}
                    className="ink-input display w-full max-w-md bg-transparent text-center text-ink outline-none pb-3"
                    style={{ fontSize: '1.5rem', fontStyle: 'italic', borderBottom: `1.5px solid ${BLUE}`, caretColor: BLUE }}
                  />
                  <button
                    type="button"
                    onClick={handleRelease}
                    disabled={!burden.trim() || !!releasing}
                    className="btn-ink micro-label"
                    style={{ opacity: burden.trim() ? 1 : 0.55, cursor: burden.trim() ? 'pointer' : 'default' }}
                  >
                    RELEASE TO THE VOID
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="released"
                  className="flex flex-col items-center gap-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <p className="display text-ink" style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)', lineHeight: 1.35, maxWidth: '460px' }}>
                    The burden is released.<br />
                    <em style={{ color: BLUE }}>Now, master the space it left behind.</em>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button type="button" onClick={scrollToGuides} className="btn-ink micro-label">
                      MASTER THE VOID
                    </button>
                    <button type="button" onClick={handleReset} className="ink-link font-sans text-sm">
                      Release another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Guided practice */}
        <div className="max-w-4xl mx-auto mt-16">
          <p className="micro-label text-fog mb-2 text-center sm:text-left">KEEP PRACTICING</p>
          <ul>
            {PRACTICES.map((p, i) => (
              <li key={p.title}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="ink-row" style={{ '--c': BLUE }}>
                  <span className="micro-label" style={{ color: BLUE }} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="display block text-ink" style={{ fontSize: '1.45rem' }}>{p.title}</span>
                    <span className="block font-sans text-stone mt-1.5" style={{ fontSize: '1rem', lineHeight: 1.5 }}>{p.note}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="micro-label text-fog hidden sm:inline">{p.length.toUpperCase()}</span>
                    <span className="row-arrow"><Arrow className="w-5 h-5" /></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
