import { Plugin as SlateReactPlugin } from 'slate-react';
import { Plugin, MarkPlugin } from './plugin';
import { RendererObjectRenderMap, Renderer, MarkRenderer } from './renderer';
import { Queries } from './queries';
import { Commands } from './commands';

export interface Module<T extends string, P extends Plugin, R extends Renderer, Q extends string, C extends string> {
  type: T;
  plugins: P[];
  renderer: R;
  queries: Queries<Q>;
  commands: Commands<C>;
}

export type MarkModule<T extends string, Q extends string, C extends string> = Module<
  T,
  MarkPlugin,
  MarkRenderer,
  Q,
  C
>;

export function resolveModuleToSlateReactPlugins<
  T extends string,
  P extends Plugin,
  R extends Renderer,
  Q extends string,
  C extends string
>(mod: Module<T, P, R, Q, C>): SlateReactPlugin[] {
  const { plugins, renderer, queries, commands } = mod;
  const renderName = RendererObjectRenderMap[renderer.object];
  const plugin: SlateReactPlugin = {
    queries,
    commands,
    [renderName]: renderer.render
  };

  return [plugin, ...plugins];
}
