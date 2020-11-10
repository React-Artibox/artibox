import { Editor } from 'slate';
import { getNodes, GetNodesOptions } from './getNodes';

export type GetNodesByTypesOptions = GetNodesOptions;

export function getNodesByTypes(editor: Editor, types: string[], options: GetNodesByTypesOptions = {}) {
  const { match } = options;
  return getNodes(editor, {
    ...options,
    match: node => types.includes(node.type as string) && (!match || match(node))
  });
}
