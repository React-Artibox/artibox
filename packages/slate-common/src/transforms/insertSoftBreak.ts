import { Editor } from 'slate';

export function insertSoftBreak(editor: Editor) {
  editor.insertText('\n');
}
