import { Editor, Transforms } from 'slate';
import { TransformsWrapNodesOptions } from '../typings/transforms';

export type UnwrapNodeByTypesOptions = TransformsWrapNodesOptions;

export function unwrapNodesByTypes(editor: Editor, types: string[], options: UnwrapNodeByTypesOptions = {}) {
  const { match } = options;
  Transforms.unwrapNodes(editor, {
    ...options,
    match: node => types.includes(node.type as string) && (!match || match(node))
  });
}
