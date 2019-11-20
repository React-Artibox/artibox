import { Block, Editor } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL } from './heading.constants';

export interface HeadingUtils {
  getLevelFromBlock(block?: Block | null): HEADING_LEVELS | undefined;
  isBlockAsHeading(block?: Block | null): boolean;
  getCurrentHeadingLevel(editor: Editor): HEADING_LEVELS | undefined;
  isSelectionInHeading(editor: Editor, level: HEADING_LEVELS): boolean;
  createHeadingBlock(level: HEADING_LEVELS): Block;
  endHeadingBlock(editor: Editor): Editor;
  toggleHeadingBlock(editor: Editor, level: HEADING_LEVELS): Editor;
}

export function HeadingUtils(type: string): HeadingUtils {
  const getLevelFromBlock: HeadingUtils['getLevelFromBlock'] = block => block?.data.get(HEADING_DATA_KEY_LEVEL);

  /**
   * To check if the block is heading.
   */
  const isBlockAsHeading: HeadingUtils['isBlockAsHeading'] = block => block?.type === type;

  /**
   * To get the level of the heading in current selection.
   *
   * @returns Will be number if the block is heading, or undefined.
   */
  const getCurrentHeadingLevel: HeadingUtils['getCurrentHeadingLevel'] = editor => {
    const currentBlock = editor.value.startBlock;

    if (!isBlockAsHeading(currentBlock)) {
      return undefined;
    }

    const level = getLevelFromBlock(currentBlock);

    if (typeof level === 'number') {
      return level as HEADING_LEVELS;
    }

    return undefined;
  };

  /**
   * To check if the current selection is heading in the specific level.
   */
  const isSelectionInHeading: HeadingUtils['isSelectionInHeading'] = (editor, level) =>
    editor.value.blocks.some(block => isBlockAsHeading(block) && getLevelFromBlock(block) === level);

  const createHeadingBlock: HeadingUtils['createHeadingBlock'] = level =>
    Block.fromJSON({
      type,
      data: { [HEADING_DATA_KEY_LEVEL]: level }
    });

  /**
   * To end the heading block and add one paragraph block below the heading.
   */
  const endHeadingBlock: HeadingUtils['endHeadingBlock'] = editor => {
    const currentBlock = editor.value.startBlock;

    if (!isBlockAsHeading(currentBlock)) {
      return editor;
    }

    return editor.splitBlock().setBlocks(PARAGRAPH_TYPE);
  };

  /**
   * To set the current block to be heading if it is not heading or the same heading level, or unset heading.
   */
  const toggleHeadingBlock: HeadingUtils['toggleHeadingBlock'] = (editor, level) => {
    const currentLevel = getCurrentHeadingLevel(editor);
    const block = currentLevel !== level ? createHeadingBlock(level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block);
  };

  return {
    getLevelFromBlock,
    isBlockAsHeading,
    getCurrentHeadingLevel,
    isSelectionInHeading,
    createHeadingBlock,
    endHeadingBlock,
    toggleHeadingBlock
  };
}
