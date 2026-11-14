// Fixed paper background. Three watercolor washes take their color from the
// chakra of whichever section is on screen, so the page warms from red at the
// root to violet at the crown as you scroll.
const WASHES = {
  hero: ['#ff9db5', '#b9a2ff', '#9fd0ff'],
  guides: ['#ffb37a', '#ff9db5', '#ffd59a'],
  teachings: ['#ffd27a', '#ffb199', '#ff9db5'],
  about: ['#9fe3bd', '#a8e6dc', '#ffe09a'],
  stillness: ['#9cc8ff', '#c9bcff', '#a8e6dc'],
  catalog: ['#b3a4ff', '#dcb0ff', '#9cc8ff'],
  shop: ['#f1a8ff', '#ffadd2', '#b9a2ff'],
};

export default function PaperField({ activeSection }) {
  const [a, b, c] = WASHES[activeSection] || WASHES.hero;
  return (
    <div className="paper-field" aria-hidden="true">
      <div className="wash wash--a" style={{ backgroundColor: a }} />
      <div className="wash wash--b" style={{ backgroundColor: b }} />
      <div className="wash wash--c" style={{ backgroundColor: c }} />
      <div className="paper-grain" />
    </div>
  );
}
