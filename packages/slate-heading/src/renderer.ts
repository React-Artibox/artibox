import { Plugin } from 'slate-react';
import { NodeType } from '@artibox/slate-common';
import { createCommonBlockRenderer } from '@artibox/slate-common/renderers/common-block';
import { HEADING_TYPE } from './constants';
import { getHeadingPropsFromBlock } from './utils/get-heading-props-from-block';
import Heading from './components/heading';

export type CreateHeadingRendererConfig = Partial<NodeType>;

export function createHeadingRenderer(config?: CreateHeadingRendererConfig): Plugin {
  const { type = HEADING_TYPE } = config || {};
  return createCommonBlockRenderer({
    type,
    component: Heading,
    getProps: props => getHeadingPropsFromBlock(props.node)
  });
}
