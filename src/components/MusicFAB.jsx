import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWalkingTracks } from '../youtube';
import { WALKING_PLAYLIST_ID } from '../walkingTracks';

const PLAYLIST_ID = WALKING_PLAYLIST_ID;
const PLAYLIST_URL = `https://youtube.com/playlist?list=${PLAYLIST_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&enablejsapi=1`;

// The glyph carved into the seal: a pair of beamed notes while idle,
// three sound bars while the player is open.
function SealGlyph({ playing }) {
  if (playing) {
    return (
      <span className="flex items-end gap-[3px]" style={{ height: '18px', color: '#fbf7ef' }} aria-hidden="true">
        <span className="eq-bar" style={{ height: '18px' }} />
        <span className="eq-bar" style={{ height: '18px' }} />
        <span className="eq-bar" style={{ height: '18px' }} />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M9 17.5V6.2l9-2v11.3" stroke="#fbf7ef" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="6.7" cy="17.6" rx="2.6" ry="2.1" fill="#fbf7ef" />
      <ellipse cx="15.7" cy="15.6" rx="2.6" ry="2.1" fill="#fbf7ef" />
    </svg>
  );
}

// Walking music. The control is a vermilion seal, the kind an ink painting is
// signed with, stamped in the corner of the page. Pressing it lays a paper
// card with the playlist over the corner.
export default function MusicFAB() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const tracks = useWalkingTracks();
  const widgetRef = useRef(null);
  const fabRef = useRef(null);
  const iframeRef = useRef(null);
  const listRef = useRef(null);

  // Talk to the embed through the YouTube IFrame API's postMessage channel.
  const send = useCallback((message) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(message), '*');
  }, []);
  const command = useCallback((func, args = []) => send({ event: 'command', func, args }), [send]);

  // Pause the embed. The iframe stays mounted, so the current song and
  // position survive until the player reopens.
  const pausePlayback = useCallback(() => command('pauseVideo'), [command]);

  // Play the chosen track, with the rest of the playlist queued after it.
  const playTrack = useCallback(
    (index) => {
      command('loadPlaylist', [tracks.map((t) => t.id), index]);
      setCurrentId(tracks[index].id);
      setPlaying(true);
    },
    [command, tracks]
  );

  // Ask the embed to report what it is playing, so the list can mark it.
  const listen = useCallback(() => {
    send({ event: 'listening', id: 'walking', channel: 'widget' });
  }, [send]);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      let data;
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const info = data?.info;
      if (!info) return;
      if (info.videoData?.video_id) setCurrentId(info.videoData.video_id);
      if (typeof info.playerState === 'number') setPlaying(info.playerState === 1 || info.playerState === 3);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Keep the playing track in view inside the list.
  useEffect(() => {
    if (!open || !currentId || !listRef.current) return;
    const row = listRef.current.querySelector('[data-current="true"]');
    if (row) listRef.current.scrollTop = row.offsetTop - listRef.current.clientHeight / 2 + row.clientHeight / 2;
  }, [open, currentId]);

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

  // Clicking anywhere outside the card (or pressing Escape) closes it,
  // pausing playback but keeping the seeker's place in the playlist.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (widgetRef.current?.contains(e.target) || fabRef.current?.contains(e.target)) return;
      close();
    };
    const onKeyDown = (e) => {
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
      {/* Player card. Stays mounted once opened so playback state persists */}
      {hasOpened && (
        <motion.div
          ref={widgetRef}
          className="music-card fixed z-40 overflow-hidden right-5 md:right-8"
          style={{
            bottom: '100px',
            width: 'min(90vw, 348px)',
            transformOrigin: 'bottom right',
            pointerEvents: open ? 'auto' : 'none',
          }}
          initial={{ opacity: 0, scale: 0.9, y: 16, rotate: 2 }}
          animate={
            open
              ? { opacity: 1, scale: 1, y: 0, rotate: 0, visibility: 'visible' }
              : { opacity: 0, scale: 0.94, y: 12, rotate: 2, transitionEnd: { visibility: 'hidden' } }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden={!open}
        >
          {/* Header */}
          <div className="flex items-start gap-3 px-5 pt-5 pb-4">
            <div className="flex-1 text-left">
              <p className="micro-label flex items-center gap-2" style={{ color: '#b3261e', fontSize: '10.5px' }}>
                <span className="flex items-end gap-0.5" style={{ height: '11px' }} aria-hidden="true">
                  <span className="eq-bar" style={{ height: '11px', width: '2.5px' }} />
                  <span className="eq-bar" style={{ height: '11px', width: '2.5px' }} />
                  <span className="eq-bar" style={{ height: '11px', width: '2.5px' }} />
                </span>
                NOW WALKING
              </p>
              <p className="display text-ink mt-1.5" style={{ fontSize: '1.45rem' }}>
                Walking <em>Meditations</em>
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close player"
              className="w-9 h-9 -mr-1.5 -mt-1 rounded-full flex items-center justify-center text-stone transition-colors duration-200 hover:bg-ink hover:text-vellum"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Player */}
          <div className="mx-3 overflow-hidden" style={{ aspectRatio: '16 / 9', background: '#17141f', borderRadius: '14px' }}>
            <iframe
              ref={iframeRef}
              src={EMBED_URL}
              title="Walking Meditations playlist"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => { listen(); setTimeout(listen, 1200); }}
            />
          </div>

          {/* Track list: choose any song in the playlist */}
          <div className="px-3 pt-4">
            <p className="micro-label text-fog px-2 mb-2" style={{ fontSize: '10.5px' }}>
              CHOOSE A TRACK · {tracks.length}
            </p>
            <ol ref={listRef} className="music-list" aria-label="Tracks in the Walking Meditations playlist">
              {tracks.map((t, i) => {
                const current = t.id === currentId;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      className="music-track"
                      data-current={current}
                      aria-current={current ? 'true' : undefined}
                      onClick={() => playTrack(i)}
                    >
                      <span className="music-track-no" aria-hidden="true">
                        {current && playing ? (
                          <span className="flex items-end gap-[2px]" style={{ height: '12px' }}>
                            <span className="eq-bar" style={{ height: '12px', width: '2.5px' }} />
                            <span className="eq-bar" style={{ height: '12px', width: '2.5px' }} />
                            <span className="eq-bar" style={{ height: '12px', width: '2.5px' }} />
                          </span>
                        ) : (
                          String(i + 1).padStart(2, '0')
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-sans font-medium" style={{ fontSize: '0.92rem' }}>{t.title}</span>
                        {t.by && <span className="block truncate font-sans text-fog" style={{ fontSize: '0.8rem' }}>{t.by}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Footer */}
          <div className="px-5 py-4">
            <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer"
              className="ink-link font-sans font-medium inline-flex items-center gap-2" style={{ fontSize: '0.95rem' }}>
              Open the full playlist
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}

      {/* The seal */}
      <motion.div
        className="music-seal-wrap fixed z-40 right-5 md:right-8 flex items-center gap-3"
        style={{ bottom: '24px' }}
        initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
      >
        <span className="music-tag micro-label hidden md:block" aria-hidden="true">
          {open ? 'PAUSE AND CLOSE' : 'WALKING MUSIC'}
        </span>
        <motion.button
          ref={fabRef}
          type="button"
          onClick={toggle}
          aria-label={open ? 'Close music player' : 'Open music player'}
          aria-expanded={open}
          className="music-seal flex items-center justify-center"
          whileHover={{ scale: 1.06, rotate: -4 }}
          whileTap={{ scale: 0.92 }}
        >
          <SealGlyph playing={open} />
        </motion.button>
      </motion.div>
    </>
  );
}
