import { Node, Text } from 'slate';

export function isText(node: Node): node is Text {
  return 'text' in node && typeof node.text === 'string';
}
