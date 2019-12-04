import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { INSTAGRAM_TYPE } from './constants';
import { getInstagramPropsFromBlock } from './utils/get-instagram-props-from-block';
import { InstagramProps } from './typings';
import Instagram from './components/instagram';

export type CreateInstagramRendererConfig = Partial<
  Pick<CreateCommonBlockRendererConfig<InstagramProps>, 'type' | 'component'>
>;

export function createInstagramRenderer(config?: CreateInstagramRendererConfig) {
  const { type = INSTAGRAM_TYPE, component = Instagram } = config || {};
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getInstagramPropsFromBlock(props.node)
  });
}
