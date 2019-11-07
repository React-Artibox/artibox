import { Editor } from 'slate';
import { useMemo, MouseEventHandler } from 'react';
import { getQuery, getCommand } from '@artibox/slate-core';
import { ToggleMarkQueryHas } from './toggle-mark.queries';
import { ToggleMarkCommandToggle } from './toggle-mark.commands';

export type UseToggleMarkIsActive = ToggleMarkQueryHas;

export function createUseToggleMarkIsActive(queryHas: string): UseToggleMarkIsActive {
  return editor => {
    const query = useMemo(() => getQuery<ToggleMarkQueryHas>(editor, queryHas), [editor]);
    return query();
  };
}

export type UseToggleMarkOnMouseDown = (editor: Editor) => MouseEventHandler;

export function createUseToggleMarkOnMouseDown(commandToggle: string): UseToggleMarkOnMouseDown {
  return editor =>
    useMemo<MouseEventHandler>(() => {
      const command = getCommand<ToggleMarkCommandToggle>(editor, commandToggle);
      return event => {
        event.preventDefault();
        command();
      };
    }, [editor]);
}
