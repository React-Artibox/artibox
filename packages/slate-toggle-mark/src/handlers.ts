import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { isHotkey } from 'is-hotkey';
import { Hotkey } from '@artibox/slate-common';
import { ToggleMarkController } from './controller';

/**
 * @property hotkey - Toggle the specific mark while the hotkey pressed.
 */
export interface CreateToggleMarkHandlersConfig extends Hotkey {
  controller: ToggleMarkController;
}

export function createToggleMarkHandlers(config: CreateToggleMarkHandlersConfig): Plugin {
  const { hotkey, controller } = config;

  return {
    onKeyDown(event, editor, next) {
      if (isHotkey(hotkey, event as any)) {
        return controller.toggle((editor as any) as Editor);
      }

      return next();
    }
  };
}
