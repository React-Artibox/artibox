import { Editor, Node, Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-common/utils/is-node-exclude-text';
import { ListOrderedTypeKey, ListTypes } from './typings';

export interface ListController {
  /**
   * Check if the node is list.
   */
  isNodeAsList(node?: Node | null): node is Block;
  /**
   * Check if the node is list item.
   */
  isNodeAsItem(node?: Node | null): node is Block;
  /**
   * Check if current selection is in list.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Get the last node if the last node in the node from parameter is list, or get null.
   */
  getLastListInNode(node?: Node | null): Block | null;
  /**
   * Get the item wrapping the node from parameter.
   */
  getItemFromNode(editor: Editor, node?: Node | null): Block | null;
  /**
   * Get the list wrapping the node from parameter.
   */
  getListFromNode(editor: Editor, node?: Node | null): Block | null;
  /**
   * Get the previous sibling item.
   */
  getPreviousItem(editor: Editor, item: Block): Block | null;
  /**
   * Get the item wrapping the start block of current selection.
   */
  getCurrentItem(editor: Editor): Block | null;
  /**
   * Get the list wrapping the start block of current selection.
   */
  getCurrentList(editor: Editor): Block | null;
  /**
   * Wrap the root blocks in current selection with list.
   */
  wrap(editor: Editor, orderedType: ListOrderedTypeKey): Editor;
  /**
   * Unwrap the root blocks in current selection from list.
   */
  unwrap(editor: Editor): Editor;
  /**
   * Toggle the root blocks in current selection between being list.
   */
  toggle(editor: Editor, orderedType: ListOrderedTypeKey): Editor;
  /**
   * Increase the depth of the first item in current selection if increasable.
   */
  increaseItemDepth(editor: Editor): Editor;
  /**
   * Decrease the depth of the first item in current selection if decreasable.
   */
  decreaseItemDepth(editor: Editor): Editor;
  /**
   * If not decreasable, unwrap the list, or decrease the depth of item.
   */
  decreaseItemDepthOrUnwrapIfNeed(editor: Editor): Editor;
}

export interface CreateListControllerConfig {
  types: ListTypes;
}

export function createListController(config: CreateListControllerConfig): ListController {
  const { types } = config;
  const isNodeAsList: ListController['isNodeAsList'] = (node): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return [types.unordered, types.ordered].includes(node.type);
  };
  const isNodeAsItem: ListController['isNodeAsItem'] = (node): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return types.item === node.type;
  };
  const getLastListInNode: ListController['getLastListInNode'] = node => {
    if (!isNodeExcludeText(node)) {
      return null;
    }

    const lastList = node.nodes.last() as Block | undefined;
    return isNodeAsList(lastList) ? lastList : null;
  };
  const getItemFromNode: ListController['getItemFromNode'] = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, isNodeAsItem) as Block | null;
  };
  const getListFromNode: ListController['getListFromNode'] = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, isNodeAsList) as Block | null;
  };
  const getPreviousItem: ListController['getPreviousItem'] = (editor, item) => {
    if (!isNodeAsItem(item)) {
      return null;
    }

    const previousItem = editor.value.document.getPreviousSibling(item.key);
    return isNodeAsItem(previousItem) ? previousItem : null;
  };
  const getCurrentItem: ListController['getCurrentItem'] = editor => getItemFromNode(editor, editor.value.startBlock);
  const getCurrentList: ListController['getCurrentList'] = editor => getListFromNode(editor, getCurrentItem(editor));
  const isSelectionIn: ListController['isSelectionIn'] = editor => !!getCurrentItem(editor);
  const wrap: ListController['wrap'] = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const type = types[orderedType];
      const rootSelectedBlocks = editor.value.blocks;

      editor.wrapBlock(type);

      rootSelectedBlocks.forEach(block => {
        if (isNodeAsList(block)) {
          block.nodes.forEach(node => {
            editor.unwrapNodeByKey(node!.key);
          });
        } else {
          editor.wrapBlockByKey(block!.key, types.item);
        }
      });
    });
  const unwrap: ListController['unwrap'] = editor =>
    editor.withoutNormalizing(() => {
      editor.value.blocks
        .map(block => editor.value.document.getClosest(block!.key, isNodeAsItem))
        .filter(Boolean)
        .forEach(closestItem => {
          const item = closestItem as Block;

          editor.unwrapNodeByKey(item.key);

          /**
           * After unwraped, parent may be document or list.
           */
          const parent = editor.value.document.getParent(item.key);

          if (!isNodeExcludeText(parent)) {
            return;
          }

          const itemIndex = parent.nodes.findIndex(node => node!.key === item.key);

          /**
           * Move all blocks in item to parent and remove the item.
           */
          item.nodes.forEach((itemChild, index) => {
            editor.moveNodeByKey(itemChild!.key, parent.key, index! + itemIndex);
          });
          editor.removeNodeByKey(item.key);
        });
    });
  const toggle: ListController['toggle'] = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const item = getCurrentItem(editor);

      if (!item) {
        return wrap(editor, orderedType);
      }

      const list = getListFromNode(editor, item);

      if (!list) {
        return editor;
      }

      const type = types[orderedType];

      if (list.type === type) {
        unwrap(editor);
      } else {
        editor.setNodeByKey(list.key, type);
      }
    });
  const increaseItemDepth: ListController['increaseItemDepth'] = editor => {
    const item = getCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const previousItem = getPreviousItem(editor, item);

    if (!previousItem) {
      return editor;
    }

    const lastListInPreviousItem = getLastListInNode(previousItem);

    /**
     * If there is a list in the previous item, move item to the list.
     */
    if (lastListInPreviousItem) {
      return editor.moveNodeByKey(item.key, lastListInPreviousItem.key, lastListInPreviousItem.nodes.size);
    }

    const list = getListFromNode(editor, item);

    if (!list) {
      return editor;
    }

    /**
     * Or create a new list in previous item and move item to the new list.
     */
    return editor.withoutNormalizing(() => {
      const newList = Block.fromJSON({ type: list.type });

      editor
        .insertNodeByKey(previousItem.key, previousItem.nodes.size, newList)
        .moveNodeByKey(item.key, newList.key, 0);
    });
  };
  const decreaseItemDepth: ListController['decreaseItemDepth'] = editor => {
    const item = getCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const list = getListFromNode(editor, item);

    if (!list) {
      return editor;
    }

    const parentItem = getItemFromNode(editor, list);

    if (!parentItem) {
      return editor;
    }

    const parentList = getListFromNode(editor, parentItem);

    if (!parentList) {
      return editor;
    }

    return editor.withoutNormalizing(() => {
      const insertIndex = parentList.nodes.indexOf(parentItem) + 1;
      const nextItems = list.nodes.skipUntil(eachItem => eachItem === item).rest();
      const nextItemsIsEmpty = nextItems.isEmpty();
      const prevItemsIsEmpty = list.nodes.size - nextItems.size - 1 <= 0;

      editor.moveNodeByKey(item.key, parentList.key, insertIndex);

      /**
       * After item moved to parent list.
       *
       * If there are some sibling items next to item, move them to a new list in item.
       */
      if (!nextItemsIsEmpty) {
        const newList = Block.create({ type: list.type });

        editor.insertNodeByKey(item.key, item.nodes.size, newList);

        nextItems.forEach((nextItem, index) => {
          editor.moveNodeByKey(nextItem!.key, newList.key, newList.nodes.size + index!);
        });
      }

      /**
       * If there is no any sibling item previous to item, remove the origin list.
       */
      if (prevItemsIsEmpty) {
        editor.removeNodeByKey(list.key);
      }
    });
  };
  const decreaseItemDepthOrUnwrapIfNeed: ListController['decreaseItemDepthOrUnwrapIfNeed'] = editor => {
    /**
     * Be decreasable if parent item exist.
     */
    const parentItem = getItemFromNode(editor, getListFromNode(editor, getCurrentItem(editor)));
    return parentItem ? decreaseItemDepth(editor) : unwrap(editor);
  };

  return {
    isNodeAsList,
    isNodeAsItem,
    isSelectionIn,
    getLastListInNode,
    getItemFromNode,
    getListFromNode,
    getPreviousItem,
    getCurrentList,
    getCurrentItem,
    wrap,
    unwrap,
    toggle,
    increaseItemDepth,
    decreaseItemDepth,
    decreaseItemDepthOrUnwrapIfNeed
  };
}
