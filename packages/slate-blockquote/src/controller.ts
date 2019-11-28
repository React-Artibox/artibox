import { Editor, Block } from 'slate';
import { NodeType } from '@artibox/slate-common';

export interface BlockquoteController {
  /**
   * To check if the block is blockquote.
   */
  isBlockAs(block?: Block | null): boolean;
  /**
   * To check if the current selection is in blockquote.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * If the current block is blockquote or wrapped by blockquote, return the blockquote, or null.
   */
  getCurrent(editor: Editor): Block | null;
  /**
   * To wrap the current block with blockquote block.
   */
  wrap(editor: Editor): Editor;
  /**
   * To unwrap the current blockquote block if it is.
   */
  unwrap(editor: Editor): Editor;
  /**
   * To toggle the blockquote block.
   */
  toggle(editor: Editor): Editor;
}

export type CreateBlockquoteControllerConfig = NodeType;

export function createBlockquoteController(config: CreateBlockquoteControllerConfig): BlockquoteController {
  const { type } = config;
  const isBlockAs: BlockquoteController['isBlockAs'] = block => {
    {
      if (!block) {
        return false;
      }

      return block.type === type;
    }
  };
  const getCurrent: BlockquoteController['getCurrent'] = editor => {
    const block = editor.value.startBlock as Block | null;

    if (!block) {
      return null;
    } else if (isBlockAs(block)) {
      return block;
    }

    const parent = editor.value.document.getParent(block.key) as Block | null;
    return isBlockAs(parent) ? parent : null;
  };
  const isSelectionIn: BlockquoteController['isSelectionIn'] = editor => !!getCurrent(editor);
  const wrap: BlockquoteController['wrap'] = editor => editor.wrapBlock(type);
  const unwrap: BlockquoteController['unwrap'] = editor => editor.unwrapBlock(type);
  const toggle: BlockquoteController['toggle'] = editor => (isSelectionIn(editor) ? unwrap(editor) : wrap(editor));

  return {
    isBlockAs,
    isSelectionIn,
    getCurrent,
    wrap,
    unwrap,
    toggle
  };
}
