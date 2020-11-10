import { Ancestor, Node } from 'slate';

export function isAncestorEmpty(node: Ancestor) {
  return node.children.length === 1 && [...Node.texts(node)].length === 1 && Node.string(node) === '';
}
