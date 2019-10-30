import { Plugin as SlateReactPlugin } from 'slate-react';
import { Provider } from './provider.types';

export type Plugin = Omit<SlateReactPlugin, 'queries' | 'commands'>;

export interface PluginWithProvider<Q, C> {
  plugin: Plugin;
  provider: Provider<Q, C>;
}

export type PickPluginProps<K extends keyof Plugin> = {
  [key in K]: NonNullable<Plugin[key]>;
};
