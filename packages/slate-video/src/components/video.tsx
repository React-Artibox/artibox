import React, { memo, forwardRef, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { composeRefs } from '@artibox/components/utils/compose-refs';
import { VideoProps } from '../typings';
import { videoSourceSerializers } from '../source-serializers';

/**
 * Default component of both renderer of editor and jsx serializer rule of video.
 */
const Video = forwardRef<HTMLDivElement, VideoProps>(({ id, provider, ...props }, ref) => {
  const src = useMemo(() => videoSourceSerializers[provider].deserialize(id), [id, provider]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const composedRef = composeRefs([ref, containerRef]);

  useLayoutEffect(() => {
    function handler() {
      const container = containerRef.current;

      if (container) {
        const width = container.offsetWidth;
        setSize({ width, height: Math.round(width * 0.75) });
      }
    }

    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [containerRef]);

  return (
    <div ref={composedRef} {...props}>
      <div style={size}>
        <iframe src={src} frameBorder="0" width="100%" height="100%" />
      </div>
    </div>
  );
});

export default memo(Video);
