import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import Thumb from './Thumb';
import { Arrow, Play } from './Icons';
import { PATHS, PLAYLIST_COUNT, CHANNEL_PLAYLISTS_URL, playlistUrl } from '../library';

export default function CatalogSection() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });
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
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <SectionHeading
          section="catalog"
          title={<>Infinite <em>wisdom</em></>}
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
        <div id="library-panel" role="tabpanel" aria-labelledby={`path-tab-${path.key}`} className="sheet mt-6 p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Featured playlist artwork, with its own action button underneath */}
            <div className="lg:col-span-5">
              <a
                href={playlistUrl(featured.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="lift block relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: '16 / 9', background: '#17141f' }}
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
                  style={{ background: 'linear-gradient(to top, rgba(23,20,31,0.9) 0%, rgba(23,20,31,0.2) 55%, rgba(23,20,31,0) 100%)' }} />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="micro-label mb-1.5" style={{ color: '#fbf7ef', opacity: 0.8, fontSize: '11px' }}>PLAYLIST</p>
                    <p className="font-sans font-medium leading-snug" style={{ fontSize: '1.05rem', color: '#fbf7ef' }}>
                      {featured.title}
                    </p>
                  </div>
                  <span className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ background: '#fbf7ef', color: '#17141f' }} aria-hidden="true">
                    <Play className="w-5 h-5 ml-0.5" />
                  </span>
                </div>
              </a>
              <div className="hidden lg:flex items-center justify-between gap-4 mt-5">
                <p className="font-sans text-fog" style={{ fontSize: '0.95rem' }}>
                  {path.playlists.length} playlists on this path
                </p>
                <a href={playlistUrl(featured.id)} target="_blank" rel="noopener noreferrer"
                  className="btn-outline micro-label" style={{ padding: '11px 20px' }}>
                  OPEN PLAYLIST <Arrow />
                </a>
              </div>
            </div>

            {/* Playlist list */}
            <div className="lg:col-span-7">
              <p className="display text-ink mb-3" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontStyle: 'italic', fontWeight: 300 }}>
                {path.intent}
              </p>
              <ul>
                {path.playlists.map((pl, i) => (
                  <li key={pl.id}>
                    <a
                      href={playlistUrl(pl.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-row"
                      style={{ '--c': path.color }}
                      data-active={i === rowIndex}
                      onMouseEnter={() => setRowIndex(i)}
                      onFocus={() => setRowIndex(i)}
                    >
                      <span className="micro-label" style={{ color: path.color }} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="block font-sans font-medium text-ink" style={{ fontSize: '1.08rem' }}>
                          {pl.title}
                        </span>
                        <span className="block font-sans text-stone mt-1" style={{ fontSize: '0.96rem', lineHeight: 1.5 }}>
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

        <a href={CHANNEL_PLAYLISTS_URL} target="_blank" rel="noopener noreferrer"
          className="ink-link font-sans font-medium inline-flex items-center gap-2 mt-8">
          Explore the full catalog on YouTube <Arrow />
        </a>
      </motion.div>
    </section>
  );
}
