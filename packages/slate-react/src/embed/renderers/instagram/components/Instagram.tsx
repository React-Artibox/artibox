import React from 'react';
import { InstagramEmbedElement } from '@artibox/slate-common/embed/strategies/instagram';
import { RenderElementProps } from '../../../../core';
import { useLoadInstagramEmbedApi } from '../hooks/useLoadInstagramEmbedApi';

export interface InstagramProps {
  attributes?: RenderElementProps['attributes'];
  children?: any;
  data: string;
  element: InstagramEmbedElement;
}

function Instagram({ attributes, children, data: permalink }: InstagramProps) {
  useLoadInstagramEmbedApi(permalink);

  return (
    <div
      {...attributes}
      contentEditable={false}
      style={{
        display: 'flex',
        marginBottom: -12
      }}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        data-instgrm-version="13"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: 'calc(100% - 2px)'
        }}
      />
      {attributes ? children : undefined}
    </div>
  );
}

export default Instagram;
