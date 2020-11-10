import { Editor, NodeEntry, Transforms } from 'slate';
import { isPathAtRoot } from '../queries/isPathAtRoot';

export function normalizeOnlyAtRoot(editor: Editor, entry: NodeEntry): boolean {
  const [, path] = entry;

  if (!isPathAtRoot(path)) {
    Transforms.removeNodes(editor, { at: path });
    return true;
  }

  return false;
}
