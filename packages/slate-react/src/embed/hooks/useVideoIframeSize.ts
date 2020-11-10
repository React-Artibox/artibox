import { useLayoutEffect, useRef, useState } from 'react';

export function useVideoIframeSize<E extends HTMLElement>() {
  const ref = useRef<E>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function handler() {
      const el = ref.current;

      if (el) {
        const width = el.offsetWidth;
        setSize({ width, height: Math.round(width * 0.75) });
      }
    }

    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [ref]);

  return {
    ref,
    size
  };
}
