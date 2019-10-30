import { isHotkey } from 'is-hotkey';
import { CommandFunc } from 'slate';
import { Plugin } from 'slate-react';
import { Required } from 'utility-types';

export type HotkeyPlugin = Required<Plugin, 'onKeyDown'>;

export interface HotkeyPluginConfig {
  hotkey: string | ReadonlyArray<string>;
  command: string | CommandFunc;
}

export function HotkeyPlugin({ hotkey, command }: HotkeyPluginConfig): HotkeyPlugin {
  const isSaveHotkey = isHotkey(hotkey);

  return {
    onKeyDown(event, editor, next) {
      if (isSaveHotkey(event as any)) {
        editor.command(command);
      } else {
        return next();
      }
    }
  };
}
