import { Plugin } from 'slate-react';
import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { getVideoPropsFromBlock } from './utils/get-video-props-from-block';
import { VideoProps } from './typings';

export type CreateVideoRendererConfig = Pick<CreateCommonBlockRendererConfig<VideoProps>, 'type' | 'component'>;

export function createVideoRenderer(config: CreateVideoRendererConfig): Plugin {
  const { type, component } = config;
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getVideoPropsFromBlock(props.node)
  });
}
