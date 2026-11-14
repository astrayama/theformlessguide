import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

const STORE = 'https://theformlessguide.printful.me';
const VIOLET = '#e879ff';

// Four pieces from the store. If one is ever hidden there, its link lands on
// the store home page instead of an error.
const PRODUCTS = [
  {
    name: 'Grow Slowly Mug',
    image: '/shop-grow-slowly-mug.jpg',
    href: `${STORE}/product/grow-slowly-mug-foggy-forest-quote-mug-teacher-white-elephant-gift`,
  },
  {
    name: 'Still As Snow Sweatshirt',
    image: '/shop-still-as-snow-sweatshirt.jpg',
    href: `${STORE}/product/still-as-snow-meditating-snowman-sweatshirt-cozy-zen-christmas-crewneck`,
  },
  {
    name: 'The Formless Year 2027 Calendar',
    image: '/shop-2027-calendar.jpg',
    href: `${STORE}/product/the-formless-year-2027-wall-calendar`,
  },
  {
    name: 'Stay Formless Dad Hat',
    image: '/shop-stay-formless-hat.jpg',
    href: `${STORE}/product/stay-formless-embroidered-enso-dad-hat`,
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ShopSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="shop" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,121,255,0.45), transparent)' }} />

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <SectionHeading
          eyebrow="CROWN"
          color={VIOLET}
          title="Support the Work"
          sub="Wear the teachings, carry the frequency. Every piece is a reminder of your formless nature."
        >
          <a href={`${STORE}/`} target="_blank" rel="noopener noreferrer" className="btn-line micro-label" style={{ '--c': VIOLET }}>
            VISIT THE SHOP <Arrow />
          </a>
        </SectionHeading>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="lift group block">
                <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '1 / 1', background: '#ffffff' }}>
                  <img src={p.image} alt={p.name} loading="lazy" decoding="async" width="430" height="430"
                    className="w-full h-full object-cover" />
                </div>
                <p className="font-sans font-medium text-cream mt-4 leading-snug" style={{ fontSize: '1rem' }}>
                  {p.name}
                </p>
                <p className="micro-label mt-2 flex items-center gap-2" style={{ color: VIOLET, fontSize: '11px' }}>
                  VIEW IN SHOP <Arrow />
                </p>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
