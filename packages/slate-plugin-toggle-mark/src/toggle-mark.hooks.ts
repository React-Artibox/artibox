import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { getQuery, getCommand } from '@artibox/slate-utils';

export type UseToggleMarkIsActive = (editor: Editor) => boolean;

export function createUseToggleMarkIsActive<Q extends string>(queryHas: Q): UseToggleMarkIsActive {
  return editor => getQuery(editor, queryHas)();
}

export type UseToggleMarkOnClick = (editor: Editor) => MouseEventHandler;

export function createUseToggleMarkOnClick<C extends string>(commandToggle: C): UseToggleMarkOnClick {
  return editor =>
    useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        getCommand(editor, commandToggle)();
      },
      [editor]
    );
}
