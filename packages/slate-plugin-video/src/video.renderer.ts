import { RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-renderer';
import { VideoProps } from './video.component';
import { getSourceFromBlock } from './video.utils';

export interface VideoRendererConfig {
  type: string;
  component: RendererBaseComponent<VideoProps>;
}

export type VideoRenderer = CommonBlockRenderer;

export function VideoRenderer(config: VideoRendererConfig): VideoRenderer {
  const { type, component } = config;
  return CommonBlockRenderer({
    type,
    component,
    getProps: props => ({ src: getSourceFromBlock(props.node) || '' })
  });
}
