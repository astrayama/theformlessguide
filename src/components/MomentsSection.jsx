import { useRef } from 'react';
import Thumb from './Thumb';
import { Arrow, Play } from './Icons';
import { useShorts } from '../youtube';
import { MOMENTS_PLAYLIST_ID, playlistUrl } from '../library';

function ShortCard({ video }) {
  return (
    <a
      href={`https://www.youtube.com/shorts/${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="lift relative block flex-shrink-0 overflow-hidden rounded-3xl w-[168px] sm:w-[204px]"
      style={{ aspectRatio: '9 / 16', background: '#17141f', scrollSnapAlign: 'start' }}
    >
      {/* The 16:9 thumbnail of a Short holds the vertical frame in its center, so cover-cropping shows it cleanly */}
      <Thumb videoId={video.id} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(23,20,31,0.95) 0%, rgba(23,20,31,0.35) 45%, rgba(23,20,31,0) 70%)' }} />
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: '#fbf7ef', color: '#17141f' }} aria-hidden="true">
        <Play className="w-4 h-4 ml-0.5" />
      </span>
      <p className="absolute left-3.5 right-3.5 bottom-3.5 font-sans font-medium leading-snug line-clamp-3"
        style={{ fontSize: '0.95rem', color: '#fbf7ef' }}>
        {video.title}
      </p>
    </a>
  );
}

function RoundButton({ dir, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? 'Scroll back' : 'Scroll forward'}
      className="w-11 h-11 rounded-full flex items-center justify-center text-ink transition-colors duration-200 hover:bg-ink hover:text-vellum"
      style={{ border: '1px solid rgba(23,20,31,0.4)' }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d={dir < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Formless Moments: the Shorts, as a row of vertical cards.
export default function MomentsSection() {
  const rowRef = useRef(null);
  const videos = useShorts();

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(220, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div id="moments" className="mt-24">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h3 className="display text-ink" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)' }}>
            Formless <em>Moments</em>
          </h3>
          <p className="font-sans text-stone mt-3" style={{ fontSize: '1.05rem' }}>
            Short teachings for the middle of your day.
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <RoundButton dir={-1} onClick={() => scroll(-1)} />
          <RoundButton dir={1} onClick={() => scroll(1)} />
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 py-2"
        style={{ scrollSnapType: 'x proximity', scrollPaddingLeft: '24px' }}
      >
        {videos.map((video) => (
          <ShortCard key={video.id} video={video} />
        ))}
      </div>

      <a href={playlistUrl(MOMENTS_PLAYLIST_ID)} target="_blank" rel="noopener noreferrer"
        className="ink-link font-sans font-medium inline-flex items-center gap-2 mt-8">
        Watch all Shorts <Arrow />
      </a>
    </div>
  );
}
