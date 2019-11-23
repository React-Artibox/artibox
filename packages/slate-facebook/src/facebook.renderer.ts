import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common';
import { FACEBOOK_TYPE } from './facebook.constants';
import Facebook, { FacebookProps } from './facebook.component';

export type FacebookRendererConfig = Partial<Pick<CommonBlockRendererConfig<FacebookProps>, 'type' | 'component'>>;

export type FacebookRenderer = CommonBlockRenderer;

export function FacebookRenderer(config?: FacebookRendererConfig): FacebookRenderer {
  const { type = FACEBOOK_TYPE, component = Facebook } = config || {};

  return CommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => props.node.data.toJS()
  });
}
