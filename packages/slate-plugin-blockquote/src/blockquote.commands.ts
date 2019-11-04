import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import {
  BLOCKQUOTE_COMMAND_SOFT_BREAK,
  BLOCKQUOTE_COMMAND_WRAP,
  BLOCKQUOTE_COMMAND_UNWRAP,
  BLOCKQUOTE_COMMAND_TOGGLE
} from './blockquote.constants';
import { BlockquoteQueryHas } from './blockquote.queries';

export interface BlockquoteCommandsConfig {
  type: string;
  queryHas: BlockquoteQueryHas;
}

/**
 * To soft break the current block inside blockquote and add one paragraph block below.
 */
export type BlockquoteCommandSoftBreak = (editor: Editor) => Editor;

/**
 * To wrap the current block with blockquote block.
 */
export type BlockquoteCommandWrap = (editor: Editor) => Editor;

/**
 * To unwrap the current blockquote block if it is.
 */
export type BlockquoteCommandUnwrap = (editor: Editor) => Editor;

/**
 * To toggle the blockquote block.
 */
export type BlockquoteCommandToggle = (editor: Editor) => Editor;

export type BlockquoteCommands = Plugin['commands'] & {
  [BLOCKQUOTE_COMMAND_SOFT_BREAK]: BlockquoteCommandSoftBreak;
  [BLOCKQUOTE_COMMAND_WRAP]: BlockquoteCommandWrap;
  [BLOCKQUOTE_COMMAND_UNWRAP]: BlockquoteCommandUnwrap;
  [BLOCKQUOTE_COMMAND_TOGGLE]: BlockquoteCommandToggle;
};

export function BlockquoteCommands(config: BlockquoteCommandsConfig): BlockquoteCommands {
  const { type, queryHas } = config;
  const commandSoftBreak: BlockquoteCommandSoftBreak = editor =>
    editor
      .splitBlock()
      .setBlocks(PARAGRAPH_TYPE)
      .focus();
  const commandWrap: BlockquoteCommandWrap = editor => editor.wrapBlock(type).focus();
  const commandUnwrap: BlockquoteCommandUnwrap = editor => editor.unwrapBlock(type).focus();
  const commandToggle: BlockquoteCommandToggle = editor => {
    const active = queryHas(editor);
    const command = active ? commandUnwrap : commandWrap;
    return command(editor).focus();
  };

  return {
    [BLOCKQUOTE_COMMAND_SOFT_BREAK]: commandSoftBreak,
    [BLOCKQUOTE_COMMAND_WRAP]: commandWrap,
    [BLOCKQUOTE_COMMAND_UNWRAP]: commandUnwrap,
    [BLOCKQUOTE_COMMAND_TOGGLE]: commandToggle
  };
}
