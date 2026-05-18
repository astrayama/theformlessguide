import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const chakras = [
  { id: 'hero',      name: 'Root',        color: '#FF0000', symbol: 'Muladhara' },
  { id: 'guides',    name: 'Sacral',      color: '#FF7F00', symbol: 'Svadhisthana' },
  { id: 'moments',   name: 'Solar',       color: '#FFFF00', symbol: 'Manipura' },
  { id: 'about',     name: 'Heart',       color: '#00CC44', symbol: 'Anahata' },
  { id: 'stillness', name: 'Throat',      color: '#0099FF', symbol: 'Vishuddha' },
  { id: 'catalog',   name: 'Third Eye',   color: '#6600CC', symbol: 'Ajna' },
  { id: 'shop',      name: 'Crown',       color: '#CC00FF', symbol: 'Sahasrara' },
];

function ChakraSymbol({ chakra, active }) {
  const c = chakra.color;
  const opacity = active ? 1 : 0.28;
  const filter = active ? `drop-shadow(0 0 6px ${c}) drop-shadow(0 0 12px ${c})` : 'none';

  return (
    <svg
      viewBox="0 0 40 40"
      width="28"
      height="28"
      style={{ opacity, filter, transition: 'all 0.4s ease' }}
    >
      {/* Outer circle */}
      <circle cx="20" cy="20" r="18" fill="none" stroke={c} strokeWidth="1.2" />
      {/* Inner circle */}
      <circle cx="20" cy="20" r="10" fill="none" stroke={c} strokeWidth="0.8" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="3" fill={c} />
      {/* Petals (lotus) */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8 * Math.PI / 180;
        const px = 20 + Math.cos(angle) * 14;
        const py = 20 + Math.sin(angle) * 14;
        const px2 = 20 + Math.cos(angle + 0.4) * 9;
        const py2 = 20 + Math.sin(angle + 0.4) * 9;
        const px3 = 20 + Math.cos(angle - 0.4) * 9;
        const py3 = 20 + Math.sin(angle - 0.4) * 9;
        return (
          <path key={i} d={`M${px2},${py2} Q${px},${py} ${px3},${py3}`}
            fill="none" stroke={c} strokeWidth="0.8" opacity="0.8" />
        );
      })}
      {/* Triangle (upward) */}
      <polygon
        points={`20,${20-8} ${20+7},${20+4} ${20-7},${20+4}`}
        fill="none" stroke={c} strokeWidth="0.7" opacity="0.7"
      />
    </svg>
  );
}

export default function ChakraNav({ activeSection }) {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Desktop right sidebar
  const Desktop = (
    <div
      className="fixed right-0 top-0 h-screen w-16 z-40 hidden md:flex flex-col items-center justify-center gap-5"
      style={{ borderLeft: '1px solid rgba(0,245,212,0.15)' }}
    >
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, #00f5d4, transparent)', opacity: 0.4 }} />

      {chakras.map((chakra) => {
        const active = activeSection === chakra.id;
        return (
          <button
            key={chakra.id}
            onClick={() => scrollTo(chakra.id)}
            title={`${chakra.name} — ${chakra.symbol}`}
            className="relative group cursor-pointer"
            style={{ animation: active ? 'breathe 3s ease-in-out infinite' : 'none' }}
          >
            <ChakraSymbol chakra={chakra} active={active} />
            {/* Tooltip */}
            <span className="absolute right-12 top-1/2 -translate-y-1/2 text-xs font-raleway whitespace-nowrap
              px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: '#1a2035', color: chakra.color, border: `1px solid ${chakra.color}33` }}>
              {chakra.name}
            </span>
          </button>
        );
      })}
    </div>
  );

  // Mobile sticky top bar
  const Mobile = (
    <div className="chakra-mobile-bar md:hidden w-full flex items-center justify-around px-4"
      style={{ height: '56px', zIndex: 50 }}>
      {chakras.map((chakra) => {
        const active = activeSection === chakra.id;
        return (
          <button
            key={chakra.id}
            onClick={() => scrollTo(chakra.id)}
            title={chakra.name}
            className="relative flex flex-col items-center pb-1"
          >
            <ChakraSymbol chakra={chakra} active={active} />
            {active && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                style={{ background: chakra.color, boxShadow: `0 0 6px ${chakra.color}` }} />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {Desktop}
      {Mobile}
    </>
  );
}

export { chakras };
