import Logo from '../assets/Logo';
import { SECTIONS, CHANNELS } from '../library';

const NAV = SECTIONS.filter((s) => s.nav);

export default function Footer() {
  return (
    <footer className="relative px-6 pt-20 pb-28 md:pb-14" style={{ borderTop: '1px solid rgba(23,20,31,0.16)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="display text-ink max-w-3xl" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.12 }}>
          "The path is formless, fearless, and free beyond dogma."
        </p>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mt-16">
          <div className="col-span-2 md:col-span-6 flex items-start gap-4">
            <Logo size={64} />
            <div>
              <p className="font-cinzel text-ink" style={{ fontSize: '0.95rem', letterSpacing: '0.2em' }}>THE FORMLESS GUIDE</p>
              <p className="font-sans text-stone mt-2 max-w-xs" style={{ fontSize: '0.98rem', lineHeight: 1.55 }}>
                A spirituality podcast hosted by Sat Guru Jay. Myth meets mindfulness here, and presence becomes practice.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="micro-label text-fog mb-4">ON THIS PAGE</p>
            <ul className="space-y-2.5">
              {NAV.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="ink-link font-sans" style={{ fontSize: '1rem' }}>{s.nav}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="micro-label text-fog mb-4">FIND THE GUIDE</p>
            <ul className="space-y-2.5">
              {CHANNELS.map((c) => (
                <li key={c.name}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="ink-link font-sans" style={{ fontSize: '1rem' }}>
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="font-sans text-fog mt-16" style={{ fontSize: '0.9rem' }}>
          2026 © The Formless Guide. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
