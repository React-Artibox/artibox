import { HasNodeType } from '@artibox/slate-common';
import { CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';
import { INPUT_BLOCK_TYPE } from './input-block.constants';
import InputBlock from './input-block.component';

export type InputblockRendererConfig = Partial<HasNodeType>;

export type InputblockRenderer = CommonBlockRenderer;

export function InputblockRenderer(config?: InputblockRendererConfig): InputblockRenderer {
  const { type = INPUT_BLOCK_TYPE } = config || {};
  return CommonBlockRenderer({
    type,
    component: InputBlock,
    getProps: props => ({ isEmpty: props.node.text === '', getPlaceholder: props.node.data.get('getPlaceholder') })
  });
}
