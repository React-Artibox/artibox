import { Block } from 'slate';

export function getVideoSourceFromBlock(block: Block): string | undefined {
  return block.data.get(block.data.get('provider'));
}
