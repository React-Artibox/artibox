import { Editor, Element, NodeEntry, Text, Transforms } from 'slate';

export function normalizeVoidElementChildren(editor: Editor, entry: NodeEntry<Element>): boolean {
  const [element, path] = entry;

  /**
   * Only accept single empty text inside void element.
   */
  if (!(element.children.length === 1 && Text.isText(element.children[0]) && element.children[0].text === '')) {
    Editor.withoutNormalizing(editor, () => {
      Transforms.removeNodes(editor, { at: path });
      Transforms.insertNodes(editor, { ...element, children: [{ text: '' }] }, { at: path });
    });
    return true;
  }

  return false;
}
