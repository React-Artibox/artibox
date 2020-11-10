import { Editor, Element, Transforms } from 'slate';
import { TransformsWrapNodesOptions } from '../typings/transforms';
import { unhangRange } from './unhangRange';

/**
 * Since currently `Transforms.wrapNodes` not support `hanging` option.
 */
export function wrapNodesWithUnhangRange(editor: Editor, element: Element, options: TransformsWrapNodesOptions = {}) {
  unhangRange(editor, options);
  Transforms.wrapNodes(editor, element, options);
}
