import { Editor, Plugin, CommandFunc } from 'slate';
import { ComposeCommandFunc, PARAGRAPH_TYPE, getQuery } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_QUERY_LEVEL, HEADING_COMMAND_END, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryLevel } from './heading.queries';
import { createHeadingBlock } from './heading.utils';

export type HeadingCommandToggle = (level: HEADING_LEVELS) => Editor;

export type HeadingCommands = Plugin['commands'] & {
  [HEADING_COMMAND_END]: CommandFunc;
  [HEADING_COMMAND_TOGGLE]: ComposeCommandFunc<HeadingCommandToggle>;
};

export function HeadingCommands(type: string): HeadingCommands {
  const commands = {} as HeadingCommands;

  commands[HEADING_COMMAND_END] = editor => {
    const currentBlock = editor.value.startBlock;

    if (currentBlock.type !== type) {
      return editor.focus();
    }

    return editor
      .splitBlock()
      .setBlocks(PARAGRAPH_TYPE)
      .focus();
  };
  commands[HEADING_COMMAND_TOGGLE] = (editor, level) => {
    const currentLevel = getQuery<HeadingQueryLevel>(editor, HEADING_QUERY_LEVEL)();
    const block = currentLevel !== level ? createHeadingBlock(type, level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block).focus();
  };

  return commands;
}
