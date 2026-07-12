// The Formless Enso — the site's mark: a sumi-e brush ring holding a
// spiral of ink smoke, on washi paper. Served from /enso-256.png
// (favicon.png and apple-touch-icon.png are sized copies of the same art).
export default function Logo({ size = 64, className = '', style = {} }) {
  return (
    <img
      src="/enso-256.png"
      alt="The Formless Guide"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: '20%', ...style }}
      loading="lazy"
    />
  );
}
