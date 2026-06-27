// Shared helpers — Lucide icon wrapper
const { useRef, useEffect } = React;

function Ico({ name, size = 20, strokeWidth = 1.75, color = 'currentColor', style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': strokeWidth, stroke: color } });
  }, [name, size, strokeWidth, color]);
  return React.createElement('span', { ref, style: { display: 'inline-flex', ...style } });
}

// Responsive helper — true when the viewport is at or below `max` px wide.
function useMediaQuery(max = 640) {
  const query = `(max-width: ${max}px)`;
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = React.useState(get);
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

const useIsMobile = () => useMediaQuery(640);

Object.assign(window, { Ico, useMediaQuery, useIsMobile });
