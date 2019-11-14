import { PickPluginAndRequired } from '@artibox/slate-core';
import { ListQueryCurrentItem, ListQueryIsSelectionInList } from './list.queries';
import {
  ListCommandIncreaseItemDepth,
  ListCommandDecreaseItemDepth,
  ListCommandDecreaseItemDepthOrUnwrapIfNeed
} from './list.commands';

export interface ListHandlersConfig {
  queryCurrentItem: ListQueryCurrentItem;
  queryIsSelectionInList: ListQueryIsSelectionInList;
  commandIncreaseItemDepth: ListCommandIncreaseItemDepth;
  commandDecreaseItemDepth: ListCommandDecreaseItemDepth;
  commandDecreaseItemDepthOrUnwrapIfNeed: ListCommandDecreaseItemDepthOrUnwrapIfNeed;
}

export type ListHandlers = PickPluginAndRequired<'onKeyDown'>;

export function ListHandlers(config: ListHandlersConfig): ListHandlers {
  const {
    queryCurrentItem,
    queryIsSelectionInList,
    commandIncreaseItemDepth,
    commandDecreaseItemDepth,
    commandDecreaseItemDepthOrUnwrapIfNeed
  } = config;

  const onEnter: ListHandlers['onKeyDown'] = (event, editor, next) => {
    event.preventDefault();

    const { selection, startBlock } = editor.value;

    /**
     * To simulate the default behavior of enter event, since the `event.preventDefault` called.
     */
    if (selection.isExpanded) {
      editor.delete();
    }

    const item = queryCurrentItem(editor);

    if (!item) {
      return next();
    } else if (selection.start.offset === 0 && startBlock.text === '' && item.nodes.size! <= 1) {
      return commandDecreaseItemDepthOrUnwrapIfNeed(editor);
    }

    /**
     * Split the text into two items.
     */
    return editor.splitDescendantsByKey(item.key, selection.start.key, selection.start.offset);
  };

  const onBackspace: ListHandlers['onKeyDown'] = (event, editor, next) => {
    const { selection } = editor.value;

    if (selection.isExpanded || selection.start.offset !== 0 || queryCurrentItem(editor)?.nodes.size! > 1) {
      return next();
    }

    event.preventDefault();
    return commandDecreaseItemDepthOrUnwrapIfNeed(editor);
  };

  const onTab: ListHandlers['onKeyDown'] = (event, editor) => {
    event.preventDefault();
    const command = event.shiftKey ? commandDecreaseItemDepth : commandIncreaseItemDepth;
    return command(editor);
  };

  return {
    onKeyDown: (event, editor, next) => {
      if (!queryIsSelectionInList(editor)) {
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
