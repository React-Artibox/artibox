import { Editor, Block } from 'slate';
import { HasNodeType } from '@artibox/slate-common';

export abstract class BlockquoteController implements HasNodeType {
  constructor(public readonly type: string) {}

  /**
   * To check if the block is blockquote.
   */
  isBlockAs = (block?: Block | null): boolean => {
    {
      if (!block) {
        return false;
      }

      return block.type === this.type;
    }
  };

  /**
   * To check if the current selection is in blockquote.
   */
  isSelectionIn = (editor: Editor): boolean => !!this.getCurrent(editor);

  /**
   * If the current block is blockquote or wrapped by blockquote, return the blockquote, or null.
   */
  getCurrent = (editor: Editor): Block | null => {
    const block = editor.value.startBlock as Block | null;

    if (!block) {
      return null;
    } else if (this.isBlockAs(block)) {
      return block;
    }

    const parent = editor.value.document.getParent(block.key) as Block | null;
    return this.isBlockAs(parent) ? parent : null;
  };

  /**
   * To wrap the current block with blockquote block.
   */
  wrap = (editor: Editor): Editor => editor.wrapBlock(this.type);

  /**
   * To unwrap the current blockquote block if it is.
   */
  unwrap = (editor: Editor): Editor => editor.unwrapBlock(this.type);

  /**
   * To toggle the blockquote block.
   */
  toggle = (editor: Editor): Editor => (this.isSelectionIn(editor) ? this.unwrap(editor) : this.wrap(editor));
}
