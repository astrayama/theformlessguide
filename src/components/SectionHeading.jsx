import { sectionById } from '../library';

// Shared heading. The eyebrow names the chakra this section sits on, in the
// same color as its dot in the header.
export default function SectionHeading({ section, title, sub, align = 'left', actionsClassName = '', children }) {
  const meta = section ? sectionById(section) : null;
  const centered = align === 'center';
  return (
    <div className={`flex flex-col gap-6 mb-12 ${centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
      <div className="max-w-2xl">
        {meta && (
          <p className={`micro-label flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`} style={{ color: meta.ink }}>
            <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
            {meta.chakra.toUpperCase()}
          </p>
        )}
        <h2 className="display text-ink" style={{ fontSize: 'clamp(2.3rem, 5.2vw, 3.9rem)' }}>
          {title}
        </h2>
        {sub && (
          <p className="font-sans text-stone mt-5" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            {sub}
          </p>
        )}
      </div>
      {children && <div className={`flex-shrink-0 ${actionsClassName}`}>{children}</div>}
    </div>
  );
}
