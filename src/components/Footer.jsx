import { socialLinks } from './LeftSidebar';
import Logo from '../assets/Logo';

const NAV = [
  { label: 'Guides', href: '#guides' },
  { label: 'Moments', href: '#moments' },
  { label: 'About', href: '#about' },
  { label: 'Stillness', href: '#stillness' },
  { label: 'Library', href: '#catalog' },
  { label: 'Shop', href: '#shop' },
];

export default function Footer() {
  return (
    <footer className="relative pt-14 pb-28 md:pb-14 px-6 text-center"
      style={{ borderTop: '1px solid rgba(0,245,212,0.1)' }}>
      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,245,212,0.3), transparent)' }} />

      {/* Mark + wordmark */}
      <div className="flex justify-center mb-4">
        <Logo size={44} style={{ filter: 'drop-shadow(0 0 10px rgba(0,245,212,0.35))' }} />
      </div>
      <p className="font-cinzel text-sm text-secondary mb-6" style={{ letterSpacing: '0.15em' }}>
        THE FORMLESS GUIDE
      </p>

      {/* Section links */}
      <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-8">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}
            className="font-sans text-sm text-muted transition-colors duration-300 hover:text-cream">
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile social links (hidden on desktop, where the left sidebar holds them) */}
      <div className="flex md:hidden justify-center gap-8 mb-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            aria-label={link.name}
            className="text-muted transition-colors duration-300 hover:text-teal"
          >
            <div className="w-5 h-5">{link.icon}</div>
          </a>
        ))}
      </div>

      <p className="font-sans text-sm italic text-muted mb-4">
        "The path is formless, fearless, and free beyond dogma."
      </p>

      <p className="font-sans text-xs text-muted">
        2026 © The Formless Guide. All rights reserved.
      </p>
    </footer>
  );
}
