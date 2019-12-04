import { Plugin } from 'slate-react';
import { NodeType } from '@artibox/slate-common';
import { createCommonBlockRenderer } from '@artibox/slate-common/renderers';
import { INPUT_BLOCK_TYPE } from './constants';
import { InputBlockProps } from './typings';
import InputBlock from './components/input-block';
import { getInputBlockPropsFromBlock } from './utils/get-input-block-props-from-block';

export type CreateInputBlockRendererConfig = NodeType;

export function createInputBlockRenderer(config: CreateInputBlockRendererConfig): Plugin {
  const { type = INPUT_BLOCK_TYPE } = config || {};
  return createCommonBlockRenderer<InputBlockProps>({
    type,
    component: InputBlock,
    getProps: props => getInputBlockPropsFromBlock(props.node)
  });
}
