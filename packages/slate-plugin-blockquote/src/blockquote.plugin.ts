import { PickPluginAndRequired } from '@artibox/slate-core';
import { CommonBlockRenderer } from '@artibox/slate-renderer';
import {
  BLOCKQUOTE_TYPE,
  BLOCKQUOTE_HOTKEY,
  BLOCKQUOTE_COMPONENT,
  BLOCKQUOTE_QUERY_CURRENT_BLOCK,
  BLOCKQUOTE_QUERY_HAS,
  BLOCKQUOTE_COMMAND_SOFT_BREAK,
  BLOCKQUOTE_COMMAND_UNWRAP,
  BLOCKQUOTE_COMMAND_TOGGLE
} from './blockquote.constants';
import { BlockquoteQueries } from './blockquote.queries';
import { BlockquoteHandlers } from './blockquote.handlers';
import { BlockquoteCommands } from './blockquote.commands';

export interface BlockquotePluginConfig {
  type?: string;
  hotkey?: string;
}

export interface BlockquotePlugin extends PickPluginAndRequired<'onKeyDown' | 'renderBlock'> {
  queries: BlockquoteQueries;
  commands: BlockquoteCommands;
}

export function BlockquotePlugin(config?: BlockquotePluginConfig): BlockquotePlugin {
  const type = (config && config.type) || BLOCKQUOTE_TYPE;
  const hotkey = (config && config.hotkey) || BLOCKQUOTE_HOTKEY;
  const queries = BlockquoteQueries(type);
  const commands = BlockquoteCommands({ type, queryHas: queries[BLOCKQUOTE_QUERY_HAS] });
  const handlers = BlockquoteHandlers({
    hotkey,
    queryCurrentBlock: queries[BLOCKQUOTE_QUERY_CURRENT_BLOCK],
    commandSoftBreak: commands[BLOCKQUOTE_COMMAND_SOFT_BREAK],
    commandUnwrap: commands[BLOCKQUOTE_COMMAND_UNWRAP],
    commandToggle: commands[BLOCKQUOTE_COMMAND_TOGGLE]
  });
  const renderer = CommonBlockRenderer({ type, component: BLOCKQUOTE_COMPONENT });

  return {
    queries,
    commands,
    onKeyDown: handlers.onKeyDown,
    renderBlock: renderer.renderBlock
  };
}
