import { HasNodeType, CommonBlockRenderer } from '@artibox/slate-common';
import { INPUT_BLOCK_TYPE } from './input-block.constants';
import InputBlock from './input-block.component';

export type InputblockRendererConfig = Partial<HasNodeType>;

export type InputblockRenderer = CommonBlockRenderer;

export function InputblockRenderer(config?: InputblockRendererConfig): InputblockRenderer {
  const { type = INPUT_BLOCK_TYPE } = config || {};
  return CommonBlockRenderer({
    type,
    component: InputBlock,
    getProps: props => ({ isEmpty: props.node.text === '' })
  });
}
