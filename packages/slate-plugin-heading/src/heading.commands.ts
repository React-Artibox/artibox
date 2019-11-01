import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE, getQuery } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_QUERY_LEVEL, HEADING_COMMAND_END, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryLevel } from './heading.queries';
import { createHeadingBlock } from './heading.utils';

/**
 * To end the heading block and add one paragraph block below the heading.
 */
export type HeadingCommandEnd = (editor: Editor) => Editor;

/**
 * To set the current block to be heading if it is not heading or the same heading level, or unset heading.
 */
export type HeadingCommandToggle = (editor: Editor, level: HEADING_LEVELS) => Editor;

export type HeadingCommands = Plugin['commands'] & {
  [HEADING_COMMAND_END]: HeadingCommandEnd;
  [HEADING_COMMAND_TOGGLE]: HeadingCommandToggle;
};

export function HeadingCommands(type: string): HeadingCommands {
  return {
    [HEADING_COMMAND_END]: editor => {
      const currentBlock = editor.value.startBlock;

      if (currentBlock.type !== type) {
        return editor.focus();
      }

      return editor
        .splitBlock()
        .setBlocks(PARAGRAPH_TYPE)
        .focus();
    },
    [HEADING_COMMAND_TOGGLE]: (editor, level) => {
      const currentLevel = getQuery<HeadingQueryLevel>(editor, HEADING_QUERY_LEVEL)();
      const block = currentLevel !== level ? createHeadingBlock(type, level) : PARAGRAPH_TYPE;
      return editor.setBlocks(block).focus();
    }
  };
}
