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

Object.assign(window, { Ico });
