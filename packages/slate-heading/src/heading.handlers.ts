import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { HEADING_LEVELS } from './heading.constants';
import { HeadingController } from './heading.interfaces';

export type HeadingHandlers = PickPluginAndRequired<'onKeyDown'>;

export function HeadingHandlers(
  hotkey: string,
  enabled: HEADING_LEVELS[],
  headingController: HeadingController
): HeadingHandlers {
  return {
    onKeyDown(event, editor, next) {
      if (event.key === 'Enter') {
        /**
         * If press enter on the block not heading, continue.
         */
        if (!headingController.isBlockAsHeading(editor.value.startBlock)) {
          return next();
        }

        return headingController.endHeadingBlock(editor);
      }

      /**
       * Only toggle if the hotkey is fired and the key is the same as level.
       */
      const numKey = +event.key;

      if (isKeyHotkey(hotkey, event as any) && enabled.includes(numKey as HEADING_LEVELS)) {
        const level = numKey as HEADING_LEVELS;

        event.preventDefault();
        return headingController.toggleHeadingBlock(editor, level);
      }

      return next();
    }
  };
}
