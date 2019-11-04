import { Block, Data } from 'slate';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL } from './heading.constants';

export function getLevelFromBlock(block: Block): HEADING_LEVELS | undefined {
  return block.data.get(HEADING_DATA_KEY_LEVEL);
}

export function createHeadingBlock(type: string, level: HEADING_LEVELS): Block {
  return Block.fromJSON({
    type,
    data: Data.fromJSON({ [HEADING_DATA_KEY_LEVEL]: level })
  });
}
