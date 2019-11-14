import { Node, Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-core';
import { LIST_TYPES } from './list.constants';

export function isList(types: LIST_TYPES, node?: Node | null): node is Block {
  if (!isNodeExcludeText(node)) {
    return false;
  }

  return [types.unordered, types.ordered].includes(node.type);
}

export function isListItem(types: LIST_TYPES, node?: Node | null): node is Block {
  if (!isNodeExcludeText(node)) {
    return false;
  }

  return types.item === node.type;
}

/**
 * @returns Return the last node if the last node in the node from parameter is list, or null.
 */
export function getLastListInNode(types: LIST_TYPES, node?: Node | null): Block | null {
  if (!isNodeExcludeText(node)) {
    return null;
  }

  const lastList = node.nodes.last() as Block | undefined;
  return isList(types, lastList) ? lastList : null;
}
