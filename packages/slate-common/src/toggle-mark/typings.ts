import { Editor } from 'slate';
import { WithMarkType } from '../typings/leaf';

export interface ToggleMark extends WithMarkType {
  isToggleMarkActive(editor: Editor): boolean;
  toggleMark(editor: Editor): void;
}
