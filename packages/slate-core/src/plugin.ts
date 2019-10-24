import { Plugin as SlateReactPlugin } from 'slate-react';
import { RendererRenderMethodNames } from './renderer';

export type Plugin = Omit<SlateReactPlugin, RendererRenderMethodNames | 'queries' | 'commands'>;

export type PickPluginProps<K extends keyof Plugin> = {
  [key in K]: NonNullable<Plugin[key]>;
};

export type MarkPlugin = Plugin;
