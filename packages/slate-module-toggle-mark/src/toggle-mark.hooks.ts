import { Editor } from 'slate';
import { useCallback, MouseEventHandler } from 'react';
import { MarkModule } from '@artibox/slate-types';

export type useToggleMarkModule = (
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
>(mod: M, commandToggle: C, queryHas: Q): useToggleMarkModule {
  return editor => {
    const active = mod.plugin.queries[queryHas](editor);
    const onClick = useCallback<MouseEventHandler>(
      event => {
        event.preventDefault();
        mod.plugin.commands[commandToggle](editor);
      },
      [editor]
    );

    return { active, onClick };
  };
}
