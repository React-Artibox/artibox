import React from 'react';
import { EmbedElement } from '@artibox/slate-common/embed/common';
import { composeRefs } from '../../utils/composeRefs';
import { RenderElementProps } from '../../core';
import { useVideoIframeSize } from '../hooks/useVideoIframeSize';

export interface VideoIframeProps<E extends EmbedElement> {
  attributes?: RenderElementProps['attributes'];
  children?: any;
  data: string;
  element: E;
}

function VideoIframe<E extends EmbedElement>({ attributes, children, data: src }: VideoIframeProps<E>) {
  const { ref } = attributes || {};
  const { ref: containerRef, size } = useVideoIframeSize<HTMLDivElement>();
  const composedRef = ref ? composeRefs([ref, containerRef]) : containerRef;

  return (
    <div {...attributes} ref={composedRef} contentEditable={false}>
      <div style={size}>
        <iframe src={src} frameBorder="0" width="100%" height="100%" />
      </div>
      {attributes ? children : undefined}
    </div>
  );
}

export default VideoIframe;
