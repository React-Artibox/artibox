import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE, getQuery } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_QUERY_LEVEL, HEADING_COMMAND_END, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryLevel } from './heading.queries';
import { createHeadingBlock } from './heading.utils';

export type HeadingCommandEnd = (editor: Editor) => Editor;
export type HeadingCommandToggle = (editor: Editor, level: HEADING_LEVELS) => Editor;

export type HeadingCommands = Plugin['commands'] & {
  [HEADING_COMMAND_END]: HeadingCommandEnd;
  [HEADING_COMMAND_TOGGLE]: HeadingCommandToggle;
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
