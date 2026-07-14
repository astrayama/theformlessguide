import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const PLAYLIST_ID = 'PLaJVlsirVzKX2G9fblGc2Y_f-ncAYsbCx';
const PLAYLIST_URL = `https://youtube.com/playlist?list=${PLAYLIST_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&enablejsapi=1`;

// Original sticker — a pair of wireless earbuds, music drifting between them.
function EarbudsSticker({ size = 34 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true">
      {/* left earbud */}
      <circle cx="15.5" cy="20" r="4.6" stroke="#f2ecdf" strokeWidth="1.8" />
      <circle cx="17" cy="20" r="1.6" fill="#00f5d4" />
      <path d="M15.5 24.8 L15 33.5" stroke="#f2ecdf" strokeWidth="3" strokeLinecap="round" />
      {/* right earbud */}
      <circle cx="32.5" cy="20" r="4.6" stroke="#f2ecdf" strokeWidth="1.8" />
      <circle cx="31" cy="20" r="1.6" fill="#00f5d4" />
      <path d="M32.5 24.8 L33 33.5" stroke="#f2ecdf" strokeWidth="3" strokeLinecap="round" />
      {/* music notes drifting up between the buds */}
      <g className="fab-note">
        <path d="M21.5 18 L21.5 11.5 L25 10.5 L25 16.5" stroke="#00f5d4" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <ellipse cx="20.5" cy="18.3" rx="1.6" ry="1.2" fill="#00f5d4" />
        <ellipse cx="24" cy="16.8" rx="1.6" ry="1.2" fill="#00f5d4" />
      </g>
      <g className="fab-note fab-note--late">
        <path d="M28.5 9 L28.5 4.5" stroke="#00f5d4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M28.5 4.5 Q30.5 5 31 6.5" stroke="#00f5d4" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="27.5" cy="9.3" rx="1.4" ry="1.05" fill="#00f5d4" />
      </g>
    </svg>
  );
}

export default function MusicFAB() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const widgetRef = useRef(null);
  const fabRef = useRef(null);
  const iframeRef = useRef(null);

  // Pause the embed via the YouTube IFrame API — the iframe stays mounted,
  // so the current song and position survive until the player reopens.
  const pausePlayback = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*'
    );
  }, []);

  const close = useCallback(() => {
    pausePlayback();
    setOpen(false);
  }, [pausePlayback]);

  const toggle = useCallback(() => {
    if (open) close();
    else {
      setHasOpened(true);
      setOpen(true);
    }
  }, [open, close]);

  // Clicking anywhere outside the widget (or pressing Escape) closes it,
  // pausing playback but keeping the seeker's place in the playlist.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = e => {
      if (widgetRef.current?.contains(e.target) || fabRef.current?.contains(e.target)) return;
      close();
    };
    const onKeyDown = e => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      {/* Player widget — stays mounted once opened so playback state persists */}
      {hasOpened && (
        <motion.div
          ref={widgetRef}
          className="glass fixed z-40 overflow-hidden right-5 md:right-24"
          style={{
            bottom: '96px',
            width: 'min(90vw, 340px)',
            borderRadius: '14px',
            transformOrigin: 'bottom right',
            pointerEvents: open ? 'auto' : 'none',
          }}
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={
            open
              ? { opacity: 1, scale: 1, y: 0, visibility: 'visible' }
              : { opacity: 0, scale: 0.9, y: 12, transitionEnd: { visibility: 'hidden' } }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden={!open}
        >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.14)' }}
            >
              <EarbudsSticker size={26} />
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
                onClick={close}
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
                ref={iframeRef}
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

      {/* FAB */}
      <motion.button
        ref={fabRef}
        onClick={toggle}
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
        <EarbudsSticker />
      </motion.button>
    </>
  );
}
