import { Ancestor, Editor, Location, NodeEntry } from 'slate';
import { EditorParentOptions } from '../typings/editor';

/**
 * Returns `undefined` if there is no parent instead of throwing error.
 */
export function getParent(
  editor: Editor,
  at: Location,
  options?: EditorParentOptions
): NodeEntry<Ancestor> | undefined {
  try {
    return Editor.parent(editor, at, options);
    // eslint-disable-next-line no-empty
  } catch (err) {}
}
