import { PickPluginAndRequired, HasNodeType } from '@artibox/slate-common';
import { CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';
import { HEADING_TYPE } from './heading.constants';
import { getHeadingPropsFromBlock } from './heading.utils';
import Heading from './heading.component';

export type HeadingRendererConfig = Partial<HasNodeType>;

export type HeadingRenderer = PickPluginAndRequired<'renderBlock'>;

export function HeadingRenderer(config?: HeadingRendererConfig): HeadingRenderer {
  const { type = HEADING_TYPE } = config || {};

  return CommonBlockRenderer({
    type,
    component: Heading,
    getProps: props => getHeadingPropsFromBlock(props.node)
  });
}
