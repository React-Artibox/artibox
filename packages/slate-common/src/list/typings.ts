import { Editor, Element, Location, Node, NodeEntry } from 'slate';
import { Withable } from '../typings/with';
import { ListRootTypeKey, ListTypes } from './common';

export interface ListAboveListAndItem {
  list: NodeEntry<Element>;
  listItem: NodeEntry<Element>;
}

export interface ListGetAboveListEntriesOptions {
  at?: Location;
}

export interface List extends Withable {
  /**
   * An object which keys are `ul`, `ol`, `li` and values are the corresponding element types.
   */
  types: ListTypes;
  isListElement(node: Node): node is Element;
  isListItemElement(node: Node): node is Element;
  isSelectionInList(editor: Editor, listTypeKey: ListRootTypeKey): boolean;
  /**
   * If expanded, get the list wrapping the location.
   */
  getAboveListAndItem(editor: Editor, options?: ListGetAboveListEntriesOptions): ListAboveListAndItem | undefined;
  unwrapList(editor: Editor): void;
  toggleList(editor: Editor, listTypeKey: ListRootTypeKey, defaultType?: string): void;
  /**
   * Increase the depth of the first item in the location if increasable.
   */
  increaseListItemDepth(editor: Editor, entries: ListAboveListAndItem): void;
  /**
   * Decrease the depth of the first item in the location if decreasable.
   */
  decreaseListItemDepth(editor: Editor, entries: ListAboveListAndItem): void;
  /**
   * Unwrap the list if at root, or decrease the depth of list item.
   */
  decreaseListItemDepthOrUnwrapIfNeed(editor: Editor, entries: ListAboveListAndItem): void;
}
