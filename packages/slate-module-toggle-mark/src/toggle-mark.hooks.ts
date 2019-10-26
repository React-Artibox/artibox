import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { useQueries, useCommands } from '@artibox/slate-editor';

export type UseToggleMarkIsActive = (editor: Editor) => boolean;

export function createUseToggleMarkIsActive<Q extends string>(queryHas: Q): UseToggleMarkIsActive {
  return editor => {
    const query = useQueries()[queryHas];
    return query(editor);
  };
}

export type UseToggleMarkOnClick = (editor: Editor) => MouseEventHandler;

export function createUseToggleMarkOnClick<C extends string>(commandToggle: C): UseToggleMarkOnClick {
  return editor =>
    useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        const command = useCommands()[commandToggle];
        command(editor);
      },
      [editor]
    );
}
