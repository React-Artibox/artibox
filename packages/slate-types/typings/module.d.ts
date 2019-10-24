import { Plugin, MarkPlugin } from './plugin';
import { Renderer, MarkRenderer } from './renderer';
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
