import { isHotkey } from 'is-hotkey';
import { Editor } from 'slate';
import { EventHook } from 'slate-react';

export interface HotkeyPlugin {
  onKeyDown: EventHook;
}

export function HotkeyPlugin(
  hotkey: string | ReadonlyArray<string>,
  fn: string | ((editor: Editor) => Editor)
): HotkeyPlugin {
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
