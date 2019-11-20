import React, { CSSProperties, memo, forwardRef, useEffect } from 'react';
import { RenderAttributes } from 'slate-react';
import { InstagramEmbedApi } from './instagram.types';

export interface InstagramProps extends RenderAttributes {
  url: string;
}

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

function getInstagramEmbedApi(): InstagramEmbedApi | undefined {
  return (window as any).instgrm;
}

function useLoadInstagramApi() {
  useEffect(() => {
    let instgrm = getInstagramEmbedApi();

    if (instgrm) {
      instgrm.Embeds.process();
      return;
    }

    const script = document.createElement('script');

    script.src = '//www.instagram.com/embed.js';
    script.onload = () => {
      instgrm = getInstagramEmbedApi();

      if (instgrm) {
        instgrm.Embeds.process();
      }

      script.remove();
    };
    script.async = true;

    document.body.appendChild(script);
  }, []);
}

const Instagram = forwardRef<HTMLElement, InstagramProps>(({ url, ...props }, ref) => {
  const permalink = `https://www.instagram.com/${url}`;
  useLoadInstagramApi();

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
