import { Editor } from 'slate';

export interface ToggleMarkController {
  isToggleMarkActive(editor: Editor): boolean;
  addToggleMark(editor: Editor): Editor;
  removeToggleMark(editor: Editor): Editor;
  toggleToggleMark(editor: Editor): Editor;
}
