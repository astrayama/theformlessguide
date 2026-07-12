import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,245,212,0.4), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="text-center mb-16">
            <h2 className="font-cinzel font-medium text-cream mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em' }}>
              About Guru Jay
            </h2>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Left — The Journey */}
            <div className="relative">
              <div className="mb-6">
                <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
                  <path d="M30,5 L30,55 M5,30 L55,30" stroke="#00f5d4" strokeWidth="1" opacity="0.3" />
                  <circle cx="30" cy="30" r="24" stroke="#00f5d4" strokeWidth="1" opacity="0.25" />
                  <circle cx="30" cy="30" r="12" stroke="#00f5d4" strokeWidth="1" opacity="0.4" />
                  <circle cx="30" cy="30" r="5" fill="#00f5d4" opacity="0.7" />
                </svg>
              </div>
              <h3 className="font-cinzel font-medium mb-5"
                style={{ color: '#00f5d4', fontSize: '1.2rem', letterSpacing: '0.08em' }}>
                THE JOURNEY
              </h3>
              <p className="font-sans leading-relaxed" style={{ color: '#c2c8dc', fontSize: '1.05rem' }}>
                Guru Jay discovered early that the body was already awake—it is the mind that needs
                to remember its true nature. Through ancient practices, such as meditation, study,
                and direct experience, he has become a bridge between ancient wisdom to modern
                consciousness. As The Formless Guide, he teaches that consciousness itself is our
                greatest teacher, and every moment offers an opportunity for awakening.
              </p>
            </div>

            {/* Right — The Teaching */}
            <div className="relative">
              <div className="mb-6">
                <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
                  <polygon points="30,5 55,20 55,45 30,55 5,45 5,20" stroke="#7b2fff" strokeWidth="1" opacity="0.4" />
                  <polygon points="30,12 48,22 48,42 30,48 12,42 12,22" stroke="#7b2fff" strokeWidth="0.8" opacity="0.3" />
                  <circle cx="30" cy="30" r="8" fill="#7b2fff" opacity="0.3" />
                  <circle cx="30" cy="30" r="4" fill="#7b2fff" opacity="0.6" />
                </svg>
              </div>
              <h3 className="font-cinzel font-medium mb-5"
                style={{ color: '#7b2fff', fontSize: '1.2rem', letterSpacing: '0.08em' }}>
                THE TEACHING
              </h3>
              <p className="font-sans leading-relaxed" style={{ color: '#c2c8dc', fontSize: '1.05rem' }}>
                The teachings of The Formless Guide offer a Universal Synthesis, exploring the
                architecture of life through a meta-framework of Philosophy, Psychology, and
                Science. Guru Jay guides seekers toward their own direct experience of truth by
                integrating non-dual wisdom, archetypal inquiry, and complex systems theory.
                Drawing from Buddhist Theravāda, Shinto, Zen, Yoga, Gnosticism, and mysticism,
                the practice is refined through the study of systems and the soul. Whether
                deconstructing cosmic symbolism or the mechanics of the mind, the goal remains
                the same: to move from sleep to waking, from duality to Truly Being. The path
                is formless, fearless, and free beyond dogma.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div className="text-center relative py-12">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-px"
              style={{ background: 'linear-gradient(to right, transparent, #00f5d4, transparent)' }} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-px"
              style={{ background: 'linear-gradient(to right, transparent, #00f5d4, transparent)' }} />
            <blockquote className="font-cinzel italic max-w-2xl mx-auto"
              style={{ color: '#f2ecdf', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: 1.6,
                textShadow: '0 0 30px rgba(0,245,212,0.2)' }}>
              "In the void of the unconscious, the material construct dissolves,
              leaving only true presence."
            </blockquote>
            <p className="micro-label mt-4" style={{ color: '#00f5d4', fontSize: '11px' }}>
              — THE FORMLESS GUIDE
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
