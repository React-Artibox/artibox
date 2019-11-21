import { Editor, Block } from 'slate';
import { InputBlockData } from './input-block.types';

export interface InputBlockController {
  isSelectionInInputBlock(editor: Editor): boolean;
  getCurrentInputBlock(editor: Editor): Block | null;
  startInputBlock(editor: Editor, data: InputBlockData): Editor;
  cancelInputBlock(editor: Editor): Editor;
  confirmInputBlock(editor: Editor): Editor;
}
