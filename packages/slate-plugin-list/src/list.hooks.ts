import { Editor } from 'slate';
import { useMemo, MouseEventHandler } from 'react';
import { getCommand } from '@artibox/slate-core';
import { LIST_COMMAND_TOGGLE, LIST_ORDERED_TYPES } from './list.constants';
import { ListCommandToggle } from './list.commands';

export function useListOnMouseDown(editor: Editor, orderType: LIST_ORDERED_TYPES) {
  return useMemo<MouseEventHandler>(() => {
    const command = getCommand<ListCommandToggle>(editor, LIST_COMMAND_TOGGLE);
    return event => {
      event.preventDefault();
      command(orderType);
    };
  }, [editor, orderType]);
}
