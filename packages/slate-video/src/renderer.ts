import { Plugin } from 'slate-react';
import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { VIDEO_TYPE } from './constants';
import { getVideoPropsFromBlock } from './utils/get-video-props-from-block';
import { VideoProps } from './types';
import Video from './components/video';

export type CreateVideoRendererConfig = Partial<
  Pick<CreateCommonBlockRendererConfig<VideoProps>, 'type' | 'component'>
>;

export function createVideoRenderer(config?: CreateVideoRendererConfig): Plugin {
  const { type = VIDEO_TYPE, component = Video } = config || {};
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getVideoPropsFromBlock(props.node)
  });
}
