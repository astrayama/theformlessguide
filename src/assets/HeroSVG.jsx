export default function HeroSVG() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Deep space gradient */}
        <radialGradient id="spaceGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0d1530" />
          <stop offset="60%" stopColor="#060a14" />
          <stop offset="100%" stopColor="#020408" />
        </radialGradient>
        {/* Nebula left - teal/green */}
        <radialGradient id="nebulaLeft" cx="20%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00aa88" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
        </radialGradient>
        {/* Nebula right - purple */}
        <radialGradient id="nebulaRight" cx="80%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#4400cc" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7b2fff" stopOpacity="0" />
        </radialGradient>
        {/* Galaxy spiral */}
        <radialGradient id="galaxyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#aad4ff" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#7b2fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7b2fff" stopOpacity="0" />
        </radialGradient>
        {/* Halo gradient */}
        <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </radialGradient>
        {/* Figure glow */}
        <radialGradient id="figureGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
        </radialGradient>
        {/* Arch stone */}
        <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a2540" />
          <stop offset="50%" stopColor="#2a3555" />
          <stop offset="100%" stopColor="#1a2540" />
        </linearGradient>
        <filter id="glow-teal">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-halo">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === BACKGROUND === */}
      <rect width="1440" height="900" fill="url(#spaceGrad)" />

      {/* Nebula washes */}
      <rect width="1440" height="900" fill="url(#nebulaLeft)" />
      <rect width="1440" height="900" fill="url(#nebulaRight)" />

      {/* === STARS === */}
      {[
        [120, 80, 1.5], [250, 45, 1], [380, 120, 2], [50, 200, 1.2],
        [600, 60, 1.8], [750, 30, 1], [900, 90, 2.2], [1050, 50, 1.5],
        [1200, 80, 1], [1350, 40, 1.8], [1400, 140, 1.2],
        [180, 300, 1], [320, 250, 1.5], [480, 180, 1.8], [80, 400, 1],
        [1300, 200, 1.5], [1380, 280, 1], [1100, 160, 2],
        [700, 140, 1], [820, 200, 1.3], [950, 130, 1],
        [30, 500, 1.2], [1420, 400, 1.5], [1380, 500, 1],
        [200, 600, 1], [1250, 550, 1.3], [100, 700, 1.5], [1350, 650, 1],
        [440, 80, 1.2], [560, 160, 1], [660, 100, 1.8],
        [1020, 300, 1], [1150, 250, 1.4],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.5 + Math.random() * 0.5} />
      ))}

      {/* Bright accent stars */}
      {[[150, 60], [700, 45], [1100, 75], [1320, 120], [400, 35]].map(([x, y], i) => (
        <g key={`bright-${i}`}>
          <circle cx={x} cy={y} r={2.5} fill="white" opacity={0.9} />
          <circle cx={x} cy={y} r={5} fill="white" opacity={0.2} />
        </g>
      ))}

      {/* === SPIRAL GALAXY (top right) === */}
      <g transform="translate(1150, 160)">
        <ellipse rx="80" ry="80" fill="url(#galaxyGrad)" opacity="0.5" />
        {/* Spiral arms */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={`arm-${i}`} transform={`rotate(${angle})`}>
            <ellipse rx="90" ry="18" fill="none" stroke="#aad4ff" strokeWidth="1" opacity="0.15"
              transform="translate(30, 0)" />
          </g>
        ))}
        <circle r="6" fill="white" opacity="0.9" />
        <circle r="12" fill="white" opacity="0.15" />
        {/* Galaxy stars */}
        {Array.from({length: 40}, (_, i) => {
          const a = (i / 40) * Math.PI * 6;
          const r2 = (i / 40) * 75;
          return <circle key={i} cx={Math.cos(a) * r2} cy={Math.sin(a) * r2 * 0.5}
            r={0.8} fill="white" opacity={0.6 - i * 0.01} />;
        })}
      </g>

      {/* === CONSTELLATIONS === */}
      <g stroke="#7b2fff" strokeWidth="0.5" opacity="0.3">
        <line x1="120" y1="80" x2="250" y2="45" />
        <line x1="250" y1="45" x2="380" y2="120" />
        <line x1="380" y1="120" x2="320" y2="250" />
        <line x1="1050" y1="50" x2="1200" y2="80" />
        <line x1="1200" y1="80" x2="1350" y2="40" />
        <line x1="1350" y1="40" x2="1300" y2="200" />
      </g>

      {/* === LEFT PILLAR === */}
      <g>
        {/* Pillar body */}
        <rect x="120" y="100" width="100" height="780" fill="url(#archGrad)" />
        {/* Pillar highlight */}
        <rect x="125" y="100" width="8" height="780" fill="#3a4565" opacity="0.5" />
        {/* Capital top */}
        <rect x="100" y="90" width="140" height="25" fill="#2a3555" rx="3" />
        <rect x="95" y="78" width="150" height="18" fill="#1a2540" rx="2" />

        {/* Rune carvings on left pillar */}
        {[180, 250, 320, 390, 460, 530, 600].map((y, i) => (
          <g key={`rune-l-${i}`} transform={`translate(170, ${y})`} stroke="#00f5d4" strokeWidth="1.2"
            fill="none" opacity="0.5" filter="url(#glow-teal)">
            {i === 0 && <><line x1="-15" y1="0" x2="15" y2="0" /><line x1="0" y1="-15" x2="0" y2="15" />
              <line x1="-10" y1="-10" x2="10" y2="10" /></>}
            {i === 1 && <><path d="M-12,-12 L0,-18 L12,-12 L12,12 L0,18 L-12,12 Z" /></>}
            {i === 2 && <><circle r="12" /><line x1="0" y1="-12" x2="0" y2="12" />
              <line x1="-12" y1="0" x2="12" y2="0" /></>}
            {i === 3 && <><path d="M-10,10 L0,-14 L10,10 Z" /><path d="M-10,-10 L0,14 L10,-10 Z" /></>}
            {i === 4 && <><rect x="-12" y="-12" width="24" height="24" /><line x1="-12" y1="-12" x2="12" y2="12" />
              <line x1="12" y1="-12" x2="-12" y2="12" /></>}
            {i === 5 && <><circle r="8" /><circle r="14" strokeDasharray="4 3" /></>}
            {i === 6 && <><path d="M0,-15 L15,8 L-15,8 Z" /><path d="M0,15 L15,-8 L-15,-8 Z" /></>}
          </g>
        ))}

        {/* Sacred geometry on left side */}
        <g transform="translate(60, 350)" stroke="#00f5d4" fill="none" strokeWidth="0.8" opacity="0.4" filter="url(#glow-teal)">
          {/* Metatron's Cube outline */}
          <circle cx="0" cy="0" r="45" />
          {[0,60,120,180,240,300].map((a,i) => (
            <g key={i}>
              <circle cx={Math.cos(a*Math.PI/180)*45} cy={Math.sin(a*Math.PI/180)*45} r="45" />
              <line x1="0" y1="0" x2={Math.cos(a*Math.PI/180)*45} y2={Math.sin(a*Math.PI/180)*45} />
            </g>
          ))}
          {/* Outer hexagon */}
          <polygon points={[0,60,120,180,240,300].map(a =>
            `${Math.cos(a*Math.PI/180)*45},${Math.sin(a*Math.PI/180)*45}`).join(' ')} />
        </g>

        {/* Icosahedron on left */}
        <g transform="translate(60, 550)" stroke="#7b2fff" fill="none" strokeWidth="0.8" opacity="0.5">
          <polygon points="0,-40 38,12 23,38 -23,38 -38,12" />
          <polygon points="0,-40 38,12 0,0" />
          <polygon points="38,12 23,38 0,0" />
          <polygon points="23,38 -23,38 0,0" />
          <polygon points="-23,38 -38,12 0,0" />
          <polygon points="-38,12 0,-40 0,0" />
        </g>

        {/* Star of David */}
        <g transform="translate(60, 700)" stroke="#00f5d4" fill="none" strokeWidth="0.8" opacity="0.4">
          <polygon points="0,-30 26,15 -26,15" />
          <polygon points="0,30 26,-15 -26,-15" />
        </g>
      </g>

      {/* === RIGHT PILLAR === */}
      <g>
        <rect x="1220" y="100" width="100" height="780" fill="url(#archGrad)" />
        <rect x="1307" y="100" width="8" height="780" fill="#3a4565" opacity="0.5" />
        <rect x="1200" y="90" width="140" height="25" fill="#2a3555" rx="3" />
        <rect x="1195" y="78" width="150" height="18" fill="#1a2540" rx="2" />

        {/* 7 Chakra symbols on right pillar — glowing dots */}
        {[
          { y: 750, color: '#FF0000', label: 'root' },
          { y: 670, color: '#FF7F00', label: 'sacral' },
          { y: 590, color: '#FFFF00', label: 'solar' },
          { y: 510, color: '#00CC44', label: 'heart' },
          { y: 430, color: '#0099FF', label: 'throat' },
          { y: 350, color: '#6600CC', label: 'third-eye' },
          { y: 270, color: '#CC00FF', label: 'crown' },
        ].map(({ y, color, label }) => (
          <g key={label} transform={`translate(1270, ${y})`} filter="url(#glow-strong)">
            <circle r="14" fill={color} opacity="0.2" />
            <circle r="8" fill={color} opacity="0.6" />
            <circle r="4" fill={color} opacity="1" />
            <circle r="20" fill={color} opacity="0.08" />
          </g>
        ))}

        {/* Rune carvings on right pillar */}
        {[180, 250, 320, 390, 460, 530, 600].map((y, i) => (
          <g key={`rune-r-${i}`} transform={`translate(1270, ${y})`} stroke="#00f5d4" strokeWidth="1.2"
            fill="none" opacity="0.35" filter="url(#glow-teal)">
            {i === 0 && <><line x1="-15" y1="0" x2="15" y2="0" /><line x1="0" y1="-15" x2="0" y2="15" /></>}
            {i === 1 && <><path d="M-12,-12 L12,-12 L12,12 L-12,12 Z" /><line x1="-12" y1="0" x2="12" y2="0" /></>}
            {i === 2 && <><circle r="10" /><path d="M-5,-8 L0,-14 L5,-8" /></>}
            {i === 3 && <><path d="M-12,10 L0,-14 L12,10 Z" /></>}
            {i === 4 && <><line x1="-12" y1="-12" x2="12" y2="12" /><line x1="12" y1="-12" x2="-12" y2="12" /></>}
            {i === 5 && <><circle r="12" strokeDasharray="6 4" /></>}
            {i === 6 && <><path d="M0,-15 L13,7 L-13,7 Z" /><line x1="-8" y1="7" x2="8" y2="7" /></>}
          </g>
        ))}
      </g>

      {/* === ARCH === */}
      {/* Left arch curve */}
      <path d="M220,100 Q580,0 720,80" stroke="#2a3555" strokeWidth="30" fill="none" strokeLinecap="round" />
      <path d="M220,100 Q580,0 720,80" stroke="#3a4565" strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M220,100 Q580,0 720,80" stroke="#00f5d4" strokeWidth="1" fill="none" opacity="0.4"
        filter="url(#glow-teal)" strokeLinecap="round" />

      {/* Right arch curve */}
      <path d="M1220,100 Q860,0 720,80" stroke="#2a3555" strokeWidth="30" fill="none" strokeLinecap="round" />
      <path d="M1220,100 Q860,0 720,80" stroke="#3a4565" strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M1220,100 Q860,0 720,80" stroke="#00f5d4" strokeWidth="1" fill="none" opacity="0.4"
        filter="url(#glow-teal)" strokeLinecap="round" />

      {/* Arch keystone */}
      <polygon points="720,55 745,95 695,95" fill="#2a3555" />
      <polygon points="720,55 745,95 695,95" fill="none" stroke="#00f5d4" strokeWidth="1" opacity="0.6" filter="url(#glow-teal)" />
      <circle cx="720" cy="75" r="6" fill="#00f5d4" opacity="0.8" filter="url(#glow-strong)" />

      {/* === FLOOR === */}
      <path d="M120,880 L1320,880 L1200,700 L240,700 Z" fill="#0d1530" opacity="0.6" />
      {/* Floor lines (perspective) */}
      {[-3,-2,-1,0,1,2,3].map(i => (
        <line key={i} x1={720 + i * 200} y1={700} x2={720 + i * 350} y2={880}
          stroke="#1a2540" strokeWidth="1" opacity="0.5" />
      ))}
      <line x1="240" y1="700" x2="1200" y2="700" stroke="#2a3555" strokeWidth="1.5" />

      {/* === THRONE === */}
      <g transform="translate(720, 650)">
        {/* Throne base */}
        <rect x="-80" y="0" width="160" height="30" fill="#1a2540" rx="5" />
        <rect x="-70" y="-20" width="140" height="25" fill="#1f2d50" rx="3" />
        {/* Throne seat */}
        <rect x="-65" y="-45" width="130" height="30" fill="#233060" rx="4" />
        <rect x="-60" y="-50" width="120" height="10" fill="#2a3870" rx="3" />
        {/* Throne back */}
        <rect x="-55" y="-200" width="110" height="155" fill="#1a2540" rx="5" />
        <rect x="-48" y="-195" width="96" height="140" fill="#0f1830" rx="4" />
        {/* Throne back details */}
        <circle cx="0" cy="-150" r="20" fill="none" stroke="#00f5d4" strokeWidth="1" opacity="0.4" filter="url(#glow-teal)" />
        <line x1="-40" y1="-130" x2="40" y2="-130" stroke="#00f5d4" strokeWidth="0.8" opacity="0.3" />
        <line x1="-40" y1="-110" x2="40" y2="-110" stroke="#00f5d4" strokeWidth="0.8" opacity="0.3" />
        {/* Throne armrests */}
        <rect x="-75" y="-55" width="20" height="45" fill="#233060" rx="3" />
        <rect x="55" y="-55" width="20" height="45" fill="#233060" rx="3" />
        {/* Throne legs */}
        <rect x="-60" y="25" width="15" height="20" fill="#1a2540" rx="2" />
        <rect x="45" y="25" width="15" height="20" fill="#1a2540" rx="2" />
        {/* Throne border glow */}
        <rect x="-55" y="-200" width="110" height="155" fill="none" stroke="#00f5d4" strokeWidth="0.8" rx="5" opacity="0.3" filter="url(#glow-teal)" />
      </g>

      {/* === GOLDEN HALO === */}
      <g transform="translate(720, 390)" filter="url(#glow-halo)">
        <circle r="80" fill="url(#haloGrad)" />
        <circle r="82" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.5" />
        <circle r="90" fill="none" stroke="#ffd700" strokeWidth="0.5" strokeDasharray="8 5" opacity="0.3" />
        {/* Sacred halo rays */}
        {Array.from({length: 16}, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <line key={i} x1={Math.cos(a)*82} y1={Math.sin(a)*82}
            x2={Math.cos(a)*100} y2={Math.sin(a)*100}
            stroke="#ffd700" strokeWidth="1" opacity="0.4" />;
        })}
      </g>

      {/* === GEOMETRIC FIGURE (fully formless/sacred geometry) === */}
      <g filter="url(#figureGlow)">
        {/* BODY GLOW */}
        <ellipse cx="720" cy="500" rx="120" ry="200" fill="#00f5d4" opacity="0.04" />

        {/* TORSO — Dodecahedron projection */}
        <g transform="translate(720, 520)" stroke="#00f5d4" fill="#0d1530" strokeWidth="1.2">
          <polygon points="0,-80 76,-26 47,68 -47,68 -76,-26" fillOpacity="0.3" />
          <polygon points="0,-80 76,-26 47,68 -47,68 -76,-26" fill="none" opacity="0.8" filter="url(#glow-teal)" />
          {/* Inner pentagon */}
          <polygon points="0,-42 40,-14 25,36 -25,36 -40,-14" fill="none" stroke="#00f5d4" strokeWidth="0.8" opacity="0.5" />
          {/* Torso edge lines */}
          <line x1="0" y1="-80" x2="0" y2="-42" stroke="#00f5d4" strokeWidth="0.8" opacity="0.6" />
          <line x1="76" y1="-26" x2="40" y2="-14" stroke="#00f5d4" strokeWidth="0.8" opacity="0.6" />
          <line x1="47" y1="68" x2="25" y2="36" stroke="#00f5d4" strokeWidth="0.8" opacity="0.6" />
          <line x1="-47" y1="68" x2="-25" y2="36" stroke="#00f5d4" strokeWidth="0.8" opacity="0.6" />
          <line x1="-76" y1="-26" x2="-40" y2="-14" stroke="#00f5d4" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* HEAD — Icosahedron */}
        <g transform="translate(720, 400)" stroke="#00f5d4" fill="#0d1530" strokeWidth="1.3">
          {/* Icosahedron front faces */}
          <polygon points="0,-55 52,18 32,48 -32,48 -52,18" fillOpacity="0.4" />
          <polygon points="0,-55 52,18 0,0" fill="#0a1525" fillOpacity="0.6" stroke="#00f5d4" strokeWidth="0.8" opacity="0.8" />
          <polygon points="52,18 32,48 0,0" fill="#0a1525" fillOpacity="0.5" stroke="#00f5d4" strokeWidth="0.8" opacity="0.8" />
          <polygon points="32,48 -32,48 0,0" fill="#0d1a30" fillOpacity="0.5" stroke="#00f5d4" strokeWidth="0.8" opacity="0.8" />
          <polygon points="-32,48 -52,18 0,0" fill="#0a1525" fillOpacity="0.5" stroke="#00f5d4" strokeWidth="0.8" opacity="0.8" />
          <polygon points="-52,18 0,-55 0,0" fill="#0d1a30" fillOpacity="0.5" stroke="#00f5d4" strokeWidth="0.8" opacity="0.8" />
          {/* Outer vertices with glow dots */}
          <circle cx="0" cy="-55" r="3" fill="#00f5d4" opacity="0.9" filter="url(#glow-teal)" />
          <circle cx="52" cy="18" r="2.5" fill="#00f5d4" opacity="0.8" />
          <circle cx="32" cy="48" r="2.5" fill="#00f5d4" opacity="0.8" />
          <circle cx="-32" cy="48" r="2.5" fill="#00f5d4" opacity="0.8" />
          <circle cx="-52" cy="18" r="2.5" fill="#00f5d4" opacity="0.8" />
          {/* "Eyes" — two glowing triangles */}
          <polygon points="-18,-8 -8,-8 -13,-18" fill="#00f5d4" opacity="0.7" filter="url(#glow-teal)" />
          <polygon points="18,-8 8,-8 13,-18" fill="#00f5d4" opacity="0.7" filter="url(#glow-teal)" />
          {/* Third eye on forehead */}
          <circle cx="0" cy="-25" r="5" fill="#7b2fff" opacity="0.9" filter="url(#glow-strong)" />
          <circle cx="0" cy="-25" r="2" fill="white" opacity="0.8" />
        </g>

        {/* NECK — geometric connector */}
        <g transform="translate(720, 455)">
          <rect x="-15" y="0" width="30" height="25" fill="#0d1a30" stroke="#00f5d4" strokeWidth="1" opacity="0.7" />
        </g>

        {/* LEFT ARM */}
        <g transform="translate(640, 490)" stroke="#00f5d4" strokeWidth="1" fill="#0d1830">
          {/* Upper arm — cylinder projection */}
          <rect x="-14" y="-10" width="28" height="70" rx="6" fillOpacity="0.4" />
          <rect x="-14" y="-10" width="28" height="70" rx="6" fill="none" opacity="0.7" filter="url(#glow-teal)" />
          {/* Elbow joint */}
          <circle cx="0" cy="65" r="12" fillOpacity="0.5" />
          <circle cx="0" cy="65" r="12" fill="none" opacity="0.8" />
          {/* Forearm */}
          <rect x="-10" y="65" width="20" height="55" rx="5" fillOpacity="0.4" />
          <rect x="-10" y="65" width="20" height="55" rx="5" fill="none" opacity="0.7" />
          {/* Hand */}
          <polygon points="0,125 -18,115 -12,130 12,130 18,115" fillOpacity="0.5" />
        </g>

        {/* RIGHT ARM */}
        <g transform="translate(800, 490)" stroke="#00f5d4" strokeWidth="1" fill="#0d1830">
          <rect x="-14" y="-10" width="28" height="70" rx="6" fillOpacity="0.4" />
          <rect x="-14" y="-10" width="28" height="70" rx="6" fill="none" opacity="0.7" filter="url(#glow-teal)" />
          <circle cx="0" cy="65" r="12" fillOpacity="0.5" />
          <circle cx="0" cy="65" r="12" fill="none" opacity="0.8" />
          <rect x="-10" y="65" width="20" height="55" rx="5" fillOpacity="0.4" />
          <rect x="-10" y="65" width="20" height="55" rx="5" fill="none" opacity="0.7" />
          <polygon points="0,125 -18,115 -12,130 12,130 18,115" fillOpacity="0.5" />
        </g>

        {/* LEFT LEG */}
        <g transform="translate(690, 600)" stroke="#00f5d4" strokeWidth="1" fill="#0d1830">
          <rect x="-16" y="0" width="32" height="80" rx="6" fillOpacity="0.4" />
          <rect x="-16" y="0" width="32" height="80" rx="6" fill="none" opacity="0.7" />
          <circle cx="0" cy="82" r="14" fillOpacity="0.5" />
          <circle cx="0" cy="82" r="14" fill="none" opacity="0.8" />
          <rect x="-13" y="84" width="26" height="60" rx="5" fillOpacity="0.4" />
          <rect x="-13" y="84" width="26" height="60" rx="5" fill="none" opacity="0.7" />
        </g>

        {/* RIGHT LEG */}
        <g transform="translate(750, 600)" stroke="#00f5d4" strokeWidth="1" fill="#0d1830">
          <rect x="-16" y="0" width="32" height="80" rx="6" fillOpacity="0.4" />
          <rect x="-16" y="0" width="32" height="80" rx="6" fill="none" opacity="0.7" />
          <circle cx="0" cy="82" r="14" fillOpacity="0.5" />
          <circle cx="0" cy="82" r="14" fill="none" opacity="0.8" />
          <rect x="-13" y="84" width="26" height="60" rx="5" fillOpacity="0.4" />
          <rect x="-13" y="84" width="26" height="60" rx="5" fill="none" opacity="0.7" />
        </g>

        {/* Energy particles emanating from figure */}
        {[[-60,420,3],[60,430,2.5],[-80,480,2],[80,460,3],[-40,560,2],
          [50,540,2.5],[-90,380,1.5],[90,390,2],[0,350,3]].map(([x,y,r],i) => (
          <circle key={`particle-${i}`} cx={720+x} cy={y} r={r}
            fill="#00f5d4" opacity={0.4 + i * 0.05} filter="url(#glow-teal)" />
        ))}
      </g>

      {/* === FOREGROUND MIST === */}
      <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a0e1a" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.95" />
      </linearGradient>
      <rect width="1440" height="900" fill="url(#mistGrad)" />

      {/* Side vignettes */}
      <linearGradient id="vigLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0a0e1a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="vigRight" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#0a0e1a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0" />
      </linearGradient>
      <rect width="200" height="900" fill="url(#vigLeft)" />
      <rect x="1240" width="200" height="900" fill="url(#vigRight)" />
    </svg>
  );
}
