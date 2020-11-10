import { Node, NodeEntry } from 'slate';

export interface IsNodeMatchOptions {
  filter?: (entry: NodeEntry<Node>) => boolean;
  /**
   * List of types that are valid.
   * If empty or undefined - allow all.
   */
  includeTypes?: string[];
  /**
   * List of types that are invalid.
   */
  excludeTypes?: string[];
}

export function isNodeMatch(
  entry: NodeEntry<Node>,
  { filter, includeTypes = [], excludeTypes = [] }: IsNodeMatchOptions = {}
): boolean {
  const [node] = entry;

  return (
    (!filter || filter(entry)) &&
    (!includeTypes.length || includeTypes.includes(node.type as string)) &&
    !(excludeTypes.length && excludeTypes.includes(node.type as string))
  );
}
