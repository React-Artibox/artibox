import { Editor } from 'slate';

export function expectEditorEqualOutput(editor: Editor, output: JSX.Element) {
  const { children, selection } = (output as any) as Editor;

  expect(editor.children).toEqual(children);
  expect(editor.selection).toEqual(selection);
}
