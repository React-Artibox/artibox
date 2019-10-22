import { isHotkey } from 'is-hotkey';
import { CommandFunc } from 'slate';
import { HelperPlugin } from '../types';

export type HotkeyPlugin = HelperPlugin<'onKeyDown'>;

export function HotkeyPlugin(hotkey: string | ReadonlyArray<string>, fn: CommandFunc): HotkeyPlugin {
  const isSaveHotkey = isHotkey(hotkey);

  return {
    onKeyDown(event, editor, next) {
      if (isSaveHotkey(event as KeyboardEvent)) {
        editor.command(fn);
      } else {
        return next();
      }
    }
  };
}
