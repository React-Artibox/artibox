import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { HEADING_LEVELS } from './heading.constants';
import { HeadingUtils } from './heading.utils';

export type HeadingHandlers = PickPluginAndRequired<'onKeyDown'>;

export function HeadingHandlers(hotkey: string, enabled: HEADING_LEVELS[], utils: HeadingUtils): HeadingHandlers {
  return {
    onKeyDown(event, editor, next) {
      if (event.key === 'Enter') {
        /**
         * If press enter on the block not heading, continue.
         */
        if (!utils.isBlockAsHeading(editor.value.startBlock)) {
          return next();
        }

        return utils.endHeadingBlock(editor);
      }

      /**
       * Only toggle if the hotkey is fired and the key is the same as level.
       */
      const numKey = +event.key;

      if (isKeyHotkey(hotkey, event as any) && enabled.includes(numKey as HEADING_LEVELS)) {
        const level = numKey as HEADING_LEVELS;

        event.preventDefault();
        return utils.toggleHeadingBlock(editor, level);
      }

      return next();
    }
  };
}
