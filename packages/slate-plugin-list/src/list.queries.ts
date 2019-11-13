import { Editor, Plugin, Block, Node } from 'slate';
import { LIST_TYPES, LIST_QUERY_LIST, LIST_QUERY_LIST_ITEM, LIST_QUERY_IN_LIST } from './list.constants';
import { isList, isListItem } from './list.utils';

export type ListQueryList = (editor: Editor, node?: Node | null) => Block | null;
export type ListQueryListItem = (editor: Editor, node?: Node | null) => Block | null;
export type ListQueryInList = (editor: Editor) => boolean;

export type ListQueries = Plugin['queries'] & {
  [LIST_QUERY_LIST]: ListQueryList;
  [LIST_QUERY_LIST_ITEM]: ListQueryListItem;
  [LIST_QUERY_IN_LIST]: ListQueryInList;
};

export function ListQueries(types: LIST_TYPES): ListQueries {
  const queryList = (editor: Editor, node?: Node | null) => {
    if (!node) {
      return null;
    }

    const list = editor.value.document.getParent(node.key);
    return isList(types, list) ? list : null;
  };
  const queryListItem: ListQueryListItem = (editor, node) => {
    if (!node) {
      return null;
    }

    const item = editor.value.document.getParent(node.key);
    return isListItem(types, item) ? item : null;
  };
  const queryInList: ListQueryInList = editor => {
    const listItem = queryListItem(editor, editor.value.startBlock);
    return !!listItem;
  };

  return {
    [LIST_QUERY_LIST]: queryList,
    [LIST_QUERY_LIST_ITEM]: queryListItem,
    [LIST_QUERY_IN_LIST]: queryInList
  };
}
