import { Editor, Node, Block } from 'slate';
import { LIST_ORDERED_TYPES } from './list.constants';

export interface ListController {
  isList(node?: Node | null): node is Block;

  isListItem(node?: Node | null): node is Block;

  /**
   * To check if current selection is in list.
   */
  isSelectionInList(editor: Editor): boolean;

  /**
   * @returns Return the last node if the last node in the node from parameter is list, or null.
   */
  getLastListInNode(node?: Node | null): Block | null;

  /**
   * To get the item wrapping the node from parameter.
   */
  getItemFromNode(editor: Editor, node?: Node | null): Block | null;

  /**
   * To get the list wrapping the node from parameter.
   */
  getListFromNode(editor: Editor, node?: Node | null): Block | null;

  /**
   * To get the previous sibling item.
   */
  getPreviousItem(editor: Editor, item: Block): Block | null;

  /**
   * To get the item wrapping the start block of current selection.
   */
  getCurrentItem(editor: Editor): Block | null;

  /**
   * To get the list wrapping the start block of current selection.
   */
  getCurrentList(editor: Editor): Block | null;

  /**
   * To wrap the root blocks in current selection with list.
   */
  wrapListBlock(editor: Editor, orderedType: LIST_ORDERED_TYPES): Editor;

  /**
   * To unwrap the root blocks in current selection from list.
   */
  unwrapListBlock(editor: Editor): Editor;

  /**
   * To toggle the root blocks in current selection between being list.
   */
  toggleListBlock(editor: Editor, orderedType: LIST_ORDERED_TYPES): Editor;

  /**
   * To increase the depth of the first item in current selection if increasable.
   */
  increateItemDepth(editor: Editor): Editor;

  /**
   * To decrease the depth of the first item in current selection if decreasable.
   */
  decreateItemDepth(editor: Editor): Editor;

  /**
   * If not decreasable, unwrap the list, or decrease the depth of item.
   */
  decreateItemDepthOrUnwrapIfNeed(editor: Editor): Editor;
}
