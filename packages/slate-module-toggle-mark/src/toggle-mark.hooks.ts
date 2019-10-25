import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { MarkModule } from '@artibox/slate-core';
import { useQueries, useCommands } from '@artibox/slate-editor';

export type UseToggleMarkIsActive = (editor: Editor) => boolean;

/*  eslint @typescript-eslint/no-explicit-any: 0  */
export function createUseToggleMarkIsActive<Q extends string>(
  queryHas: Q,
  mod?: MarkModule<Q, any>
): UseToggleMarkIsActive {
  return editor => {
    const query = (mod ? mod.queries : useQueries())[queryHas];
    return query(editor);
  };
}

export type UseToggleMarkOnClick = (editor: Editor) => MouseEventHandler;

export function createUseToggleMarkOnClick<C extends string>(
  commandToggle: C,
  mod?: MarkModule<any, C>
): UseToggleMarkOnClick {
  return editor =>
    useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        const command = (mod ? mod.commands : useCommands())[commandToggle];
        command(editor);
      },
      [editor]
    );
}
