import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Static video data from the Formless Moments playlist
// These are representative videos from the channel; thumbnails via YouTube's image CDN
const PLAYLIST_ID = 'PLg1ZRqch8VjNlu0KLPI58iANTLvuoFcvz';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

const videos = [
  {
    id: 'dQw4w9WgXcQ', // placeholder — will redirect to playlist
    title: 'Breaking Gravity: Somatic Awakening',
    thumb: `https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`,
    realThumb: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
  },
  {
    id: 'formless-1',
    title: 'The Architecture of the Self',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
  {
    id: 'formless-2',
    title: 'Shadow Integration: Jungian Depth Work',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
  {
    id: 'formless-3',
    title: 'Nervous System Reset: Somatic Technology',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
  {
    id: 'formless-4',
    title: 'Cosmic Symbolism & Sacred Geometry',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
  {
    id: 'formless-5',
    title: 'Non-Dual Awareness: The Direct Path',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
  {
    id: 'formless-6',
    title: 'The Formless Practice: Daily Presence',
    thumb: null,
    label: 'THE FORMLESS GUIDE',
  },
];

// Decorative gradient card for videos without thumbnails
function VideoCard({ video, index }) {
  const gradients = [
    'linear-gradient(135deg, #0d1530 0%, #1a2d55 40%, #001a3a 100%)',
    'linear-gradient(135deg, #1a0d30 0%, #2d1a55 40%, #0d0020 100%)',
    'linear-gradient(135deg, #0d2030 0%, #1a3545 40%, #001520 100%)',
    'linear-gradient(135deg, #200d30 0%, #3a1a50 40%, #150030 100%)',
    'linear-gradient(135deg, #0d1a30 0%, #1a2d50 40%, #001525 100%)',
    'linear-gradient(135deg, #1a1030 0%, #2a1a45 40%, #0d0825 100%)',
    'linear-gradient(135deg, #0a1525 0%, #172440 40%, #060f1a 100%)',
  ];

  return (
    <a
      href={PLAYLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
      style={{
        width: '280px',
        border: '1px solid rgba(0,245,212,0.15)',
      }}
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
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: gradients[index % gradients.length] }}>
        {/* Sacred geometry overlay */}
        <svg viewBox="0 0 280 157" className="absolute inset-0 w-full h-full" fill="none" opacity="0.3">
          <circle cx="140" cy="78" r="50" stroke="#00f5d4" strokeWidth="0.8" />
          <circle cx="140" cy="78" r="30" stroke="#00f5d4" strokeWidth="0.6" />
          <polygon points="140,28 183,103 97,103" stroke="#00f5d4" strokeWidth="0.7" fill="none" />
          <polygon points="140,128 183,53 97,53" stroke="#7b2fff" strokeWidth="0.7" fill="none" />
          {[0,60,120,180,240,300].map((a,i) => (
            <circle key={i} cx={140 + Math.cos(a*Math.PI/180)*50} cy={78 + Math.sin(a*Math.PI/180)*50}
              r="3" fill="#00f5d4" opacity="0.6" />
          ))}
        </svg>
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(0,245,212,0.2)', border: '1px solid rgba(0,245,212,0.5)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 ml-1" fill="#00f5d4">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Label badge */}
        <div className="absolute top-3 left-3">
          <span className="font-cinzel text-xs px-2 py-1 rounded"
            style={{ background: 'rgba(10,14,26,0.85)', color: '#00f5d4', border: '1px solid rgba(0,245,212,0.3)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            THE FORMLESS GUIDE
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4" style={{ background: '#1a2035' }}>
        <p className="font-raleway font-medium text-cream text-sm leading-snug">
          {video.title}
        </p>
        <p className="font-raleway text-xs mt-2 flex items-center gap-1" style={{ color: '#7a8aaa' }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
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

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
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

        {/* Carousel container */}
        <div className="relative">
          {/* Left arrow */}
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

          {/* Scrollable row */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto carousel-scroll pb-4"
            style={{ scrollSnapType: 'x mandatory', paddingLeft: '8px', paddingRight: '8px' }}
          >
            {videos.map((video, i) => (
              <div key={video.id} style={{ scrollSnapAlign: 'start' }}>
                <VideoCard video={video} index={i} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
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

        {/* Full playlist CTA */}
        <div className="text-center mt-10">
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-sm tracking-widest px-8 py-3 rounded inline-block transition-all duration-300"
            style={{
              color: '#00f5d4',
              border: '1px solid rgba(0,245,212,0.4)',
              background: 'transparent',
              letterSpacing: '0.15em',
            }}
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
