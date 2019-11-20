import { Editor, Block } from 'slate';

export interface BlockquoteUtils {
  isBlockAsBlockquote: (block?: Block | null) => boolean;
  getCurrentBlockquote(editor: Editor): Block | null;
  isSelectionInBlockquote(editor: Editor): boolean;
  wrapBlockquote(editor: Editor): Editor;
  unwrapBlockquote(editor: Editor): Editor;
  toggleBlockquote(editor: Editor): Editor;
}

export function BlockquoteUtils(type: string): BlockquoteUtils {
  /**
   * To check if the block is blockquote.
   */
  const isBlockAsBlockquote: BlockquoteUtils['isBlockAsBlockquote'] = block => {
    if (!block) {
      return false;
    }

    return block.type === type;
  };

  /**
   * If the current block is blockquote or wrapped by blockquote, return the blockquote, or null.
   */
  const getCurrentBlockquote: BlockquoteUtils['getCurrentBlockquote'] = editor => {
    const block = editor.value.startBlock as Block | null;

    if (!block) {
      return null;
    } else if (isBlockAsBlockquote(block)) {
      return block;
    }

    const parent = editor.value.document.getParent(block.key) as Block | null;
    return isBlockAsBlockquote(parent) ? parent : null;
  };

  /**
   * To check if the current selection is in blockquote.
   */
  const isSelectionInBlockquote: BlockquoteUtils['isSelectionInBlockquote'] = editor => !!getCurrentBlockquote(editor);

  /**
   * To wrap the current block with blockquote block.
   */
  const wrapBlockquote: BlockquoteUtils['wrapBlockquote'] = editor => editor.wrapBlock(type);

  /**
   * To unwrap the current blockquote block if it is.
   */
  const unwrapBlockquote: BlockquoteUtils['unwrapBlockquote'] = editor => editor.unwrapBlock(type);

  /**
   * To toggle the blockquote block.
   */
  const toggleBlockquote: BlockquoteUtils['toggleBlockquote'] = editor =>
    isSelectionInBlockquote(editor) ? unwrapBlockquote(editor) : wrapBlockquote(editor);

  return {
    isBlockAsBlockquote,
    getCurrentBlockquote,
    isSelectionInBlockquote,
    wrapBlockquote,
    unwrapBlockquote,
    toggleBlockquote
  };
}
