import React, { CSSProperties, memo, forwardRef } from 'react';
import { RenderAttributes } from 'slate-react';
import { FacebookEmbedData } from './facebook.types';
import { getSrcFromEmbedData } from './facebook.utils';

export type FacebookProps = RenderAttributes & FacebookEmbedData;

const facebookStyle: CSSProperties = {
  border: 0,
  overflow: 'hidden'
};

const Facebook = forwardRef<HTMLIFrameElement, FacebookProps>(({ width, height, url, type, ...props }, ref) => {
  const src = getSrcFromEmbedData({ type, url, width, height });

  return (
    <iframe
      ref={ref}
      title={url}
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
