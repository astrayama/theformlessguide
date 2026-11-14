import { useState } from 'react';

// YouTube thumbnail sizes, sharpest first. hq720 is 16:9 with no bars but is
// missing on some uploads. sddefault is 4:3 with bars that a 16:9 cover crop
// trims away. mqdefault is small but always exists.
const SIZES = ['hq720', 'sddefault', 'mqdefault'];

export default function Thumb({ videoId, alt = '', className = '' }) {
  const [step, setStep] = useState(0);
  if (step >= SIZES.length) return null;
  const next = () => setStep((s) => s + 1);
  return (
    <img
      key={`${videoId}-${step}`}
      src={`https://i.ytimg.com/vi/${videoId}/${SIZES[step]}.jpg`}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={next}
      // A missing size still loads, as a 120px grey placeholder. Treat that as a miss.
      onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120) next(); }}
    />
  );
}
