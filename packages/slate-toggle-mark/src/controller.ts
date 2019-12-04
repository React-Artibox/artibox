import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';

export interface ToggleMarkController {
  /**
   * Check if there are some marks matching the specific type in the current selection.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Add mark of the specific type on the current seleciton.
   */
  add(editor: Editor): Editor;
  /**
   * Remove marks matching the specific type in the current selection.
   */
  remove(editor: Editor): Editor;
  /**
   * Toggle marks matching the specific type in the current selection.
   */
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
