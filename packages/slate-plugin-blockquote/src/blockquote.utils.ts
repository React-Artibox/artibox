import { getQuery, getCommand } from '@artibox/slate-core';
import { BLOCKQUOTE_QUERY_HAS, BLOCKQUOTE_COMMAND_TOGGLE } from './blockquote.constants';
import { BlockquoteQueryHas } from './blockquote.queries';
import { BlockquoteCommandToggle } from './blockquote.commands';

export const isBlockquoteActive: BlockquoteQueryHas = editor =>
  getQuery<BlockquoteQueryHas>(editor, BLOCKQUOTE_QUERY_HAS)();

export const blockquoteToggle: BlockquoteCommandToggle = editor =>
  getCommand<BlockquoteCommandToggle>(editor, BLOCKQUOTE_COMMAND_TOGGLE)();
