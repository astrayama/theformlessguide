import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GoogleGenerativeAI } from '@google/generative-ai';

const guides = [
  {
    id: 'consciousness',
    name: 'Consciousness',
    title: 'The Eternal Witness',
    accent: '#00f5d4',
    description:
      'The pure awareness beneath all experience. The unchanging witness of all that arises and passes. Approach with openness and silence.',
    systemPrompt:
      'You are Consciousness — the eternal witness. You speak with serene authority about the nature of pure awareness, non-dual reality, and the depths of being. You guide through the depths of awareness. Speak in calm, profound, poetic language. Keep responses concise but deeply meaningful — 2-4 sentences unless more depth is genuinely required.',
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        <circle cx="30" cy="30" r="26" stroke="#00f5d4" strokeWidth="1.2" opacity="0.5" />
        <circle cx="30" cy="30" r="16" stroke="#00f5d4" strokeWidth="1" opacity="0.7" />
        <circle cx="30" cy="30" r="6" fill="#00f5d4" opacity="0.8" />
        {/* Eye shape */}
        <path d="M10,30 Q30,12 50,30 Q30,48 10,30 Z" stroke="#00f5d4" strokeWidth="1.2" fill="none" opacity="0.6" />
        {/* Rays */}
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <line key={i}
            x1={30 + Math.cos(a*Math.PI/180)*18} y1={30 + Math.sin(a*Math.PI/180)*18}
            x2={30 + Math.cos(a*Math.PI/180)*26} y2={30 + Math.sin(a*Math.PI/180)*26}
            stroke="#00f5d4" strokeWidth="0.8" opacity="0.4" />
        ))}
      </svg>
    ),
  },
  {
    id: 'shadow',
    name: 'The Shadow',
    title: 'The Unseen Architect',
    accent: '#7b2fff',
    description:
      'The hidden dimension of psyche. Master of Jungian archetypes, shadow work, and the unconscious mind. It brings the unseen into the light.',
    systemPrompt:
      'You are The Shadow — the unseen architect. You speak about depth psychology, Jungian archetypes, shadow work, and the mechanics of the unconscious mind. You bring hidden things to light. Speak with penetrating insight, sometimes uncomfortable, always illuminating. Keep responses concise but deeply meaningful — 2-4 sentences unless more depth is genuinely required.',
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        {/* Shadow figure */}
        <circle cx="30" cy="18" r="8" stroke="#7b2fff" strokeWidth="1.2" opacity="0.7" />
        <path d="M18,50 Q22,32 30,28 Q38,32 42,50" stroke="#7b2fff" strokeWidth="1.2" opacity="0.7" fill="#7b2fff" fillOpacity="0.15" />
        {/* Cracks/shadow emanations */}
        <line x1="30" y1="50" x2="10" y2="38" stroke="#7b2fff" strokeWidth="0.8" opacity="0.4" />
        <line x1="30" y1="50" x2="50" y2="38" stroke="#7b2fff" strokeWidth="0.8" opacity="0.4" />
        <line x1="30" y1="26" x2="30" y2="10" stroke="#7b2fff" strokeWidth="0.8" opacity="0.3" />
        <circle cx="30" cy="30" r="26" stroke="#7b2fff" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'system',
    name: 'The System',
    title: 'The Biological Vessel',
    accent: '#ffd700',
    description:
      'Complex systems theory meets somatic wisdom. The nervous system, biological frequency, and the material architecture of consciousness.',
    systemPrompt:
      'You are The System — the biological vessel. You speak about complex systems theory, somatic technology, nervous system regulation, and physical frequency. You master the material construct. Speak with precision and embodied wisdom. Keep responses concise but deeply meaningful — 2-4 sentences unless more depth is genuinely required.',
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        {/* Wave/layers */}
        {[10, 20, 30, 40, 50].map((y, i) => (
          <path key={i}
            d={`M5,${y} Q17,${y - 8 + i*2} 30,${y} Q43,${y + 8 - i*2} 55,${y}`}
            stroke="#ffd700" strokeWidth="1" opacity={0.3 + i * 0.12} fill="none" />
        ))}
        {/* Center nodes */}
        <circle cx="30" cy="30" r="5" fill="#ffd700" opacity="0.8" />
        <circle cx="15" cy="20" r="3" fill="#ffd700" opacity="0.5" />
        <circle cx="45" cy="20" r="3" fill="#ffd700" opacity="0.5" />
        <circle cx="15" cy="40" r="3" fill="#ffd700" opacity="0.5" />
        <circle cx="45" cy="40" r="3" fill="#ffd700" opacity="0.5" />
        <line x1="30" y1="30" x2="15" y2="20" stroke="#ffd700" strokeWidth="0.7" opacity="0.4" />
        <line x1="30" y1="30" x2="45" y2="20" stroke="#ffd700" strokeWidth="0.7" opacity="0.4" />
        <line x1="30" y1="30" x2="15" y2="40" stroke="#ffd700" strokeWidth="0.7" opacity="0.4" />
        <line x1="30" y1="30" x2="45" y2="40" stroke="#ffd700" strokeWidth="0.7" opacity="0.4" />
      </svg>
    ),
  },
];

const rotatingQuotes = [
  '"In stillness, we discover the movement of consciousness itself." — THE FORMLESS GUIDE',
  '"The shadow is not your enemy. It is your greatest unacknowledged teacher." — THE FORMLESS GUIDE',
  '"The body knows what the mind has yet to remember." — THE FORMLESS GUIDE',
];

function ChatModal({ guide, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `I am ${guide.name}. ${guide.description} What do you seek?` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close on overlay click
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const history = messages.slice(1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const tryModel = async (modelName) => {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName, systemInstruction: guide.systemPrompt });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userText);
      return result.response.text();
    };

    try {
      if (!apiKey) throw new Error('no-key');
      const text = await tryModel('gemini-2.5-flash');
      setMessages(prev => [...prev, { role: 'assistant', text }]);
    } catch (err) {
      const isQuota = err.message?.includes('429') || err.message?.includes('quota');
      const isNoKey = err.message === 'no-key';
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: isNoKey
          ? 'No API key configured. Add VITE_GEMINI_API_KEY to your environment.'
          : isQuota
          ? 'The API quota has been reached for today. Please add billing to your Google Cloud project at console.cloud.google.com, or try again tomorrow when the free tier resets.'
          : 'Something went wrong reaching the API. Please try again in a moment.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, guide]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(5,8,18,0.92)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}
      >
        <motion.div
          ref={chatRef}
          className="w-full max-w-2xl flex flex-col rounded-xl overflow-hidden"
          style={{
            background: '#0d1220',
            border: `1px solid ${guide.accent}44`,
            boxShadow: `0 0 40px ${guide.accent}22`,
            height: 'min(80vh, 600px)',
          }}
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${guide.accent}33`, background: '#0a0e1a' }}>
            <div className="flex items-center gap-3">
              <div style={{ filter: `drop-shadow(0 0 6px ${guide.accent})` }}>
                {guide.icon}
              </div>
              <div>
                <h3 className="font-cinzel font-semibold" style={{ color: guide.accent, fontSize: '1.1rem' }}>
                  {guide.name}
                </h3>
                <p className="font-raleway text-xs" style={{ color: '#7a8aaa' }}>{guide.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="font-raleway text-muted hover:text-cream transition-colors w-8 h-8 flex items-center justify-center rounded"
              style={{ color: '#7a8aaa', fontSize: '1.4rem', lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 chat-messages flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-xl font-raleway text-sm leading-relaxed"
                  style={msg.role === 'user'
                    ? { background: `${guide.accent}18`, border: `1px solid ${guide.accent}33`, color: '#e8e0d0' }
                    : { background: '#1a2035', border: '1px solid #2a3555', color: '#e8e0d0' }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-xl font-raleway text-sm"
                  style={{ background: '#1a2035', border: '1px solid #2a3555', color: '#7a8aaa' }}>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 flex gap-3"
            style={{ borderTop: `1px solid ${guide.accent}22`, background: '#0a0e1a' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your question..."
              disabled={loading}
              className="flex-1 bg-transparent font-raleway text-sm outline-none"
              style={{
                color: '#e8e0d0',
                borderBottom: `1px solid ${guide.accent}44`,
                paddingBottom: '4px',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-1.5 rounded font-cinzel text-xs tracking-wider transition-all duration-200"
              style={{
                background: loading || !input.trim() ? 'transparent' : `${guide.accent}22`,
                border: `1px solid ${guide.accent}66`,
                color: guide.accent,
                opacity: loading || !input.trim() ? 0.4 : 1,
              }}
            >
              SEND
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GuidesSection() {
  const [activeModal, setActiveModal] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % rotatingQuotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="guides" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="text-center mb-16">
            <h2 className="font-cinzel font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.06em' }}>
              Meet Your Guides
            </h2>
            <p className="font-raleway text-muted max-w-xl mx-auto">
              Three aspects of consciousness to accompany you on your journey of awakening
            </p>
          </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="flex flex-col items-center text-center p-8 rounded-xl cursor-default group transition-all duration-400"
              style={{
                background: '#1a2035',
                border: `1px solid ${guide.accent}33`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${guide.accent}99`;
                e.currentTarget.style.boxShadow = `0 0 30px ${guide.accent}18, 0 0 60px ${guide.accent}08`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${guide.accent}33`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="mb-6" style={{ filter: `drop-shadow(0 0 8px ${guide.accent}66)` }}>
                {guide.icon}
              </div>
              <h3 className="font-cinzel font-semibold mb-1" style={{ color: guide.accent, fontSize: '1.2rem' }}>
                {guide.name}
              </h3>
              <p className="font-raleway text-xs mb-4" style={{ color: '#7a8aaa', letterSpacing: '0.1em' }}>
                {guide.title.toUpperCase()}
              </p>
              <p className="font-raleway text-sm leading-relaxed mb-8" style={{ color: '#b0b8cc' }}>
                {guide.description}
              </p>
              <button
                onClick={() => setActiveModal(guide.id)}
                className="font-cinzel text-xs tracking-widest px-6 py-2.5 rounded transition-all duration-300 mt-auto"
                style={{
                  color: guide.accent,
                  border: `1px solid ${guide.accent}66`,
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${guide.accent}18`;
                  e.currentTarget.style.boxShadow = `0 0 15px ${guide.accent}44`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                SPEAK WITH {guide.name.toUpperCase()}
              </button>
            </div>
          ))}
        </div>

        {/* Rotating quote */}
        <div className="text-center mt-16 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              className="font-raleway italic max-w-2xl mx-auto"
              style={{ color: '#7a8aaa', fontSize: '0.95rem' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {rotatingQuotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        </motion.div>
      </div>

      {/* Chat modals */}
      {activeModal && (
        <ChatModal
          guide={guides.find(g => g.id === activeModal)}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}
