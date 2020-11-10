import { Editor } from 'slate';

export interface ToggleMark {
  type: string;
  isToggleMarkActive(editor: Editor): boolean;
  toggleMark(editor: Editor): void;
}
