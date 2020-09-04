import { Editor } from 'slate';

export function insertSoftBreak(editor: Pick<Editor, 'insertText'>) {
  return editor.insertText('\n');
}
