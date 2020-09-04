import { Editor } from 'slate';
import { isHotkey } from 'is-hotkey';
import { ForPlugin } from '@artibox/slate-common';
import { insertSoftBreak } from './insert-soft-break';

export interface SoftBreakForPluginConfig {
  hotkey?: string;
}

export type SoftBreak = ForPlugin<SoftBreakForPluginConfig>;

export const SoftBreak: SoftBreak = {
  forPlugin(config) {
    const { hotkey = 'shift+enter' } = config || {};

    return {
      onKeyDown(event, editorComponent, next) {
        const editor = (editorComponent as any) as Editor;

        if (isHotkey(hotkey, event.nativeEvent)) {
          event.preventDefault();
          return insertSoftBreak(editor);
        }

        return next();
      }
    };
  }
};
