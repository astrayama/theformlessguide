// Shared heading for the redesigned sections. The eyebrow names the chakra the
// right-hand nav lights up for this section, so the rail and the page agree.
export default function SectionHeading({ eyebrow, color = '#00f5d4', title, sub, align = 'left', actionsClassName = '', children }) {
  const centered = align === 'center';
  return (
    <div className={`flex flex-col gap-6 mb-12 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`micro-label flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`} style={{ color }}>
            <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
            {eyebrow}
          </p>
        )}
        <h2 className="font-cinzel font-medium text-cream"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em', lineHeight: 1.15 }}>
          {title}
        </h2>
        {sub && (
          <p className="font-sans text-secondary mt-4" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            {sub}
          </p>
        )}
      </div>
      {children && <div className={`flex-shrink-0 ${actionsClassName}`}>{children}</div>}
    </div>
  );
}
