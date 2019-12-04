import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { getInstagramPropsFromBlock } from './utils/get-instagram-props-from-block';
import { InstagramProps } from './typings';

export type CreateInstagramRendererConfig = Pick<CreateCommonBlockRendererConfig<InstagramProps>, 'type' | 'component'>;

export function createInstagramRenderer(config: CreateInstagramRendererConfig) {
  const { type, component } = config;
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getInstagramPropsFromBlock(props.node)
  });
}
