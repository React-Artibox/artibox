import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';
import { VIDEO_TYPE } from './video.constants';
import { getSourceFromBlock } from './video.utils';
import Video, { VideoProps } from './video.component';

export type VideoRendererConfig = Partial<Pick<CommonBlockRendererConfig<VideoProps>, 'type' | 'component'>>;

export type VideoRenderer = CommonBlockRenderer;

export function VideoRenderer(config?: VideoRendererConfig): VideoRenderer {
  const { type = VIDEO_TYPE, component = Video } = config || {};

  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => ({ src: getSourceFromBlock(props.node) || '' })
  });
}
