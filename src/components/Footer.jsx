import { socialLinks } from './LeftSidebar';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 text-center"
      style={{ borderTop: '1px solid rgba(0,245,212,0.1)' }}>
      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,245,212,0.3), transparent)' }} />

      {/* Mobile social links (hidden on desktop — left sidebar handles desktop) */}
      <div className="flex md:hidden justify-center gap-8 mb-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="transition-all duration-300"
            style={{ color: '#8a96b8' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00f5d4'}
            onMouseLeave={e => e.currentTarget.style.color = '#8a96b8'}
          >
            <div className="w-5 h-5">{link.icon}</div>
          </a>
        ))}
      </div>

      {/* Wordmark */}
      <p className="font-cinzel text-sm tracking-widest mb-2"
        style={{ color: '#8a96b8', letterSpacing: '0.15em' }}>
        THE FORMLESS GUIDE
      </p>

      <p className="font-sans text-xs" style={{ color: '#4a5570' }}>
        2026 © The Formless Guide. All rights reserved.
      </p>

      <p className="font-sans text-xs mt-4 italic" style={{ color: '#3a4560' }}>
        "The path is formless, fearless, and free beyond dogma."
      </p>
    </footer>
  );
}
