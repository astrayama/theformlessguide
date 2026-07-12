import { useId } from 'react';

// The Seeker's Flame — one continuous stroke: a seed-coil at the base
// unfurls through two and a half turns and rises as a flame, dissolving
// into embers at its tip. The gradient climbs root-violet to crown-teal
// (the same ascent as the chakra nav), and a gold spark — the inner will
// of fire — burns at the coil's heart. Original geometry drawn for this site.
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
        <linearGradient id={grad} x1="0.4" y1="1" x2="0.6" y2="0">
          <stop offset="0" stopColor="#7b2fff" />
          <stop offset="0.45" stopColor="#ec78be" />
          <stop offset="1" stopColor="#00f5d4" />
        </linearGradient>
      </defs>

      {/* The journey — seed-coil unfurling into a rising flame */}
      <path
        d="M28 44 A4 4 0 1 0 36 44 A6 6 0 1 0 24 44 A9 9 0 1 0 42 44 C50 36 48 18 37 7"
        stroke={`url(#${grad})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Inner flame — a quieter tongue rising within */}
      <path
        d="M36 40 C42 34 41 22 33 13"
        stroke="#00f5d4"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Embers ascending from the tip */}
      <circle cx="40" cy="5" r="1.5" fill="#00f5d4" opacity="0.85" />
      <circle cx="43.5" cy="3.5" r="1" fill="#00f5d4" opacity="0.6" />
      <circle cx="34" cy="3" r="0.8" fill="#00f5d4" opacity="0.5" />
      <circle cx="46" cy="6.5" r="0.6" fill="#00f5d4" opacity="0.4" />
      <circle cx="30" cy="6" r="0.5" fill="#00f5d4" opacity="0.3" />

      {/* The spark of inner will — gold, at the heart of the seed */}
      <circle cx="32" cy="44" r="5" fill="#ffd700" opacity="0.14" />
      <path
        d="M32 40.5 C32.6 42.8 33.7 43.4 35.5 44 C33.7 44.6 32.6 45.2 32 47.5 C31.4 45.2 30.3 44.6 28.5 44 C30.3 43.4 31.4 42.8 32 40.5 Z"
        fill="#ffd700"
        opacity="0.95"
      />
    </svg>
  );
}
