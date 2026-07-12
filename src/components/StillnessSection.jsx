import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function StillnessSection() {
  const [burden, setBurden] = useState('');
  const [releasing, setReleasing] = useState(null); // text being released
  const [released, setReleased] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const handleRelease = useCallback(() => {
    if (!burden.trim()) return;
    setReleasing(burden.trim());
    setBurden('');
    setTimeout(() => {
      setReleasing(null);
      setReleased(true);
    }, 2200);
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
      {/* Top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,153,255,0.4), transparent)' }} />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="font-cinzel font-medium text-cream mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em' }}>
            A Moment of Stillness
          </h2>
          <p className="font-sans text-muted mb-14 max-w-md mx-auto">
            Type a burden you wish to release below. Watch it fade into the void.
          </p>
        </motion.div>

        {/* The void area */}
        <div className="relative min-h-48 flex flex-col items-center justify-center">
          {/* Void visual — concentric rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1.4, 1, 0.6, 0.3].map((scale, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  width: `${200 * scale}px`,
                  height: `${200 * scale}px`,
                  border: '1px solid rgba(0,153,255,0.1)',
                  opacity: 1 - i * 0.2,
                }} />
            ))}
            <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(0,153,255,0.2)' }} />
          </div>

          {/* Floating released text animation */}
          <AnimatePresence>
            {releasing && (
              <motion.p
                className="absolute font-sans italic pointer-events-none z-10"
                style={{ color: '#0099ff', fontSize: '1.1rem', maxWidth: '80%', textAlign: 'center' }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -120, scale: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              >
                "{releasing}"
              </motion.p>
            )}
          </AnimatePresence>

          {/* Input field — shown when not yet released */}
          <AnimatePresence mode="wait">
            {!released ? (
              <motion.div
                key="input"
                className="relative z-10 w-full flex flex-col items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: releasing ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass w-full max-w-lg rounded-xl px-6 pt-5 pb-4">
                  <input
                    type="text"
                    value={burden}
                    onChange={e => setBurden(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleRelease()}
                    placeholder="What weighs on you today?"
                    disabled={!!releasing}
                    className="w-full bg-transparent font-sans text-center text-cream text-lg outline-none placeholder-muted/40 pb-3"
                    style={{
                      borderBottom: '1px solid rgba(0,153,255,0.4)',
                      caretColor: '#0099ff',
                      color: '#f2ecdf',
                    }}
                  />
                </div>
                <button
                  onClick={handleRelease}
                  disabled={!burden.trim() || !!releasing}
                  className="micro-label px-8 py-3.5 rounded transition-all duration-300"
                  style={{
                    color: '#0099ff',
                    border: '1px solid rgba(0,153,255,0.5)',
                    background: 'transparent',
                    opacity: burden.trim() ? 1 : 0.4,
                  }}
                  onMouseEnter={e => {
                    if (burden.trim()) {
                      e.currentTarget.style.background = 'rgba(0,153,255,0.08)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0,153,255,0.3)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  RELEASE TO THE VOID
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="released"
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <p className="font-cinzel text-center leading-relaxed"
                  style={{
                    color: '#f2ecdf',
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                    textShadow: '0 0 20px rgba(0,153,255,0.3)',
                    maxWidth: '480px',
                  }}>
                  The burden is released.<br />
                  <span style={{ color: '#0099ff' }}>Now, master the space it left behind.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    onClick={scrollToGuides}
                    className="micro-label px-8 py-3.5 rounded transition-all duration-300"
                    style={{
                      color: '#0099ff',
                      border: '1px solid rgba(0,153,255,0.5)',
                      background: 'rgba(0,153,255,0.08)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,153,255,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    MASTER THE VOID
                  </button>
                  <button
                    onClick={handleReset}
                    className="font-sans text-sm transition-colors"
                    style={{ color: '#8a96b8' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f2ecdf'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8a96b8'}
                  >
                    Release another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
