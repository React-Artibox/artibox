import { Editor } from 'slate';

export interface SeparationLineController {
  addSeparationLineBlock(editor: Editor): Editor;
}
