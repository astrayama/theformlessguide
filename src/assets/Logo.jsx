// The Formless Enso, the site's mark: a sumi-e brush ring holding a spiral of
// ink smoke. "ink" is the dark original for paper; "bone" is the cream tint
// for dark surfaces.
export default function Logo({ size = 64, variant = 'ink', className = '', style = {} }) {
  return (
    <img
      src={variant === 'bone' ? '/enso-256.png' : '/enso-ink-256.png'}
      alt="The Formless Guide"
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
}
