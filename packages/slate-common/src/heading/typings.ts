import { Editor, Node, NodeEntry } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';
import { GetNodesOptions } from '../queries/getNodes';
import { HeadingLevel } from './common';

export interface WithEnabledHeadingLevels<L extends HeadingLevel> {
  /**
   * Only consider heading element which level in enabled levels as valid heading element.
   */
  enabledLevels: ReadonlyArray<L>;
}

export interface Heading<L extends HeadingLevel> extends WithElementType, Withable, WithEnabledHeadingLevels<L> {
  getHeadingNodes(editor: Editor, level: L, options?: GetNodesOptions): Generator<NodeEntry<Node>>;
  isSelectionInHeading(editor: Editor, level: L, options?: GetNodesOptions): boolean;
  toggleHeadingNodes(editor: Editor, level: L, defaultType?: string): void;
}
