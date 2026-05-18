import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PLAYLIST_ID = 'PLg1ZRqch8VjMwPQ9NRigFX7DUlXi9aqHJ';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

function usePlaylistVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) { setLoading(false); return; }

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=12&key=${apiKey}`
    )
      .then(r => r.json())
      .then(data => {
        if (!data.items) return;
        setVideos(
          data.items
            .filter(item => item.snippet.thumbnails)
            .map(item => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumb:
                item.snippet.thumbnails.maxres?.url ||
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.medium?.url,
            }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { videos, loading };
}

// Fallback placeholder card used when API key is absent or while loading
function PlaceholderCard({ index }) {
  const gradients = [
    'linear-gradient(135deg, #0d1530 0%, #1a2d55 40%, #001a3a 100%)',
    'linear-gradient(135deg, #1a0d30 0%, #2d1a55 40%, #0d0020 100%)',
    'linear-gradient(135deg, #0d2030 0%, #1a3545 40%, #001520 100%)',
    'linear-gradient(135deg, #200d30 0%, #3a1a50 40%, #150030 100%)',
    'linear-gradient(135deg, #0d1a30 0%, #1a2d50 40%, #001525 100%)',
    'linear-gradient(135deg, #1a1030 0%, #2a1a45 40%, #0d0825 100%)',
    'linear-gradient(135deg, #0a1525 0%, #172440 40%, #060f1a 100%)',
  ];
  const titles = [
    'Breaking Gravity: Somatic Awakening',
    'The Architecture of the Self',
    'Shadow Integration: Jungian Depth Work',
    'Nervous System Reset: Somatic Technology',
    'Cosmic Symbolism & Sacred Geometry',
    'Non-Dual Awareness: The Direct Path',
    'The Formless Practice: Daily Presence',
    'Archetypal Psychology: Meeting the Shadow',
    'The Witness State: Pure Consciousness',
    'Breathwork & Somatic Release',
    'Sacred Geometry & the Cosmic Body',
    'The Formless Path: Beyond Dogma',
  ];

  return (
    <a
      href={PLAYLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
      style={{ width: '260px', border: '1px solid rgba(0,245,212,0.15)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,212,0.5)';
        e.currentTarget.style.boxShadow = '0 0 25px rgba(0,245,212,0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,212,0.15)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: gradients[index % gradients.length] }}>
        <svg viewBox="0 0 260 146" className="absolute inset-0 w-full h-full" fill="none" opacity="0.25">
          <circle cx="130" cy="73" r="45" stroke="#00f5d4" strokeWidth="0.7" />
          <polygon points="130,28 173,95 87,95" stroke="#00f5d4" strokeWidth="0.6" fill="none" />
          <polygon points="130,118 173,51 87,51" stroke="#7b2fff" strokeWidth="0.6" fill="none" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(0,245,212,0.2)', border: '1px solid rgba(0,245,212,0.5)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 ml-1" fill="#00f5d4"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <div className="p-3" style={{ background: '#1a2035' }}>
        <p className="font-raleway font-medium text-cream text-sm leading-snug line-clamp-2">
          {titles[index % titles.length]}
        </p>
      </div>
    </a>
  );
}

function VideoCard({ video }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
      style={{ width: '260px', border: '1px solid rgba(0,245,212,0.15)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,212,0.5)';
        e.currentTarget.style.boxShadow = '0 0 25px rgba(0,245,212,0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,212,0.15)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0d1530' }}>
        <img
          src={video.thumb}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(10,14,26,0.4)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,245,212,0.25)', border: '1.5px solid rgba(0,245,212,0.7)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 ml-1" fill="#00f5d4"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <div className="p-3" style={{ background: '#1a2035' }}>
        <p className="font-raleway font-medium text-cream text-sm leading-snug line-clamp-2">
          {video.title}
        </p>
        <p className="font-raleway text-xs mt-1.5 flex items-center gap-1" style={{ color: '#7a8aaa' }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch on YouTube
        </p>
      </div>
    </a>
  );
}

export default function MomentsSection() {
  const carouselRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { videos, loading } = usePlaylistVideos();

  // Show 7 placeholders while loading or if no API key
  const showPlaceholders = loading || videos.length === 0;
  const placeholderCount = 7;

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 290, behavior: 'smooth' });
  };

  return (
    <section id="moments" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="text-center mb-14">
            <h2 className="font-cinzel font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em' }}>
              Formless Moments
            </h2>
            <p className="font-raleway text-muted max-w-xl mx-auto">
              Guided movement and somatic technology to break gravity
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: '#1a2035', border: '1px solid rgba(0,245,212,0.3)', color: '#00f5d4' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(0,245,212,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto carousel-scroll pb-4"
              style={{ scrollSnapType: 'x mandatory', paddingLeft: '8px', paddingRight: '8px' }}
            >
              {showPlaceholders
                ? Array.from({ length: placeholderCount }, (_, i) => (
                    <div key={i} style={{ scrollSnapAlign: 'start' }}>
                      <PlaceholderCard index={i} />
                    </div>
                  ))
                : videos.map(video => (
                    <div key={video.id} style={{ scrollSnapAlign: 'start' }}>
                      <VideoCard video={video} />
                    </div>
                  ))
              }
            </div>

            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: '#1a2035', border: '1px solid rgba(0,245,212,0.3)', color: '#00f5d4' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(0,245,212,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-10">
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-sm tracking-widest px-8 py-3 rounded inline-block transition-all duration-300"
              style={{ color: '#00f5d4', border: '1px solid rgba(0,245,212,0.4)', background: 'transparent', letterSpacing: '0.15em' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,245,212,0.08)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,212,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              VIEW FULL PLAYLIST
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
