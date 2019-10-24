import { Plugin as SlateReactPlugin } from 'slate-react';
import { RenderMethodNames } from './renderer';

export type Plugin = Omit<SlateReactPlugin, RenderMethodNames | 'queries' | 'commands'>;

export type PickPluginProps<K extends keyof Plugin> = {
  [key in K]: NonNullable<Plugin[key]>;
};

export type MarkPlugin = Plugin;
