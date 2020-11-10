import { Editor } from 'slate';

/**
 * Get the selected text.
 * Return empty string if no selection.
 */
export function getSelectionText(editor: Editor): string {
  const { selection } = editor;
  return selection ? Editor.string(editor, selection) : '';
}
