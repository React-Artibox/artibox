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
     * remove the eslint disable.
     * @see
     * https://github.com/typescript-eslint/typescript-eslint/issues/1104
     */
    //  eslint-disable-next-line @typescript-eslint/no-use-before-define
    const type = config?.type ?? defaults.type;
    //  eslint-disable-next-line @typescript-eslint/no-use-before-define
    const hotkey = config?.hotkey ?? defaults.hotkey;
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
