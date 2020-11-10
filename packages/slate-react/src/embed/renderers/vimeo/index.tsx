import React from 'react';
import { VimeoEmbedElement } from '@artibox/slate-common/embed/strategies/vimeo';
import VideoIframe, { VideoIframeProps } from '../../components/VideoIframe';

export const defaultRenderVimeoEmbedElement = (props: VideoIframeProps<VimeoEmbedElement>) => (
  <VideoIframe {...props} />
);
