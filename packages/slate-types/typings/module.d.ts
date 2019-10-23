import { Plugin, MarkPlugin } from './plugin';
import { Renderer, MarkRenderer } from './renderer';

export interface Module<
  T extends string,
  Q extends string,
  C extends string,
  P extends Plugin<Q, C>,
  R extends Renderer
> {
  type: T;
  plugin: P;
  renderer: R;
}

export type MarkModule<T extends string, Q extends string, C extends string> = Module<
  T,
  Q,
  C,
  MarkPlugin<Q, C>,
  MarkRenderer
>;
