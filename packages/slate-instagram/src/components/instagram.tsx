import React, { CSSProperties, memo, forwardRef, useEffect } from 'react';
import { InstagramProps } from '../typings';
import { loadInstagramApi } from '../utils/load-instagram-api';

const instagramStyle: CSSProperties = {
  background: '#fff',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
  margin: 1,
  maxWidth: 540,
  minWidth: 326,
  padding: 0,
  width: 'calc(100% - 2px)'
};

/**
 * Default component of both renderer of editor and jsx serializer rule of instagram.
 */
const Instagram = forwardRef<HTMLElement, InstagramProps>(({ url, ...props }, ref) => {
  const permalink = `https://www.instagram.com/${url}`;

  useEffect(() => loadInstagramApi(), []);

  return (
    <blockquote
      ref={ref}
      className="instagram-media"
      data-instgrm-permalink={permalink}
      data-instgrm-version="12"
      style={instagramStyle}
      {...props}
    />
  );
});

export default memo(Instagram);
