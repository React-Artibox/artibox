import { Editor, Range } from 'slate';

export function deleteSelectionFragmentIfExpanded(editor: Editor) {
  if (editor.selection && Range.isExpanded(editor.selection)) {
    Editor.deleteFragment(editor);
  }
}
