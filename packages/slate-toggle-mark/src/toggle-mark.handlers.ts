import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { ToggleMarkUtils } from './toggle-mark.utils';

export type ToggleMarkHandlersFactory<IA extends string, A extends string, R extends string, T extends string> = (
  hotkey: string,
  utils: ToggleMarkUtils<IA, A, R, T>
) => ToggleMarkHandlers;

export type ToggleMarkHandlers = PickPluginAndRequired<'onKeyDown'>;

export function createToggleMarkHandlers<T extends string>(toggle: T) {
  function ToggleMarkHandlers<IA extends string, A extends string, R extends string>(
    hotkey: string,
    utils: ToggleMarkUtils<IA, A, R, T>
  ): ToggleMarkHandlers {
    return {
      onKeyDown(event, editor, next) {
        if (isKeyHotkey(hotkey, event as any)) {
          return utils[toggle](editor);
        }

        return next();
      }
    };
  }

  return ToggleMarkHandlers;
}
