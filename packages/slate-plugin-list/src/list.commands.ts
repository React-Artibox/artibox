import { Editor, Plugin, Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-core';
import {
  LIST_TYPES,
  LIST_ORDERED_TYPES,
  LIST_COMMAND_WRAP,
  LIST_COMMAND_UNWRAP,
  LIST_COMMAND_TOGGLE,
  LIST_COMMAND_INCREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED
} from './list.constants';
import { isList, isListItem, getLastListInNode } from './list.utils';
import { ListQueryItem, ListQueryList, ListQueryPreviousItem, ListQueryCurrentItem } from './list.queries';

export interface ListCommandsConfig {
  types: LIST_TYPES;
  queryItem: ListQueryItem;
  queryList: ListQueryList;
  queryPreviousItem: ListQueryPreviousItem;
  queryCurrentItem: ListQueryCurrentItem;
}

/**
 * To wrap the root blocks in current selection with list.
 */
export type ListCommandWrap = (editor: Editor, orderedType: LIST_ORDERED_TYPES) => Editor;

/**
 * To unwrap the root blocks in current selection from list.
 */
export type ListCommandUnwrap = (editor: Editor) => Editor;

/**
 * To toggle the root blocks in current selection between being list.
 */
export type ListCommandToggle = (editor: Editor, orderedType: LIST_ORDERED_TYPES) => Editor;

/**
 * To increase the depth of the first item in current selection if increasable.
 */
export type ListCommandIncreaseItemDepth = (editor: Editor) => Editor;

/**
 * To decrease the depth of the first item in current selection if decreasable.
 */
export type ListCommandDecreaseItemDepth = (editor: Editor) => Editor;

/**
 * If not decreasable, unwrap the list, or decrease the depth of item.
 */
export type ListCommandDecreaseItemDepthOrUnwrapIfNeed = (editor: Editor) => Editor;

export type ListCommands = Plugin['commands'] & {
  [LIST_COMMAND_WRAP]: ListCommandWrap;
  [LIST_COMMAND_UNWRAP]: ListCommandUnwrap;
  [LIST_COMMAND_TOGGLE]: ListCommandToggle;
  [LIST_COMMAND_INCREASE_ITEM_DEPTH]: ListCommandIncreaseItemDepth;
  [LIST_COMMAND_DECREASE_ITEM_DEPTH]: ListCommandDecreaseItemDepth;
  [LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED]: ListCommandDecreaseItemDepthOrUnwrapIfNeed;
};

export function ListCommands(config: ListCommandsConfig): ListCommands {
  const { types, queryItem, queryList, queryPreviousItem, queryCurrentItem } = config;
  const commandWrap: ListCommandWrap = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const type = types[orderedType];
      const rootSelectedBlocks = editor.value.blocks;

      editor.wrapBlock(type);

      rootSelectedBlocks.forEach(block => {
        if (isList(types, block)) {
          block.nodes.forEach(node => {
            editor.unwrapNodeByKey(node!.key);
          });
        } else {
          editor.wrapBlockByKey(block!.key, types.item);
        }
      });
    });
  const commandUnwrap: ListCommandUnwrap = editor =>
    editor.withoutNormalizing(() => {
      editor.value.blocks
        .map(block => editor.value.document.getClosest(block!.key, node => isListItem(types, node)))
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
  const commandToggle: ListCommandToggle = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const item = queryCurrentItem(editor);

      if (!item) {
        return commandWrap(editor, orderedType);
      }

      const list = queryList(editor, item);

      if (!list) {
        return editor;
      }

      const type = types[orderedType];

      if (list.type === type) {
        commandUnwrap(editor);
      } else {
        editor.setNodeByKey(list.key, type);
      }
    });
  const commandIncreaseItemDepth: ListCommandIncreaseItemDepth = editor => {
    const item = queryCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const previousItem = queryPreviousItem(editor, item);

    if (!previousItem) {
      return editor;
    }

    const lastListInPreviousItem = getLastListInNode(types, previousItem);

    /**
     * If there is a list in the previous item, move item to the list.
     */
    if (lastListInPreviousItem) {
      return editor.moveNodeByKey(item.key, lastListInPreviousItem.key, lastListInPreviousItem.nodes.size);
    }

    const list = queryList(editor, item);

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
  const commandDecreaseItemDepth: ListCommandDecreaseItemDepth = editor => {
    const item = queryCurrentItem(editor);

    if (!item) {
      return editor;
    }

    const list = queryList(editor, item);

    if (!list) {
      return editor;
    }

    const parentItem = queryItem(editor, list);

    if (!parentItem) {
      return editor;
    }

    const parentList = queryList(editor, parentItem);

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
  const commandDecreaseItemDepthOrUnwrapIfNeed: ListCommandDecreaseItemDepthOrUnwrapIfNeed = editor => {
    /**
     * Be decreasable if parent item exist.
     */
    const parentItem = queryItem(editor, queryList(editor, queryCurrentItem(editor)));
    const command = parentItem ? commandDecreaseItemDepth : commandUnwrap;
    return command(editor);
  };

  return {
    [LIST_COMMAND_WRAP]: commandWrap,
    [LIST_COMMAND_UNWRAP]: commandUnwrap,
    [LIST_COMMAND_TOGGLE]: commandToggle,
    [LIST_COMMAND_INCREASE_ITEM_DEPTH]: commandIncreaseItemDepth,
    [LIST_COMMAND_DECREASE_ITEM_DEPTH]: commandDecreaseItemDepth,
    [LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED]: commandDecreaseItemDepthOrUnwrapIfNeed
  };
}
