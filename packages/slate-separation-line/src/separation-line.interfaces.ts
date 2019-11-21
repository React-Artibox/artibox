import { Editor } from 'slate';

export interface SeparationLineController {
  addSeparationLine(editor: Editor): Editor;
}
