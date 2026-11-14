import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

const GREEN = '#4ade9a';
const LENSES = ['Philosophy', 'Psychology', 'Science'];

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,222,154,0.45), transparent)' }} />

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Left: heading and the line to remember */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="HEART" color={GREEN} title="About Guru Jay" />
            <blockquote
              className="font-cinzel italic text-cream pl-6"
              style={{
                borderLeft: `2px solid ${GREEN}`,
                fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                lineHeight: 1.55,
                textShadow: '0 0 30px rgba(74,222,154,0.18)',
              }}
            >
              "In the void of the unconscious, the material construct dissolves,
              leaving only true presence."
            </blockquote>
            <p className="micro-label mt-5 pl-6" style={{ color: GREEN, fontSize: '11px' }}>
              THE FORMLESS GUIDE
            </p>
          </div>
        </div>

        {/* Right: the story */}
        <div className="lg:col-span-7 lg:pt-3">
          <h3 className="micro-label mb-4" style={{ color: GREEN }}>THE JOURNEY</h3>
          <p className="font-sans text-secondary" style={{ fontSize: '1.08rem', lineHeight: 1.75, maxWidth: '62ch' }}>
            Guru Jay discovered early that the body was already awake. It is the mind that needs
            to remember its true nature. Through ancient practices, such as meditation, study,
            and direct experience, he has become a bridge between ancient wisdom and modern
            consciousness. As The Formless Guide, he teaches that consciousness itself is our
            greatest teacher, and every moment offers an opportunity for awakening.
          </p>

          <div className="my-10 h-px" style={{ background: 'linear-gradient(to right, rgba(74,222,154,0.5), rgba(255,255,255,0.08) 60%, transparent)' }} />

          <h3 className="micro-label mb-4" style={{ color: '#b79bff' }}>THE TEACHING</h3>
          <p className="font-sans text-secondary" style={{ fontSize: '1.08rem', lineHeight: 1.75, maxWidth: '62ch' }}>
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

          {/* The three lenses named in the teaching */}
          <ul className="mt-10 grid grid-cols-3 gap-3" aria-label="The three lenses of the teaching">
            {LENSES.map((lens, i) => (
              <li key={lens} className="glass rounded-xl px-3 py-4 text-center">
                <span className="micro-label block mb-2" style={{ color: ['#00f5d4', '#b79bff', '#ffd166'][i], fontSize: '11px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-cinzel text-cream" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)', letterSpacing: '0.06em' }}>
                  {lens}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
