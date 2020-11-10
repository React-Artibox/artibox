import React from 'react';
import { YoutubeEmbedElement } from '@artibox/slate-common/embed/strategies/youtube';
import VideoIframe, { VideoIframeProps } from '../../components/VideoIframe';

export const defaultRenderYoutubeEmbedElement = (props: VideoIframeProps<YoutubeEmbedElement>) => (
  <VideoIframe {...props} />
);
