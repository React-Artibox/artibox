import { Block, Data } from 'slate';
import { getQuery, getCommand } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL, HEADING_QUERY_HAS, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryHas } from './heading.queries';
import { HeadingCommandToggle } from './heading.commands';

export function getLevelFromBlock(block: Block): HEADING_LEVELS | undefined {
  return block.data.get(HEADING_DATA_KEY_LEVEL);
}

export function createHeadingBlock(type: string, level: HEADING_LEVELS): Block {
  return Block.fromJSON({
    type,
    data: Data.fromJSON({ [HEADING_DATA_KEY_LEVEL]: level })
  });
}

/**
 * @public
 */
export const isHeadingActive: HeadingQueryHas = (editor, level) =>
  getQuery<HeadingQueryHas>(editor, HEADING_QUERY_HAS)(level);

/**
 * @public
 */
export const headingToggle: HeadingCommandToggle = (editor, level) =>
  getCommand<HeadingCommandToggle>(editor, HEADING_COMMAND_TOGGLE)(level);
