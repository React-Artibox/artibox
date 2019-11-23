import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common';
import { InstagramProps } from './instagram.component';
import { INSTAGRAM_DATA_KEY_URL, INSTAGRAM_TYPE } from './instagram.constants';
import Instagram from './instagram.component';

export type InstagramRendererConfig = Partial<Pick<CommonBlockRendererConfig<InstagramProps>, 'type' | 'component'>>;

export type InstagramRenderer = CommonBlockRenderer;

export function InstagramRenderer(config?: InstagramRendererConfig): InstagramRenderer {
  const { type = INSTAGRAM_TYPE, component = Instagram } = config || {};

  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => ({ url: props.node.data.get(INSTAGRAM_DATA_KEY_URL) || '' })
  });
}
