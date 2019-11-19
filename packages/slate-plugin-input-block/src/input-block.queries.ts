import { Editor, Plugin, Block } from 'slate';
import {
  INPUT_BLOCK_QUERY_CURRENT_BLOCK,
  INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK
} from './input-block.constants';

export type InputBlockQuerieCurrentBlock = (editor: Editor) => Block | null;
export type InputBlockQueryIsSelectionInInputBlock = (editor: Editor) => boolean;

export type InputBlockQueries = Plugin['queries'] & {
  [INPUT_BLOCK_QUERY_CURRENT_BLOCK]: InputBlockQuerieCurrentBlock;
  [INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK]: InputBlockQueryIsSelectionInInputBlock;
};

export function InputBlockQueries(type: string): InputBlockQueries {
  const queryCurrentBlock: InputBlockQuerieCurrentBlock = editor => {
    const block = editor.value.startBlock;
    return block.type !== type ? null : block;
  };
  const queryIsSelectionInInputBlock: InputBlockQueryIsSelectionInInputBlock = editor => !!queryCurrentBlock(editor);

  return {
    [INPUT_BLOCK_QUERY_CURRENT_BLOCK]: queryCurrentBlock,
    [INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK]: queryIsSelectionInInputBlock
  };
}
