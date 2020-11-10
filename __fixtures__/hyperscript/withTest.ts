import { Editor } from 'slate';

export function withTest(input?: JSX.Element) {
  return <T extends Editor>(editor: T): T => {
    const { isInline, isVoid } = editor;

    editor.isInline = element => element.inline === true || isInline(element);
    editor.isVoid = element => element.void === true || isVoid(element);

    if (input) {
      const { children, selection } = (input as any) as Editor;
      editor.children = children;
      editor.selection = selection;
    }

    return editor;
  };
}
