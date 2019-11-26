import { Editor } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { ToggleMarkController } from './toggle-mark.controller';

export interface ToggleMarkHandlersDefaultConfig {
  hotkey: string;
}

export interface ToggleMarkHandlersConfig extends Partial<ToggleMarkHandlersDefaultConfig> {
  controller: ToggleMarkController;
}

export type ToggleMarkHandlers = PickPluginAndRequired<'onKeyDown'>;

export function createToggleMarkHandlers(defaults: ToggleMarkHandlersDefaultConfig) {
  const { hotkey: defaultHotkey } = defaults;

  function ToggleMarkHandlers(config: ToggleMarkHandlersConfig): ToggleMarkHandlers {
    const { hotkey = defaultHotkey, controller } = config;

    return {
      onKeyDown(event, editor, next) {
        if (isKeyHotkey(hotkey, event as any)) {
          return controller.toggle((editor as any) as Editor);
        }

        return next();
      }
    };
  }

  return ToggleMarkHandlers;
}
