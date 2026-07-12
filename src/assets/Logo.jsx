// The Formless Enso — the site's mark: a sumi-e brush ring holding a
// spiral of ink smoke, re-tinted bone-cream on transparency so it floats
// directly on the opal field. Served from /enso-256.png (favicon.png is the
// same art; apple-touch-icon.png sits on a dark tile since iOS disallows
// transparent icons).
export default function Logo({ size = 64, className = '', style = {} }) {
  return (
    <img
      src="/enso-256.png"
      alt="The Formless Guide"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}
