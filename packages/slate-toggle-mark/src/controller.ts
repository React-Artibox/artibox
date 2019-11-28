import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';

export interface ToggleMarkController {
  isSelectionIn(editor: Editor): boolean;
  add(editor: Editor): Editor;
  remove(editor: Editor): Editor;
  toggle(editor: Editor): Editor;
}

export type CreateToggleMarkContrllerConfig = NodeType;

export function createToggleMarkController(config: CreateToggleMarkContrllerConfig): ToggleMarkController {
  const { type } = config;

  return {
    isSelectionIn: editor => editor.value.activeMarks.some(mark => mark?.type === type),
    add: editor => editor.addMark(type),
    remove: editor => editor.removeMark(type),
    toggle: editor => editor.toggleMark(type)
  };
}
