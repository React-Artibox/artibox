import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';
import { INSTAGRAM_TYPE } from './instagram.constants';
import { getInstagramPropsFromBlock } from './instagram.utils';
import Instagram, { InstagramProps } from './instagram.component';

export type InstagramRendererConfig = Partial<Pick<CommonBlockRendererConfig<InstagramProps>, 'type' | 'component'>>;

export type InstagramRenderer = CommonBlockRenderer;

export function InstagramRenderer(config?: InstagramRendererConfig): InstagramRenderer {
  const { type = INSTAGRAM_TYPE, component = Instagram } = config || {};

  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getInstagramPropsFromBlock(props.node)
  });
}
