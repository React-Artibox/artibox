import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { HeadingLevel } from './typings';
import { getHeadingLevelFromBlock } from './utils/get-heading-level-from-block';
import { createHeadingBlock } from './utils/create-heading-block';

export interface HeadingController {
  /**
   * Check if the block is heading.
   */
  isBlockAs(block?: Block | null): block is Block;
  /**
   * Check if the current selection is heading in the specific level.
   */
  isSelectionIn(editor: Editor, level: HeadingLevel): boolean;
  /**
   * Get the heading block in the current selection.
   */
  getCurrent(editor: Editor): Block | null;
  /**
   * Get the level of the heading block in the current selection.
   *
   * @returns Will be number if the block is heading, or undefined.
   */
  getCurrentLevel(editor: Editor): HeadingLevel | undefined;
  /**
   * End the heading block and add one paragraph block below the heading.
   */
  end(editor: Editor): Editor;
  /**
   * Set the current block to be heading if it is not heading or not the same heading level, or unset heading.
   */
  toggle(editor: Editor, level: HeadingLevel): Editor;
}

export type CreateHeadingControllerConfig = NodeType;

export function createHeadingController(config: CreateHeadingControllerConfig): HeadingController {
  const { type } = config;

  const isBlockAs: HeadingController['isBlockAs'] = (block): block is Block => block?.type === type;
  const isSelectionIn: HeadingController['isSelectionIn'] = (editor, level) =>
    editor.value.blocks.some(block => isBlockAs(block) && getHeadingLevelFromBlock(block) === level);
  const getCurrent: HeadingController['getCurrent'] = editor => {
    const currentBlock = editor.value.startBlock;
    return isBlockAs(currentBlock) ? currentBlock : null;
  };
  const getCurrentLevel: HeadingController['getCurrentLevel'] = editor => {
    const currentBlock = getCurrent(editor);
    return currentBlock ? getHeadingLevelFromBlock(currentBlock) : undefined;
  };
  const end: HeadingController['end'] = editor =>
    isBlockAs(editor.value.startBlock) ? editor.splitBlock().setBlocks(PARAGRAPH_TYPE) : editor;
  const toggle: HeadingController['toggle'] = (editor, level) => {
    const currentLevel = getCurrentLevel(editor);
    const block = currentLevel !== level ? createHeadingBlock(type, level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block);
  };

  return {
    isBlockAs,
    isSelectionIn,
    getCurrent,
    getCurrentLevel,
    end,
    toggle
  };
}
