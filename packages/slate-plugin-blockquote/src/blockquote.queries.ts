import { Editor, Plugin, Block } from 'slate';
import { BLOCKQUOTE_QUERY_CURRENT_BLOCK, BLOCKQUOTE_QUERY_HAS } from './blockquote.constants';

/**
 * If the current block is blockquote or wrapped by blockquote, return the blockquote, or null.
 */
export type BlockquoteQueryCurrentBlock = (editor: Editor) => Block | null;

/**
 * To query if the current block is blockquote.
 */
export type BlockquoteQueryHas = (editor: Editor) => boolean;

export type BlockquoteQueries = Plugin['queries'] & {
  [BLOCKQUOTE_QUERY_CURRENT_BLOCK]: BlockquoteQueryCurrentBlock;
  [BLOCKQUOTE_QUERY_HAS]: BlockquoteQueryHas;
};

export function BlockquoteQueries(type: string): BlockquoteQueries {
  const queryCurrentBlock: BlockquoteQueryCurrentBlock = editor => {
    const currentBlock = editor.value.startBlock as Block | null;

    if (!currentBlock) {
      return null;
    } else if (currentBlock.type === type) {
      return currentBlock;
    }

    const parent = editor.value.document.getParent(currentBlock.key) as Block | null;
    return parent?.type === type ? parent : null;
  };
  const queryHas: BlockquoteQueryHas = editor => !!queryCurrentBlock(editor);

  return {
    [BLOCKQUOTE_QUERY_CURRENT_BLOCK]: queryCurrentBlock,
    [BLOCKQUOTE_QUERY_HAS]: queryHas
  };
}
