import { Editor, Plugin, Block, Node } from 'slate';
import {
  LIST_TYPES,
  LIST_QUERY_LIST,
  LIST_QUERY_ITEM,
  LIST_QUERY_PREVIOUS_ITEM,
  LIST_QUERY_CURRENT_LIST,
  LIST_QUERY_CURRENT_ITEM,
  LIST_QUERY_IS_SELECTION_IN_LIST
} from './list.constants';
import { isList, isListItem } from './list.utils';

/**
 * To query the item wrapping the node from parameter.
 */
export type ListQueryItem = (editor: Editor, node?: Node | null) => Block | null;

/**
 * To query the list wrapping the node from parameter.
 */
export type ListQueryList = (editor: Editor, node?: Node | null) => Block | null;

/**
 * To query the previous sibling item.
 */
export type ListQueryPreviousItem = (editor: Editor, item: Block) => Block | null;

/**
 * To query the item wrapping the start block of current selection.
 */
export type ListQueryCurrentItem = (editor: Editor) => Block | null;

/**
 * To query the list wrapping the start block of current selection.
 */
export type ListQueryCurrentList = (editor: Editor) => Block | null;

/**
 * To query if current selection is in list.
 */
export type ListQueryIsSelectionInList = (editor: Editor) => boolean;

export type ListQueries = Plugin['queries'] & {
  [LIST_QUERY_ITEM]: ListQueryItem;
  [LIST_QUERY_LIST]: ListQueryList;
  [LIST_QUERY_PREVIOUS_ITEM]: ListQueryPreviousItem;
  [LIST_QUERY_CURRENT_ITEM]: ListQueryCurrentItem;
  [LIST_QUERY_CURRENT_LIST]: ListQueryList;
  [LIST_QUERY_IS_SELECTION_IN_LIST]: ListQueryIsSelectionInList;
};

export function ListQueries(types: LIST_TYPES): ListQueries {
  const queryItem: ListQueryItem = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, n => isListItem(types, n)) as Block | null;
  };
  const queryList: ListQueryList = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, n => isList(types, n)) as Block | null;
  };
  const queryPreviousItem: ListQueryPreviousItem = (editor, item) => {
    if (!isListItem(types, item)) {
      return null;
    }

    const previousItem = editor.value.document.getPreviousSibling(item.key);
    return isListItem(types, previousItem) ? previousItem : null;
  };
  const queryCurrentItem: ListQueryCurrentItem = editor => queryItem(editor, editor.value.startBlock);
  const queryCurrentList: ListQueryCurrentList = editor => queryList(editor, queryCurrentItem(editor));
  const queryIsSelectionInList: ListQueryIsSelectionInList = editor => !!queryCurrentItem(editor);

  return {
    [LIST_QUERY_ITEM]: queryItem,
    [LIST_QUERY_LIST]: queryList,
    [LIST_QUERY_PREVIOUS_ITEM]: queryPreviousItem,
    [LIST_QUERY_CURRENT_ITEM]: queryCurrentItem,
    [LIST_QUERY_CURRENT_LIST]: queryCurrentList,
    [LIST_QUERY_IS_SELECTION_IN_LIST]: queryIsSelectionInList
  };
}
