import { MarkModule, CommonMarkRendererConfig, CommonMarkRenderer } from '@artibox/slate-core';
import { ToggleMarkPluginsConfig, ToggleMarkPlugins } from './toggle-mark.plugins';
import { ToggleMarkQueriesConfig, ToggleMarkQueries } from './toggle-mark.queries';
import { ToggleMarkCommandsConfig, ToggleMarkCommands } from './toggle-mark.commands';

export type ToggleMarkModuleDefaultConfig<
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
> = Omit<CommonMarkRendererConfig, 'renderIf'> &
  Omit<ToggleMarkPluginsConfig, 'commandToggle'> &
  ToggleMarkQueriesConfig<QS> &
  ToggleMarkCommandsConfig<CA, CR, CT>;

export interface ToggleMarkModuleConfig {
  type?: string;
  hotkey?: string;
}

export function createToggleMarkModule<QS extends string, CA extends string, CR extends string, CT extends string>(
  defaults: ToggleMarkModuleDefaultConfig<QS, CA, CR, CT>
) {
  function ToggleMarkModule(config?: ToggleMarkModuleConfig): MarkModule<QS, CA | CR | CT> {
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const { component, queryHas, commandAdd, commandRemove, commandToggle } = defaults;

    const queries = ToggleMarkQueries({ type, queryHas });
    const commands = ToggleMarkCommands({ type, commandAdd, commandRemove, commandToggle });
    const plugins = ToggleMarkPlugins({ hotkey, commandToggle: commands[commandToggle] });
    const renderer = CommonMarkRenderer({ type, component });

    return {
      type,
      plugins,
      renderer,
      queries,
      commands
    };
  }

  return ToggleMarkModule;
}
