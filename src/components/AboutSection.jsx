import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

const LENSES = ['Philosophy', 'Psychology', 'Science'];
const FACTS = [
  { figure: '700+', label: 'teachings on YouTube' },
  { figure: '12K+', label: 'subscribers' },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="about" className="relative py-28 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Left: heading and the line to remember */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading section="about" title={<>About <em>Guru Jay</em></>} />
            <blockquote className="display text-ink pl-6"
              style={{ borderLeft: '2px solid #3ccf7e', fontSize: 'clamp(1.35rem, 2.5vw, 1.8rem)', lineHeight: 1.35, fontStyle: 'italic', fontWeight: 300 }}>
              "In the void of the unconscious, the material construct dissolves,
              leaving only true presence."
            </blockquote>
            <p className="micro-label mt-5 pl-6" style={{ color: '#1c7447' }}>THE FORMLESS GUIDE</p>

            <dl className="flex gap-10 mt-12">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="display text-ink" style={{ fontSize: '2.4rem' }}>{f.figure}</dt>
                  <dd className="font-sans text-stone mt-1" style={{ fontSize: '0.95rem' }}>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Right: the story */}
        <div className="lg:col-span-7 lg:pt-3">
          <h3 className="micro-label mb-4" style={{ color: '#1c7447' }}>THE JOURNEY</h3>
          <p className="font-sans text-stone" style={{ fontSize: '1.12rem', lineHeight: 1.75, maxWidth: '62ch' }}>
            Guru Jay discovered early that the body was already awake. It is the mind that needs
            to remember its true nature. Through ancient practices, such as meditation, study,
            and direct experience, he has become a bridge between ancient wisdom and modern
            consciousness. As The Formless Guide, he teaches that consciousness itself is our
            greatest teacher, and every moment offers an opportunity for awakening.
          </p>

          <div className="my-10 h-px" style={{ background: 'rgba(23,20,31,0.16)' }} />

          <h3 className="micro-label mb-4" style={{ color: '#553bc0' }}>THE TEACHING</h3>
          <p className="font-sans text-stone" style={{ fontSize: '1.12rem', lineHeight: 1.75, maxWidth: '62ch' }}>
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
              <li key={lens} className="sheet px-3 py-5 text-center" style={{ borderRadius: '20px' }}>
                <span className="micro-label block mb-2 text-fog" style={{ fontSize: '11px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="display text-ink" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
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
