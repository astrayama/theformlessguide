import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ShopSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="shop" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(204,0,255,0.4), transparent)' }} />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="font-cinzel font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em' }}>
            Support the Work
          </h2>
          <p className="font-raleway text-muted mb-14">Wear the frequency.</p>

        {/* Shop card/banner */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: '#1a2035',
            border: '1px solid rgba(204,0,255,0.3)',
          }}
        >
          {/* Background sacred geometry */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 800 300" className="w-full h-full" fill="none" opacity="0.08">
              <circle cx="400" cy="150" r="200" stroke="#CC00FF" strokeWidth="1" />
              <circle cx="400" cy="150" r="140" stroke="#7b2fff" strokeWidth="1" />
              <circle cx="400" cy="150" r="80" stroke="#CC00FF" strokeWidth="1" />
              {[0,60,120,180,240,300].map((a,i) => (
                <line key={i}
                  x1={400} y1={150}
                  x2={400 + Math.cos(a*Math.PI/180)*200} y2={150 + Math.sin(a*Math.PI/180)*200}
                  stroke="#CC00FF" strokeWidth="0.5" />
              ))}
              <polygon points="400,50 500,200 300,200" stroke="#7b2fff" strokeWidth="1" fill="none" />
              <polygon points="400,250 500,100 300,100" stroke="#CC00FF" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 py-16 px-8">
            {/* Decorative crown chakra symbol */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none"
                style={{ filter: 'drop-shadow(0 0 12px rgba(204,0,255,0.6))' }}>
                <circle cx="40" cy="40" r="34" stroke="#CC00FF" strokeWidth="1.2" opacity="0.6" />
                <circle cx="40" cy="40" r="22" stroke="#CC00FF" strokeWidth="1" opacity="0.7" />
                {/* 1000-petal lotus suggestion */}
                {Array.from({length: 12}, (_, i) => {
                  const a = (i / 12) * Math.PI * 2;
                  const r1 = 22, r2 = 34;
                  return (
                    <line key={i}
                      x1={40 + Math.cos(a)*r1} y1={40 + Math.sin(a)*r1}
                      x2={40 + Math.cos(a)*r2} y2={40 + Math.sin(a)*r2}
                      stroke="#CC00FF" strokeWidth="0.8" opacity="0.5" />
                  );
                })}
                <circle cx="40" cy="40" r="8" fill="#CC00FF" opacity="0.3" />
                <circle cx="40" cy="40" r="4" fill="#CC00FF" opacity="0.8" />
              </svg>
            </div>

            <p className="font-cinzel text-cream mb-2"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', letterSpacing: '0.08em' }}>
              The Formless Collection
            </p>
            <p className="font-raleway text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Sacred geometry apparel and accessories. Wear the teachings, carry the frequency.
              Every piece is a reminder of your formless nature.
            </p>

            <a
              href="https://theformlessguide.printful.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-sm tracking-widest px-12 py-4 rounded inline-block transition-all duration-300"
              style={{
                color: '#CC00FF',
                border: '1.5px solid rgba(204,0,255,0.6)',
                background: 'rgba(204,0,255,0.08)',
                letterSpacing: '0.2em',
                boxShadow: '0 0 20px rgba(204,0,255,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(204,0,255,0.18)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,255,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(204,0,255,0.08)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(204,0,255,0.2)';
              }}
            >
              VISIT THE SHOP
            </a>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
