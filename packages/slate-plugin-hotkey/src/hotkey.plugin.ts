import { isHotkey } from 'is-hotkey';
import { CommandFunc } from 'slate';
import { getCommand, PickPluginAndRequired } from '@artibox/slate-core';

export type HotkeyPlugin = PickPluginAndRequired<'onKeyDown'>;

export interface HotkeyPluginConfig {
  hotkey: string | ReadonlyArray<string>;
  command: string | CommandFunc;
}

export function HotkeyPlugin({ hotkey, command }: HotkeyPluginConfig): HotkeyPlugin {
  const isSaveHotkey = isHotkey(hotkey);

  return {
    onKeyDown(event, editor, next) {
      if (isSaveHotkey(event as any)) {
        getCommand(editor, command)();
      } else {
        return next();
      }
    }
  };
}
