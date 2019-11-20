import { RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-renderer';
import { InstagramProps } from './instagram.component';

export interface InstagramRendererConfig {
  type: string;
  component: RendererBaseComponent<InstagramProps>;
}

export type InstagramRenderer = CommonBlockRenderer;

export function InstagramRenderer(config: InstagramRendererConfig): InstagramRenderer {
  const { type, component } = config;
  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => ({ url: props.node.data.get('url') || '' })
  });
}
