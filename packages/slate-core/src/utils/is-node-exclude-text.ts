import { Node, Document, Block, Inline } from 'slate';

/**
 * Check if a node is either `Document` or `Block` or `Inline`.
 */
export function isNodeExcludeText(node?: Node | null): node is Document | Block | Inline {
  if (!node) {
    return false;
  }

  return 'nodes' in node;
}
