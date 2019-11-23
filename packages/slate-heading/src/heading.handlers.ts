import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { HEADING_LEVELS } from './heading.constants';
import { HeadingConfigEnabled } from './heading.interfaces';
import { HeadingController } from './heading.controller';

export interface HeadingHandlersConfig extends HeadingConfigEnabled {
  /**
   * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
   */
  hotkey: string;
  controller: HeadingController;
}

export type HeadingHandlers = PickPluginAndRequired<'onKeyDown'>;

export function HeadingHandlers(config: HeadingHandlersConfig): HeadingHandlers {
  const { enabled, hotkey, controller } = config;

  return {
    onKeyDown(event, editor, next) {
      if (event.key === 'Enter') {
        /**
         * If press enter on the block not heading, continue.
         */
        if (!controller.isBlockAs(editor.value.startBlock)) {
          return next();
        }

        return controller.end(editor);
      }

      /**
       * Only toggle if the hotkey is fired and the key is the same as level.
       */
      const numKey = +event.key;

      if (isKeyHotkey(hotkey, event as any) && enabled.includes(numKey as HEADING_LEVELS)) {
        const level = numKey as HEADING_LEVELS;

        event.preventDefault();
        return controller.toggle(editor, level);
      }

      return next();
    }
  };
}
