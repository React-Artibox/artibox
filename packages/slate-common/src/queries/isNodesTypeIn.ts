import { Editor } from 'slate';
import { getNodesByTypes, GetNodesByTypesOptions } from './getNodesByTypes';

export type IsNodesTypeInOptions = GetNodesByTypesOptions;

export function isNodesTypeIn(editor: Editor, types: string[], options: IsNodesTypeInOptions = {}) {
  const [match] = getNodesByTypes(editor, types, options);
  return !!match;
}
