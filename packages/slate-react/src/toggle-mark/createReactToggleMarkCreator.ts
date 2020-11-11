import isHotkey from 'is-hotkey';
import { createToggleMarkCreator, CreateToggleMarkOptions } from '@artibox/slate-common/toggle-mark';
import { createRenderMark, CreateRenderMarkOptions } from '../core';
import { ReactToggleMark, ReactToggleMarkCreateHandlersOptions } from './typings';

export type CreateReactToggleMarkCreatorOptions = Required<
  ReactToggleMarkCreateHandlersOptions & Omit<CreateRenderMarkOptions<boolean>, 'type'>
>;

export type CreateReactToggleMarkOptions = CreateToggleMarkOptions;

export function createReactToggleMarkCreator(
  createCore: ReturnType<typeof createToggleMarkCreator>,
  defaults: CreateReactToggleMarkCreatorOptions
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
