import { Editor } from 'slate';
import { HasNodeType } from '@artibox/slate-common';

export abstract class ToggleMarkController implements HasNodeType {
  constructor(public readonly type: string) {}

  isSelectionIn = (editor: Editor): boolean => editor.value.activeMarks.some(mark => mark?.type === this.type);

  add = (editor: Editor): Editor => editor.addMark(this.type);

  remove = (editor: Editor): Editor => editor.removeMark(this.type);

  toggle = (editor: Editor): Editor => editor.toggleMark(this.type);
}
