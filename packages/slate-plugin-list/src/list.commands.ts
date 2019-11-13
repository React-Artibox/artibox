import { Editor, Plugin, Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-core';
import {
  LIST_TYPES,
  LIST_ORDERED_TYPES,
  LIST_COMMAND_WRAP,
  LIST_COMMAND_UNWRAP,
  LIST_COMMAND_TOGGLE,
  LIST_COMMAND_INCREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH
} from './list.constants';
import { isList, isListItem } from './list.utils';

export interface ListCommandsConfig {
  types: LIST_TYPES;
}

export type ListCommandWrap = (editor: Editor, orderedType: LIST_ORDERED_TYPES) => Editor;
export type ListCommandUnwrap = (editor: Editor) => Editor;
export type ListCommandToggle = (editor: Editor, orderedType: LIST_ORDERED_TYPES) => Editor;
export type ListCommandIncreaseItemDepth = (editor: Editor) => Editor;
export type ListCommandDecreaseItemDepth = (editor: Editor) => Editor;

export type ListCommands = Plugin['commands'] & {
  [LIST_COMMAND_WRAP]: ListCommandWrap;
  [LIST_COMMAND_UNWRAP]: ListCommandUnwrap;
  [LIST_COMMAND_TOGGLE]: ListCommandToggle;
  [LIST_COMMAND_INCREASE_ITEM_DEPTH]: ListCommandIncreaseItemDepth;
  [LIST_COMMAND_DECREASE_ITEM_DEPTH]: ListCommandDecreaseItemDepth;
};

export function ListCommands(config: ListCommandsConfig): ListCommands {
  const { types } = config;
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
        .map(block => editor.value.document.getFurthest(block!.key, node => isListItem(types, node)))
        .filter(Boolean)
        .forEach(furthestItem => {
          const item = furthestItem as Block;

          editor.unwrapNodeByKey(item.key);

          /**
           * After unwraped, parent may be document or list.
           */
          const parent = editor.value.document.getParent(item.key);

          if (!isNodeExcludeText(parent)) {
            return;
          }

          const itemIndex = parent.nodes.findIndex(node => node!.key === item.key);

          item.nodes.forEach((itemChild, index) => {
            editor.moveNodeByKey(itemChild!.key, parent.key, index! + itemIndex);
          });
          editor.removeNodeByKey(item.key);
        });
    });
  const commandToggle: ListCommandToggle = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const item = editor.value.document.getParent(editor.value.startBlock.key);

      if (!isListItem(types, item)) {
        return commandWrap(editor, orderedType);
      }

      const list = editor.value.document.getParent(item.key);

      if (!isList(types, list)) {
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
    const item = editor.value.document.getParent(editor.value.startBlock.key);

    if (!isListItem(types, item)) {
      return editor;
    }

    const previousItem = editor.value.document.getPreviousSibling(item.key);

    if (!isListItem(types, previousItem)) {
      return editor;
    }

    const existingList = previousItem.nodes.last() as Block | undefined;

    if (isList(types, existingList)) {
      return editor.withoutNormalizing(() => {
        editor.moveNodeByKey(item.key, existingList.key, existingList.nodes.size);
      });
    }

    const list = editor.value.document.getParent(item.key);

    if (!isList(types, list)) {
      return editor;
    }

    return editor.withoutNormalizing(() => {
      const newList = Block.fromJSON({ type: list.type });

      editor
        .insertNodeByKey(previousItem.key, previousItem.nodes.size, newList)
        .moveNodeByKey(item.key, newList.key, 0);
    });
  };
  const commandDecreaseItemDepth: ListCommandDecreaseItemDepth = editor => {
    const item = editor.value.document.getParent(editor.value.startBlock.key);

    if (!isListItem(types, item)) {
      return editor;
    }

    const list = editor.value.document.getParent(item.key);

    if (!isList(types, list)) {
      return editor;
    }

    const parentItem = editor.value.document.getParent(list.key);

    if (!isListItem(types, parentItem)) {
      return editor;
    }

    const parentList = editor.value.document.getParent(parentItem.key);

    if (!isList(types, parentList)) {
      return editor;
    }

    return editor.withoutNormalizing(() => {
      const insertIndex = parentList.nodes.indexOf(parentItem) + 1;
      const otherItems = list.nodes.skipUntil(eachItem => eachItem === item).rest();
      const otherItemsIsEmpty = otherItems.isEmpty();
      const prevItemsIsEmpty = list.nodes.size - otherItems.size - 1 <= 0;

      editor.moveNodeByKey(item.key, parentList.key, insertIndex);

      if (!otherItemsIsEmpty) {
        const newList = Block.create({ type: list.type });

        editor.insertNodeByKey(item.key, item.nodes.size, newList);

        otherItems.forEach((otherItem, index) => {
          editor.moveNodeByKey(otherItem!.key, newList.key, newList.nodes.size + index!);
        });
      }

      if (prevItemsIsEmpty) {
        editor.removeNodeByKey(list.key);
      }
    });
  };

  return {
    [LIST_COMMAND_WRAP]: commandWrap,
    [LIST_COMMAND_UNWRAP]: commandUnwrap,
    [LIST_COMMAND_TOGGLE]: commandToggle,
    [LIST_COMMAND_INCREASE_ITEM_DEPTH]: commandIncreaseItemDepth,
    [LIST_COMMAND_DECREASE_ITEM_DEPTH]: commandDecreaseItemDepth
  };
}
