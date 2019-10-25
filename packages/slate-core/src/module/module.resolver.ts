import { Plugin as SlateReactPlugin } from 'slate-react';
import { RendererObjectRenderMap } from '../renderer/renderer.constants';
import { Queries } from '../queries';
import { Commands } from '../commands';
import { Module } from './module.types';

export interface ResolvedModules<Q extends string, C extends string> {
  plugins: SlateReactPlugin[];
  queries: Queries<Q>;
  commands: Commands<C>;
}

export function resolveModules<Q extends string, C extends string>(modules: Module<Q, C>[]): ResolvedModules<Q, C> {
  const plugins: SlateReactPlugin[] = [];
  const queries = {} as Queries<Q>;
  const commands = {} as Commands<C>;

  modules.forEach(mod => {
    plugins.push(...mod.plugins, {
      queries: mod.queries,
      commands: mod.commands,
      [RendererObjectRenderMap[mod.renderer.object]]: mod.renderer
    });

    Object.assign(queries, mod.queries);
    Object.assign(commands, mod.commands);
  });

  return { plugins, queries, commands };
}
