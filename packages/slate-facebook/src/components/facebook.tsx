import React, { CSSProperties, memo, forwardRef } from 'react';
import { FacebookProps } from '../typings';
import { getSrcFromFacebookEmbedData } from '../utils/get-src-from-facebook-embed-data';

const facebookStyle: CSSProperties = {
  border: 0,
  overflow: 'hidden'
};

/**
 * Default component of both renderer of editor and jsx serializer rule of facebook.
 */
const Facebook = forwardRef<HTMLIFrameElement, FacebookProps>(({ type, url, width, height, ...props }, ref) => {
  const src = getSrcFromFacebookEmbedData({ type, url, width, height });

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
