import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 'philosophy',
    label: 'Philosophy & Non-Duality',
    description: 'Explore the nature of reality, non-dual awareness, and the architecture of consciousness through ancient and modern lenses.',
    accent: '#CC00FF',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
        <circle cx="30" cy="30" r="22" stroke="#CC00FF" strokeWidth="1.2" opacity="0.5" />
        <polygon points="30,8 52,42 8,42" stroke="#CC00FF" strokeWidth="1" fill="none" opacity="0.7" />
        <polygon points="30,52 52,18 8,18" stroke="#CC00FF" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="30" cy="30" r="5" fill="#CC00FF" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'shadow',
    label: 'Shadow Work & Psychology',
    description: 'Journey into depth psychology, Jungian archetypes, and the mechanics of the unconscious mind. Meet your shadow and integrate it.',
    accent: '#7b2fff',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
        {/* Half-light half-dark circle */}
        <path d="M30,8 A22,22 0 0,1 30,52 Z" fill="#7b2fff" opacity="0.3" />
        <circle cx="30" cy="30" r="22" stroke="#7b2fff" strokeWidth="1.2" opacity="0.6" />
        <circle cx="30" cy="22" r="6" fill="#7b2fff" opacity="0.5" />
        <circle cx="30" cy="38" r="6" fill="none" stroke="#7b2fff" strokeWidth="1" opacity="0.5" />
        <circle cx="30" cy="38" r="2" fill="#7b2fff" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'somatic',
    label: 'Somatic Practice & The Body',
    description: 'Master the biological vessel through nervous system regulation, somatic technology, and embodied movement practices.',
    accent: '#00CC44',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
        {/* Body/wave form */}
        <circle cx="30" cy="14" r="7" stroke="#00CC44" strokeWidth="1.2" opacity="0.7" />
        <path d="M22,22 L22,40 M38,22 L38,40" stroke="#00CC44" strokeWidth="1.2" opacity="0.5" />
        <path d="M22,30 L38,30" stroke="#00CC44" strokeWidth="1" opacity="0.6" />
        <path d="M22,40 L18,52 M38,40 L42,52" stroke="#00CC44" strokeWidth="1.2" opacity="0.5" />
        {/* Energy waves */}
        <path d="M10,30 Q20,24 30,30 Q40,36 50,30" stroke="#00CC44" strokeWidth="0.8" opacity="0.35" fill="none" />
        <path d="M8,36 Q20,28 30,36 Q40,44 52,36" stroke="#00CC44" strokeWidth="0.6" opacity="0.2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'cosmic',
    label: 'Cosmic Symbolism',
    description: 'Decode the language of the cosmos through sacred geometry, mythological archetypes, and the symbolic architecture of reality.',
    accent: '#ffd700',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
        {/* Star / celestial */}
        {[0, 72, 144, 216, 288].map((a, i) => {
          const a2 = a + 36;
          const r1 = 24, r2 = 10;
          return (
            <g key={i}>
              <line
                x1={30 + Math.cos(a*Math.PI/180)*r2} y1={30 + Math.sin(a*Math.PI/180)*r2}
                x2={30 + Math.cos(a*Math.PI/180)*r1} y2={30 + Math.sin(a*Math.PI/180)*r1}
                stroke="#ffd700" strokeWidth="1.2" opacity="0.7" />
              <line
                x1={30 + Math.cos(a*Math.PI/180)*r1} y1={30 + Math.sin(a*Math.PI/180)*r1}
                x2={30 + Math.cos(a2*Math.PI/180)*r2} y2={30 + Math.sin(a2*Math.PI/180)*r2}
                stroke="#ffd700" strokeWidth="1" opacity="0.6" />
            </g>
          );
        })}
        <circle cx="30" cy="30" r="8" stroke="#ffd700" strokeWidth="0.8" opacity="0.4" />
        <circle cx="30" cy="30" r="3" fill="#ffd700" opacity="0.8" />
      </svg>
    ),
  },
];

export default function CatalogSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="catalog" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(102,0,204,0.4), transparent)' }} />

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
              Infinite Wisdom
            </h2>
            <p className="font-sans text-muted max-w-xl mx-auto">
              Explore the full catalog of teachings, meditations, and guides
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass flex flex-col items-center text-center p-7 transition-all duration-350 group"
              style={{ borderRadius: '14px', borderColor: `${cat.accent}22` }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${cat.accent}66`;
                e.currentTarget.style.boxShadow = `0 0 25px ${cat.accent}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${cat.accent}22`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ filter: `drop-shadow(0 0 6px ${cat.accent}66)` }}>
                {cat.icon}
              </div>
              <h3 className="font-cinzel font-medium mb-3" style={{ color: cat.accent, fontSize: '0.95rem', lineHeight: 1.4 }}>
                {cat.label}
              </h3>
              <p className="font-sans text-xs leading-relaxed mb-6" style={{ color: '#8a96b8' }}>
                {cat.description}
              </p>
              <a
                href="https://www.youtube.com/@TheFormlessGuide/playlists"
                target="_blank"
                rel="noopener noreferrer"
                className="micro-label px-5 py-2 rounded mt-auto transition-all duration-300"
                style={{
                  color: cat.accent,
                  border: `1px solid ${cat.accent}44`,
                  background: 'transparent',
                  fontSize: '11px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${cat.accent}15`;
                  e.currentTarget.style.boxShadow = `0 0 12px ${cat.accent}33`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                EXPLORE
              </a>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <div className="text-center mt-14">
          <a
            href="https://www.youtube.com/@TheFormlessGuide/playlists"
            target="_blank"
            rel="noopener noreferrer"
            className="micro-label px-10 py-4 rounded inline-block transition-all duration-300"
            style={{
              color: '#CC00FF',
              border: '1.5px solid rgba(204,0,255,0.5)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(204,0,255,0.08)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(204,0,255,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            EXPLORE FULL CATALOG
          </a>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
