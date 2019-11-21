import { Editor, Block } from 'slate';

export interface BlockquoteController {
  /**
   * To check if the block is blockquote.
   */
  isBlockAsBlockquote: (block?: Block | null) => boolean;

  /**
   * To check if the current selection is in blockquote.
   */
  isSelectionInBlockquote(editor: Editor): boolean;

  /**
   * If the current block is blockquote or wrapped by blockquote, return the blockquote, or null.
   */
  getCurrentBlockquote(editor: Editor): Block | null;

  /**
   * To wrap the current block with blockquote block.
   */
  wrapBlockquoteBlock(editor: Editor): Editor;

  /**
   * To unwrap the current blockquote block if it is.
   */
  unwrapBlockquoteBlock(editor: Editor): Editor;

  /**
   * To toggle the blockquote block.
   */
  toggleBlockquoteBlock(editor: Editor): Editor;
}
