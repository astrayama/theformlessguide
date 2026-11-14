import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Arrow } from './Icons';
import { SPOTIFY_URL, TIKTOK_URL, INSTAGRAM_URL, PINTEREST_URL, JOURNAL_URL } from '../library';

// Everything The Formless Guide makes, in one place. Each door leads to a
// section of this page or out to where that work lives.
const DOORS = [
  {
    verb: 'Watch',
    text: 'Long-form episodes on YouTube, from non-duality to shadow work to the chakras.',
    links: [{ label: 'See the teachings', href: '#teachings' }],
  },
  {
    verb: 'Listen',
    text: 'The same teachings as a podcast, for the walk, the drive and the dishes.',
    links: [{ label: 'Open Spotify', href: SPOTIFY_URL, out: true }],
  },
  {
    verb: 'Ask',
    text: 'Three Guides you can speak with: Consciousness, The Shadow and The System.',
    links: [{ label: 'Meet your Guides', href: '#guides' }],
  },
  {
    verb: 'Practice',
    text: 'Guided meditations, breathwork and a moment of stillness you can take right here.',
    links: [{ label: 'Start practicing', href: '#stillness' }],
  },
  {
    verb: 'Study',
    text: 'A library of playlists, sorted by what you came here for.',
    links: [{ label: 'Enter the library', href: '#catalog' }],
  },
  {
    verb: 'Carry it',
    text: 'Daily shorts, quotes and wallpapers, and a journal for what they stir up.',
    links: [
      { label: 'TikTok', href: TIKTOK_URL, out: true },
      { label: 'Instagram', href: INSTAGRAM_URL, out: true },
      { label: 'Pinterest', href: PINTEREST_URL, out: true },
      { label: 'Journal', href: JOURNAL_URL, out: true },
    ],
  },
];

export default function WorkIndex() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="max-w-6xl mx-auto px-6 pb-28 pt-6"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="flex items-baseline justify-between gap-6 mb-6" style={{ borderBottom: '1px solid rgba(23,20,31,0.18)' }}>
        <h2 className="display text-ink pb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
          Everything the Guide makes
        </h2>
        <p className="micro-label text-fog pb-4 hidden sm:block">SIX DOORS IN</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOORS.map((d, i) => (
          <li key={d.verb} className="sheet p-6 flex flex-col">
            <p className="micro-label text-fog mb-5">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="display text-ink mb-3" style={{ fontSize: '1.9rem' }}>{d.verb}</h3>
            <p className="font-sans text-stone mb-6" style={{ fontSize: '1rem', lineHeight: 1.6 }}>{d.text}</p>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
              {d.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.out ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="ink-link font-sans font-medium inline-flex items-center gap-2"
                  style={{ fontSize: '0.98rem' }}
                >
                  {l.label}
                  {d.links.length === 1 && <Arrow />}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
