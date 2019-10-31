import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { getQuery, getCommand } from '@artibox/slate-utils';

export type UseHeadingIsActive = (editor: Editor) => boolean;

export function createUseHeadingIsActive<Q extends string>(queryHas: Q): UseHeadingIsActive {
  return editor => getQuery(editor, queryHas)();
}

export type UseHeadingOnClick = (editor: Editor) => MouseEventHandler;

export function createUseHeadingOnClick<C extends string>(commandToggle: C): UseHeadingOnClick {
  return editor =>
    useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        getCommand(editor, commandToggle)();
      },
      [editor]
    );
}
