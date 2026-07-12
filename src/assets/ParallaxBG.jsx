export default function ParallaxBG() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.11 }}>
      <svg
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Faint stars */}
        {[
          [100,80],[250,150],[400,60],[600,200],[800,100],[950,180],
          [1100,70],[1300,130],[1400,200],[150,400],[350,350],[550,450],
          [750,380],[950,420],[1150,360],[1350,440],[200,650],[450,600],
          [700,680],[900,620],[1200,660],[80,750],[300,800],[600,770],
          [900,800],[1100,750],[1380,780],[450,250],[850,290],[1250,240],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1 + (i % 3) * 0.5} fill="white" opacity={0.3 + (i % 4) * 0.1} />
        ))}

        {/* Faint arch outline */}
        <path d="M220,100 Q580,10 720,80 Q860,10 1220,100"
          stroke="#00f5d4" strokeWidth="1" fill="none" opacity="0.15" />

        {/* Faint Metatron's Cube - center */}
        <g transform="translate(720, 450)" stroke="#00f5d4" fill="none" strokeWidth="0.5" opacity="0.15">
          <circle r="120" />
          {[0,60,120,180,240,300].map((a, i) => (
            <g key={i}>
              <circle cx={Math.cos(a*Math.PI/180)*120} cy={Math.sin(a*Math.PI/180)*120} r="120" />
            </g>
          ))}
        </g>

        {/* Faint sacred geometry shapes scattered */}
        {/* Top left - Star of David */}
        <g transform="translate(150, 200)" stroke="#7b2fff" fill="none" strokeWidth="0.6" opacity="0.2">
          <polygon points="0,-40 35,20 -35,20" />
          <polygon points="0,40 35,-20 -35,-20" />
        </g>

        {/* Top right - pentagon */}
        <g transform="translate(1290, 180)" stroke="#00f5d4" fill="none" strokeWidth="0.6" opacity="0.2">
          <polygon points={[0,72,144,216,288].map(a =>
            `${Math.cos((a-90)*Math.PI/180)*35},${Math.sin((a-90)*Math.PI/180)*35}`).join(' ')} />
        </g>

        {/* Mid left - icosahedron */}
        <g transform="translate(100, 550)" stroke="#00f5d4" fill="none" strokeWidth="0.5" opacity="0.15">
          <polygon points="0,-50 47,15 29,48 -29,48 -47,15" />
          <polygon points="0,-50 47,15 0,0" />
          <polygon points="47,15 29,48 0,0" />
        </g>

        {/* Mid right - hexagon */}
        <g transform="translate(1340, 500)" stroke="#7b2fff" fill="none" strokeWidth="0.5" opacity="0.2">
          {[0,60,120,180,240,300].map((a,i,arr) => {
            const nx = arr[(i+1)%arr.length];
            return <line key={i}
              x1={Math.cos(a*Math.PI/180)*40} y1={Math.sin(a*Math.PI/180)*40}
              x2={Math.cos(nx*Math.PI/180)*40} y2={Math.sin(nx*Math.PI/180)*40} />;
          })}
        </g>

        {/* Bottom center - flower of life rings */}
        <g transform="translate(720, 800)" stroke="#00f5d4" fill="none" strokeWidth="0.4" opacity="0.12">
          <circle r="45" />
          {[0,60,120,180,240,300].map((a, i) => (
            <circle key={i} cx={Math.cos(a*Math.PI/180)*45} cy={Math.sin(a*Math.PI/180)*45} r="45" />
          ))}
        </g>
      </svg>
    </div>
  );
}
