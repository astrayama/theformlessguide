import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import Thumb from './Thumb';
import { PATHS, PLAYLIST_COUNT, CHANNEL_PLAYLISTS_URL, playlistUrl } from '../library';

const Arrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CatalogSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [pathKey, setPathKey] = useState(PATHS[0].key);
  const [rowIndex, setRowIndex] = useState(0);

  const path = PATHS.find((p) => p.key === pathKey);
  const featured = path.playlists[rowIndex] || path.playlists[0];

  const choosePath = (key) => {
    setPathKey(key);
    setRowIndex(0);
  };

  // Left and right arrow keys move between tabs, the way a tab list should.
  const onTabKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = PATHS.findIndex((p) => p.key === pathKey);
    const next = PATHS[(i + (e.key === 'ArrowRight' ? 1 : PATHS.length - 1)) % PATHS.length];
    choosePath(next.key);
    document.getElementById(`path-tab-${next.key}`)?.focus();
  };

  return (
    <section id="catalog" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(150,110,255,0.5), transparent)' }} />

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <SectionHeading
          eyebrow="THIRD EYE"
          color="#b79bff"
          title="Infinite Wisdom"
          sub={`${PLAYLIST_COUNT} playlists of teachings and meditations, sorted by what you came here for.`}
        />

        {/* Path tabs */}
        <div
          role="tablist"
          aria-label="Choose a path through the library"
          className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap"
          onKeyDown={onTabKey}
        >
          {PATHS.map((p) => (
            <button
              key={p.key}
              id={`path-tab-${p.key}`}
              role="tab"
              type="button"
              aria-selected={p.key === pathKey}
              aria-controls="library-panel"
              tabIndex={p.key === pathKey ? 0 : -1}
              className="path-tab font-sans"
              style={{ '--c': p.color }}
              onClick={() => choosePath(p.key)}
            >
              {p.tab}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          id="library-panel"
          role="tabpanel"
          aria-labelledby={`path-tab-${path.key}`}
          className="glass rounded-2xl mt-6 p-5 sm:p-8"
          style={{ borderColor: `${path.color}33` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Featured playlist artwork, with its own action button underneath */}
            <div className="lg:col-span-5">
            <a
              href={playlistUrl(featured.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="lift block relative overflow-hidden rounded-xl"
              style={{ aspectRatio: '16 / 9', background: '#101629', border: `1px solid ${path.color}40` }}
              aria-label={`Open the playlist ${featured.title} on YouTube`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Thumb videoId={featured.video} className="absolute inset-0 w-full h-full object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,11,22,0.92) 0%, rgba(8,11,22,0.25) 55%, rgba(8,11,22,0) 100%)' }} />
              <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                <div>
                  <p className="micro-label mb-1.5" style={{ color: path.color, fontSize: '11px' }}>PLAYLIST</p>
                  <p className="font-sans font-medium text-cream leading-snug" style={{ fontSize: '1.05rem' }}>
                    {featured.title}
                  </p>
                </div>
                <span className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: path.color, color: '#0a0e1a' }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>
            </a>
              <div className="hidden lg:flex items-center justify-between gap-4 mt-5">
                <p className="font-sans text-muted" style={{ fontSize: '0.92rem' }}>
                  {path.playlists.length} playlists on this path
                </p>
                <a
                  href={playlistUrl(featured.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line micro-label"
                  style={{ '--c': path.color, padding: '11px 20px' }}
                >
                  OPEN PLAYLIST <Arrow />
                </a>
              </div>
            </div>

            {/* Playlist list */}
            <div className="lg:col-span-7">
              <p className="font-cinzel text-cream mb-3"
                style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)', letterSpacing: '0.04em' }}>
                {path.intent}
              </p>
              <ul>
                {path.playlists.map((pl, i) => (
                  <li key={pl.id}>
                    <a
                      href={playlistUrl(pl.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="playlist-row"
                      style={{ '--c': path.color }}
                      data-active={i === rowIndex}
                      onMouseEnter={() => setRowIndex(i)}
                      onFocus={() => setRowIndex(i)}
                    >
                      <span className="micro-label" style={{ color: path.color }} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="block font-sans font-medium text-cream" style={{ fontSize: '1.05rem' }}>
                          {pl.title}
                        </span>
                        <span className="block font-sans text-secondary mt-1" style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                          {pl.note}
                        </span>
                      </span>
                      <span className="row-arrow"><Arrow className="w-5 h-5" /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <a
            href={CHANNEL_PLAYLISTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line micro-label"
            style={{ '--c': '#b79bff' }}
          >
            EXPLORE FULL CATALOG <Arrow />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
