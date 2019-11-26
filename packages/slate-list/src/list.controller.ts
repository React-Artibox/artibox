import { Editor, Node, Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-common/utils/is-node-exclude-text';
import { LIST_TYPES, LIST_ORDERED_TYPES } from './list.constants';

export abstract class ListController {
  constructor(public readonly types: LIST_TYPES) {}

  isNodeAsList = (node?: Node | null): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return [this.types.unordered, this.types.ordered].includes(node.type);
  };

  isNodeAsItem = (node?: Node | null): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return this.types.item === node.type;
  };

  /**
   * To check if current selection is in list.
   */
  isSelectionIn = (editor: Editor): boolean => !!this.getCurrentItem(editor);

  /**
   * @returns Return the last node if the last node in the node from parameter is list, or null.
   */
  getLastListInNode = (node?: Node | null): Block | null => {
    if (!isNodeExcludeText(node)) {
      return null;
    }

    const lastList = node.nodes.last() as Block | undefined;
    return this.isNodeAsList(lastList) ? lastList : null;
  };

  /**
   * To get the item wrapping the node from parameter.
   */
  getItemFromNode = (editor: Editor, node?: Node | null): Block | null => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, this.isNodeAsItem) as Block | null;
  };

  /**
   * To get the list wrapping the node from parameter.
   */
  getListFromNode = (editor: Editor, node?: Node | null): Block | null => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, this.isNodeAsList) as Block | null;
  };

  /**
   * To get the previous sibling item.
   */
  getPreviousItem = (editor: Editor, item: Block): Block | null => {
    if (!this.isNodeAsItem(item)) {
      return null;
    }

    const previousItem = editor.value.document.getPreviousSibling(item.key);
    return this.isNodeAsItem(previousItem) ? previousItem : null;
  };

  /**
   * To get the item wrapping the start block of current selection.
   */
  getCurrentItem = (editor: Editor): Block | null => this.getItemFromNode(editor, editor.value.startBlock);

  /**
   * To get the list wrapping the start block of current selection.
   */
  getCurrentList = (editor: Editor): Block | null => this.getListFromNode(editor, this.getCurrentItem(editor));

  /**
   * To wrap the root blocks in current selection with list.
   */
  wrap = (editor: Editor, orderedType: LIST_ORDERED_TYPES): Editor =>
    editor.withoutNormalizing(() => {
      const type = this.types[orderedType];
      const rootSelectedBlocks = editor.value.blocks;

      editor.wrapBlock(type);

      rootSelectedBlocks.forEach(block => {
        if (this.isNodeAsList(block)) {
          block.nodes.forEach(node => {
            editor.unwrapNodeByKey(node!.key);
          });
        } else {
          editor.wrapBlockByKey(block!.key, this.types.item);
        }
      });
    });

  /**
   * To unwrap the root blocks in current selection from list.
   */
  unwrap = (editor: Editor): Editor =>
    editor.withoutNormalizing(() => {
      editor.value.blocks
        .map(block => editor.value.document.getClosest(block!.key, this.isNodeAsItem))
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

  /**
   * To toggle the root blocks in current selection between being list.
   */
  toggle = (editor: Editor, orderedType: LIST_ORDERED_TYPES): Editor =>
    editor.withoutNormalizing(() => {
      const item = this.getCurrentItem(editor);

      if (!item) {
        return this.wrap(editor, orderedType);
      }

      const list = this.getListFromNode(editor, item);

      if (!list) {
        return editor;
      }

      const type = this.types[orderedType];

      if (list.type === type) {
        this.unwrap(editor);
      } else {
        editor.setNodeByKey(list.key, type);
      }
    });

  /**
   * To increase the depth of the first item in current selection if increasable.
   */
  increaseItemDepth = (editor: Editor): Editor => {
    const item = this.getCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const previousItem = this.getPreviousItem(editor, item);

    if (!previousItem) {
      return editor;
    }

    const lastListInPreviousItem = this.getLastListInNode(previousItem);

    /**
     * If there is a list in the previous item, move item to the list.
     */
    if (lastListInPreviousItem) {
      return editor.moveNodeByKey(item.key, lastListInPreviousItem.key, lastListInPreviousItem.nodes.size);
    }

    const list = this.getListFromNode(editor, item);

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

  /**
   * To decrease the depth of the first item in current selection if decreasable.
   */
  decreaseItemDepth = (editor: Editor): Editor => {
    const item = this.getCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const list = this.getListFromNode(editor, item);

    if (!list) {
      return editor;
    }

    const parentItem = this.getItemFromNode(editor, list);

    if (!parentItem) {
      return editor;
    }

    const parentList = this.getListFromNode(editor, parentItem);

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

  /**
   * If not decreasable, unwrap the list, or decrease the depth of item.
   */
  decreaseItemDepthOrUnwrapIfNeed = (editor: Editor): Editor => {
    /**
     * Be decreasable if parent item exist.
     */
    const parentItem = this.getItemFromNode(editor, this.getListFromNode(editor, this.getCurrentItem(editor)));
    return parentItem ? this.decreaseItemDepth(editor) : this.unwrap(editor);
  };
}
