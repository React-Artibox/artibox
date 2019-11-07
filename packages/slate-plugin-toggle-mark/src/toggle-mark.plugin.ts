import { PickPluginAndRequired } from '@artibox/slate-core';
import { CommonMarkRendererConfig, CommonMarkRenderer } from '@artibox/slate-renderer';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';
import { ToggleMarkQueriesConfig, ToggleMarkQueries } from './toggle-mark.queries';
import { ToggleMarkCommandsConfig, ToggleMarkCommands } from './toggle-mark.commands';

export interface ToggleMarkPluginDefaultConfig
  extends CommonMarkRendererConfig,
    ToggleMarkQueriesConfig,
    ToggleMarkCommandsConfig {
  hotkey: string;
}

export interface ToggleMarkPluginConfig {
  type?: string;
  hotkey?: string;
}

export interface ToggleMarkPlugin extends PickPluginAndRequired<'onKeyDown' | 'renderMark'> {
  queries: ToggleMarkQueries;
  commands: ToggleMarkCommands;
}

export function createToggleMarkPlugin(defaults: ToggleMarkPluginDefaultConfig) {
  function ToggleMarkPlugin(config?: ToggleMarkPluginConfig): ToggleMarkPlugin {
    /**
     * @todo
     * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
     */
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const { component, queryHas, commandAdd, commandRemove, commandToggle } = defaults;

    const queries = ToggleMarkQueries({ type, queryHas });
    const commands = ToggleMarkCommands({ type, commandAdd, commandRemove, commandToggle });
    const hotkeyPlugin = HotkeyPlugin({ hotkey, command: commandToggle });
    const renderer = CommonMarkRenderer({ type, component });
    return {
      queries,
      commands,
      onKeyDown: hotkeyPlugin.onKeyDown,
      renderMark: renderer.renderMark
    };
  }

  return ToggleMarkPlugin;
}
