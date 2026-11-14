import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import Thumb from './Thumb';
import { MOMENTS_PLAYLIST_ID, playlistUrl } from '../library';

const PLAYLIST_URL = playlistUrl(MOMENTS_PLAYLIST_ID);
const GOLD = '#ffd166';

// Real Shorts from the playlist, shown if the YouTube API key is missing or
// the request fails. With the key set, the newest twelve load instead.
const FALLBACK = [
  { id: 'QsQ6q3Qw6Nw', title: 'Stop Fighting Reality, Accept Now' },
  { id: 'IfCfcqGY0hE', title: 'Stop Trying To "Escape" The Matrix' },
  { id: 'rNtg__KefHw', title: 'A Delusion Of The Present' },
  { id: 'Ixl6oUdWr_Q', title: 'Gnosticism: Waking Up From The Material Construct' },
  { id: '_nDKKFlRTfw', title: 'Sacred Geometry: The Beginning' },
  { id: '9m1cIb2m2y8', title: 'Decoding Your Consciousness' },
  { id: '_166YIq5nDU', title: "That Dream Feeling Isn't Fake" },
];

// YouTube titles on Shorts carry a tail of hashtags and emoji. Keep the words.
function cleanTitle(raw) {
  return raw
    .split('#')[0]
    .replace(/[\p{Extended_Pictographic}️‍]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function usePlaylistVideos() {
  const [videos, setVideos] = useState(FALLBACK);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) return;

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${MOMENTS_PLAYLIST_ID}&maxResults=12&key=${apiKey}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.items) return;
        const items = data.items
          .filter((item) => item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length)
          .map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: cleanTitle(item.snippet.title),
          }))
          .filter((v) => v.title);
        if (items.length) setVideos(items);
      })
      .catch(() => {});
  }, []);

  return videos;
}

function ShortCard({ video }) {
  return (
    <a
      href={`https://www.youtube.com/shorts/${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="lift group relative block flex-shrink-0 overflow-hidden rounded-2xl w-[168px] sm:w-[200px]"
      style={{ aspectRatio: '9 / 16', background: '#101629', border: '1px solid rgba(255,209,102,0.22)', scrollSnapAlign: 'start' }}
    >
      {/* The 16:9 thumbnail of a Short holds the vertical frame in its center, so cover-cropping shows it cleanly */}
      <Thumb videoId={video.id} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(8,11,22,0.95) 0%, rgba(8,11,22,0.35) 45%, rgba(8,11,22,0) 70%)' }} />
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(8,11,22,0.6)', border: '1px solid rgba(255,209,102,0.6)', color: GOLD }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-4 h-4 ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
      <p className="absolute left-3.5 right-3.5 bottom-3.5 font-sans font-medium text-cream leading-snug line-clamp-3"
        style={{ fontSize: '0.95rem' }}>
        {video.title}
      </p>
    </a>
  );
}

function ArrowButton({ dir, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? 'Scroll back' : 'Scroll forward'}
      className="glass w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 hover:border-white/40"
      style={{ color: GOLD }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d={dir < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function MomentsSection() {
  const carouselRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const videos = usePlaylistVideos();

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(220, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="moments" className="relative py-28 overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <SectionHeading
          eyebrow="SOLAR PLEXUS"
          color={GOLD}
          title="Formless Moments"
          sub="Short teachings for the middle of your day."
          actionsClassName="hidden md:block"
        >
          <div className="flex gap-3">
            <ArrowButton dir={-1} onClick={() => scroll(-1)} />
            <ArrowButton dir={1} onClick={() => scroll(1)} />
          </div>
        </SectionHeading>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 py-2"
          style={{ scrollSnapType: 'x proximity', scrollPaddingLeft: '24px' }}
        >
          {videos.map((video) => (
            <ShortCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="btn-line micro-label" style={{ '--c': GOLD }}>
            WATCH ALL SHORTS
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
