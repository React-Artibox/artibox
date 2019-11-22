import { RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-common';
import { FacebookProps } from './facebook.component';

export interface FacebookRendererConfig {
  type: string;
  component: RendererBaseComponent<FacebookProps>;
}

export type FacebookRenderer = CommonBlockRenderer;

export function FacebookRenderer(config: FacebookRendererConfig): FacebookRenderer {
  const { type, component } = config;
  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => props.node.data.toJS()
  });
}
