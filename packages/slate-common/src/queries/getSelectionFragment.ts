import { Descendant, Editor } from 'slate';

export function getSelectionFragment(editor: Editor): ReadonlyArray<Descendant> | null {
  const { selection } = editor;
  return selection ? Editor.fragment(editor, selection) : null;
}
