import { Block, Editor } from 'slate';
import { HEADING_LEVELS } from './heading.constants';

export interface HeadingController {
  /**
   * To check if the block is heading.
   */
  isBlockAsHeading(block?: Block | null): boolean;

  /**
   * To check if the current selection is heading in the specific level.
   */
  isSelectionInHeading(editor: Editor, level: HEADING_LEVELS): boolean;

  /**
   * To get the level of the heading in current selection.
   *
   * @returns Will be number if the block is heading, or undefined.
   */
  getCurrentHeadingLevel(editor: Editor): HEADING_LEVELS | undefined;

  createHeadingBlock(level: HEADING_LEVELS): Block;

  /**
   * To end the heading block and add one paragraph block below the heading.
   */
  endHeadingBlock(editor: Editor): Editor;

  /**
   * To set the current block to be heading if it is not heading or the same heading level, or unset heading.
   */
  toggleHeadingBlock(editor: Editor, level: HEADING_LEVELS): Editor;
}
