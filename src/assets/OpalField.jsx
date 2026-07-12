// Chakra hue per section — kept in sync with the ChakraNav colors so the
// atmosphere and the nav glow always agree on where you are.
const SECTION_TINTS = {
  hero: 'rgba(255, 0, 0, 0.06)',
  guides: 'rgba(255, 127, 0, 0.07)',
  moments: 'rgba(255, 255, 0, 0.05)',
  about: 'rgba(0, 204, 68, 0.07)',
  stillness: 'rgba(0, 153, 255, 0.08)',
  catalog: 'rgba(102, 0, 204, 0.09)',
  shop: 'rgba(204, 0, 255, 0.09)',
};

export default function OpalField({ activeSection }) {
  const tint = SECTION_TINTS[activeSection] || SECTION_TINTS.hero;

  return (
    <div className="opal-field" aria-hidden="true">
      <div className="opal-wash opal-wash--teal" />
      <div className="opal-wash opal-wash--violet" />
      <div className="opal-wash opal-wash--pink" />
      <div className="opal-wash opal-wash--blue" />
      <div className="opal-wash opal-wash--shimmer" />
      <div className="opal-tint" style={{ backgroundColor: tint }} />
    </div>
  );
}
