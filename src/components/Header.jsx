import { useState, useEffect } from 'react';
import Logo from '../assets/Logo';
import { SECTIONS, CHANNELS, SPOTIFY_URL } from '../library';

const NAV = SECTIONS.filter((s) => s.nav);

export default function Header({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-colors duration-300"
      style={{
        background: scrolled || open ? 'rgba(245,239,228,0.86)' : 'rgba(245,239,228,0)',
        WebkitBackdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled || open ? 'rgba(23,20,31,0.12)' : 'transparent'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-6">
        {/* Mark + wordmark */}
        <a href="#hero" className="flex items-center gap-3 flex-shrink-0" onClick={() => setOpen(false)}>
          <Logo size={40} />
          <span className="font-cinzel text-ink text-[0.72rem] sm:text-[0.82rem]" style={{ letterSpacing: '0.2em' }}>
            THE FORMLESS GUIDE
          </span>
        </a>

        {/* Section links */}
        <nav aria-label="Sections" className="hidden lg:flex items-center gap-7">
          {NAV.map((s) => {
            const on = s.id === activeSection;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className="relative font-sans text-[15px] py-2 transition-colors duration-200"
                style={{ color: on ? '#17141f' : '#4d465a', fontWeight: on ? 600 : 400 }}
              >
                {s.nav}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full transition-opacity duration-300"
                  style={{ background: s.color, opacity: on ? 1 : 0 }}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          {/* The chakra ladder: seven dots, root to crown */}
          <div className="hidden md:flex items-center gap-2" role="group" aria-label={`You are at ${active.chakra}`}>
            {SECTIONS.map((s) => {
              const on = s.id === activeSection;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  title={s.chakra}
                  aria-label={`${s.chakra}${s.nav ? `: ${s.nav}` : ''}`}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: on ? 12 : 8,
                    height: on ? 12 : 8,
                    background: on ? s.color : 'transparent',
                    border: `1.5px solid ${on ? s.color : 'rgba(23,20,31,0.35)'}`,
                    boxShadow: on ? `0 0 0 4px ${s.color}33` : 'none',
                  }}
                />
              );
            })}
          </div>

          <div className="hidden sm:block">
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
              className="btn-ink micro-label" style={{ padding: '10px 20px' }}>
              LISTEN
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              {open
                ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div id="mobile-menu" className="lg:hidden px-5 sm:px-8 pb-8 pt-2" style={{ borderTop: '1px solid rgba(23,20,31,0.1)' }}>
          <nav aria-label="Sections" className="flex flex-col">
            {NAV.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="display text-ink flex items-center gap-4 py-3"
                style={{ fontSize: '1.7rem', borderBottom: '1px solid rgba(23,20,31,0.1)' }}
              >
                <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.nav}
              </a>
            ))}
          </nav>
          <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="btn-ink micro-label mt-6 w-full sm:hidden">
            LISTEN ON SPOTIFY
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
            {CHANNELS.map((c) => (
              <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" className="ink-link font-sans text-sm">
                {c.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
