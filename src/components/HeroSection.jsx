import { motion, useReducedMotion } from 'framer-motion';
import { Arrow } from './Icons';
import WorkIndex from './WorkIndex';
import { START_HERE, SPOTIFY_URL, playlistUrl } from '../library';

const TOPICS = [
  'Non-duality', 'Theravāda Buddhism', 'Zen', 'Philosophy', 'Psychology', 'Science',
  'Meditation', 'Shadow work', 'Yoga and the chakras', 'Gnosticism', 'Mysticism',
];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: 'easeOut' },
  });

  return (
    <section id="hero" className="relative pt-[68px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center py-12 lg:py-0 lg:min-h-[calc(100svh-68px)]">
        {/* The mark: ink enso over a watercolor bloom */}
        <motion.div
          className="lg:col-span-5 lg:order-2 flex justify-center"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          <div className="relative w-[62vw] max-w-[250px] sm:max-w-[330px] lg:w-full lg:max-w-[500px]" style={{ aspectRatio: '1 / 1' }}>
            <div className="ink-bloom" aria-hidden="true" />
            <div className="enso-breathe absolute inset-0">
              <img src="/enso-ink-1024.png" alt="" aria-hidden="true" width="1024" height="1024"
                className="absolute inset-0 w-full h-full" />
              <img src="/enso-ink-1024.png" alt="" aria-hidden="true" width="1024" height="1024"
                className="enso-smoke-layer absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />
            </div>
          </div>
        </motion.div>

        {/* The words */}
        <div className="lg:col-span-7 lg:order-1 text-center lg:text-left">
          <motion.p className="micro-label text-stone mb-6" {...rise(0.2)}>
            A SPIRITUALITY PODCAST WITH SAT GURU JAY
          </motion.p>

          <motion.h1 className="display text-ink" style={{ fontSize: 'clamp(3.3rem, 10.5vw, 7.4rem)', lineHeight: 0.96 }} {...rise(0.35)}>
            The <em>Formless</em> Guide
          </motion.h1>

          <motion.p
            className="font-sans text-stone mt-8 max-w-xl mx-auto lg:mx-0"
            style={{ fontSize: 'clamp(1.08rem, 2vw, 1.3rem)', lineHeight: 1.6 }}
            {...rise(0.6)}
          >
            Where myth meets mindfulness and presence becomes practice. Reclaim your truth,
            bridge the unknown, and awaken the superconscious.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-10" {...rise(0.8)}>
            <a href={playlistUrl(START_HERE.id)} target="_blank" rel="noopener noreferrer" className="btn-ink micro-label">
              BEGIN THE JOURNEY <Arrow />
            </a>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="btn-outline micro-label">
              LISTEN ON SPOTIFY
            </a>
          </motion.div>

          <motion.ul
            className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 mt-10 font-sans text-fog"
            style={{ fontSize: '0.95rem' }}
            aria-label="What the podcast covers"
            {...rise(1)}
          >
            {TOPICS.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-fog" />}
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <WorkIndex />
    </section>
  );
}
