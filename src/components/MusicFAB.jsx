import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST_ID = 'PLaJVlsirVzKX2G9fblGc2Y_f-ncAYsbCx';
const PLAYLIST_URL = `https://youtube.com/playlist?list=${PLAYLIST_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0`;

// Original sticker — a walker mid-stride, headphones on, notes rising.
function WalkerSticker({ size = 34 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true">
      {/* head */}
      <circle cx="22" cy="12" r="5" stroke="#f2ecdf" strokeWidth="1.8" />
      {/* headphones — band and cups */}
      <path d="M16.5 10.5 A6.8 6.8 0 0 1 27.5 10.5" stroke="#00f5d4" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.8" cy="12.6" r="2" fill="#00f5d4" />
      <circle cx="27.2" cy="12.6" r="2" fill="#00f5d4" />
      {/* torso, leaning into the walk */}
      <path d="M22 17.5 L21 28" stroke="#f2ecdf" strokeWidth="1.8" strokeLinecap="round" />
      {/* arms swinging */}
      <path d="M21.7 20.5 Q25.5 21.5 27.5 25.5" stroke="#f2ecdf" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M21.7 20.5 Q18 23 16.5 26.5" stroke="#f2ecdf" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* legs mid-stride */}
      <path d="M21 28 Q25 31 26.5 36 L29 36.6" stroke="#f2ecdf" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M21 28 Q19.5 32 15.5 35 L13.5 34.6" stroke="#f2ecdf" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* music notes drifting up */}
      <g className="fab-note">
        <path d="M35 16 L35 9.5 L38.5 8.5 L38.5 14.5" stroke="#00f5d4" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <ellipse cx="34" cy="16.3" rx="1.6" ry="1.2" fill="#00f5d4" />
        <ellipse cx="37.5" cy="14.8" rx="1.6" ry="1.2" fill="#00f5d4" />
      </g>
      <g className="fab-note fab-note--late">
        <path d="M41 8 L41 3.5" stroke="#00f5d4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M41 3.5 Q43 4 43.5 5.5" stroke="#00f5d4" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="40" cy="8.3" rx="1.4" ry="1.05" fill="#00f5d4" />
      </g>
    </svg>
  );
}

export default function MusicFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Player widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="glass fixed z-40 overflow-hidden right-5 md:right-24"
            style={{
              bottom: '96px',
              width: 'min(90vw, 340px)',
              borderRadius: '14px',
              transformOrigin: 'bottom right',
            }}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.14)' }}
            >
              <WalkerSticker size={26} />
              <div className="flex-1 text-left">
                <p className="font-sans font-medium text-sm" style={{ color: '#f2ecdf' }}>
                  Walking Meditations
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-end gap-0.5" style={{ height: '12px' }} aria-hidden="true">
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                  </span>
                  <span className="micro-label" style={{ color: '#8a96b8', fontSize: '10px' }}>
                    NOW WALKING
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close player"
                className="font-sans transition-colors"
                style={{ color: '#8a96b8', fontSize: '1.3rem', lineHeight: 1 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f2ecdf')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a96b8')}
              >
                ×
              </button>
            </div>

            {/* Player */}
            <div style={{ aspectRatio: '16 / 9', background: 'rgba(10,14,26,0.6)' }}>
              <iframe
                src={EMBED_URL}
                title="Walking Meditations playlist"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="px-4 py-3 text-center">
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="micro-label transition-colors"
                style={{ color: '#00f5d4', fontSize: '10.5px' }}
                onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 10px rgba(0,245,212,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.textShadow = 'none')}
              >
                OPEN FULL PLAYLIST
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close music player' : 'Open music player'}
        className="glass fab-pulse fixed z-40 flex items-center justify-center right-5 md:right-24"
        style={{
          bottom: '24px',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          borderColor: 'rgba(0,245,212,0.4)',
          cursor: 'pointer',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <WalkerSticker />
      </motion.button>
    </>
  );
}
