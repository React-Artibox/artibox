import { Block } from 'slate';

export function getInputBlockPropsFromBlock(block: Block) {
  return {
    isEmpty: block.text === '',
    getPlaceholder: block.data.get('getPlaceholder')
  };
}
