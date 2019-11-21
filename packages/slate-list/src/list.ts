import { Block } from 'slate';
import { isNodeExcludeText } from '@artibox/slate-core';
import { LIST_TYPES } from './list.constants';
import { ListController } from './list.interfaces';
import { ListRenderer } from './list.renderer';
import { ListHandlers } from './list.handlers';
import { ListSchema } from './list.schema';

export interface ListConfig {
  types?: Partial<LIST_TYPES>;
}

export class List implements ListController {
  static Handlers = ListHandlers;
  static Renderer = ListRenderer;
  static Schema = ListSchema;

  static create(config?: ListConfig) {
    const types = { ...LIST_TYPES, ...config?.types };

    return new this(types, this.Handlers, this.Renderer(types), this.Schema(types));
  }

  plugin = {
    ...this.handlersFactory(this),
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly types: LIST_TYPES,
    private readonly handlersFactory: (listController: ListController) => ListHandlers,
    private readonly renderer: ListRenderer,
    private readonly schema: ReturnType<typeof ListSchema>
  ) {}

  isList: ListController['isList'] = (node): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return [this.types.unordered, this.types.ordered].includes(node.type);
  };

  isListItem: ListController['isListItem'] = (node): node is Block => {
    if (!isNodeExcludeText(node)) {
      return false;
    }

    return this.types.item === node.type;
  };

  isSelectionInList: ListController['isSelectionInList'] = editor => !!this.getCurrentItem(editor);

  getLastListInNode: ListController['getLastListInNode'] = node => {
    if (!isNodeExcludeText(node)) {
      return null;
    }

    const lastList = node.nodes.last() as Block | undefined;
    return this.isList(lastList) ? lastList : null;
  };

  getItemFromNode: ListController['getItemFromNode'] = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, this.isListItem) as Block | null;
  };

  getListFromNode: ListController['getListFromNode'] = (editor, node) => {
    if (!node) {
      return null;
    }

    return editor.value.document.getClosest(node.key, this.isList) as Block | null;
  };

  getPreviousItem: ListController['getPreviousItem'] = (editor, item) => {
    if (!this.isListItem(item)) {
      return null;
    }

    const previousItem = editor.value.document.getPreviousSibling(item.key);
    return this.isListItem(previousItem) ? previousItem : null;
  };

  getCurrentItem: ListController['getCurrentItem'] = editor => this.getItemFromNode(editor, editor.value.startBlock);

  getCurrentList: ListController['getCurrentList'] = editor =>
    this.getListFromNode(editor, this.getCurrentItem(editor));

  wrapListBlock: ListController['wrapListBlock'] = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const type = this.types[orderedType];
      const rootSelectedBlocks = editor.value.blocks;

      editor.wrapBlock(type);

      rootSelectedBlocks.forEach(block => {
        if (this.isList(block)) {
          block.nodes.forEach(node => {
            editor.unwrapNodeByKey(node!.key);
          });
        } else {
          editor.wrapBlockByKey(block!.key, this.types.item);
        }
      });
    });

  unwrapListBlock: ListController['unwrapListBlock'] = editor =>
    editor.withoutNormalizing(() => {
      editor.value.blocks
        .map(block => editor.value.document.getClosest(block!.key, this.isListItem))
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

  toggleListBlock: ListController['toggleListBlock'] = (editor, orderedType) =>
    editor.withoutNormalizing(() => {
      const item = this.getCurrentItem(editor);

      if (!item) {
        return this.wrapListBlock(editor, orderedType);
      }

      const list = this.getListFromNode(editor, item);

      if (!list) {
        return editor;
      }

      const type = this.types[orderedType];

      if (list.type === type) {
        this.unwrapListBlock(editor);
      } else {
        editor.setNodeByKey(list.key, type);
      }
    });

  increateItemDepth: ListController['increateItemDepth'] = editor => {
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

  decreateItemDepth: ListController['decreateItemDepth'] = editor => {
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

  decreateItemDepthOrUnwrapIfNeed: ListController['decreateItemDepthOrUnwrapIfNeed'] = editor => {
    /**
     * Be decreasable if parent item exist.
     */
    const parentItem = this.getItemFromNode(editor, this.getListFromNode(editor, this.getCurrentItem(editor)));
    return parentItem ? this.decreateItemDepth(editor) : this.unwrapListBlock(editor);
  };
}
