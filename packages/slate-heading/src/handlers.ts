import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { HeadingLevel, HeadingConfigEnabled } from './typings';
import { HeadingController } from './controller';

export interface CreateHeadingHandlersConfig extends HeadingConfigEnabled {
  /**
   * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
   */
  hotkey: string;
  controller: HeadingController;
}

export function createHeadingHandlers(config: CreateHeadingHandlersConfig): Plugin {
  const { enabled, hotkey, controller } = config;

  return {
    onKeyDown(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;

      if (event.key === 'Enter' && !event.shiftKey && controller.isBlockAs(editor.value.startBlock)) {
        event.preventDefault();
        return controller.end(editor);
      }

      /**
       * Only toggle if the hotkey is fired and the key is the same as level.
       */
      const numKey = +event.key;

      if (isKeyHotkey(hotkey, event as any) && enabled.includes(numKey as HeadingLevel)) {
        const level = numKey as HeadingLevel;

        event.preventDefault();
        return controller.toggle(editor, level);
      }

      return next();
    }
  };
}
