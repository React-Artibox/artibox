import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { Container } from '@artibox/slate-core';

export type UseToggleMarkIsActive<Q> = (editor: Editor, container: Container<Q, any>) => boolean;

export function createUseToggleMarkIsActive<Q>(queryHas: Q): UseToggleMarkIsActive<Q> {
  return (editor, container) => {
    const query = container.getQuery(queryHas);
    return query ? query(editor) : false;
  };
}

export type UseToggleMarkOnClick<C> = (editor: Editor, container: Container<any, C>) => MouseEventHandler;

export function createUseToggleMarkOnClick<C>(commandToggle: C): UseToggleMarkOnClick<C> {
  return (editor, container) =>
    useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();

        const command = container.getCommand(commandToggle);

        if (command) {
          command(editor);
        }
      },
      [editor, container]
    );
}
