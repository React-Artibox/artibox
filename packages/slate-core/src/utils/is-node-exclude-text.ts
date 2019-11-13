import { Node, Document, Block, Inline } from 'slate';

export function isNodeExcludeText(node?: Node | null): node is Document | Block | Inline {
  if (!node) {
    return false;
  }

  return 'nodes' in node;
}
