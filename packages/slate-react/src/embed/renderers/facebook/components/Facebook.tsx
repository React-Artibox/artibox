import React from 'react';
import { FacebookDeserializedEmbedData, FacebookEmbedElement } from '@artibox/slate-common/embed/strategies/facebook';
import { RenderElementProps } from '../../../../core';

export interface FacebookProps {
  attributes?: RenderElementProps['attributes'];
  children?: any;
  data: FacebookDeserializedEmbedData;
  element: FacebookEmbedElement;
}

function Facebook({ attributes, children, data: { url, width, height } }: FacebookProps) {
  return (
    <div {...attributes} contentEditable={false}>
      <iframe
        title={url}
        src={url}
        width={width}
        height={height}
        style={{
          border: 0,
          overflow: 'hidden'
        }}
        scrolling="no"
        frameBorder="0"
        //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //  @ts-ignore
        //  eslint-disable-next-line react/no-unknown-property
        allowtransparency="true"
        allow="encrypted-media"
      />
      {attributes ? children : undefined}
    </div>
  );
}

export default Facebook;
