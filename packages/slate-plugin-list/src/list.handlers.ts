import { PickPluginAndRequired } from '@artibox/slate-core';
import { ListQueryList, ListQueryListItem, ListQueryInList } from './list.queries';
import { ListCommandUnwrap, ListCommandIncreaseItemDepth, ListCommandDecreaseItemDepth } from './list.commands';

export interface ListHandlersConfig {
  queryList: ListQueryList;
  queryListItem: ListQueryListItem;
  queryInList: ListQueryInList;
  commandUnwrap: ListCommandUnwrap;
  commandIncreaseItemDepth: ListCommandIncreaseItemDepth;
  commandDecreaseItemDepth: ListCommandDecreaseItemDepth;
}

export type ListHandlers = PickPluginAndRequired<'onKeyDown'>;

export function ListHandlers(config: ListHandlersConfig): ListHandlers {
  const {
    queryList,
    queryListItem,
    queryInList,
    commandUnwrap,
    commandIncreaseItemDepth,
    commandDecreaseItemDepth
  } = config;

  const onEnter: ListHandlers['onKeyDown'] = (event, editor, next) => {
    event.preventDefault();

    const { selection, startBlock } = editor.value;

    if (selection.isExpanded) {
      editor.delete();
    }

    if (selection.start.offset === 0 && startBlock.text === '') {
      const item = queryListItem(editor, editor.value.startBlock);
      const list = queryList(editor, item);
      const parentItem = queryListItem(editor, list);
      const command = parentItem ? commandDecreaseItemDepth : commandUnwrap;

      return command(editor);
    }

    const item = queryListItem(editor, editor.value.startBlock);

    if (!item) {
      return next();
    }

    return editor.splitDescendantsByKey(item.key, selection.start.key, selection.start.offset);
  };

  const onBackspace: ListHandlers['onKeyDown'] = (event, editor, next) => {
    const { selection } = editor.value;

    if (selection.isExpanded || selection.start.offset !== 0) {
      return next();
    }

    event.preventDefault();

    const listItem = queryListItem(editor, editor.value.startBlock);
    const list = queryList(editor, listItem);
    const parentListItem = queryListItem(editor, list);
    const command = parentListItem ? commandDecreaseItemDepth : commandUnwrap;

    return command(editor);
  };

  const onTab: ListHandlers['onKeyDown'] = (event, editor) => {
    event.preventDefault();
    const command = event.shiftKey ? commandDecreaseItemDepth : commandIncreaseItemDepth;
    return command(editor);
  };

  return {
    onKeyDown: (event, editor, next) => {
      if (!queryInList(editor)) {
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
