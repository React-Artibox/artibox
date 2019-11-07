import { Editor } from 'slate';
import { useMemo, MouseEventHandler } from 'react';
import { getCommand } from '@artibox/slate-core';
import { SEPARATION_LINE_COMMAND_ADD } from './separation-line.constants';
import { SeparationLineCommandAdd } from './separation-line.commands';

export function useSeparationLineOnMouseDown(editor: Editor) {
  return useMemo<MouseEventHandler>(() => {
    const command = getCommand<SeparationLineCommandAdd>(editor, SEPARATION_LINE_COMMAND_ADD);
    return event => {
      event.preventDefault();
      command();
    };
  }, [editor]);
}
