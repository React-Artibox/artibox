import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { ToggleMarkController } from './toggle-mark.interfaces';

export type ToggleMarkHandlers = PickPluginAndRequired<'onKeyDown'>;

export function ToggleMarkHandlers(hotkey: string, toggleMarkController: ToggleMarkController): ToggleMarkHandlers {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyHotkey(hotkey, event as any)) {
        return toggleMarkController.toggleToggleMark(editor);
      }

      return next();
    }
  };
}
