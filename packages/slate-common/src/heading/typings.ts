import { Editor, Node, NodeEntry } from 'slate';
import { Withable } from '../typings/with';
import { GetNodesOptions } from '../queries/getNodes';
import { HeadingLevel } from './common';

export interface Heading<L extends HeadingLevel> extends Withable {
  type: string;
  enabledLevels: ReadonlyArray<L>;
  getHeadingNodes(editor: Editor, level: L, options?: GetNodesOptions): Iterable<NodeEntry<Node>>;
  isSelectionInHeading(editor: Editor, level: L, options?: GetNodesOptions): boolean;
  toggleHeadingNodes(editor: Editor, level: L, defaultType?: string): void;
}
