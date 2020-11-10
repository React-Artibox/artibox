import { Node } from 'slate';
import { isText } from './isText';

export function getMergedNodeTexts(node: Node): string {
  if (isText(node)) {
    return node.text;
  }

  return node.children.map(child => getMergedNodeTexts(child)).join();
}
