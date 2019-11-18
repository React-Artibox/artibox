import React, { memo, useRef, useState, useCallback, useLayoutEffect, forwardRef } from 'react';
import { RenderAttributes } from 'slate-react';

export interface VideoProps extends RenderAttributes {
  src: string;
}

const Video = forwardRef<HTMLDivElement, VideoProps>(({ src, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refs = [ref, containerRef];
  const combinedRef = useCallback(
    (element: HTMLDivElement) =>
      refs.forEach(ref => {
        if (!ref) {
          return;
        }

        if (typeof ref === 'function') {
          return ref(element);
        }

        (ref as any).current = element;
      }),
    refs
  );

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (container) {
      const width = container.offsetWidth;
      setSize({ width, height: Math.round(width * 0.75) });
    }
  }, [containerRef]);

  return (
    <div ref={combinedRef} {...props}>
      <div style={size}>
        <iframe src={src} frameBorder="0" width="100%" height="100%" />
      </div>
    </div>
  );
});

export default memo(Video);
