import { Plugin } from '../plugin';
import { Renderer, MarkRenderer } from '../renderer/renderer.types';
import { Queries } from '../queries';
import { Commands } from '../commands';

export interface Module<Q extends string, C extends string, R extends Renderer = Renderer> {
  type: string;
  plugins: Plugin[];
  renderer: R;
  queries: Queries<Q>;
  commands: Commands<C>;
}

export type MarkModule<Q extends string, C extends string> = Module<Q, C, MarkRenderer>;
