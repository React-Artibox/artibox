import { Editor } from 'slate';

export function getMark<T>(editor: Editor, type: string): T | undefined {
  const marks = Editor.marks(editor);
  return marks?.[type];
}
