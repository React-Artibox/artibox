import isHotkey from 'is-hotkey';
import { createToggleMarkCreator } from '@artibox/slate-common/toggle-mark';
import { createRenderMark, CreateRenderMarkOptions } from '../core';
import { ReactToggleMark } from './typings';

export interface CreateReactToggleMarkOptions extends Partial<CreateRenderMarkOptions<boolean>> {
  hotkey?: string;
}

export function createReactToggleMarkCreator(
  createCore: ReturnType<typeof createToggleMarkCreator>,
  defaults: Required<Omit<CreateReactToggleMarkOptions, 'type'>>
) {
  return ({ type }: CreateReactToggleMarkOptions = {}): ReactToggleMark => {
    const core = createCore({ type });

    return {
      ...core,
      createHandlers: ({ hotkey = defaults.hotkey } = {}) => ({
        onKeyDown: (event, editor, next) => {
          if (isHotkey(hotkey, event as any)) {
            core.toggleMark(editor);
          } else {
            next();
          }
        }
      }),
      createRenderLeaf: ({ render = defaults.render } = {}) => createRenderMark<boolean>({ type: core.type, render })
    };
  };
}
