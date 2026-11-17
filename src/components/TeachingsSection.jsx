import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import MomentsSection from './MomentsSection';
import Thumb from './Thumb';
import { Arrow, Play } from './Icons';
import { useLatestEpisodes } from '../youtube';
import { YOUTUBE_URL, SPOTIFY_URL, watchUrl } from '../library';

export default function TeachingsSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [latest, ...rest] = useLatestEpisodes(5);

  return (
    <section id="teachings" className="relative py-28 overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <SectionHeading
          section="teachings"
          title={<>The <em>teachings</em></>}
          sub="A spirituality podcast on non-duality, rooted in Theravāda Buddhism and drawing on philosophy, psychology and science: Zen, Yoga, Carl Jung, Gnosticism and mysticism. Hosted by Sat Guru Jay."
        >
          <div className="flex flex-wrap gap-3">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn-ink micro-label" style={{ padding: '12px 22px' }}>
              WATCH ON YOUTUBE
            </a>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="btn-outline micro-label" style={{ padding: '12px 22px' }}>
              LISTEN ON SPOTIFY
            </a>
          </div>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Latest episode */}
          <a href={watchUrl(latest.id)} target="_blank" rel="noopener noreferrer" className="lg:col-span-7 group block">
            <div className="lift relative overflow-hidden rounded-3xl" style={{ aspectRatio: '16 / 9', background: '#17141f' }}>
              <Thumb videoId={latest.id} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute left-5 bottom-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: '#fbf7ef', color: '#17141f', boxShadow: '0 8px 24px rgba(23,20,31,0.35)' }} aria-hidden="true">
                <Play className="w-6 h-6 ml-0.5" />
              </span>
            </div>
            <p className="micro-label mt-6 mb-3" style={{ color: '#8a5f00' }}>LATEST EPISODE</p>
            <h3 className="display text-ink" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', lineHeight: 1.15 }}>
              {latest.title}
            </h3>
          </a>

          {/* The four before it */}
          <div className="lg:col-span-5">
            <p className="micro-label text-fog mb-2">MORE RECENT EPISODES</p>
            <ul>
              {rest.map((ep) => (
                <li key={ep.id}>
                  <a href={watchUrl(ep.id)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 py-4 group" style={{ borderBottom: '1px solid rgba(23,20,31,0.14)' }}>
                    <span className="relative flex-shrink-0 overflow-hidden rounded-xl w-[112px] sm:w-[128px]"
                      style={{ aspectRatio: '16 / 9', background: '#17141f' }}>
                      <Thumb videoId={ep.id} className="absolute inset-0 w-full h-full object-cover" />
                    </span>
                    <span className="font-sans font-medium text-ink leading-snug line-clamp-3 group-hover:underline"
                      style={{ fontSize: '1rem', textUnderlineOffset: '4px' }}>
                      {ep.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={`${YOUTUBE_URL}/videos`} target="_blank" rel="noopener noreferrer"
              className="ink-link font-sans font-medium inline-flex items-center gap-2 mt-6">
              All episodes <Arrow />
            </a>
          </div>
        </div>

        <MomentsSection />
      </motion.div>
    </section>
  );
}
