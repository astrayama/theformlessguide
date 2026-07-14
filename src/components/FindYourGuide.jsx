import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Original assessment — six questions, each answer weighting one of the
// three guides. Not derived from any published personality instrument;
// the four-letter type path maps clusters (NT / NF / S) to guides.
const QUESTIONS = [
  {
    q: 'When the weight of the world lands on you, your first instinct is to—',
    options: [
      { label: 'Step back and watch it pass, like weather', guide: 'consciousness' },
      { label: 'Trace the feeling down to its root', guide: 'shadow' },
      { label: 'Move — breathe, shake it off, walk', guide: 'system' },
    ],
  },
  {
    q: 'The question that finds you at 2am:',
    options: [
      { label: 'What is aware of these thoughts?', guide: 'consciousness' },
      { label: 'Why do I keep repeating this pattern?', guide: 'shadow' },
      { label: 'Why does my body carry so much?', guide: 'system' },
    ],
  },
  {
    q: 'You learn best through—',
    options: [
      { label: 'Stillness and contemplation', guide: 'consciousness' },
      { label: 'Story, symbol, and dreams', guide: 'shadow' },
      { label: 'Practice and repetition', guide: 'system' },
    ],
  },
  {
    q: 'What do you distrust most?',
    options: [
      { label: 'The mind’s endless narration', guide: 'consciousness' },
      { label: 'The masks people wear — including your own', guide: 'shadow' },
      { label: 'Anything that ignores the body’s signals', guide: 'system' },
    ],
  },
  {
    q: 'Growth, to you, feels like—',
    options: [
      { label: 'Dissolving — less self, more space', guide: 'consciousness' },
      { label: 'Integration — meeting what you buried', guide: 'shadow' },
      { label: 'Regulation — a calmer, stronger vessel', guide: 'system' },
    ],
  },
  {
    q: 'Choose a teacher:',
    options: [
      { label: 'The silent witness', guide: 'consciousness' },
      { label: 'The honest mirror', guide: 'shadow' },
      { label: 'The living body', guide: 'system' },
    ],
  },
];

const CHAKRA_DOTS = ['#FF0000', '#FF7F00', '#FFFF00', '#00CC44', '#0099FF', '#6600CC'];

const TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const typeToGuide = t => (t[1] === 'N' ? (t[2] === 'T' ? 'consciousness' : 'shadow') : 'system');

const GUIDE_WHY = {
  consciousness:
    'You step back where others lean in. The mind that watches the mind is your native ground — Consciousness will meet you in stillness and teach you to rest as the awareness beneath every thought.',
  shadow:
    'You live half in the symbolic world — dreams, patterns, the things unsaid. The Shadow speaks that language fluently and will walk you into the rooms of yourself you have not yet opened.',
  system:
    'You trust what can be felt, practiced, and repeated. The System works where you already live — breath, nerve, and rhythm — and will show you that the body is the fastest door to the formless.',
};

const TYPE_WHY = {
  consciousness: t =>
    `${t} — a mind built for abstraction. You already interrogate reality; Consciousness will turn that lens back on the one asking.`,
  shadow: t =>
    `${t} — you feel the depths others skim. The Shadow speaks in the symbols and patterns you already dream in.`,
  system: t =>
    `${t} — grounded in the real and the felt. The System honors that: the body first, and through it, everything else.`,
};

export default function FindYourGuide({ guides, onSelectGuide }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('quiz');
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ consciousness: 0, shadow: 0, system: 0 });
  const [result, setResult] = useState(null);

  const guideById = useCallback(id => guides.find(g => g.id === id), [guides]);

  const reset = useCallback(() => {
    setMode('quiz');
    setStep(0);
    setScores({ consciousness: 0, shadow: 0, system: 0 });
    setResult(null);
  }, []);

  const answer = useCallback(
    guide => {
      const next = { ...scores, [guide]: scores[guide] + 1 };
      if (step + 1 < QUESTIONS.length) {
        setScores(next);
        setStep(step + 1);
      } else {
        const sorted = Object.entries(next).sort((a, b) => b[1] - a[1]);
        setResult({
          guideId: sorted[0][0],
          secondary: sorted[1][1] > 0 ? sorted[1][0] : null,
          type: null,
        });
      }
    },
    [scores, step]
  );

  const pickType = useCallback(t => {
    setResult({ guideId: typeToGuide(t), secondary: null, type: t });
  }, []);

  const modeButton = (key, label) => {
    const active = mode === key;
    return (
      <button
        key={key}
        onClick={() => {
          setMode(key);
          setStep(0);
          setScores({ consciousness: 0, shadow: 0, system: 0 });
        }}
        className="micro-label px-5 py-2.5 rounded transition-all duration-300"
        style={{
          color: active ? '#00f5d4' : '#c2c8dc',
          border: `1px solid ${active ? 'rgba(0,245,212,0.5)' : 'rgba(255,255,255,0.18)'}`,
          background: active ? 'rgba(0,245,212,0.08)' : 'transparent',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mt-20 text-center">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-sans font-light text-muted mb-6 max-w-md mx-auto">
              Three voices wait within. Which one speaks your language?
            </p>
            <button
              onClick={() => setOpen(true)}
              className="micro-label px-8 py-3.5 rounded transition-all duration-300"
              style={{ color: '#00f5d4', border: '1px solid rgba(0,245,212,0.4)', background: 'transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,245,212,0.08)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,212,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              FIND YOUR GUIDE
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="glass relative max-w-2xl mx-auto text-center px-6 py-10 sm:px-10"
            style={{ borderRadius: '14px' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <button
              onClick={() => {
                setOpen(false);
                reset();
              }}
              aria-label="Close"
              className="absolute top-3 right-4 font-sans transition-colors"
              style={{ color: '#8a96b8', fontSize: '1.3rem', lineHeight: 1 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f2ecdf')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a96b8')}
            >
              ×
            </button>

            <h3
              className="font-cinzel font-medium text-cream mb-2"
              style={{ fontSize: '1.4rem', letterSpacing: '0.06em' }}
            >
              Find Your Guide
            </h3>

            {!result && (
              <>
                <p className="font-sans font-light text-muted text-sm mb-7 max-w-md mx-auto">
                  Answer six questions — or begin from the four-letter type you already know.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  {modeButton('quiz', 'TAKE THE ASSESSMENT')}
                  {modeButton('types', 'I KNOW MY TYPE')}
                </div>
              </>
            )}

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  {(() => {
                    const g = guideById(result.guideId);
                    return (
                      <>
                        <div
                          className="flex justify-center mb-4"
                          style={{ filter: `drop-shadow(0 0 10px ${g.accent}66)` }}
                        >
                          {g.icon}
                        </div>
                        <p className="micro-label mb-1" style={{ color: '#8a96b8', fontSize: '11px' }}>
                          YOUR GUIDE IS
                        </p>
                        <p
                          className="font-cinzel font-medium mb-1"
                          style={{ color: g.accent, fontSize: '1.5rem' }}
                        >
                          {g.name}
                        </p>
                        <p className="micro-label mb-5" style={{ color: '#8a96b8', fontSize: '11px' }}>
                          {g.title.toUpperCase()}
                        </p>
                        <p
                          className="font-sans text-sm leading-relaxed max-w-md mx-auto mb-4"
                          style={{ color: '#c2c8dc' }}
                        >
                          {result.type ? TYPE_WHY[result.guideId](result.type) : GUIDE_WHY[result.guideId]}
                        </p>
                        {result.secondary && (
                          <p className="font-sans text-xs mb-6" style={{ color: '#8a96b8' }}>
                            Also resonant: {guideById(result.secondary).name}
                          </p>
                        )}
                        <button
                          onClick={() => onSelectGuide(result.guideId)}
                          className="micro-label px-8 py-3 rounded transition-all duration-300"
                          style={{
                            color: g.accent,
                            border: `1px solid ${g.accent}88`,
                            background: 'transparent',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = `${g.accent}14`;
                            e.currentTarget.style.boxShadow = `0 0 20px ${g.accent}44`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          SPEAK WITH {g.name.toUpperCase()}
                        </button>
                        <div className="mt-4">
                          <button
                            onClick={reset}
                            className="font-sans text-xs transition-colors"
                            style={{ color: '#8a96b8', textDecoration: 'underline' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#f2ecdf')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#8a96b8')}
                          >
                            Begin again
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : mode === 'quiz' ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="flex gap-2 justify-center mb-6" aria-hidden="true">
                    {QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className="rounded-full"
                        style={{
                          width: '9px',
                          height: '9px',
                          border: `1px solid ${CHAKRA_DOTS[i]}`,
                          background: i < step ? CHAKRA_DOTS[i] : 'transparent',
                          boxShadow: i === step ? `0 0 8px ${CHAKRA_DOTS[i]}` : 'none',
                          opacity: i > step ? 0.35 : 1,
                          transition: 'all 0.4s ease',
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="font-sans font-light text-cream mb-6 mx-auto max-w-md leading-relaxed"
                    style={{ fontSize: '1.05rem' }}
                  >
                    {QUESTIONS[step].q}
                  </p>
                  <div className="flex flex-col gap-3 max-w-md mx-auto">
                    {QUESTIONS[step].options.map(opt => {
                      const accent = guideById(opt.guide).accent;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => answer(opt.guide)}
                          className="glass font-sans text-sm px-5 py-3.5 transition-all duration-300"
                          style={{ color: '#f2ecdf', borderRadius: '10px', lineHeight: 1.5 }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = `${accent}99`;
                            e.currentTarget.style.boxShadow = `0 0 18px ${accent}22`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="types"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <p className="font-sans font-light text-muted text-sm mb-5">
                    Select the four-letter type you identify with
                  </p>
                  <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
                    {TYPES.map(t => {
                      const accent = guideById(typeToGuide(t)).accent;
                      return (
                        <button
                          key={t}
                          onClick={() => pickType(t)}
                          className="glass micro-label py-3 transition-all duration-300"
                          style={{ color: '#c2c8dc', borderRadius: '8px', fontSize: '12px' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = `${accent}99`;
                            e.currentTarget.style.color = accent;
                            e.currentTarget.style.boxShadow = `0 0 14px ${accent}22`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                            e.currentTarget.style.color = '#c2c8dc';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
