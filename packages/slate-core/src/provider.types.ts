import { Queries } from './queries';
import { Commands } from './commands';

export interface DefinedProvider<Q, C> {
  queries: Queries<Q>;
  commands: Commands<C>;
}

export type Provider<Q, C> = {
  [k in keyof DefinedProvider<Q, C>]?: DefinedProvider<Q, C>[k];
};
