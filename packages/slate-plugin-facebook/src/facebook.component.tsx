import React, { CSSProperties, memo, forwardRef } from 'react';
import { RenderAttributes } from 'slate-react';
import { FacebookEmbedData } from './facebook.types';

export type FacebookProps = RenderAttributes & FacebookEmbedData;

const facebookStyle: CSSProperties = {
  border: 0,
  overflow: 'hidden'
};

function getSrcFromEmbedData(embedData: FacebookEmbedData): string {
  const type = embedData.type;
  const { width, height, content } = embedData;
  const params = new URLSearchParams({
    href: `https://www.facebook.com${content}`,
    width: `${width}`,
    height: `${height}`
  }).toString();

  if (type === 'post') {
    return `https://www.facebook.com/plugins/post.php?${params}`;
  } else if (type === 'video') {
    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  return '';
}

const Facebook = forwardRef<HTMLIFrameElement, FacebookProps>(({ width, height, content, type, ...props }, ref) => {
  const src = getSrcFromEmbedData({ type, content, width, height });

  return (
    <iframe
      ref={ref}
      title={content}
      src={src}
      width={width}
      height={height}
      style={facebookStyle}
      scrolling="no"
      frameBorder="0"
      //  eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //  @ts-ignore
      //  eslint-disable-next-line react/no-unknown-property
      allowtransparency="true"
      allow="encrypted-media"
      {...props}
    />
  );
});

export default memo(Facebook);
