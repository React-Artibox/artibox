import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { MarkModule } from '@artibox/slate-core';

export type UseToggleMarkModule = (
  editor: Editor
) => {
  active: boolean;
  onClick: MouseEventHandler;
};

export function createUseToggleMarkModule<
  T extends string,
  Q extends string,
  C extends string,
  M extends MarkModule<T, Q, C>
>(mod: M, queryHas: Q, commandToggle: C): UseToggleMarkModule {
  return editor => {
    const active = mod.queries[queryHas](editor);
    const onClick = useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        mod.commands[commandToggle](editor);
      },
      [editor]
    );

    return { active, onClick };
  };
}
