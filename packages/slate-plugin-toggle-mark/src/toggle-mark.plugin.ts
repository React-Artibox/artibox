import { CommonMarkRendererConfig, PickPluginProps, PluginWithProvider, CommonMarkRenderer } from '@artibox/slate-core';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';
import { ToggleMarkQueriesConfig, ToggleMarkQueries } from './toggle-mark.queries';
import { ToggleMarkCommandsConfig, ToggleMarkCommands } from './toggle-mark.commands';

export interface ToggleMarkPluginDefaultConfig<QS, CA, CR, CT>
  extends CommonMarkRendererConfig,
    ToggleMarkQueriesConfig<QS>,
    ToggleMarkCommandsConfig<CA, CR, CT> {
  hotkey: string;
}

export interface ToggleMarkPluginConfig {
  type?: string;
  hotkey?: string;
}

export interface ToggleMarkPlugin<Q, C> extends PluginWithProvider<Q, C> {
  plugin: PickPluginProps<'onKeyDown' | 'renderMark'>;
}

export function createToggleMarkPlugin<QS, CA, CR, CT>(defaults: ToggleMarkPluginDefaultConfig<QS, CA, CR, CT>) {
  function ToggleMarkPlugin(config?: ToggleMarkPluginConfig): ToggleMarkPlugin<QS, CA | CR | CT> {
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const { component, queryHas, commandAdd, commandRemove, commandToggle } = defaults;

    const queries = ToggleMarkQueries({ type, queryHas });
    const commands = ToggleMarkCommands({ type, commandAdd, commandRemove, commandToggle });
    const hotkeyPlugin = HotkeyPlugin(hotkey, commands.get(commandToggle)!);
    const renderer = CommonMarkRenderer({ type, component });
    const plugin = {
      onKeyDown: hotkeyPlugin.onKeyDown,
      renderMark: renderer.renderMark
    };
    const provider = { queries, commands };

    return { plugin, provider };
  }

  return ToggleMarkPlugin;
}
