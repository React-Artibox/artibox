import { isHotkey } from 'is-hotkey';
import { CommandFunc } from 'slate';
import { HelperPlugin } from '@artibox/slate-types';

export type HotkeyPlugin = HelperPlugin<'onKeyDown'>;

export function HotkeyPlugin(hotkey: string | ReadonlyArray<string>, fn: CommandFunc): HotkeyPlugin {
  const isSaveHotkey = isHotkey(hotkey);

  return {
    onKeyDown(event, editor, next) {
      //  eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isSaveHotkey(event as any)) {
        editor.command(fn);
      } else {
        return next();
      }
    }
  };
}
