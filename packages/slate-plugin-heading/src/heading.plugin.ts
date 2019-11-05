import { Plugin } from 'slate-react';
import { Required } from 'utility-types';
import { isHotkey } from 'is-hotkey';
import {
  HEADING_TYPE,
  HEADING_LEVELS,
  HEADING_HOTKEY,
  HEADING_QUERY_LEVEL,
  HEADING_COMMAND_TOGGLE,
  HEADING_COMMAND_END
} from './heading.constants';
import { HeadingQueries } from './heading.queries';
import { HeadingCommands } from './heading.commands';
import { HeadingRenderer } from './heading.renderer';

export interface HeadingPluginConfig {
  type?: string;
  /**
   * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
   */
  hotkey?: string;
  /**
   * The blacklist of heading levels.
   * If no pass, all levels will be enabled.
   */
  disabled?: HEADING_LEVELS[];
}

export interface HeadingPlugin extends Required<Plugin, 'onKeyDown' | 'renderBlock'> {
  queries: HeadingQueries;
  commands: HeadingCommands;
}

export function HeadingPlugin(config?: HeadingPluginConfig): HeadingPlugin {
  /**
   * @todo
   * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
   */
  const disabled = (config && config.disabled) || [];
  const enabled = HEADING_LEVELS.filter(level => !disabled.includes(level));
  const type = (config && config.type) || HEADING_TYPE;
  const hotkey = (config && config.hotkey) || HEADING_HOTKEY;
  const isSaveHotkey = isHotkey(hotkey);
  const queries = HeadingQueries(type);
  const commands = HeadingCommands({ type, queryLevel: queries[HEADING_QUERY_LEVEL] });
  const renderer = HeadingRenderer(type);

  return {
    queries,
    commands,
    renderBlock: renderer.renderBlock,
    onKeyDown: (event, editor, next) => {
      if (event.key === 'Enter') {
        /**
         * If press enter on the block not heading, continue.
         */
        if (editor.value.startBlock.type !== type) {
          return next();
        }

        commands[HEADING_COMMAND_END](editor);

        return;
      }

      /**
       * Only toggle if the hotkey is fired and the key is the same as level.
       */
      const numKey = +event.key;

      if (isSaveHotkey(event as any) && enabled.includes(numKey as HEADING_LEVELS)) {
        const level = numKey as HEADING_LEVELS;

        event.preventDefault();
        commands[HEADING_COMMAND_TOGGLE](editor, level);

        return;
      }

      return next();
    }
  };
}
