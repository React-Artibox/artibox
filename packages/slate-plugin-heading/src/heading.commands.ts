import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_COMMAND_END, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryLevel } from './heading.queries';
import { createHeadingBlock } from './heading.utils';

export interface HeadingCommandsConfig {
  type: string;
  queryLevel: HeadingQueryLevel;
}

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

export function HeadingCommands(config: HeadingCommandsConfig): HeadingCommands {
  const { type, queryLevel } = config;

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
      const currentLevel = queryLevel(editor);
      const block = currentLevel !== level ? createHeadingBlock(type, level) : PARAGRAPH_TYPE;
      return editor.setBlocks(block).focus();
    }
  };
}
