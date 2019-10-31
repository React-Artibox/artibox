import { Plugin } from 'slate-react';
import { Required } from 'utility-types';
import { isHotkey } from 'is-hotkey';
import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-renderer';
import { HeadingQueriesConfig, HeadingQueries } from './heading.queries';
import { HeadingCommandsConfig, HeadingCommands } from './heading.commands';

export interface HeadingPluginDefaultConfig<QS extends string, CE extends string, CT extends string>
  extends CommonBlockRendererConfig,
    HeadingQueriesConfig<QS>,
    Omit<HeadingCommandsConfig<CE, CT>, 'queryHas'> {
  hotkey: string;
}

export interface HeadingPluginConfig {
  type?: string;
  hotkey?: string;
}

export interface HeadingPlugin<Q extends string, C extends string>
  extends Required<Plugin, 'onKeyDown' | 'renderBlock'> {
  queries: HeadingQueries<Q>;
  commands: HeadingCommands<C>;
}

export function createHeadingPlugin<QS extends string, CE extends string, CT extends string>(
  defaults: HeadingPluginDefaultConfig<QS, CE, CT>
) {
  function HeadingPlugin(config?: HeadingPluginConfig): HeadingPlugin<QS, CE | CT> {
    /**
     * @todo
     * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
     */
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const isSaveHotkey = isHotkey(hotkey);
    const { component, queryHas, commandEnd, commandToggle } = defaults;
    const queries = HeadingQueries({ type, queryHas });
    const commands = HeadingCommands({ type, queryHas: queries[queryHas], commandEnd, commandToggle });
    const renderer = CommonBlockRenderer({ type, component });

    return {
      queries,
      commands,
      renderBlock: renderer.renderBlock,
      onKeyDown: (event, editor, next) => {
        if (isSaveHotkey(event as any)) {
          event.preventDefault();
          commands[commandToggle](editor);
          return;
        }

        if (event.key === 'Enter') {
          commands[commandEnd](editor);
        }

        return next();
      }
    };
  }

  return HeadingPlugin;
}
