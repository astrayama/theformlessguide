import { useId } from 'react';

// The Formless Enso — an unfinished circle dissolving into particles at its
// crown (form becoming formless), a faint inner ring, and a single center
// dot: the witness that remains. Original geometry, drawn for this site.
export default function Logo({ size = 64, className = '', style = {} }) {
  const id = useId();
  const grad = `fm-grad-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
      role="img"
      aria-label="The Formless Guide"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7b2fff" />
          <stop offset="1" stopColor="#00f5d4" />
        </linearGradient>
      </defs>

      {/* The circle of form — deliberately incomplete */}
      <path
        d="M52.67 24.47 A22 22 0 1 1 37.69 10.75"
        stroke={`url(#${grad})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Dissolution — the stroke scatters into particles across the gap */}
      <circle cx="41.47" cy="11.7" r="2" fill="#00f5d4" opacity="0.9" />
      <circle cx="45.64" cy="13.23" r="1.6" fill="#00f5d4" opacity="0.72" />
      <circle cx="49.41" cy="15.19" r="1.2" fill="#00f5d4" opacity="0.55" />
      <circle cx="52.81" cy="17.43" r="0.85" fill="#00f5d4" opacity="0.4" />
      <circle cx="55.88" cy="19.83" r="0.55" fill="#00f5d4" opacity="0.28" />
      {/* Strays drifting free */}
      <circle cx="51.2" cy="9.6" r="0.45" fill="#00f5d4" opacity="0.22" />
      <circle cx="58.2" cy="13.8" r="0.4" fill="#00f5d4" opacity="0.18" />

      {/* Inner stillness — faint ring and the witness */}
      <circle cx="32" cy="32" r="9" stroke="#00f5d4" strokeWidth="0.75" opacity="0.32" />
      <circle cx="32" cy="32" r="2.2" fill="#00f5d4" opacity="0.9" />
    </svg>
  );
}
