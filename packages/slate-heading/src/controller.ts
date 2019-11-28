import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { HeadingLevel } from './types';
import { getHeadingLevelFromBlock } from './utils/get-heading-level-from-block';

export interface HeadingController {
  /**
   * To check if the block is heading.
   */
  isBlockAs(block?: Block | null): block is Block;
  /**
   * To check if the current selection is heading in the specific level.
   */
  isSelectionIn(editor: Editor, level: HeadingLevel): boolean;
  getCurrent(editor: Editor): Block | null;
  /**
   * To get the level of the heading in current selection.
   *
   * @returns Will be number if the block is heading, or undefined.
   */
  getCurrentLevel(editor: Editor): HeadingLevel | undefined;
  createBlock(level: HeadingLevel): Block;
  /**
   * To end the heading block and add one paragraph block below the heading.
   */
  end(editor: Editor): Editor;
  /**
   * To set the current block to be heading if it is not heading or the same heading level, or unset heading.
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

    if (!currentBlock) {
      return undefined;
    }

    const level = getHeadingLevelFromBlock(currentBlock);

    if (typeof level === 'number') {
      return level as HeadingLevel;
    }

    return undefined;
  };
  const createBlock: HeadingController['createBlock'] = level => Block.fromJSON({ type, data: { level } });
  const end: HeadingController['end'] = editor => {
    const currentBlock = editor.value.startBlock;

    if (!isBlockAs(currentBlock)) {
      return editor;
    }

    return editor.splitBlock().setBlocks(PARAGRAPH_TYPE);
  };
  const toggle: HeadingController['toggle'] = (editor, level) => {
    const currentLevel = getCurrentLevel(editor);
    const block = currentLevel !== level ? createBlock(level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block);
  };

  return {
    isBlockAs,
    isSelectionIn,
    getCurrent,
    getCurrentLevel,
    createBlock,
    end,
    toggle
  };
}
