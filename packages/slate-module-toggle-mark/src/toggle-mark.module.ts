import { MarkModule } from '@artibox/slate-core';
import { CommonMarkRendererConfig, CommonMarkRenderer } from '@artibox/slate-common';
import { ToggleMarkPluginsConfig, ToggleMarkPlugins } from './toggle-mark.plugins';
import { ToggleMarkQueriesConfig, ToggleMarkQueries } from './toggle-mark.queries';
import { ToggleMarkCommandsConfig, ToggleMarkCommands } from './toggle-mark.commands';

export interface ToggleMarkModuleDefaultConfig<
  T extends string,
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
>
  extends CommonMarkRendererConfig,
    Omit<ToggleMarkPluginsConfig, 'commandToggle'>,
    ToggleMarkQueriesConfig<QS>,
    ToggleMarkCommandsConfig<CA, CR, CT> {
  type: T;
}

export interface ToggleMarkModuleConfig<T extends string> {
  type?: T;
  hotkey?: string;
}

export function createToggleMarkModule<
  DT extends string,
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
>(defaults: ToggleMarkModuleDefaultConfig<DT, QS, CA, CR, CT>) {
  function ToggleMarkModule<T extends string = DT>(
    config?: ToggleMarkModuleConfig<T>
  ): MarkModule<T, QS, CA | CR | CT> {
    const type = ((config && config.type) || defaults.type) as T;
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
    } as MarkModule<T, QS, CA | CR | CT>;
  }

  return ToggleMarkModule;
}
