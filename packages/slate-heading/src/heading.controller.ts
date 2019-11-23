import { Block, Editor } from 'slate';
import { HasNodeType, PARAGRAPH_TYPE } from '@artibox/slate-common';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL } from './heading.constants';
import { getHeadingLevelFromBlock } from './heading.utils';

export abstract class HeadingController implements HasNodeType {
  constructor(public readonly type: string) {}

  /**
   * To check if the block is heading.
   */
  isBlockAs = (block?: Block | null): boolean => block?.type === this.type;

  /**
   * To check if the current selection is heading in the specific level.
   */
  isSelectionIn = (editor: Editor, level: HEADING_LEVELS): boolean =>
    editor.value.blocks.some(block => this.isBlockAs(block) && getHeadingLevelFromBlock(block) === level);

  getCurrent = (editor: Editor): Block | null => {
    const currentBlock = editor.value.startBlock;
    return this.isBlockAs(currentBlock) ? currentBlock : null;
  };

  /**
   * To get the level of the heading in current selection.
   *
   * @returns Will be number if the block is heading, or undefined.
   */
  getCurrentLevel = (editor: Editor): HEADING_LEVELS | undefined => {
    const currentBlock = this.getCurrent(editor);

    if (!currentBlock) {
      return undefined;
    }

    const level = getHeadingLevelFromBlock(currentBlock);

    if (typeof level === 'number') {
      return level as HEADING_LEVELS;
    }

    return undefined;
  };

  createBlock = (level: HEADING_LEVELS): Block =>
    Block.fromJSON({
      type: this.type,
      data: { [HEADING_DATA_KEY_LEVEL]: level }
    });

  /**
   * To end the heading block and add one paragraph block below the heading.
   */
  end = (editor: Editor): Editor => {
    const currentBlock = editor.value.startBlock;

    if (!this.isBlockAs(currentBlock)) {
      return editor;
    }

    return editor.splitBlock().setBlocks(PARAGRAPH_TYPE);
  };

  /**
   * To set the current block to be heading if it is not heading or the same heading level, or unset heading.
   */
  toggle = (editor: Editor, level: HEADING_LEVELS): Editor => {
    const currentLevel = this.getCurrentLevel(editor);
    const block = currentLevel !== level ? this.createBlock(level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block);
  };
}
