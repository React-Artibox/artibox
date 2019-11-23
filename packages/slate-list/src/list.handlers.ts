import { PickPluginAndRequired } from '@artibox/slate-common';
import { ListController } from './list.controller';

export interface ListHandlersConfig {
  controller: ListController;
}

export type ListHandlers = PickPluginAndRequired<'onKeyDown'>;

export function ListHandlers(config: ListHandlersConfig): ListHandlers {
  const { controller } = config;

  const onEnter: ListHandlers['onKeyDown'] = (event, editor, next) => {
    event.preventDefault();

    const { selection, startBlock } = editor.value;

    /**
     * To simulate the default behavior of enter event, since the `event.preventDefault` called.
     */
    if (selection.isExpanded) {
      editor.delete();
    }

    const item = controller.getCurrentItem(editor);

    if (!item) {
      return next();
    } else if (selection.start.offset === 0 && startBlock.text === '' && item.nodes.size! <= 1) {
      return controller.decreaseItemDepthOrUnwrapIfNeed(editor);
    }

    /**
     * Split the text into two items.
     */
    return editor.splitDescendantsByKey(item.key, selection.start.key, selection.start.offset);
  };

  const onBackspace: ListHandlers['onKeyDown'] = (event, editor, next) => {
    const { selection } = editor.value;

    if (selection.isExpanded || selection.start.offset !== 0) {
      return next();
    }

    event.preventDefault();
    return controller.decreaseItemDepthOrUnwrapIfNeed(editor);
  };

  const onTab: ListHandlers['onKeyDown'] = (event, editor) => {
    event.preventDefault();

    return event.shiftKey ? controller.decreaseItemDepth(editor) : controller.increaseItemDepth(editor);
  };

  return {
    onKeyDown: (event, editor, next) => {
      if (!controller.isSelectionIn(editor)) {
        return next();
      } else if (event.key === 'Enter' && !event.shiftKey) {
        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackspace(event, editor, next);
      } else if (event.key === 'Tab') {
        return onTab(event, editor, next);
      }

      return next();
    }
  };
}
