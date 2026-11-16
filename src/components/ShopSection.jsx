import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { Arrow } from './Icons';
import { STORE_URL, SUBSCRIBE_URL, SPOTIFY_URL } from '../library';

const VIOLET = '#9a2bb5';

// Three ways to stand behind the work. Only the last one costs anything.
const WAYS = [
  {
    title: 'Subscribe on YouTube',
    note: 'It is free, and it is how new seekers find the channel.',
    href: SUBSCRIBE_URL,
  },
  {
    title: 'Follow on Spotify',
    note: 'Take the podcast with you and never miss an episode.',
    href: SPOTIFY_URL,
  },
  {
    title: 'Wear the frequency',
    note: 'The Formless Collection. Every piece is a reminder of your formless nature.',
    href: `${STORE_URL}/`,
  },
];

// Four pieces from the collection, laid out like prints on a table. If one is
// ever hidden in the store, its link lands on the store home page instead.
const PRINTS = [
  {
    name: 'Still As Snow Sweatshirt',
    image: '/shop-still-as-snow-sweatshirt.jpg',
    href: `${STORE_URL}/product/still-as-snow-meditating-snowman-sweatshirt-cozy-zen-christmas-crewneck`,
    r: '-5deg',
    y: '0px',
  },
  {
    name: 'Formless Embroidered Beanie',
    image: '/shop-formless-beanie.jpg',
    href: `${STORE_URL}/product/formless-embroidered-beanie`,
    r: '4deg',
    y: '34px',
  },
  {
    name: 'Stay Formless Dad Hat',
    image: '/shop-stay-formless-hat.jpg',
    href: `${STORE_URL}/product/stay-formless-embroidered-enso-dad-hat`,
    r: '-3deg',
    y: '-8px',
  },
  {
    name: 'Chakra Flow Yoga Mat',
    image: '/shop-chakra-flow-yoga-mat.jpg',
    href: `${STORE_URL}/product/chakra-flow-yoga-mat`,
    r: '6deg',
    y: '26px',
  },
];

export default function ShopSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="shop" className="relative py-28 px-6 overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Left: the three ways */}
        <div className="lg:col-span-5">
          <SectionHeading
            section="shop"
            title={<>Support <em>the work</em></>}
            sub="Three ways to stand behind the teachings."
          />
          <ul>
            {WAYS.map((w, i) => (
              <li key={w.title}>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="ink-row" style={{ '--c': VIOLET }}>
                  <span className="micro-label" style={{ color: VIOLET }} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="display block text-ink" style={{ fontSize: '1.4rem' }}>{w.title}</span>
                    <span className="block font-sans text-stone mt-1.5" style={{ fontSize: '0.98rem', lineHeight: 1.5 }}>{w.note}</span>
                  </span>
                  <span className="row-arrow"><Arrow className="w-5 h-5" /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: prints on the table */}
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 max-w-[560px] mx-auto lg:ml-auto lg:mr-0 pb-8">
            {PRINTS.map((p) => (
              <li key={p.name} style={{ marginTop: p.y }}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="print" style={{ '--r': p.r }}>
                  <img src={p.image} alt={p.name} loading="lazy" decoding="async" width="430" height="430"
                    className="w-full h-auto block" style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                  <span className="display block text-center mt-3"
                    style={{ color: '#17141f', fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', fontStyle: 'italic', lineHeight: 1.25 }}>
                    {p.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center lg:justify-end mt-6">
            <a href={`${STORE_URL}/`} target="_blank" rel="noopener noreferrer" className="btn-outline micro-label">
              VISIT THE COLLECTION <Arrow />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
