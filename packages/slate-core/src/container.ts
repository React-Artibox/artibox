import { QueryIterable, Queries } from './queries';
import { CommandIterable, Commands } from './commands';
import { DefinedProvider, Provider } from './provider.types';
import { Plugin, PluginWithProvider } from './plugin.types';

function isPluginWithProvider<Q, C>(plugin: Plugin | PluginWithProvider<Q, C>): plugin is PluginWithProvider<Q, C> {
  return !!(plugin as PluginWithProvider<Q, C>).provider;
}

export class Container<Q, C> {
  constructor(private _queries: Queries<Q>, private _commands: Commands<C>) {}

  getQuery(key: any) {
    return this._queries.get(key);
  }

  getCommand(key: any) {
    return this._commands.get(key);
  }

  static mergeProviders<Q, C>(providers: Provider<Q, C>[]): DefinedProvider<Q, C> {
    const queryIterables: QueryIterable<Q>[] = [];
    const commandIterables: CommandIterable<C>[] = [];

    providers.forEach(({ queries, commands }) => {
      if (queries) {
        queryIterables.push(...queries);
      }

      if (commands) {
        commandIterables.push(...commands);
      }
    });

    const queries = new Queries(queryIterables);
    const commands = new Commands(commandIterables);

    return { queries, commands };
  }

  static create<Q, C>(provider: DefinedProvider<Q, C>) {
    const { queries, commands } = provider;
    return new this(queries, commands);
  }

  static mergeProvidersAndCreate<Q, C>(providers: Provider<Q, C>[]) {
    const mergedProviders = this.mergeProviders(providers);
    return this.create(mergedProviders);
  }

  static resolvePluginsAndCreate<Q, C>(pluginOrPluginWithProviders: (Plugin | PluginWithProvider<Q, C>)[]) {
    const plugins: Plugin[] = [];
    const providers: Provider<Q, C>[] = [];

    pluginOrPluginWithProviders.forEach(plugin => {
      if (isPluginWithProvider(plugin)) {
        providers.push(plugin.provider);
        plugins.push(plugin.plugin);
      } else {
        plugins.push(plugin);
      }
    });

    const container = this.mergeProvidersAndCreate(providers);

    return { plugins, container };
  }
}
