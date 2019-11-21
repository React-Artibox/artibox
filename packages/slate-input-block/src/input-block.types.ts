import { Editor } from 'slate';
import { INPUT_BLOCK_DATA_KEY_ON_CONFIRM } from './input-block.constants';

export interface InputBlockData {
  [INPUT_BLOCK_DATA_KEY_ON_CONFIRM]: (editor: Editor, value: string) => Editor;
}
