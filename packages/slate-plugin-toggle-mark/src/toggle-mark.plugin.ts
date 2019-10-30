import { Plugin } from 'slate-react';
import { Required } from 'utility-types';
import { CommonMarkRendererConfig, CommonMarkRenderer } from '@artibox/slate-renderer';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';
import { ToggleMarkQueriesConfig, ToggleMarkQueries } from './toggle-mark.queries';
import { ToggleMarkCommandsConfig, ToggleMarkCommands } from './toggle-mark.commands';

export interface ToggleMarkPluginDefaultConfig<
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
> extends CommonMarkRendererConfig, ToggleMarkQueriesConfig<QS>, ToggleMarkCommandsConfig<CA, CR, CT> {
  hotkey: string;
}

export interface ToggleMarkPluginConfig {
  type?: string;
  hotkey?: string;
}

export interface ToggleMarkPlugin<Q extends string, C extends string>
  extends Required<Plugin, 'onKeyDown' | 'renderMark'> {
  queries: ToggleMarkQueries<Q>;
  commands: ToggleMarkCommands<C>;
}

export function createToggleMarkPlugin<QS extends string, CA extends string, CR extends string, CT extends string>(
  defaults: ToggleMarkPluginDefaultConfig<QS, CA, CR, CT>
) {
  function ToggleMarkPlugin(config?: ToggleMarkPluginConfig): ToggleMarkPlugin<QS, CA | CR | CT> {
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const { component, queryHas, commandAdd, commandRemove, commandToggle } = defaults;

    const queries = ToggleMarkQueries({ type, queryHas });
    const commands = ToggleMarkCommands({ type, commandAdd, commandRemove, commandToggle });
    const hotkeyPlugin = HotkeyPlugin({ hotkey, command: commands[commandToggle] });
    const renderer = CommonMarkRenderer({ type, component });
    const plugin = {
      queries,
      commands,
      onKeyDown: hotkeyPlugin.onKeyDown,
      renderMark: renderer.renderMark
    };

    return plugin;
  }

  return ToggleMarkPlugin;
}
